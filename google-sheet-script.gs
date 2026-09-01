/**
 * PLAS — ส่งข้อมูลการสแกนเข้า Google Sheet แบบเรียบร้อย
 *
 * วิธีติดตั้ง:
 * 1. เปิด Google Sheet ใหม่
 * 2. ไปที่ Extensions > Apps Script
 * 3. วางโค้ดนี้ทับเดิมทั้งหมด
 * 4. Deploy > New deployment > Web app
 * 5. ตั้งค่า Execute as: Me และ Who has access: Anyone
 * 6. ดึง URL ที่ได้ (ลงท้ายด้วย /exec)
 * 7. ใส่ URL ลงใน SHEETS_WEBHOOK_URL
 * 8. restart เซิร์ฟเวอร์
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var scans = ss.getSheetByName('Scans');
    if (!scans) {
      scans = ss.insertSheet('Scans');
    }

    var headers = [
      'เวลา',
      'วันที่',
      'ผู้ใช้ (Email)',
      'ชนิดพลาสติก',
      'ผลลัพธ์',
      'ความแม่นยำ (%)',
      'คะแนนดาว (1-5)',
      'รหัสรีไซเคิล',
      'ใช้ YOLO',
      'โมเดล',
      'หมายเหตุ'
    ];

    if (scans.getLastRow() === 0) {
      scans.appendRow(headers);
      var headerRange = scans.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold').setBackground('#1b5e20').setFontColor('white').setFontSize(12);
      scans.setFrozenRows(1);
      scans.setColumnWidths(1, 1, 100);
      scans.setColumnWidths(2, 1, 90);
      scans.setColumnWidths(3, 1, 180);
      scans.setColumnWidths(4, 1, 120);
      scans.setColumnWidths(5, 1, 80);
      scans.setColumnWidths(6, 1, 105);
      scans.setColumnWidths(7, 1, 90);
      scans.setColumnWidths(8, 1, 100);
      scans.setColumnWidths(9, 1, 80);
      scans.setColumnWidths(10, 1, 130);
      scans.setColumnWidths(11, 1, 200);
    }

    var d = JSON.parse(e.postData.contents || '{}');
    var date = d.at ? new Date(d.at) : new Date();
    var at = Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    var dateLabel = Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    var type = d.plasticType || 'UNKNOWN';
    var isPlastic = d.isPlastic ? 'ใช่' : 'ไม่';
    var confidence = Math.round((Number(d.confidence) || 0) * 100);
    var rating = Math.max(1, Math.min(5, Number(d.rating) || 1));
    var note = String(d.note || '').replace(/\s+/g, ' ').slice(0, 250);

    scans.appendRow([
      at,
      dateLabel,
      d.email || 'guest',
      type,
      isPlastic,
      confidence,
      rating,
      d.recyclingCode || '',
      d.yoloAvailable ? 'ใช่' : 'ไม่',
      d.modelStatus || 'AI',
      note
    ]);

    // จัดรูปแบบแถวข้อมูลใหม่ (สีสลับเพื่อความอ่านง่าย)
    var lastRow = scans.getLastRow();
    var newRowRange = scans.getRange(lastRow, 1, 1, headers.length);
    if (lastRow % 2 === 0) {
      newRowRange.setBackground('#f1f8e9');
    } else {
      newRowRange.setBackground('#ffffff');
    }
    newRowRange.setBorder(false, false, true, false, false, false, '#d0d0d0', 1);

    if (isPlastic === 'ใช่') {
      scans.getRange(lastRow, 5).setBackground('#c8e6c9').setFontColor('#1b5e20').setFontWeight('bold');
    } else {
      scans.getRange(lastRow, 5).setBackground('#ffcdd2').setFontColor('#c62828').setFontWeight('bold');
    }

    var conf = Number(d.confidence) || 0;
    if (conf >= 0.85) {
      scans.getRange(lastRow, 6).setBackground('#c8e6c9').setFontColor('#1b5e20').setFontWeight('bold');
    } else if (conf >= 0.70) {
      scans.getRange(lastRow, 6).setBackground('#fff9c4').setFontColor('#f57f17').setFontWeight('bold');
    } else {
      scans.getRange(lastRow, 6).setBackground('#ffcdd2').setFontColor('#c62828').setFontWeight('bold');
    }

    if (rating >= 4) {
      scans.getRange(lastRow, 7).setBackground('#fff9c4').setFontColor('#f57f17').setFontWeight('bold');
    } else if (rating >= 3) {
      scans.getRange(lastRow, 7).setBackground('#e3f2fd').setFontColor('#1565c0').setFontWeight('bold');
    } else {
      scans.getRange(lastRow, 7).setBackground('#ffcdd2').setFontColor('#c62828').setFontWeight('bold');
    }

    if (d.yoloAvailable) {
      scans.getRange(lastRow, 9).setBackground('#fff9c4').setFontColor('#f57f17').setFontWeight('bold');
    } else {
      scans.getRange(lastRow, 9).setBackground('#f5f5f5').setFontColor('#999999');
    }

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
  var summary = ss.getSheetByName('Summary');
  if (!summary) {
    summary = ss.insertSheet('Summary');
  }

  summary.clear();
  
  // หัวข้อหลัก
  summary.getRange('A1').setValue('📊 สรุปผลการทดลอง PLAS');
  summary.getRange('A1:C1').merge();
  summary.getRange('A1').setFontSize(18).setFontWeight('bold').setBackground('#1b5e20').setFontColor('white').setVerticalAlignment('middle');
  summary.setRowHeight(1, 35);

  var row = 3;
  
  // ส่วนที่ 1: สถิติทั่วไป
  summary.getRange('A' + row).setValue('📈 สถิติทั่วไป');
  summary.getRange('A' + row + ':C' + row).merge();
  summary.getRange('A' + row).setFontWeight('bold').setBackground('#2e7d32').setFontColor('white').setFontSize(12).setVerticalAlignment('middle');
  summary.setRowHeight(row, 25);

  row += 1;
  summary.getRange('A' + row).setValue('จำนวนสแกนทั้งหมด');
  summary.getRange('B' + row).setFormula('=MAX(0, COUNTA(Scans!A:A) - 1)');
  summary.getRange('A' + row + ':C' + row).setBackground('#c8e6c9').setFontWeight('bold');
  summary.getRange('B' + row).setHorizontalAlignment('center').setFontSize(11);

  row += 1;
  summary.getRange('A' + row).setValue('จำนวนผู้ใช้ (คน)');
  summary.getRange('B' + row).setFormula('=COUNTA(UNIQUE(FILTER(Scans!C2:C, Scans!C2:C<>"")))');
  summary.getRange('A' + row + ':C' + row).setBackground('#f1f8e9');
  summary.getRange('B' + row).setHorizontalAlignment('center');

  row += 1;
  summary.getRange('A' + row).setValue('สแกนเฉลี่ยต่อคน');
  summary.getRange('B' + row).setFormula('=IF(B5=0, 0, ROUND(B4/B5, 2))');
  summary.getRange('A' + row + ':C' + row).setBackground('#f1f8e9');
  summary.getRange('B' + row).setHorizontalAlignment('center');

  row += 2;
  // ส่วนที่ 2: ผลลัพธ์ (พลาสติก/ไม่พลาสติก)
  summary.getRange('A' + row).setValue('🎯 ผลลัพธ์การตรวจสอบ');
  summary.getRange('A' + row + ':C' + row).merge();
  summary.getRange('A' + row).setFontWeight('bold').setBackground('#1565c0').setFontColor('white').setFontSize(12).setVerticalAlignment('middle');
  summary.setRowHeight(row, 25);

  row += 1;
  summary.getRange('A' + row).setValue('✅ พลาสติกตรวจพบ');
  summary.getRange('B' + row).setFormula('=COUNTIF(Scans!E2:E, "ใช่")');
  summary.getRange('A' + row + ':C' + row).setBackground('#c8e6c9').setFontWeight('bold').setFontColor('#1b5e20');
  summary.getRange('B' + row).setHorizontalAlignment('center').setFontSize(11);

  row += 1;
  summary.getRange('A' + row).setValue('❌ ไม่ใช่พลาสติก');
  summary.getRange('B' + row).setFormula('=COUNTIF(Scans!E2:E, "ไม่")');
  summary.getRange('A' + row + ':C' + row).setBackground('#ffcdd2').setFontWeight('bold').setFontColor('#c62828');
  summary.getRange('B' + row).setHorizontalAlignment('center').setFontSize(11);

  row += 1;
  summary.getRange('A' + row).setValue('ความแม่นยำเฉลี่ย (%)');
  summary.getRange('B' + row).setFormula('=ROUND(AVERAGE(Scans!F2:F), 1)');
  summary.getRange('A' + row + ':C' + row).setBackground('#fff9c4').setFontWeight('bold').setFontColor('#f57f17');
  summary.getRange('B' + row).setHorizontalAlignment('center').setFontSize(11);

  row += 2;
  // ส่วนที่ 3: ชนิดพลาสติก
  summary.getRange('A' + row).setValue('🔍 ชนิดพลาสติกที่พบ');
  summary.getRange('A' + row + ':C' + row).merge();
  summary.getRange('A' + row).setBackground('#e3f2fd').setFontWeight('bold').setFontSize(12).setFontColor('#01579b').setVerticalAlignment('middle');
  summary.setRowHeight(row, 25);

  row += 1;
  summary.getRange('A' + row).setFormula('=QUERY(Scans!D2:E, "select D, count(E) where D is not null and D <> \\"UNKNOWN\\" group by D order by count(E) desc label D \'ชนิด\', count(E) \'จำนวน\'", 0)');
  summary.getRange('A' + row).setBackground('#f5f5f5');

  row += 8;
  // ส่วนที่ 4: สถานะโมเดล
  summary.getRange('A' + row).setValue('🤖 สถานะโมเดล');
  summary.getRange('A' + row + ':C' + row).merge();
  summary.getRange('A' + row).setBackground('#f3e5f5').setFontWeight('bold').setFontSize(12).setFontColor('#6a1b9a').setVerticalAlignment('middle');
  summary.setRowHeight(row, 25);

  row += 1;
  summary.getRange('A' + row).setValue('ใช้ YOLO');
  summary.getRange('B' + row).setFormula('=COUNTIF(Scans!H2:H, "ใช่")');
  summary.getRange('A' + row + ':C' + row).setBackground('#fff9c4').setFontWeight('bold').setFontColor('#f57f17');
  summary.getRange('B' + row).setHorizontalAlignment('center').setFontSize(11);

  row += 1;
  summary.getRange('A' + row).setValue('เฉพาะ Gemini');
  summary.getRange('B' + row).setFormula('=COUNTIF(Scans!H2:H, "ไม่")');
  summary.getRange('A' + row + ':C' + row).setBackground('#f3e5f5');
  summary.getRange('B' + row).setHorizontalAlignment('center');

  row += 2;
  // อัปเดท
  summary.getRange('A' + row).setValue('⏰ อัปเดท: ');
  summary.getRange('B' + row).setFormula('=TEXT(NOW(), "dd/MM/yyyy HH:mm:ss")');
  summary.getRange('A' + row + ':C' + row).setBackground('#f0f0f0').setFontSize(10);

  // ตั้งค่าคอลัมน์
  summary.setColumnWidth(1, 280);
  summary.setColumnWidth(2, 180);
  summary.setColumnWidth(3, 150);
  summary.setFrozenRows(1);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
