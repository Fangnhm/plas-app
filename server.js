import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleAuth, getSessionUser, recordScan } from './auth.js'

const root = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT || 8000)
const host = process.env.HOST || '0.0.0.0'
const roboflowApiKey = process.env.ROBOFLOW_API_KEY
const roboflowModel = process.env.ROBOFLOW_MODEL
const roboflowVersion = process.env.ROBOFLOW_VERSION
const roboflowHost = (process.env.ROBOFLOW_HOST || 'https://serverless.roboflow.com').replace(/\/$/, '')
// เปิดด่าน YOLO เมื่อมีโมเดล Roboflow ที่จำแนก 6 ชนิดพร้อมใช้ (ตั้ง ROBOFLOW_ENABLED=true)
const roboflowEnabled = String(process.env.ROBOFLOW_ENABLED || 'false').toLowerCase() === 'true'
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' }

const KNOWN_TYPES = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS']
const YOLO_CLASS_MAP = {
  pet: 'PET', pete: 'PET', '1': 'PET',
  hdpe: 'HDPE', pehd: 'HDPE', '2': 'HDPE',
  pvc: 'PVC', v: 'PVC', '3': 'PVC',
  ldpe: 'LDPE', peld: 'LDPE', '4': 'LDPE',
  pp: 'PP', '5': 'PP',
  ps: 'PS', '6': 'PS'
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function mapYoloClass(raw) {
  if (!raw) return null
  const key = String(raw).toLowerCase().replace(/[\s._-]+/g, '')
  if (YOLO_CLASS_MAP[key]) return YOLO_CLASS_MAP[key]
  const upper = String(raw).toUpperCase()
  return KNOWN_TYPES.includes(upper) ? upper : null
}

// ด่านแรก: ให้ Roboflow YOLO บอกชนิดพลาสติกก่อนส่งต่อให้ Gemini
async function runYoloStage(imageData) {
  if (!roboflowEnabled) {
    return { available: false, error: 'ปิดใช้งานด่าน YOLO อยู่ (ROBOFLOW_ENABLED=false)', type: null, label: null, confidence: 0, detections: [] }
  }
  if (!roboflowApiKey || !roboflowModel || !roboflowVersion) {
    return { available: false, error: 'ยังไม่ได้ตั้งค่า ROBOFLOW_API_KEY, ROBOFLOW_MODEL และ ROBOFLOW_VERSION', type: null, label: null, confidence: 0, detections: [] }
  }
  const url = `${roboflowHost}/${encodeURIComponent(roboflowModel)}/${encodeURIComponent(roboflowVersion)}?api_key=${encodeURIComponent(roboflowApiKey)}`
  let lastError = 'ไม่ทราบสาเหตุ'
  for (let attempt = 1; attempt <= 2; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Number(process.env.ROBOFLOW_TIMEOUT_MS || 8000))
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: imageData,
        signal: controller.signal
      })
      const text = await res.text()
      let json
      try {
        json = JSON.parse(text)
      } catch {
        lastError = `Roboflow ตอบกลับไม่ใช่ JSON (HTTP ${res.status}) โฮสต์อาจล่มชั่วคราว`
        if (res.status >= 500 || res.status === 429) { await wait(attempt * 800); continue }
        return { available: false, error: lastError, type: null, label: null, confidence: 0, detections: [] }
      }
      if (!res.ok) {
        lastError = json.error || json.message || `Roboflow ตรวจภาพไม่สำเร็จ (HTTP ${res.status})`
        if (res.status >= 500 || res.status === 429) { await wait(attempt * 800); continue }
        return { available: false, error: lastError, type: null, label: null, confidence: 0, detections: [] }
      }
      const predictions = (json.predictions || []).slice().sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
      const top = predictions[0] || null
      return {
        available: true,
        error: null,
        label: top?.class || null,
        type: mapYoloClass(top?.class),
        confidence: top?.confidence || 0,
        detections: predictions
      }
    } catch (error) {
      lastError = error.name === 'AbortError' ? 'Roboflow ตอบกลับช้าเกินไป (timeout)' : (error.message || 'เชื่อมต่อ Roboflow ไม่สำเร็จ')
      await wait(attempt * 800)
    } finally {
      clearTimeout(timer)
    }
  }
  return { available: false, error: lastError, type: null, label: null, confidence: 0, detections: [] }
}

async function analyzeImage(request, response) {
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY
  if (!geminiApiKey) {
    response.writeHead(503, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในไฟล์ Key.env หรือ Environment Variables' }))
    return
  }

  let body = ''
  for await (const chunk of request) body += chunk
  if (body.length > 12_000_000) {
    response.writeHead(413, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'ไฟล์ภาพมีขนาดใหญ่เกินไป' }))
    return
  }

  try {
    const { image } = JSON.parse(body)
    if (!image || !/^data:image\/(png|jpeg|jpg);base64,/.test(image)) throw new Error('รูปแบบภาพไม่ถูกต้อง')

    const imageData = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
    const mimeType = image.match(/^data:(image\/(?:png|jpeg|jpg));base64,/)?.[1] || 'image/jpeg'

    // ด่านแรก: YOLO บอกชนิดพลาสติก ถ้าใช้งานไม่ได้หรือจำแนกไม่ได้ จะไม่ล้ม แต่ให้ Gemini จำแนกเองต่อ
    const yolo = await runYoloStage(imageData)
    const yoloHint = yolo.type
      ? `A detector already classified the main object as plastic type ${yolo.type} with confidence ${(yolo.confidence * 100).toFixed(0)}%. Confirm or correct this from the image.`
      : 'Classify the plastic type yourself from the image.'

    const prompt = [
      'You are a plastic resin identification assistant.',
      yoloHint,
      'Return ONLY valid JSON with exactly these keys:',
      'is_plastic, plastic_type, polymer_name, recycling_code, confidence, reason, examples, trait, recommendation.',
      'is_plastic must be true or false. plastic_type must be one of PET, HDPE, PVC, LDPE, PP, PS, or UNKNOWN.',
      'recycling_code is the SPI number as a string: PET="1", HDPE="2", PVC="3", LDPE="4", PP="5", PS="6", otherwise null.',
      'Reference examples: PET=ขวดน้ำดื่ม ขวดน้ำอัดลม; HDPE=ขวดนม ขวดแชมพู ถังน้ำ ถุงพลาสติกแข็ง; PVC=ท่อ PVC สายยาง บัตรพลาสติก; LDPE=ถุงพลาสติกใส ฟิล์มห่อ ขวดบีบ; PP=กล่องอาหาร ฝาขวด หลอด เก้าอี้พลาสติก; PS=โฟม แก้วพลาสติกใส ถาดโฟม.',
      'If the object is clearly not plastic, set is_plastic false and confidence below 0.5.',
      'Be conservative and write reason, examples, trait, and recommendation in Thai.'
    ].join(' ')
    const geminiModel = process.env.GEMINI_MODEL || 'gemini-3.6-flash'
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        generationConfig: { temperature: 0, responseMimeType: 'application/json' },
        contents: [{ role: 'user', parts: [{ text: prompt }, { inlineData: { mimeType, data: imageData } }] }]
      })
    })
    const result = await geminiResponse.json()
    if (!geminiResponse.ok) {
      if (geminiResponse.status === 429) {
        response.writeHead(429, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'โควตา Gemini หมดหรือยังไม่ได้เปิดใช้งาน API กรุณาตรวจสอบ Google AI Studio' }))
        return
      }
      throw new Error(result.error?.message || 'Gemini request failed')
    }
    const content = result.candidates?.[0]?.content?.parts?.[0]?.text
    if (!content) throw new Error('ไม่ได้รับผลวิเคราะห์จาก Gemini')
    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      throw new Error('ผลวิเคราะห์จาก Gemini ไม่ใช่ JSON ที่ถูกต้อง')
    }
    parsed.blocked = false
    parsed.yolo = yolo

    try {
      const sessionUser = getSessionUser(request)
      recordScan({
        userId: sessionUser?.id || null,
        email: sessionUser?.email || null,
        plasticType: parsed.plastic_type || 'UNKNOWN',
        isPlastic: Boolean(parsed.is_plastic),
        confidence: Number(parsed.confidence) || 0,
        recyclingCode: parsed.recycling_code ?? null
      })
    } catch {
      // อย่าให้การบันทึกสถิติทำให้ผลวิเคราะห์ล้ม
    }

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(parsed))
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: error.message }))
  }
}

function serveStatic(request, response) {
  const requestedPath = decodeURIComponent(request.url === '/' ? '/index.html' : request.url.split('?')[0])
  const filePath = path.resolve(root, `.${requestedPath}`)
  if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    response.writeHead(404)
    response.end('Not found')
    return
  }
  response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' })
  fs.createReadStream(filePath).pipe(response)
}

http.createServer(async (request, response) => {
  if (await handleAuth(request, response)) return
  if (request.method === 'POST' && request.url === '/api/analyze') return analyzeImage(request, response)
  if (request.method === 'GET') return serveStatic(request, response)
  response.writeHead(405)
  response.end('Method not allowed')
}).listen(port, host, () => console.log(`Plas server available at http://${host}:${port}/`))
