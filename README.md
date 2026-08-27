# PLAS

เว็บเรียนรู้และทดลองคัดแยกขยะพลาสติก พร้อม AI Scanner

## รันในเครื่อง

```bash
npm install
npm run server
```

เปิด `http://localhost:8000` โดยตั้งค่า `OPENAI_API_KEY` ใน `Key.env` ก่อนใช้งาน AI Scanner

## เปิดให้เครื่องอื่นในเครือข่ายเดียวกัน

รันเซิร์ฟเวอร์บนเครื่องหลัก แล้วดู IP ด้วย `ipconfig` จากนั้นเปิด:

```text
http://<IPv4-ของเครื่องหลัก>:8000
```

ต้องอนุญาต Node.js หรือพอร์ต `8000` ผ่าน Windows Firewall หากเครื่องอื่นเชื่อมต่อไม่ได้

## Deploy ด้วย GitHub + Render

1. สร้าง GitHub repository แล้ว push โค้ดชุดนี้ขึ้นไป
2. ใน Render เลือก **New > Blueprint** และเลือก repository นี้
3. ตั้งค่า `OPENAI_API_KEY` ใน Environment Variables ของ Render
4. Render จะใช้ `render.yaml` และรัน `npm run server` ให้โดยอัตโนมัติ

`Key.env`, `.env` และ `node_modules` ถูกยกเว้นจาก Git แล้ว ห้าม commit API key จริง
