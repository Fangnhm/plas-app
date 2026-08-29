/**
 * PLAS — ส่งข้อมูลการสแกนเข้า Google Sheet
 *
 * วิธีติดตั้ง:
 * 1. เปิด Google Sheet ใหม่ (sheets.new)
 * 2. เมนู Extensions > Apps Script
 * 3. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดไฟล์นี้ลงไป
 * 4. กด Deploy > New deployment
 *      - Select type: Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    กด Deploy แล้วก๊อป URL ที่ได้ (ลงท้ายด้วย /exec)
 * 5. เอา URL ไปใส่ env `SHEETS_WEBHOOK_URL` (ใน Key.env สำหรับรันในเครื่อง
 *    หรือใน Environment ของ Render สำหรับตัวที่ deploy)
 * 6. restart เซิร์ฟเวอร์ — ทุกครั้งที่มีการสแกน แถวใหม่จะเพิ่มในชีต "Scans" อัตโนมัติ
 *
 * ชีต "Summary" จะสรุป: จำนวนสแกนทั้งหมด และจำนวนคน (นับอีเมลไม่ซ้ำ)
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // กันเขียนชนกันเมื่อมีหลายคนสแกนพร้อมกัน
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var sheet = ss.getSheetByName('Scans');
    if (!sheet) {
      sheet = ss.insertSheet('Scans');
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['เวลา', 'อีเมล', 'ชนิดพลาสติก', 'เป็นพลาสติก', 'ความมั่นใจ (%)', 'รหัสรีไซเคิล']);
      sheet.setFrozenRows(1);
    }

    var d = JSON.parse(e.postData.contents);
    sheet.appendRow([
      d.at ? new Date(d.at) : new Date(),
      d.email || 'guest',
      d.plasticType || '',
      d.isPlastic ? 'ใช่' : 'ไม่',
      Math.round((Number(d.confidence) || 0) * 100),
      d.recyclingCode || ''
    ]);

    ensureSummary_(ss);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, note: 'PLAS sheet webhook is live. Use POST.' });
}

function ensureSummary_(ss) {
  var sum = ss.getSheetByName('Summary');
  if (sum) return;
  sum = ss.insertSheet('Summary');
  sum.getRange('A1').setValue('สแกนทั้งหมด');
  sum.getRange('B1').setFormula('=MAX(0, COUNTA(Scans!A:A) - 1)');
  sum.getRange('A2').setValue('จำนวนคน (อีเมลไม่ซ้ำ)');
  sum.getRange('B2').setFormula('=COUNTA(UNIQUE(FILTER(Scans!B2:B, Scans!B2:B<>"")))');
  sum.getRange('A3').setValue('เป็นพลาสติก');
  sum.getRange('B3').setFormula('=COUNTIF(Scans!D2:D, "ใช่")');
  sum.getRange('A4').setValue('ไม่ใช่พลาสติก');
  sum.getRange('B4').setFormula('=COUNTIF(Scans!D2:D, "ไม่")');
  sum.getRange('A6').setValue('แยกตามชนิด');
  sum.getRange('A7').setFormula('=QUERY(Scans!C2:C, "select C, count(C) where C is not null group by C order by count(C) desc label C \'ชนิด\', count(C) \'จำนวน\'", 0)');
  sum.getRange('A1:A7').setFontWeight('bold');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
