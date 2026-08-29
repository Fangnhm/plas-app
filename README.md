# PLAS

เว็บเรียนรู้และทดลองคัดแยกขยะพลาสติก พร้อม YOLO จำแนกชนิด และ Gemini Scanner

## เปิดใช้ Roboflow YOLO ก่อน Gemini

> **ค่าเริ่มต้น: ปิดด่าน YOLO ไว้** (`ROBOFLOW_ENABLED=false`) — Scanner จะใช้ Gemini จำแนกชนิดโดยตรง
> เปิดเมื่อมีโมเดล Roboflow ที่จำแนก 6 ชนิดพร้อมใช้แล้วเท่านั้น

ด่านแรกใช้ Roboflow YOLO จำแนกว่าเป็นพลาสติกชนิดใดใน 6 กลุ่ม: **PET, HDPE, PVC, LDPE, PP, PS**
โมเดลที่ Deploy ต้องมี class ตามชื่อเหล่านี้ (รองรับรูปแบบ `pet`, `PE-HD`, หรือเลขรหัส `1`–`6` ด้วย)

```env
ROBOFLOW_ENABLED=true
ROBOFLOW_API_KEY=ใส่คีย์จาก Roboflow
ROBOFLOW_MODEL=ชื่อโมเดลของคุณ (ไม่ต้องมี /version ต่อท้าย)
ROBOFLOW_VERSION=เลขเวอร์ชัน เช่น 1
# ไม่บังคับ ค่าเริ่มต้นคือ https://serverless.roboflow.com
# ROBOFLOW_HOST=https://serverless.roboflow.com
```

เมื่อเปิด ระบบจะเรียก Roboflow Hosted API เป็นด่านแรก:

- ถ้า YOLO จำแนกได้ (PET/HDPE/PVC/LDPE/PP/PS) จะส่งชนิดนั้นเป็นข้อมูลประกอบให้ Gemini ยืนยัน/แก้ไขผล
- ถ้า YOLO จำแนกไม่ได้ หรือ Roboflow ใช้งานไม่ได้ (timeout/ล่ม) ระบบ**จะไม่ล้ม** แต่ให้ Gemini จำแนกชนิดจากภาพเองต่อ

retry อัตโนมัติ 2 ครั้ง (timeout 8 วินาที/ครั้ง ปรับได้ด้วย `ROBOFLOW_TIMEOUT_MS`)

ถ้าใช้ YOLO local แทน Roboflow ให้เตรียมไฟล์ `best.pt` (class เป็น PET/HDPE/PVC/LDPE/PP/PS) และเปิด service ตามคำสั่งนี้:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn yolo_service:app --host 127.0.0.1 --port 8001
```

เปิดอีกหน้าต่างเพื่อรัน Node และ Gemini:

```powershell
npm run server
```

ถ้า YOLO/Roboflow ใช้งานไม่ได้ ระบบจะให้ Gemini จำแนกชนิดจากภาพเองต่อ (ไม่ล้ม)

## รันในเครื่อง

```bash
npm install
npm run server
```

เปิด `http://localhost:8000` โดยตั้งค่า `GEMINI_API_KEY` ใน `Key.env` ก่อนใช้งาน AI Scanner

## ระบบสมาชิก (ล็อกอิน / โปรไฟล์)

- สมัคร/เข้าสู่ระบบด้วยอีเมล + รหัสผ่าน (อย่างน้อย 8 ตัวอักษร) ผ่านปุ่ม "เข้าสู่ระบบ" มุมขวาบน
- รหัสผ่านถูกแฮชด้วย `scrypt` + salt สุ่ม เก็บในไฟล์ `data/users.json` (โฟลเดอร์ `data/` ถูก gitignore แล้ว — ห้าม commit)
- session เก็บใน memory ของเซิร์ฟเวอร์ + cookie `sessionToken` (HttpOnly, อายุ 30 วัน) — เมื่อ restart เซิร์ฟเวอร์ ผู้ใช้ต้องล็อกอินใหม่
- หน้าโปรไฟล์: แก้ชื่อที่แสดง, เปลี่ยนรหัสผ่าน, ดูจำนวนครั้งที่สแกน, ออกจากระบบ
- **โหมดโรงเรียนสิงห์บุรี** (สำหรับครูและนักเรียน): ติ๊กตอนสมัคร (หรือกดเปิด/ปิดในหน้าโปรไฟล์) → เมนู "หาร้านรับซื้อ" เปลี่ยนเป็น "จุดทิ้งในโรงเรียน" แสดงแผนที่โรงเรียนสิงห์บุรี + จุดทิ้งขยะพลาสติกในโรงเรียน (แก้จุดจริงได้ที่ตัวแปร `schoolDropPoints` ใน `src/main.js`) ส่วนเครื่องคำนวณน้ำหนัก/ราคายังใช้ได้เหมือนเดิม
- API: `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/logout` · `GET /api/auth/me` · `PATCH /api/profile`
- บน Render (`NODE_ENV=production`) cookie จะเพิ่มแฟล็ก `Secure` อัตโนมัติ

### หน้าหลังบ้าน (แอดมิน)

- **ผู้สมัครคนแรกเป็นแอดมินอัตโนมัติ** หรือกำหนดเองด้วย env `ADMIN_EMAILS=a@x.com,b@y.com`
- ทุกครั้งที่มีการสแกนสำเร็จ เซิร์ฟเวอร์บันทึกลง `data/scans.json` (เวลา, ชนิดที่ได้, ความมั่นใจ, อีเมลผู้ใช้ถ้าล็อกอิน — **ไม่เก็บรูป**)
- แอดมินเห็นเมนู "🛠 หลังบ้าน": สแกนทั้งหมด/วันนี้, จำนวนที่เจอพลาสติก vs ไม่ใช่, ความมั่นใจเฉลี่ย, กราฟแยกตามชนิด, ผู้ใช้ที่สแกนมากสุด, และรายการสแกนล่าสุด
- API: `GET /api/admin/stats` (ต้องเป็นแอดมิน มิฉะนั้น 403)

> หมายเหตุ: เป็นระบบสำหรับโครงงาน/สาธิต ไม่มี rate limiting และไม่มีการยืนยันอีเมล

## Deploy ให้คนอื่นใช้ (GitHub + Render)

1. **push ขึ้น GitHub**
   ```bash
   git add -A
   git commit -m "Deploy PLAS"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
   > `Key.env` และ `data/` ถูก gitignore แล้ว จะไม่ถูก push ขึ้นไป (ปลอดภัย)

2. ที่ [render.com](https://render.com) → **New > Blueprint** → เลือก repo นี้ (Render จะอ่าน `render.yaml` เอง)

3. กรอก Environment Variables ที่ Render ขอ:
   | ตัวแปร | ค่า |
   |---|---|
   | `GEMINI_API_KEY` | คีย์ Gemini |
   | `GEMINI_MODEL` | `gemini-3.6-flash` (หรือเว้นว่าง) |
   | `ADMIN_EMAILS` | อีเมลแอดมิน |
   | `ROBOFLOW_ENABLED` | `false` |
   | `ROBOFLOW_API_KEY` / `ROBOFLOW_MODEL` / `ROBOFLOW_VERSION` | ของ Roboflow (ใส่อะไรก็ได้ถ้า `ROBOFLOW_ENABLED=false`) |

4. กด Deploy → ได้ URL แบบ `https://plas-app-xxxx.onrender.com` ส่งให้คนอื่นใช้ได้เลย

### ข้อจำกัด Render free tier

- **หลับหลัง 15 นาทีไม่มีคนใช้** — คำขอแรกหลังหลับจะช้า ~30–50 วินาที
- **`data/users.json` และ `data/scans.json` เป็น ephemeral** — บัญชีสมาชิกและสถิติหลังบ้าน**หายทุกครั้งที่ redeploy/restart** (เหมาะกับงานสาธิต ถ้าต้องการถาวรต้องต่อ Persistent Disk แบบเสียเงิน หรือใช้ฐานข้อมูลภายนอก)
- session อยู่ใน memory — restart แล้วผู้ใช้ต้องล็อกอินใหม่

## เปิดให้เครื่องอื่นในเครือข่ายเดียวกัน (ไม่ต้อง deploy)

รันเซิร์ฟเวอร์บนเครื่องหลัก แล้วดู IP ด้วย `ipconfig` จากนั้นให้คนในวง Wi-Fi เดียวกันเปิด:

```text
http://<IPv4-ของเครื่องหลัก>:8000
```

ต้องอนุญาต Node.js หรือพอร์ต `8000` ผ่าน Windows Firewall หากเครื่องอื่นเชื่อมต่อไม่ได้ (ใช้ได้เฉพาะตอนเครื่องหลักเปิดอยู่)

`Key.env`, `.env`, `node_modules` และ `data/` ถูกยกเว้นจาก Git แล้ว ห้าม commit API key หรือรหัสผ่านจริง
