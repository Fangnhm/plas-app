import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const port = Number(process.env.PORT || 8000)
const host = process.env.HOST || '0.0.0.0'
const mimeTypes = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' }

async function analyzeImage(request, response) {
  if (!process.env.OPENAI_API_KEY) {
    response.writeHead(503, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ error: 'ยังไม่ได้ตั้งค่า OPENAI_API_KEY ในไฟล์ .env หรือ Environment Variables' }))
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
    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [{ role: 'system', content: 'You classify plastic objects from images. Return only valid JSON. Allowed plastic_type values are PET, HDPE, PP, LDPE, UNKNOWN. recycling_code must be 1, 2, 4, 5, or null. confidence is a number from 0 to 1. If uncertain, use UNKNOWN and confidence below 0.5.' }, { role: 'user', content: [{ type: 'text', text: 'Analyze this image as a preliminary plastic classification. Return JSON with exactly: plastic_type, polymer_name, recycling_code, confidence, reason, examples, trait, recommendation. Do not claim certainty. Use Thai for reason, examples, trait, and recommendation.' }, { type: 'image_url', image_url: { url: image, detail: 'low' } }] }]
      })
    })
    const result = await openAiResponse.json()
    if (!openAiResponse.ok) {
      if (openAiResponse.status === 429) {
        response.writeHead(429, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: 'โควตา OpenAI หมดหรือยังไม่ได้เปิด Billing กรุณาตรวจสอบ Plan และ Billing ในบัญชี OpenAI' }))
        return
      }
      throw new Error(result.error?.message || 'OpenAI request failed')
    }
    const content = result.choices?.[0]?.message?.content
    if (!content) throw new Error('ไม่ได้รับผลวิเคราะห์จาก OpenAI')
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(content)
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

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/api/analyze') return analyzeImage(request, response)
  if (request.method === 'GET') return serveStatic(request, response)
  response.writeHead(405)
  response.end('Method not allowed')
}).listen(port, host, () => console.log(`Plas server available at http://${host}:${port}/`))
