import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(root, 'data')
const usersFile = path.join(dataDir, 'users.json')
const scansFile = path.join(dataDir, 'scans.json')
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30 // 30 วัน
const MAX_SCAN_LOG = 5000
const isProd = String(process.env.NODE_ENV).toLowerCase() === 'production'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const adminEmails = String(process.env.ADMIN_EMAILS || '')
  .toLowerCase()
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

// session เก็บในหน่วยความจำ (หายเมื่อ restart — ผู้ใช้แค่ล็อกอินใหม่)
const sessions = new Map()

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]')
}

function loadUsers() {
  ensureStore()
  try {
    return JSON.parse(fs.readFileSync(usersFile, 'utf8'))
  } catch {
    return []
  }
}

function saveUsers(users) {
  ensureStore()
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

function loadScans() {
  ensureStore()
  try {
    const parsed = JSON.parse(fs.readFileSync(scansFile, 'utf8'))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// บันทึกผลการสแกนไว้ให้แอดมินดูสถิติ (ไม่เก็บรูป)
export function recordScan(entry) {
  ensureStore()
  const scans = loadScans()
  scans.push({
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    userId: entry.userId || null,
    email: entry.email || null,
    plasticType: entry.plasticType || 'UNKNOWN',
    isPlastic: Boolean(entry.isPlastic),
    confidence: Number(entry.confidence) || 0,
    recyclingCode: entry.recyclingCode ?? null
  })
  fs.writeFileSync(scansFile, JSON.stringify(scans.length > MAX_SCAN_LOG ? scans.slice(-MAX_SCAN_LOG) : scans))
}

function isAdmin(user) {
  return Boolean(user) && (user.role === 'admin' || adminEmails.includes(String(user.email).toLowerCase()))
}

function buildStats() {
  const scans = loadScans()
  const users = loadUsers()
  const today = new Date().toISOString().slice(0, 10)
  const byType = {}
  const perUser = {}
  let confidenceSum = 0

  for (const s of scans) {
    const key = s.isPlastic ? (s.plasticType || 'UNKNOWN') : 'ไม่ใช่พลาสติก'
    byType[key] = (byType[key] || 0) + 1
    perUser[s.email || 'ผู้เยี่ยมชม (ไม่ล็อกอิน)'] = (perUser[s.email || 'ผู้เยี่ยมชม (ไม่ล็อกอิน)'] || 0) + 1
    confidenceSum += Number(s.confidence) || 0
  }

  return {
    totalScans: scans.length,
    scansToday: scans.filter((s) => String(s.at).slice(0, 10) === today).length,
    totalUsers: users.length,
    plasticFound: scans.filter((s) => s.isPlastic).length,
    notPlastic: scans.filter((s) => !s.isPlastic).length,
    avgConfidence: scans.length ? Math.round((confidenceSum / scans.length) * 100) : 0,
    byType: Object.entries(byType).sort((a, b) => b[1] - a[1]),
    topUsers: Object.entries(perUser).sort((a, b) => b[1] - a[1]).slice(0, 10),
    recent: scans.slice(-25).reverse().map((s) => ({
      at: s.at,
      type: s.isPlastic ? (s.plasticType || 'UNKNOWN') : 'ไม่ใช่พลาสติก',
      confidence: Math.round((Number(s.confidence) || 0) * 100),
      user: s.email || 'ผู้เยี่ยมชม'
    }))
  }
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  return { salt, hash: crypto.scryptSync(password, salt, 64).toString('hex') }
}

function verifyPassword(password, salt, hash) {
  if (!salt || !hash) return false
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex')
  const a = Buffer.from(candidate, 'hex')
  const b = Buffer.from(hash, 'hex')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

function publicUser(u) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    createdAt: u.createdAt,
    role: u.role || 'user',
    isAdmin: isAdmin(u),
    school: u.school || ''
  }
}

function normalizeSchool(value) {
  return String(value || '').toLowerCase() === 'singburi' ? 'singburi' : ''
}

function parseCookies(header = '') {
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf('=')
        return [part.slice(0, idx), decodeURIComponent(part.slice(idx + 1))]
      })
  )
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, { userId, expires: Date.now() + SESSION_TTL_MS })
  return token
}

export function getSessionUser(request) {
  const token = parseCookies(request.headers.cookie).sessionToken
  if (!token) return null
  const session = sessions.get(token)
  if (!session || session.expires < Date.now()) {
    sessions.delete(token)
    return null
  }
  return loadUsers().find((u) => u.id === session.userId) || null
}

function cookieHeader(token, maxAgeSeconds) {
  const parts = [`sessionToken=${token}`, 'HttpOnly', 'Path=/', 'SameSite=Lax', `Max-Age=${maxAgeSeconds}`]
  if (isProd) parts.push('Secure')
  return parts.join('; ')
}

async function readJson(request, limit = 1_000_000) {
  let body = ''
  for await (const chunk of request) {
    body += chunk
    if (body.length > limit) throw new Error('คำขอมีขนาดใหญ่เกินไป')
  }
  return body ? JSON.parse(body) : {}
}

function send(response, status, payload, headers = {}) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers })
  response.end(JSON.stringify(payload))
}

// คืน true ถ้าจัดการ request นี้แล้ว
export async function handleAuth(request, response) {
  const url = request.url.split('?')[0]
  if (!url.startsWith('/api/auth/') && url !== '/api/profile' && !url.startsWith('/api/admin/')) return false

  try {
    if (request.method === 'POST' && url === '/api/auth/register') {
      const { email, password, name, school } = await readJson(request)
      if (!EMAIL_RE.test(String(email || ''))) {
        send(response, 400, { error: 'อีเมลไม่ถูกต้อง' })
        return true
      }
      if (!password || String(password).length < 8) {
        send(response, 400, { error: 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร' })
        return true
      }
      if (!name || !String(name).trim()) {
        send(response, 400, { error: 'กรุณากรอกชื่อที่แสดง' })
        return true
      }
      const users = loadUsers()
      if (users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
        send(response, 409, { error: 'อีเมลนี้ถูกใช้ไปแล้ว' })
        return true
      }
      const { salt, hash } = hashPassword(String(password))
      const user = {
        id: crypto.randomUUID(),
        email: String(email).trim(),
        name: String(name).trim(),
        salt,
        hash,
        role: users.length === 0 ? 'admin' : 'user', // ผู้สมัครคนแรกเป็นแอดมิน
        school: normalizeSchool(school),
        createdAt: new Date().toISOString()
      }
      users.push(user)
      saveUsers(users)
      const token = createSession(user.id)
      send(response, 201, { user: publicUser(user) }, { 'Set-Cookie': cookieHeader(token, SESSION_TTL_MS / 1000) })
      return true
    }

    if (request.method === 'POST' && url === '/api/auth/login') {
      const { email, password } = await readJson(request)
      const user = loadUsers().find((u) => u.email.toLowerCase() === String(email || '').toLowerCase())
      if (!user || !verifyPassword(String(password || ''), user.salt, user.hash)) {
        send(response, 401, { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' })
        return true
      }
      const token = createSession(user.id)
      send(response, 200, { user: publicUser(user) }, { 'Set-Cookie': cookieHeader(token, SESSION_TTL_MS / 1000) })
      return true
    }

    if (request.method === 'POST' && url === '/api/auth/logout') {
      const token = parseCookies(request.headers.cookie).sessionToken
      if (token) sessions.delete(token)
      send(response, 200, { ok: true }, { 'Set-Cookie': cookieHeader('', 0) })
      return true
    }

    if (request.method === 'GET' && url === '/api/auth/me') {
      const user = getSessionUser(request)
      if (!user) {
        send(response, 401, { error: 'ยังไม่ได้เข้าสู่ระบบ' })
        return true
      }
      send(response, 200, { user: publicUser(user) })
      return true
    }

    if (request.method === 'GET' && url === '/api/admin/stats') {
      const user = getSessionUser(request)
      if (!isAdmin(user)) {
        send(response, 403, { error: 'ต้องเป็นผู้ดูแลระบบ (แอดมิน) เท่านั้น' })
        return true
      }
      send(response, 200, buildStats())
      return true
    }

    if (request.method === 'PATCH' && url === '/api/profile') {
      const current = getSessionUser(request)
      if (!current) {
        send(response, 401, { error: 'ยังไม่ได้เข้าสู่ระบบ' })
        return true
      }
      const { name, currentPassword, newPassword, school } = await readJson(request)
      const users = loadUsers()
      const user = users.find((u) => u.id === current.id)
      if (name != null) {
        if (!String(name).trim()) {
          send(response, 400, { error: 'ชื่อที่แสดงว่างไม่ได้' })
          return true
        }
        user.name = String(name).trim()
      }
      if (school != null) {
        user.school = normalizeSchool(school)
      }
      if (newPassword) {
        if (!verifyPassword(String(currentPassword || ''), user.salt, user.hash)) {
          send(response, 400, { error: 'รหัสผ่านเดิมไม่ถูกต้อง' })
          return true
        }
        if (String(newPassword).length < 8) {
          send(response, 400, { error: 'รหัสผ่านใหม่ต้องยาวอย่างน้อย 8 ตัวอักษร' })
          return true
        }
        const next = hashPassword(String(newPassword))
        user.salt = next.salt
        user.hash = next.hash
      }
      saveUsers(users)
      send(response, 200, { user: publicUser(user) })
      return true
    }

    send(response, 404, { error: 'ไม่พบเส้นทางนี้' })
    return true
  } catch (error) {
    send(response, 400, { error: error.message || 'คำขอไม่ถูกต้อง' })
    return true
  }
}
