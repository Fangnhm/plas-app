const plastics = [
  { id: 'PET', code: '01', name: 'พอลิเอทิลีนเทเรฟทาเลต', example: 'ขวดน้ำดื่ม, ขวดน้ำอัดลม', trait: 'ใส แข็งแรง น้ำหนักเบา', use: 'ขวดบรรจุเครื่องดื่ม', recycle: 'เส้นใยโพลีเอสเตอร์, ขวดใหม่', density: '1.38', melt: '250–260°C', chemistry: 'สายโซ่เชิงเส้น มีหมู่เอสเทอร์', chemPlain: 'พลาสติกใสน้ำหนักเบา สายโซ่โมเลกุลยาวเรียงตัวเป็นระเบียบ จึงแข็งแรงและกันแก๊ส/กลิ่นได้ดี เหมาะกับขวดเครื่องดื่ม', benefit: 'รีไซเคิลง่ายและมีมูลค่าสูงที่สุด ขวดใช้แล้วนำไปหลอมเป็นเส้นใยทำเสื้อผ้า พรม ใยหมอน หรือขวดใหม่ ช่วยลดการใช้ปิโตรเลียมและลดขยะฝังกลบ', color: 'mint' },
  { id: 'HDPE', code: '02', name: 'พอลิเอทิลีนความหนาแน่นสูง', example: 'ขวดนม, ขวดแชมพู, ถังน้ำ, ถุงพลาสติกแข็ง', trait: 'ขุ่น เหนียว ทนแรงกระแทก', use: 'ขวดสารเคมี, ภาชนะ', recycle: 'ถังขยะ, ท่อ, ขวดใหม่', density: '0.94–0.97', melt: '130°C', chemistry: 'สายโซ่เชิงเส้น แตกแขนงน้อย', chemPlain: 'พลาสติกขุ่นและเหนียว สายโซ่โมเลกุลตรงและอัดแน่น จึงแข็งแรง ทนสารเคมี ไม่ทำปฏิกิริยากับของที่บรรจุ', benefit: 'ทนทานและปลอดภัยกับอาหาร รีไซเคิลได้หลายรอบ นำไปทำท่อ ถังขยะ ไม้เทียม เฟอร์นิเจอร์กลางแจ้ง ยืดอายุการใช้วัสดุได้นาน', color: 'blue' },
  { id: 'PVC', code: '03', name: 'พอลิไวนิลคลอไรด์', example: 'ท่อ PVC, สายยาง, บัตรพลาสติก', trait: 'แข็ง ทนสารเคมี ทนไฟ', use: 'ท่อ, กรอบหน้าต่าง, ฉนวนสายไฟ', recycle: 'ท่อ, แผ่นปูพื้น, กรวยจราจร', density: '1.30–1.45', melt: '160–210°C (แปรรูป)', chemistry: 'สายโซ่มีอะตอมคลอรีนเป็นหมู่แทนที่', chemPlain: 'มีอะตอมคลอรีนอยู่ในสายโซ่ ทำให้แข็ง ทนไฟ ทนสารเคมี แต่ต้องเติมสารช่วยให้ขึ้นรูปได้ จึงรีไซเคิลยากกว่าชนิดอื่น', benefit: 'ทนทานมาก ใช้งานกลางแจ้งได้นานอย่างท่อประปาและกรอบหน้าต่าง ควรแยกออกจากพลาสติกชนิดอื่นให้เด็ดขาด เพราะถ้าปนจะทำให้รีไซเคิลทั้งกองเสีย และไม่ควรเผารวมเพราะเกิดแก๊สกรด', color: 'violet' },
  { id: 'LDPE', code: '04', name: 'พอลิเอทิลีนความหนาแน่นต่ำ', example: 'ถุงพลาสติกใส, ฟิล์มห่อ, ขวดบีบ', trait: 'นิ่ม ยืดหยุ่น โปร่งแสง', use: 'ถุงหูหิ้ว, ฟิล์ม', recycle: 'ถุงขยะ, แผ่นพลาสติก', density: '0.91–0.94', melt: '105–115°C', chemistry: 'สายโซ่แตกแขนงมาก ยืดหยุ่น', chemPlain: 'สายโซ่โมเลกุลแตกแขนงมากและเรียงตัวหลวม ๆ จึงนิ่ม ยืดหยุ่น พับงอได้ เหมาะทำถุงและฟิล์มบาง', benefit: 'น้ำหนักเบา ใช้วัสดุน้อย ถ้ารวบรวมถุงและฟิล์มที่สะอาดส่งรีไซเคิลจะได้ถุงขยะ แผ่นปูพื้น หรือไม้เทียม ช่วยลดขยะพลาสติกแบบใช้ครั้งเดียว', color: 'orange' },
  { id: 'PP', code: '05', name: 'พอลิโพรพิลีน', example: 'กล่องอาหาร, ฝาขวด, หลอด, เก้าอี้พลาสติก', trait: 'เบา ทนความร้อนสูง', use: 'ภาชนะอาหาร, ชิ้นส่วนรถยนต์', recycle: 'กล่อง, เฟอร์นิเจอร์, อุปกรณ์', density: '0.90–0.91', melt: '160–165°C', chemistry: 'สายโซ่มีหมู่เมทิลเป็นแขนง', chemPlain: 'มีหมู่เมทิลเป็นแขนงเล็ก ๆ ทำให้ทนความร้อนได้ดี ไม่เปื่อยเมื่อโดนน้ำร้อน จึงใช้กับกล่องอาหารเข้าไมโครเวฟและฝาขวด', benefit: 'ทนร้อนและทนการงอซ้ำ ๆ (เช่น บานพับฝากล่อง) รีไซเคิลเป็นกล่อง อุปกรณ์ เฟอร์นิเจอร์ และชิ้นส่วนรถยนต์ ช่วยลดต้นทุนและทรัพยากร', color: 'yellow' },
  { id: 'PS', code: '06', name: 'พอลิสไตรีน', example: 'โฟม, แก้วพลาสติกใส, ถาดโฟม', trait: 'แข็งแต่เปราะ ใส หรือขึ้นรูปเป็นโฟม', use: 'ภาชนะใช้ครั้งเดียว, ฉนวนกันกระแทก', recycle: 'ไม้เทียม, กรอบรูป, ฉนวน', density: '1.04–1.06', melt: '210–249°C', chemistry: 'สายโซ่มีวงเบนซีน (หมู่ฟีนิล) เป็นแขนง', chemPlain: 'มีวงแหวนเบนซีนเป็นแขนงใหญ่ ทำให้แข็งแต่เปราะและใส เมื่อเป่าลมเข้าไปจะได้โฟม เช่น กล่องโฟมและถาดโฟม', benefit: 'โฟมเบามากและกันกระแทก/กันความร้อนได้ดี แต่แตกเป็นชิ้นเล็กฟุ้งกระจายและรีไซเคิลยาก จึงควรลดการใช้และแยกให้ถูก ถ้าเป็นโฟมสะอาดบางแห่งรับไปอัดเป็นกรอบรูปหรือฉนวน', color: 'rose' }
]

const steps = [
  ['01', 'ขยะพลาสติก', 'รวบรวมพลาสติกจากชุมชนและส่งต่อเข้าสู่ระบบ'],
  ['02', 'คัดแยกเบื้องต้น', 'แยกเศษอาหาร โลหะ กระดาษ และสิ่งปนเปื้อนออก'],
  ['03', 'ตรวจชนิดพอลิเมอร์', 'สังเกตรหัสรีไซเคิลและสมบัติเพื่อจัดกลุ่มให้ถูกต้อง'],
  ['04', 'บด • ล้าง • ทำให้แห้ง', 'ลดขนาด ล้างคราบ และกำจัดความชื้นก่อนแปรรูป'],
  ['05', 'หลอมและขึ้นรูป', 'ใช้ความร้อนเปลี่ยนเกล็ดพลาสติกเป็นวัสดุใหม่'],
  ['06', 'ผลิตภัณฑ์ใหม่', 'วัสดุรีไซเคิลกลับเข้าสู่วงจรการใช้งานอีกครั้ง']
]

const questions = [
  ['ขวดน้ำดื่มทั่วไปมักทำจากพลาสติกชนิดใด?', ['PET', 'HDPE', 'PP', 'LDPE'], 0, 'PET มีความใส แข็งแรง และเหมาะกับการบรรจุเครื่องดื่ม'],
  ['ขวดนมและขวดแชมพูแบบขุ่น เหนียว ทำจากพลาสติกชนิดใด?', ['PET', 'HDPE', 'PVC', 'PS'], 1, 'HDPE ขุ่น เหนียว ทนแรงกระแทก มีรหัสรีไซเคิล 02'],
  ['ท่อประปา สายยาง และบัตรพลาสติกแข็ง มักทำจากพลาสติกชนิดใด?', ['PET', 'PVC', 'PP', 'PS'], 1, 'PVC แข็ง ทนสารเคมี ทนไฟ ใช้ทำท่อและงานก่อสร้าง'],
  ['ถุงพลาสติกใสและฟิล์มห่ออาหารที่นิ่ม ยืดหยุ่น มักเป็นพลาสติกชนิดใด?', ['LDPE', 'PET', 'PVC', 'PS'], 0, 'LDPE นิ่ม ยืดหยุ่น สายโซ่แตกแขนงมาก มีรหัสรีไซเคิล 04'],
  ['พลาสติกชนิดใดทนความร้อนได้ดี จึงใช้ทำกล่องอาหารเข้าไมโครเวฟและฝาขวด?', ['PET', 'PP', 'LDPE', 'PS'], 1, 'PP มีจุดหลอมเหลวสูง (~160–165°C) ไม่เปื่อยเมื่อโดนน้ำร้อน'],
  ['กล่องโฟมใส่อาหารและถาดโฟม ทำจากพลาสติกชนิดใด?', ['LDPE', 'HDPE', 'PS', 'PP'], 2, 'PS (พอลิสไตรีน) เป่าลมเข้าไปได้เป็นโฟม น้ำหนักเบา กันกระแทก'],
  ['รหัสรีไซเคิลของกล่องอาหารและฝาขวด (PP) คือข้อใด?', ['01', '02', '04', '05'], 3, 'PP มีรหัสรีไซเคิล 05'],
  ['พอลิไวนิลคลอไรด์ (PVC) มีรหัสรีไซเคิลเลขใด?', ['02', '03', '05', '06'], 1, 'PVC มีรหัสรีไซเคิล 03'],
  ['พอลิสไตรีน (PS) มีรหัสรีไซเคิลเลขใด?', ['04', '05', '06', '07'], 2, 'PS มีรหัสรีไซเคิล 06'],
  ['พลาสติกชนิดใดมีอะตอมคลอรีนในสายโซ่ จึงควรแยกออกและไม่ควรเผารวมกับขยะอื่น?', ['PET', 'PP', 'PVC', 'HDPE'], 2, 'PVC มีคลอรีน ถ้าปนจะทำให้รีไซเคิลทั้งกองเสีย และการเผาอาจเกิดแก๊สกรด'],
  ['ขั้นตอนใดช่วยกำจัดคราบสกปรกก่อนการหลอม?', ['บด', 'ล้าง', 'คัดแยก', 'ขึ้นรูป'], 1, 'การล้างช่วยลดสิ่งปนเปื้อนในวัสดุรีไซเคิล'],
  ['เหตุใดจึงต้องแยกพลาสติกตามชนิดพอลิเมอร์?', ['ให้สีสวย', 'ลดน้ำหนัก', 'จุดหลอมเหลวต่างกัน', 'เพิ่มความนิ่ม'], 2, 'พอลิเมอร์แต่ละชนิดมีจุดหลอมเหลวและสมบัติต่างกัน จึงต้องหลอมแยก'],
  ['พลาสติกที่ให้ความร้อนแล้วหลอมขึ้นรูปใหม่ได้ (รีไซเคิลได้) จัดเป็นพลาสติกประเภทใด?', ['เทอร์มอพลาสติก', 'เทอร์มอเซต', 'พอลิเมอร์ธรรมชาติ', 'อีลาสโตเมอร์'], 0, 'เทอร์มอพลาสติกมีสายโซ่ไม่เชื่อมขวาง จึงอ่อนตัวและขึ้นรูปใหม่ได้เมื่อได้รับความร้อน'],
  ['PET เกิดจากปฏิกิริยาพอลิเมอไรเซชันแบบใด?', ['แบบเติม', 'แบบควบแน่น', 'แบบต่อกิ่ง', 'แบบเปิดวง'], 1, 'PET เป็นพอลิเอสเทอร์ เกิดแบบควบแน่น มีน้ำหลุดออกมาระหว่างปฏิกิริยา'],
  ['เพราะเหตุใด HDPE จึงหนาแน่นและแข็งกว่า LDPE?', ['มีอะตอมคลอรีน', 'สายโซ่แตกกิ่งน้อย จัดเรียงเป็นผลึกได้มาก', 'มีวงเบนซีนเป็นแขนง', 'เป็นเทอร์มอเซต'], 1, 'HDPE สายโซ่เชิงเส้น กิ่งน้อย เรียงชิดกันเป็นผลึกสูง จึงแน่นและแข็งกว่า LDPE ที่กิ่งมาก']
]

const historyKey = 'plas-scan-history-v4'

// เนื้อหาเคมีพอลิเมอร์ระดับ ม.6 (แสดงเป็น accordion ในหน้า "พลาสติก & เคมี")
const polymerTopics = [
  {
    q: 'มอนอเมอร์และพอลิเมอร์คืออะไร',
    a: 'มอนอเมอร์ (monomer) คือโมเลกุลเล็กที่เป็นหน่วยตั้งต้น เมื่อมอนอเมอร์จำนวนมากต่อกันด้วยพันธะโคเวเลนต์เป็นสายยาวจะได้ "พอลิเมอร์ (polymer)"\nส่วนที่ซ้ำกันในสายเรียกว่าหน่วยซ้ำ (repeating unit) จำนวนหน่วยซ้ำเรียกว่าดีกรีการเกิดพอลิเมอร์ (degree of polymerization, n)\nเช่น เอทิลีน (CH2=CH2) n โมเลกุล → พอลิเอทิลีน [-CH2-CH2-]n'
  },
  {
    q: 'ปฏิกิริยาการเกิดพอลิเมอร์ (พอลิเมอไรเซชัน)',
    a: '• แบบเติม (addition polymerization): มอนอเมอร์มีพันธะคู่ C=C พันธะคู่เปิดออกแล้วต่อกันเป็นสายโดยไม่มีผลพลอยได้ — เช่น PE, PP, PVC, PS\n• แบบควบแน่น (condensation polymerization): มอนอเมอร์มีหมู่ฟังก์ชัน 2 หมู่ ต่อกันแล้วปล่อยโมเลกุลเล็ก (มักเป็นน้ำ) ออกมา — เช่น PET (พอลิเอสเทอร์ จากกรด + แอลกอฮอล์), ไนลอน (พอลิเอไมด์ จากกรด + เอมีน)'
  },
  {
    q: 'เทอร์มอพลาสติก vs เทอร์มอเซตติงพลาสติก',
    a: '• เทอร์มอพลาสติก (thermoplastic): สายโซ่ไม่เชื่อมขวางกัน ยึดกันด้วยแรงระหว่างโมเลกุล เมื่อได้รับความร้อนจะอ่อนตัวและขึ้นรูปใหม่ได้ → รีไซเคิลด้วยการหลอมได้ (PET, HDPE, PVC, LDPE, PP, PS ทั้ง 6 ชนิดเป็นแบบนี้)\n• เทอร์มอเซต (thermosetting): สายโซ่เชื่อมขวาง (cross-link) เป็นร่างแห เมื่อขึ้นรูปแล้วให้ความร้อนซ้ำจะไม่หลอม (ไหม้แทน) → หลอมรีไซเคิลไม่ได้ เช่น เมลามีน เบกาไลต์ อีพ็อกซี'
  },
  {
    q: 'โครงสร้างสายโซ่กำหนดสมบัติอย่างไร',
    a: 'สายโซ่เชิงเส้น แตกกิ่งน้อย เรียงชิดกันเป็นผลึกได้มาก → แข็ง เหนียว ความหนาแน่นสูง จุดหลอมสูง (เช่น HDPE)\nสายโซ่แตกกิ่งมาก เรียงตัวไม่เป็นระเบียบ ผลึกน้อย → นิ่ม ยืดหยุ่น ความหนาแน่นต่ำ จุดหลอมต่ำ (เช่น LDPE)\nหมู่แทนที่ขนาดใหญ่ (วงเบนซีนใน PS, อะตอมคลอรีนใน PVC) ทำให้สายโซ่ขยับยากขึ้น → แข็งและเปราะขึ้น'
  },
  {
    q: 'พอลิเมอร์ธรรมชาติ vs สังเคราะห์',
    a: 'พอลิเมอร์ธรรมชาติ: แป้งและเซลลูโลส (พอลิเมอร์ของกลูโคส), โปรตีน (พอลิเมอร์ของกรดอะมิโน), ยางธรรมชาติ (พอลิไอโซพรีน), กรดนิวคลีอิก (DNA/RNA)\nพอลิเมอร์สังเคราะห์: PE, PP, PVC, PS, PET, ไนลอน ฯลฯ ส่วนใหญ่ผลิตจากผลิตภัณฑ์ปิโตรเลียม'
  },
  {
    q: 'ทำไมต้องแยกพลาสติกตามชนิดก่อนรีไซเคิล',
    a: 'พอลิเมอร์แต่ละชนิดมีจุดหลอมเหลวและความหนืดต่างกัน และมักไม่ผสมเป็นเนื้อเดียวกัน (immiscible)\nถ้านำต่างชนิดมาหลอมรวมจะเกิดการแยกเฟส มีจุดบกพร่อง วัสดุรีไซเคิลจะเปราะและคุณภาพต่ำ\nการแยกให้ถูกชนิดตั้งแต่ต้นทางจึงสำคัญที่สุดต่อคุณภาพของวัสดุรีไซเคิล'
  }
]

// จุดทิ้งขยะพลาสติกในโรงเรียนสิงห์บุรี — เพิ่ม/แก้จุดจริงได้ที่นี่
const schoolDropPoints = [
  { name: 'ข้างโรงอาหาร', accepts: 'ขวดพลาสติกทุกชนิด', note: '', lat: 14.892730, lng: 100.413715 },
  { name: 'ลานม้าหินอ่อนข้างอาคาร 4', accepts: 'ขวดพลาสติกทุกชนิด', note: '', lat: 14.893016, lng: 100.412550 },
  { name: 'บริเวณโดม', accepts: 'ขวดพลาสติกทุกชนิด', note: '', lat: 14.891946767519409, lng: 100.41171110718842 },
  { name: 'ข้างสระมรกต', accepts: 'ขวดพลาสติกทุกชนิด', note: '', lat: 14.893899789890146, lng: 100.41288422123428 },
  { name: 'หน้าโรงอาหาร', accepts: 'ขวดพลาสติกทุกชนิด', note: '', lat: 14.893023680985964, lng: 100.41352826196862 }
]

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="topbar">
    <button class="brand" data-view="home" aria-label="PLAS home">
      <img src="/public/plas-logo.png" alt="Plas logo">
      <span class="brand-copy"><b>PLAS</b><small>SCAN. IDENTIFY. RECYCLE.</small></span>
    </button>
    <nav aria-label="เมนูหลัก">
      <button data-view="home">หน้าแรก</button>
      <button data-view="story">ที่มา & ระบบ</button>
      <button data-view="scanner">AI Scanner</button>
      <button data-view="materials">พลาสติก & เคมี</button>
      <button data-view="shops">หาร้านรับซื้อ</button>
      <button data-view="quiz">Quiz</button>
      <button data-view="admin" id="admin-nav" hidden>🛠 หลังบ้าน</button>
    </nav>
    <button class="nav-cta scanner-link" data-view="scanner"><span>✦</span> AI SCANNER</button>
    <button class="auth-btn" id="auth-btn" data-view="auth">เข้าสู่ระบบ</button>
    <button class="menu" aria-label="เปิดเมนู">☰</button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <small class="eyebrow">● PLAS / SCIENCE FOR EVERYONE</small>
        <h1>แยกพลาสติก<br><em>ให้ถูกต้อง</em><br>ตั้งแต่ต้นทาง</h1>
        <p class="lede">แพลตฟอร์มเรียนรู้และทดลองคัดแยกขยะ<br>ด้วยความเข้าใจเรื่องพอลิเมอร์</p>

        <div class="actions">
          <button class="button" data-view="scanner">ลองใช้ AI Scanner ↗</button>
          <button class="link" data-view="system">ดูแพลตฟอร์มของเรา ↓</button>
        </div>

        <div class="stats">
          <div class="stat-box">
            <strong>6</strong>
            <span>กลุ่มพลาสติก<br><i>PET · HDPE · PVC · LDPE · PP · PS</i></span>
          </div>
          <div class="stat-box">
            <strong>1</strong>
            <span>เป้าหมาย<br><i>ขยะกลับมามีคุณค่า</i></span>
          </div>
        </div>
      </div>

      <div class="hero-art">
        <div class="photo-card">
          <img src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1100&q=85" alt="ขวดพลาสติกสำหรับรีไซเคิล">
          <label>● จากขยะสู่ทรัพยากร <b>→</b></label>
        </div>
        <div class="tag tag-a">PLAS<br><b>PROJECT</b></div>
        <div class="tag tag-b">01<br><small>PET</small></div>
        <span class="mascot mascot--full hero-mascot" aria-hidden="true"></span>
      </div>
    </section>

    <div class="ticker">
      <span>PLASTIC WASTE</span><b>✳</b><span>POLYMER SCIENCE</span><b>✳</b><span>CIRCULAR FUTURE</span><b>✳</b><span>PLASTIC WASTE</span>
    </div>

    <section class="scanner section" id="scanner">
      <div class="scanner-heading">
        <div>
          <small class="kicker">01 / AI PLASTIC SCANNER</small>
          <h2>ถ่ายรูปพลาสติก<br><span>รู้ชนิดในไม่กี่คลิก</span></h2>
        </div>
          <p>อัปโหลดภาพชิ้นพลาสติก ระบบจะจำแนกประเภทให้อัตโนมัติ (PET, HDPE, PVC, LDPE, PP, PS) และดูผลที่เคยสแกนได้ด้านล่าง</p>
      </div>

      <div class="scanner-layout">
        <div class="upload-panel">
          <input id="image-input" type="file" accept="image/png,image/jpeg,image/jpg" hidden>
          <label class="drop-zone" for="image-input" id="drop-zone">
            <div class="upload-icon">↑</div>
            <strong>ลากรูปภาพมาวางที่นี่</strong>
            <span>หรือคลิกเพื่อเลือกไฟล์</span>
            <small>รองรับ JPG, JPEG และ PNG</small>
          </label>

          <div class="scanner-actions">
            <label class="camera-button" for="camera-input">ถ่ายภาพพลาสติก</label>
            <input id="camera-input" type="file" accept="image/*" capture="environment" hidden>
            <button id="analyze-button" class="analyze-button" disabled>วิเคราะห์ชนิดพลาสติก <span>→</span></button>
          </div>

          <div class="preview-wrap" id="preview-wrap">
            <img id="preview-image" alt="ภาพพลาสติกที่อัปโหลด">
            <button id="remove-image" type="button">ลบภาพ ×</button>
          </div>
        </div>

        <div class="result-stack">
          <div class="result-panel" id="result-panel"></div>
          <aside class="ai-summary" id="ai-summary"></aside>
        </div>
      </div>

      <div class="scanner-disclaimer">ⓘ การจำแนกจากภาพเป็นการประเมินเบื้องต้น ไม่สามารถรับประกันชนิดพอลิเมอร์ได้ 100% ควรตรวจสอบรหัสรีไซเคิลบนผลิตภัณฑ์ทุกครั้ง</div>

      <div class="history" id="history">
        <div class="history-heading">
          <small class="kicker">SCAN HISTORY</small>
          <h3>ประวัติการสแกน</h3>
        </div>
        <div id="history-list"></div>
      </div>
    </section>

    <section class="section story" id="story">
      <small class="kicker">02 / ที่มาและปัญหา</small>
      <div class="two-col">
        <div>
          <h2>ขยะชิ้นหนึ่ง<br>มี <span>อนาคต</span> ซ่อนอยู่</h2>
          <p>ในชุมชนของเรา ขยะพลาสติกหลายชนิดถูกทิ้งรวมกัน พลาสติกที่ยังมีมูลค่าจึงถูกส่งไปฝังกลบหรือเผา ทั้งที่สามารถกลับมาเป็นวัสดุใหม่ได้</p>
          <p>โครงงานนี้ใช้ความรู้เรื่อง <b>โครงสร้างและสมบัติของพอลิเมอร์</b> เป็นตัวช่วยคัดแยกตั้งแต่ต้นทาง</p>
        </div>

        <div class="problems">
          <article><b>01</b><div><h3>ทิ้งรวมกัน</h3><p>พลาสติกต่างชนิดปะปนกับขยะอื่น ทำให้คัดแยกได้ยาก</p></div></article>
          <article><b>02</b><div><h3>สูญเสียมูลค่า</h3><p>วัสดุที่นำกลับมาใช้ใหม่ได้ถูกกำจัดไปพร้อมขยะทั่วไป</p></div></article>
          <article><b>03</b><div><h3>กระทบสิ่งแวดล้อม</h3><p>การฝังกลบและเผาอาจสร้างผลกระทบต่อดิน อากาศ และชุมชน</p></div></article>
        </div>
      </div>
    </section>

    <section class="section" id="system">
      <small class="kicker">02 / ระบบการทำงาน</small>
      <div class="section-head">
        <h2>จากถุงหนึ่งใบ<br>สู่ <span>วงจรใหม่</span></h2>
        <p>คลิกแต่ละขั้นตอนเพื่อดูว่าเกิดอะไรขึ้นในระบบ</p>
      </div>
      <div class="steps">
        ${steps.map((s, i) => `
          <button class="step ${i === 0 ? 'active' : ''}" data-step="${i}">
            <small>${s[0]}</small>
            <b>${['◌', '⌁', '◈', '▦', '≈', '↗'][i]}</b>
            <strong>${s[1]}</strong>
            <span>${s[2]}</span>
          </button>
        `).join('')}
      </div>
      <div class="step-detail">
        <b>01</b>
        <div>
          <small>กำลังทำความเข้าใจ</small>
          <h3>${steps[0][1]}</h3>
          <p>${steps[0][2]}</p>
        </div>
        <i>→</i>
      </div>
    </section>

    <section class="section materials">
      <small class="kicker">03 / ฐานข้อมูลวัสดุ</small>
      <div class="section-head">
        <h2>รู้จักพลาสติก<br><span>ก่อนแยก</span></h2>
        <p>คลิกการ์ดเพื่อดูข้อมูลการใช้งานและการรีไซเคิล</p>
      </div>
      <div class="cards">
        ${plastics.map((p) => `
          <button class="plastic ${p.color}" data-plastic="${p.id}">
            <div class="card-top">♻ ${p.code}<b>↗</b></div>
            <div class="orb">${p.code}</div>
            <h3>${p.id}</h3>
            <p>${p.name}</p>
            <hr>
            <small>ตัวอย่าง</small>
            <strong>${p.example}</strong>
          </button>
        `).join('')}
      </div>
    </section>

    <section class="section" id="chemistry">
      <small class="kicker">04 / เคมีของการคัดแยก</small>
      <div class="chem-intro">
        <h2>โครงสร้าง<br>กำหนด <span>สมบัติ</span></h2>
        <div>
          <p>พอลิเมอร์คือโมเลกุลขนาดใหญ่ที่เกิดจากหน่วยเล็ก ๆ ต่อกันเป็นสายโซ่ ความยาว รูปร่าง และการจัดเรียงของสายโซ่ ทำให้พลาสติกแต่ละชนิดมีสมบัติไม่เหมือนกัน</p>
          <small>* ค่าจุดหลอมเหลวและความหนาแน่นเป็นค่าโดยประมาณ อาจเปลี่ยนตามเกรดและสารเติมแต่ง</small>
        </div>
      </div>

      <div class="polymer-cards">
        ${plastics.map((p) => `
          <article class="polymer-card ${p.color}">
            <header>
              <span class="pc-code">${p.code}</span>
              <div>
                <h3>${p.id}</h3>
                <p>${p.name}</p>
              </div>
            </header>
            <dl>
              <div class="pc-metrics">
                <div><dt>ความหนาแน่น</dt><dd>${p.density}<span> g/cm³</span></dd></div>
                <div><dt>จุดหลอมเหลว</dt><dd>${p.melt}</dd></div>
              </div>
              <div><dt>โครงสร้างสายโซ่</dt><dd>${p.chemistry}</dd></div>
              <div><dt>สมบัติเด่น</dt><dd>${p.trait}</dd></div>
              <div><dt>นำไปใช้</dt><dd>${p.use}</dd></div>
            </dl>
          </article>
        `).join('')}
      </div>

      <div class="polymer-topics">
        <h3>เจาะลึกเคมีพอลิเมอร์</h3>
        <p class="poly-lead">แตะหัวข้อเพื่อดูรายละเอียด</p>
        ${polymerTopics.map((topic) => `
          <details class="poly-topic">
            <summary>${topic.q}</summary>
            <div class="poly-body">${topic.a.split('\n').map((line) => `<p>${line}</p>`).join('')}</div>
          </details>
        `).join('')}
      </div>
    </section>

    <section class="section outputs">
      <small class="kicker">05 / ผลลัพธ์ของวงจร</small>
      <div class="two-col">
        <div>
          <h2>เมื่อเรา<br><span>ไม่ทิ้งโอกาส</span></h2>
          <p>การแยกที่ถูกต้องทำให้วัสดุกลับเข้าสู่กระบวนการผลิต และกลายเป็นสิ่งของที่มีประโยชน์ได้อีกครั้ง</p>
        </div>
        <div class="products">
          <article class="product big"><small>01</small><h3>เส้นใย<br>โพลีเอสเตอร์</h3><b>จาก PET</b></article>
          <article class="product blue"><small>02</small><h3>ภาชนะ<br>พลาสติก</h3><b>จาก HDPE / PP</b></article>
          <article class="product orange"><small>03</small><h3>แผ่นวัสดุ<br>ขึ้นรูป</h3><b>จาก LDPE</b></article>
        </div>
      </div>
    </section>

    <section class="section shops" id="shops">
      <small class="kicker" id="shops-kicker">06 / หาที่รับซื้อ</small>
      <div class="section-head">
        <h2 id="shops-title">ขวดแยกแล้ว<br><span>ขายได้เท่าไร?</span></h2>
        <p id="shops-lead">คำนวณราคาโดยประมาณตามชนิดและน้ำหนัก แล้วหาร้านรับซื้อใกล้คุณ</p>
      </div>

      <div class="price-calc">
        <h3>คำนวณราคาขาย (ประมาณ)</h3>
        <div class="calc-rows" id="calc-rows"></div>
        <button type="button" id="calc-add" class="calc-add">＋ เพิ่มรายการ</button>
        <div class="calc-total" id="calc-total"></div>
        <p class="shop-note">* ราคาต่อ กก. เป็นค่าตั้งต้นโดยประมาณ แก้ตัวเลขให้ตรงกับร้านจริงได้ ราคาจริงขึ้นกับความสะอาด การแยกฝา/ฉลาก สี และช่วงเวลา</p>
      </div>

      <div id="shops-public">
        <h3 class="shop-sub">ค้นหาร้านรับซื้อใกล้คุณ</h3>
        <div class="shop-search">
          <input id="shop-query" type="text" value="รับซื้อของเก่า" aria-label="คำค้นหา">
          <button type="button" id="shop-locate" class="locate-btn">📍 ใช้ตำแหน่งของฉัน</button>
          <button type="button" id="shop-go" class="button">ค้นหา</button>
        </div>
        <div class="shop-chips" id="shop-chips">
          <button type="button" data-q="รับซื้อของเก่า">รับซื้อของเก่า</button>
          <button type="button" data-q="รับซื้อขวดพลาสติก">รับซื้อขวดพลาสติก</button>
          <button type="button" data-q="ธนาคารขยะรีไซเคิล">ธนาคารขยะรีไซเคิล</button>
          <button type="button" data-q="วงษ์พาณิชย์">วงษ์พาณิชย์</button>
        </div>
        <p class="shop-note" id="shop-status">กดคำค้นด้านบน หรือ "ใช้ตำแหน่งของฉัน" เพื่อดูร้านใกล้ที่สุด</p>
        <div class="shop-map-wrap">
          <iframe id="shop-map" title="แผนที่ร้านรับซื้อ" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a id="shop-open" class="shop-open-link" href="#" target="_blank" rel="noopener">เปิดใน Google Maps เต็มจอ ↗</a>
      </div>

      <div id="shops-school" hidden>
        <div class="school-head">
          <img src="/public/singburi-school.png" alt="ตราโรงเรียนสิงห์บุรี" class="school-logo">
          <div>
            <h3 class="shop-sub">จุดทิ้งขยะพลาสติกในโรงเรียนสิงห์บุรี</h3>
            <small>ปญฺญา ชีวิต ปชฺโชโต</small>
          </div>
        </div>
        <p class="shop-note">คลิกจุดในรายการ แล้วหมุดจะไปปักบนแผนที่ให้เลย — ไม่ต้องเปิดแท็บใหม่</p>
        <div class="shop-map-wrap">
          <iframe id="school-map" title="แผนที่จุดทิ้งในโรงเรียนสิงห์บุรี" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="school-points" id="school-points"></div>
        <p class="shop-note">ℹ️ แก้ไข/เพิ่มจุดจริงได้ในไฟล์ <code>src/main.js</code> ที่ตัวแปร <code>schoolDropPoints</code></p>
      </div>
    </section>

    <section class="section quiz" id="quiz">
      <small class="kicker">07 / ทดสอบความเข้าใจ</small>
      <div class="quiz-head">
        <h2>คุณแยกได้<br><span>ถูกชนิดไหม?</span></h2>
        <p>คำถาม <b id="qnum">1</b> / ${questions.length}<i><em id="progress"></em></i></p>
      </div>
      <div class="quiz-box">
        <div class="quiz-card">
          <small>คำถามที่ <b id="qindex">1</b></small>
          <h3 id="question"></h3>
          <div class="answers" id="answers"></div>
          <p class="feedback" id="feedback"></p>
        </div>
        <aside>
          <strong>?</strong>
          <b>ทดสอบความรู้<br>เรื่องพอลิเมอร์</b>
          <button class="button" id="next">ถัดไป →</button>
        </aside>
      </div>
    </section>

    <section class="section scan-detail page-hidden" id="scan-detail">
      <div class="scan-detail-body" id="scan-detail-body"></div>
    </section>

    <section class="section auth-view page-hidden" id="auth-view">
      <div class="auth-card">
        <span class="mascot mascot--happy auth-mascot" aria-hidden="true"></span>
        <div class="auth-tabs">
          <button class="auth-tab active" data-mode="login" type="button">เข้าสู่ระบบ</button>
          <button class="auth-tab" data-mode="register" type="button">สมัครสมาชิก</button>
        </div>
        <form id="auth-form" class="auth-form">
          <label class="auth-field auth-name-field" hidden>
            <span>ชื่อที่แสดง</span>
            <input name="name" type="text" autocomplete="name">
          </label>
          <label class="auth-field">
            <span>อีเมล</span>
            <input name="email" type="email" autocomplete="email" required>
          </label>
          <label class="auth-field">
            <span>รหัสผ่าน</span>
            <input name="password" type="password" autocomplete="current-password" minlength="8" required>
          </label>
          <label class="auth-check auth-school-field" hidden>
            <input name="school" type="checkbox">
            <span>ฉันเป็นครูหรือนักเรียนโรงเรียนสิงห์บุรี (เปิดโหมดโรงเรียน)</span>
          </label>
          <p class="auth-error" id="auth-error"></p>
          <button class="button" type="submit" id="auth-submit">เข้าสู่ระบบ</button>
        </form>
        <p class="auth-note">รหัสผ่านถูกเข้ารหัส (scrypt) ก่อนเก็บ และเก็บบนเซิร์ฟเวอร์ของโปรเจกต์นี้เท่านั้น</p>
      </div>
    </section>

    <section class="section profile-view page-hidden" id="profile-view">
      <div class="profile-card" id="profile-card"></div>
    </section>

    <section class="section admin-view page-hidden" id="admin-view">
      <small class="kicker">ADMIN / หลังบ้าน</small>
      <div class="section-head">
        <h2>สรุปการใช้งาน<br><span>ระบบสแกน</span></h2>
        <p>ข้อมูลรวมจากผู้ใช้ทุกคน (บันทึกที่เซิร์ฟเวอร์ ไม่เก็บรูปภาพ)</p>
      </div>
      <div class="admin-body" id="admin-body"></div>
    </section>
  </main>

  <footer>
    <a class="brand" href="#top">
      <img src="/public/plas-logo.png" alt="Plas logo">
      <span class="brand-copy"><b>PLAS</b><small>SCAN. IDENTIFY. RECYCLE.</small></span>
    </a>
    <span>โครงงานวิทยาศาสตร์เพื่อการจัดการขยะอย่างยั่งยืน</span>
    <small>© 2025 PLAS PROJECT</small>
  </footer>

  <dialog id="dialog">
    <button id="close" aria-label="ปิด">×</button>
    <div id="dialog-body"></div>
  </dialog>
`

let currentUser = null

const storySections = ['.story', '#system', '.outputs']
const knowledgeSections = ['.materials', '#chemistry']

const pageGroups = {
  home: ['.hero', '.ticker'],
  story: storySections,
  system: storySections,
  outputs: storySections,
  scanner: ['.scanner'],
  materials: knowledgeSections,
  chemistry: knowledgeSections,
  shops: ['#shops'],
  quiz: ['#quiz'],
  scanDetail: ['#scan-detail'],
  auth: ['#auth-view'],
  profile: ['#profile-view'],
  admin: ['#admin-view']
}

const allPageSections = ['.hero', '.ticker', '.scanner', '.story', '#system', '.materials', '#chemistry', '.outputs', '#shops', '#quiz', '#scan-detail', '#auth-view', '#profile-view', '#admin-view']

function showPage(page) {
  if (page === 'profile' && !currentUser) page = 'auth'
  if (page === 'admin' && !currentUser?.isAdmin) page = currentUser ? 'profile' : 'auth'
  if (page === 'profile') renderProfile()
  if (page === 'admin') renderAdmin()

  allPageSections.forEach((selector) => {
    const element = document.querySelector(selector)
    if (element) element.classList.toggle('page-hidden', !pageGroups[page].includes(selector))
  })

  document.querySelectorAll('[data-view]').forEach((button) => {
    button.classList.toggle('active', button.dataset.view === page)
  })

  document.querySelector('nav')?.classList.remove('open')
  const menu = document.querySelector('.menu')
  menu?.setAttribute('aria-expanded', 'false')

  if (page === 'home') {
    if (window.location.hash) history.replaceState(null, '', window.location.pathname)
  } else if (page !== 'scanDetail' && window.location.hash !== `#${page}`) {
    history.replaceState(null, '', `#${page}`)
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const quizState = { index: 0, score: 0, answered: false }

function renderQuiz() {
  const q = questions[quizState.index]
  quizState.answered = false

  document.querySelector('#question').textContent = q[0]
  document.querySelector('#answers').innerHTML = q[1].map((answer, i) => `
    <button data-i="${i}">
      <b>${String.fromCharCode(65 + i)}</b>
      ${answer}
    </button>
  `).join('')

  document.querySelector('#feedback').textContent = ''
  document.querySelector('#feedback').className = 'feedback'
  document.querySelector('#qnum').textContent = String(quizState.index + 1)
  document.querySelector('#qindex').textContent = String(quizState.index + 1)
  document.querySelector('#progress').style.width = `${((quizState.index + 1) / questions.length) * 100}%`

  document.querySelectorAll('.answers button').forEach((button) => {
    button.addEventListener('click', () => {
      if (quizState.answered) return
      quizState.answered = true
      const isRight = Number(button.dataset.i) === q[2]
      if (isRight) quizState.score += 1

      button.classList.add(isRight ? 'correct' : 'wrong')
      const correctButton = document.querySelector(`[data-i="${q[2]}"]`)
      if (correctButton) correctButton.classList.add('correct')

      const feedback = document.querySelector('#feedback')
      feedback.textContent = `${isRight ? 'ถูกต้อง! ' : 'ยังไม่ใช่: '}${q[3]}`
      feedback.className = `feedback ${isRight ? 'good' : 'bad'}`
    })
  })
}

const nextButton = document.querySelector('#next')
nextButton.addEventListener('click', () => {
  if (!quizState.answered) {
    const feedback = document.querySelector('#feedback')
    feedback.textContent = 'ลองเลือกคำตอบก่อนนะ'
    feedback.className = 'feedback bad'
    return
  }

  if (quizState.index === questions.length - 1) {
    document.querySelector('#question').textContent = `คุณได้ ${quizState.score} / ${questions.length} คะแนน`
    document.querySelector('#answers').innerHTML = `
      <span class="mascot ${quizState.score >= Math.ceil(questions.length * 0.7) ? 'mascot--thumb' : 'mascot--think'} quiz-mascot" aria-hidden="true"></span>
      <p class="result-text">${quizState.score >= Math.ceil(questions.length * 0.7) ? 'ยอดเยี่ยม! คุณเข้าใจหลักการคัดแยกแล้ว' : 'ทำได้ดี! ลองทบทวนตารางพอลิเมอร์อีกครั้งนะ'}</p>
    `
    nextButton.textContent = 'ทำอีกครั้ง ↻'
    nextButton.onclick = () => {
      quizState.index = 0
      quizState.score = 0
      nextButton.textContent = 'ถัดไป →'
      nextButton.onclick = null
      nextButton.addEventListener('click', () => {
        if (!quizState.answered) {
          const feedback = document.querySelector('#feedback')
          feedback.textContent = 'ลองเลือกคำตอบก่อนนะ'
          feedback.className = 'feedback bad'
          return
        }
        if (quizState.index === questions.length - 1) {
          document.querySelector('#question').textContent = `คุณได้ ${quizState.score} / ${questions.length} คะแนน`
          document.querySelector('#answers').innerHTML = `
            <span class="mascot ${quizState.score >= Math.ceil(questions.length * 0.7) ? 'mascot--thumb' : 'mascot--think'} quiz-mascot" aria-hidden="true"></span>
      <p class="result-text">${quizState.score >= Math.ceil(questions.length * 0.7) ? 'ยอดเยี่ยม! คุณเข้าใจหลักการคัดแยกแล้ว' : 'ทำได้ดี! ลองทบทวนตารางพอลิเมอร์อีกครั้งนะ'}</p>
          `
          nextButton.textContent = 'ทำอีกครั้ง ↻'
          nextButton.onclick = () => {
            quizState.index = 0
            quizState.score = 0
            nextButton.textContent = 'ถัดไป →'
            nextButton.onclick = null
            renderQuiz()
          }
          return
        }
        quizState.index += 1
        renderQuiz()
      })
      renderQuiz()
    }
    return
  }

  quizState.index += 1
  renderQuiz()
})

renderQuiz()

const dialog = document.querySelector('#dialog')
document.querySelectorAll('.plastic').forEach((card) => {
  card.addEventListener('click', () => {
    const p = plastics.find((item) => item.id === card.dataset.plastic)
    document.querySelector('#dialog-body').innerHTML = `
      <small>♻ รหัสรีไซเคิล ${p.code}</small>
      <h2>${p.id}</h2>
      <p>${p.name}</p>
      <dl>
        <dt>ลักษณะทั่วไป</dt><dd>${p.trait}</dd>
        <dt>การใช้งาน</dt><dd>${p.use}</dd>
        <dt>รีไซเคิลเป็น</dt><dd>${p.recycle}</dd>
      </dl>
      <small>*ข้อมูลเป็นค่าโดยประมาณ ควรตรวจสอบรหัสบนผลิตภัณฑ์ก่อนคัดแยก</small>
    `
    dialog.showModal()
  })
})

document.querySelector('#close').onclick = () => dialog.close()

document.querySelectorAll('.step').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.step').forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    const s = steps[Number(button.dataset.step)]
    document.querySelector('.step-detail').innerHTML = `
      <b>${s[0]}</b>
      <div>
        <small>กำลังทำความเข้าใจ</small>
        <h3>${s[1]}</h3>
        <p>${s[2]}</p>
      </div>
      <i>→</i>
    `
  })
})

const menuButton = document.querySelector('.menu')
const navigation = document.querySelector('nav')
menuButton.setAttribute('aria-expanded', 'false')
menuButton.onclick = () => {
  const open = navigation.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(open))
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navigation.classList.remove('open')
    menuButton.setAttribute('aria-expanded', 'false')
    if (dialog.open) dialog.close()
  }
})

document.querySelectorAll('[data-view]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.view))
})

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const page = { '#top': 'home', '#system': 'system', '#chemistry': 'chemistry' }[link.getAttribute('href')]
    if (page) {
      event.preventDefault()
      showPage(page)
    }
  })
})

showPage({ '#story': 'story', '#scanner': 'scanner', '#system': 'story', '#materials': 'materials', '#chemistry': 'materials', '#outputs': 'story', '#shops': 'shops', '#quiz': 'quiz' }[window.location.hash] || 'home')

const imageInput = document.querySelector('#image-input')
const cameraInput = document.querySelector('#camera-input')
const dropZone = document.querySelector('#drop-zone')
const previewWrap = document.querySelector('#preview-wrap')
const previewImage = document.querySelector('#preview-image')
const analyzeButton = document.querySelector('#analyze-button')
const resultPanel = document.querySelector('#result-panel')
const historyList = document.querySelector('#history-list')
const aiSummary = document.querySelector('#ai-summary')
let selectedImage = null

function selectImage(file) {
  if (!file || !file.type.startsWith('image/')) return
  selectedImage = file
  previewImage.src = URL.createObjectURL(file)
  previewWrap.classList.add('visible')
  dropZone.classList.add('has-preview')
  analyzeButton.disabled = false
  resultPanel.innerHTML = `
    <div class="result-empty">
      <span class="mascot mascot--thumb" aria-hidden="true"></span>
      <strong>IMAGE READY</strong>
      <p>ภาพพร้อมแล้ว กดปุ่มวิเคราะห์<br>เพื่อประเมินประเภทพลาสติก</p>
    </div>
  `
}

imageInput.addEventListener('change', (event) => selectImage(event.target.files[0]))
cameraInput.addEventListener('change', (event) => selectImage(event.target.files[0]))
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault()
  dropZone.classList.add('dragging')
})
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'))
dropZone.addEventListener('drop', (event) => {
  event.preventDefault()
  dropZone.classList.remove('dragging')
  selectImage(event.dataTransfer.files[0])
})

document.querySelector('#remove-image').addEventListener('click', () => {
  selectedImage = null
  previewWrap.classList.remove('visible')
  dropZone.classList.remove('has-preview')
  analyzeButton.disabled = true
  imageInput.value = ''
  resultPanel.innerHTML = `
    <div class="result-empty">
      <span class="mascot mascot--thumb" aria-hidden="true"></span>
      <strong>AI DETECTED</strong>
      <p>อัปโหลดภาพ แล้วกดวิเคราะห์<br>เพื่อดูผลการจำแนก</p>
    </div>
  `
  renderAiSummary()
})

function loadHistory() {
  try {
    const raw = localStorage.getItem(historyKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(items) {
  localStorage.setItem(historyKey, JSON.stringify(items.slice(0, 6)))
}

function renderHistory() {
  const items = loadHistory()
  if (!items.length) {
    historyList.innerHTML = '<div class="history-empty"><span class="mascot mascot--happy" aria-hidden="true"></span> ยังไม่มีประวัติการสแกน</div>'
    return
  }

  historyList.innerHTML = items.map((item) => `
    <button class="history-item" type="button" data-id="${item.id}">
      <span>${item.time}</span>
      <b>${item.type}</b>
      <strong>${item.confidence}%</strong>
      <i class="history-go">ดูรายละเอียด ›</i>
    </button>
  `).join('')
}

function openScanDetail(id) {
  const item = loadHistory().find((entry) => String(entry.id) === String(id))
  if (!item) return
  const info = plastics.find((p) => p.id === item.polymerType)
  const seenExamples = item.examples && !['ไม่สามารถระบุได้', '-', ''].includes(item.examples)

  document.querySelector('#scan-detail-body').innerHTML = `
    <button class="detail-back" type="button">← กลับไปหน้าสแกน</button>

    <div class="detail-hero ${info ? info.color : ''}">
      <small class="kicker">ผลการจำแนกประเภท · ${item.stamp || item.time}</small>
      <h2>${item.polymerType || item.type}</h2>
      <p>${item.polymerName || ''}</p>
      <div class="detail-badges">
        <span>รหัสรีไซเคิล ${item.recyclingCode ?? (info ? info.code : '—')}</span>
        <span>ความมั่นใจ ${item.confidence}%</span>
      </div>
    </div>

    ${info ? `
      <div class="detail-block">
        <h3>พลาสติกชนิดนี้คืออะไร</h3>
        <p>${info.chemPlain}</p>
      </div>

      <div class="detail-block">
        <h3>เคมีเบื้องหลัง (แบบเข้าใจง่าย)</h3>
        <p>${info.chemistry}</p>
        <ul class="detail-facts">
          <li><span>ความหนาแน่น</span><b>${info.density} g/cm³</b></li>
          <li><span>จุดหลอมเหลว</span><b>${info.melt}</b></li>
          <li><span>สมบัติเด่น</span><b>${info.trait}</b></li>
        </ul>
        <small>* ค่าโดยประมาณ เปลี่ยนได้ตามเกรดและสารเติมแต่ง</small>
      </div>

      <div class="detail-block">
        <h3>นำไปทำอะไรได้</h3>
        <p><b>พบได้ใน:</b> ${info.example}</p>
        <p><b>ใช้ทำ:</b> ${info.use}</p>
        <p><b>รีไซเคิลเป็น:</b> ${info.recycle}</p>
      </div>

      <div class="detail-block">
        <h3>มีประโยชน์อย่างไร · ทำไมต้องแยก</h3>
        <p>${info.benefit}</p>
      </div>
    ` : `
      <div class="detail-block">
        <h3>ข้อมูลเพิ่มเติม</h3>
        <p>รายการนี้ยังระบุชนิดพอลิเมอร์ไม่ได้ชัดเจน จึงยังไม่มีข้อมูลเคมีและการรีไซเคิลแบบเจาะจง ลองถ่ายใหม่ให้เห็นชิ้นพลาสติกเต็มเฟรมและแสงเพียงพอ</p>
      </div>
    `}

    <div class="detail-block scan-note">
      <h3>ผลวิเคราะห์จากภาพนี้</h3>
      <p><b>เหตุผล:</b> ${item.reason || '—'}</p>
      <p><b>คำแนะนำ:</b> ${item.recommendation || '—'}</p>
      ${seenExamples ? `<p><b>ตัวอย่างที่ระบบเห็น:</b> ${item.examples}</p>` : ''}
    </div>
  `

  document.querySelector('#scan-detail-body .detail-back').addEventListener('click', () => showPage('scanner'))
  showPage('scanDetail')
}

function renderAiSummary() {
  const items = loadHistory()
  if (!items.length) {
    aiSummary.innerHTML = `
      <div class="summary-header-row">
        <span class="mascot mascot--happy" aria-hidden="true"></span>
        <div class="summary-header">AI Summary</div>
      </div>
      <h3>เริ่มสแกนสินค้าของคุณ</h3>
      <p>ระบบจะรวบรวมผลการวิเคราะห์และให้คำแนะนำแบบเฉพาะเจาะจงเมื่อคุณเริ่มใช้ AI Scanner</p>
    `
    return
  }

  const counts = {}
  items.forEach((item) => {
    counts[item.type] = (counts[item.type] || 0) + 1
  })

  const dominantType = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  const latest = items[0]

  aiSummary.innerHTML = `
    <div class="summary-header">AI Summary</div>
    <h3>${latest.type}</h3>
    <p>${latest.recommendation || 'ตรวจสอบรหัสรีไซเคิลบนบรรจุภัณฑ์เพื่อยืนยันชนิดพลาสติกก่อนทิ้ง'}</p>
    <ul>
      <li><span>ความถี่</span><b>${dominantType ? dominantType[0] : latest.type}</b></li>
      <li><span>ความมั่นใจ</span><b>${latest.confidence}%</b></li>
      <li><span>ประวัติ</span><b>${items.length} รายการ</b></li>
    </ul>
  `
}

analyzeButton.addEventListener('click', async () => {
  if (!selectedImage) return

  analyzeButton.disabled = true
  resultPanel.innerHTML = `
    <div class="analyzing">
      <span class="mascot mascot--scan" aria-hidden="true"></span>
      <span class="scan-line"></span>
      <strong>กำลังจำแนกประเภท...</strong>
      <p>กำลังวิเคราะห์ภาพ<br>เพื่อระบุชนิดพลาสติก</p>
    </div>
  `

  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: reader.result })
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'ไม่สามารถวิเคราะห์ภาพได้')

      // จำแนกประเภทไม่ได้: แจ้งผู้ใช้ให้ถ่ายใหม่ และไม่บันทึกประวัติ
      if (result.blocked) {
        resultPanel.innerHTML = `
          <div class="result-empty result-blocked">
            <span class="mascot mascot--think" aria-hidden="true"></span>
            <strong>${result.message || 'ไม่ตรงกับประเภทพลาสติก โปรดถ่ายใหม่'}</strong>
            <p>${result.reason || ''}</p>
            <p class="blocked-hint">${result.recommendation || 'ถ่ายใหม่ให้เห็นชิ้นพลาสติกชัดเจน แล้วลองอีกครั้ง'}</p>
          </div>
        `
        analyzeButton.disabled = false
        return
      }

      const knownTypes = ['PET', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS']
      const isPlastic = Boolean(result.is_plastic)
      const polymerType = String(result.plastic_type || 'UNKNOWN').toUpperCase()
      const isKnown = isPlastic && knownTypes.includes(polymerType)
      const headline = isPlastic ? (isKnown ? polymerType : 'พลาสติก (ไม่ระบุชนิด)') : 'ไม่ใช่พลาสติก'
      const confidence = Math.round(Number(result.confidence || 0) * 100)
      const recommendation = result.recommendation || 'ตรวจสอบรหัสรีไซเคิลบนผลิตภัณฑ์ก่อนคัดแยก'
      const polymerName = isPlastic ? (result.polymer_name || 'ไม่ทราบชนิดพอลิเมอร์') : 'วัตถุนี้ไม่น่าจะเป็นพลาสติกตามลักษณะภาพ'
      const examples = result.examples || 'ไม่สามารถระบุได้'
      const trait = result.trait || 'ไม่สามารถระบุได้'
      const reason = result.reason || 'ไม่มีเหตุผลเพิ่มเติมจากระบบ'

    resultPanel.innerHTML = `
        <div class="result-card">
          <div class="result-header">
            <small>ผลการจำแนกประเภท</small>
            <span class="confidence-pill">${confidence}%</span>
          </div>
          <h3>${headline}</h3>
          <p class="polymer-name">${isPlastic ? 'พอลิเมอร์: ' + polymerName : polymerName}</p>

          <div class="result-code">
            <span>RECYCLING CODE</span>
            <b>${isPlastic ? (result.recycling_code ?? '—') : '—'}</b>
          </div>

          <div class="detail-grid">
            <div>
              <label>ตัวอย่างผลิตภัณฑ์</label>
              <p>${examples}</p>
            </div>
            <div>
              <label>สมบัติเด่น</label>
              <p>${trait}</p>
            </div>
          </div>

          <div class="recommend-box">
            <label>คำแนะนำ</label>
            <p>${recommendation}</p>
          </div>

          <div class="why-box">
            <b>ทำไมระบบจึงจัดว่า ${headline}?</b>
            <p>${reason}</p>
          </div>
        </div>
      `

    const now = new Date()
    const entry = {
      id: `${now.getTime()}`,
      type: isPlastic ? (isKnown ? polymerType : 'พลาสติก') : 'ไม่ใช่พลาสติก',
      polymerType: isKnown ? polymerType : null,
      polymerName,
      recyclingCode: isPlastic ? (result.recycling_code ?? null) : null,
      confidence,
      time: now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      stamp: now.toLocaleString('th-TH', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
      examples,
      trait,
      recommendation,
      reason
    }

    const history = loadHistory()
    history.unshift(entry)
    saveHistory(history)
    renderHistory()
    renderAiSummary()
      analyzeButton.disabled = false
    } catch (error) {
      resultPanel.innerHTML = `<div class="result-empty"><span class="mascot mascot--think" aria-hidden="true"></span><strong>SCAN ERROR</strong><p>${error.message}</p></div>`
      analyzeButton.disabled = false
    }
  }
  reader.readAsDataURL(selectedImage)
})

historyList.addEventListener('click', (event) => {
  const button = event.target.closest('.history-item')
  if (button?.dataset.id) openScanDetail(button.dataset.id)
})

renderHistory()
renderAiSummary()

// ===== คำนวณราคาขายพลาสติก =====
const priceDefaults = { PET: 11, HDPE: 12, PVC: 3, LDPE: 5, PP: 10, PS: 4, MIX: 4 }
const priceTypes = [
  ...plastics.map((p) => ({ id: p.id, label: `${p.id} — ${p.name}` })),
  { id: 'MIX', label: 'พลาสติกรวม (คละชนิด)' }
]
const calcRowsEl = document.querySelector('#calc-rows')
const calcTotalEl = document.querySelector('#calc-total')
const fmtNum = (n) => n.toLocaleString('th-TH', { maximumFractionDigits: 2 })
let calcRows = [{ type: 'PET', kg: '', price: priceDefaults.PET }]

function recalcTotals() {
  let totalKg = 0
  let totalBaht = 0
  calcRowsEl.querySelectorAll('.calc-row').forEach((row, i) => {
    const kg = Number(calcRows[i].kg) || 0
    const price = Number(calcRows[i].price) || 0
    totalKg += kg
    totalBaht += kg * price
    row.querySelector('.calc-sub').textContent = `${fmtNum(kg * price)} บาท`
  })
  calcTotalEl.innerHTML = `รวม <b>${fmtNum(totalKg)}</b> กก. · ได้เงินประมาณ <b>${fmtNum(totalBaht)}</b> บาท`
}

function renderCalc() {
  calcRowsEl.innerHTML = calcRows.map((r, i) => `
    <div class="calc-row" data-i="${i}">
      <select class="calc-type" aria-label="ชนิดพลาสติก">
        ${priceTypes.map((t) => `<option value="${t.id}" ${t.id === r.type ? 'selected' : ''}>${t.label}</option>`).join('')}
      </select>
      <input class="calc-kg" type="number" min="0" step="0.1" inputmode="decimal" value="${r.kg}" placeholder="น้ำหนัก" aria-label="น้ำหนัก (กก.)">
      <span class="calc-x">กก. ×</span>
      <input class="calc-price" type="number" min="0" step="0.5" inputmode="decimal" value="${r.price}" aria-label="ราคาต่อกิโลกรัม">
      <span class="calc-unit">บ./กก.</span>
      <b class="calc-sub">0 บาท</b>
      <button class="calc-del" type="button" aria-label="ลบรายการ" ${calcRows.length === 1 ? 'disabled' : ''}>×</button>
    </div>
  `).join('')
  recalcTotals()
}

calcRowsEl.addEventListener('input', (event) => {
  const row = event.target.closest('.calc-row')
  if (!row) return
  const i = Number(row.dataset.i)
  if (event.target.classList.contains('calc-kg')) calcRows[i].kg = event.target.value
  if (event.target.classList.contains('calc-price')) calcRows[i].price = event.target.value
  recalcTotals()
})

calcRowsEl.addEventListener('change', (event) => {
  if (!event.target.classList.contains('calc-type')) return
  const row = event.target.closest('.calc-row')
  const i = Number(row.dataset.i)
  calcRows[i].type = event.target.value
  calcRows[i].price = priceDefaults[event.target.value] ?? calcRows[i].price
  renderCalc()
})

calcRowsEl.addEventListener('click', (event) => {
  const del = event.target.closest('.calc-del')
  if (!del || calcRows.length === 1) return
  calcRows.splice(Number(del.closest('.calc-row').dataset.i), 1)
  renderCalc()
})

document.querySelector('#calc-add').addEventListener('click', () => {
  calcRows.push({ type: 'PET', kg: '', price: priceDefaults.PET })
  renderCalc()
})

renderCalc()

// ===== หาร้านรับซื้อ (ค้นสดผ่าน Google Maps) =====
const shopQuery = document.querySelector('#shop-query')
const shopChips = document.querySelector('#shop-chips')
const shopStatus = document.querySelector('#shop-status')
const shopLocate = document.querySelector('#shop-locate')
const shopGo = document.querySelector('#shop-go')
const shopMap = document.querySelector('#shop-map')
const shopOpen = document.querySelector('#shop-open')
let userPos = null

function runShopSearch() {
  const term = (shopQuery.value || 'รับซื้อของเก่า').trim()
  const q = encodeURIComponent(userPos ? `${term} ใกล้ฉัน` : term)
  const center = userPos ? `&ll=${userPos.lat},${userPos.lng}&z=14` : '&z=12'
  shopMap.src = `https://maps.google.com/maps?q=${q}${center}&output=embed`
  shopOpen.href = userPos
    ? `https://www.google.com/maps/search/${q}/@${userPos.lat},${userPos.lng},14z`
    : `https://www.google.com/maps/search/?api=1&query=${q}`
  shopStatus.textContent = userPos
    ? `แสดงผล "${term}" รอบตำแหน่งของคุณ`
    : `แสดงผล "${term}" — กด "ใช้ตำแหน่งของฉัน" เพื่อดูร้านใกล้ที่สุด`
}

shopChips.addEventListener('click', (event) => {
  const chip = event.target.closest('button[data-q]')
  if (!chip) return
  shopQuery.value = chip.dataset.q
  runShopSearch()
})

shopGo.addEventListener('click', runShopSearch)
shopQuery.addEventListener('keydown', (event) => { if (event.key === 'Enter') runShopSearch() })

shopLocate.addEventListener('click', () => {
  if (!navigator.geolocation) {
    shopStatus.textContent = 'เบราว์เซอร์นี้ไม่รองรับการหาตำแหน่ง'
    return
  }
  shopStatus.textContent = 'กำลังขอตำแหน่ง...'
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }
      runShopSearch()
    },
    () => { shopStatus.textContent = 'เข้าถึงตำแหน่งไม่ได้ — ลองพิมพ์ชื่อจังหวัด/อำเภอต่อท้ายคำค้น' },
    { enableHighAccuracy: true, timeout: 8000 }
  )
})

runShopSearch()

// ===== ล็อกอิน / โปรไฟล์ =====
const authBtn = document.querySelector('#auth-btn')
const authForm = document.querySelector('#auth-form')
const authError = document.querySelector('#auth-error')
const authSubmit = document.querySelector('#auth-submit')
const authNameField = document.querySelector('.auth-name-field')
const authSchoolField = document.querySelector('.auth-school-field')
const profileCard = document.querySelector('#profile-card')
let authMode = 'login'

function isStudent() {
  return currentUser?.school === 'singburi'
}

// สลับโหมดโรงเรียนสิงห์บุรี (ครู/นักเรียน): เปลี่ยนหน้า "หาร้านรับซื้อ" เป็นแผนที่จุดทิ้งในโรงเรียน
function applyStudentMode() {
  const student = isStudent()
  const shopsNav = document.querySelector('nav [data-view="shops"]')
  if (shopsNav) shopsNav.textContent = student ? 'จุดทิ้งในโรงเรียน' : 'หาร้านรับซื้อ'

  const publicBlock = document.querySelector('#shops-public')
  const schoolBlock = document.querySelector('#shops-school')
  if (publicBlock) publicBlock.hidden = student
  if (schoolBlock) schoolBlock.hidden = !student

  const kicker = document.querySelector('#shops-kicker')
  const title = document.querySelector('#shops-title')
  const lead = document.querySelector('#shops-lead')
  if (student) {
    kicker.textContent = '06 / โหมดโรงเรียน'
    title.innerHTML = 'พลาสติกในโรงเรียน<br><span>ทิ้งให้ถูกจุด</span>'
    lead.textContent = 'คำนวณน้ำหนักที่เก็บได้ และดูแผนที่จุดทิ้งขยะพลาสติกในโรงเรียนสิงห์บุรี (สำหรับครูและนักเรียน)'
  } else {
    kicker.textContent = '06 / หาที่รับซื้อ'
    title.innerHTML = 'ขวดแยกแล้ว<br><span>ขายได้เท่าไร?</span>'
    lead.textContent = 'คำนวณราคาโดยประมาณตามชนิดและน้ำหนัก แล้วหาร้านรับซื้อใกล้คุณ'
  }
  if (student) renderSchoolPoints()
}

function pointMapSrc(p) {
  return `https://maps.google.com/maps?q=${p.lat},${p.lng}(${encodeURIComponent(p.name)})&z=18&hl=th&output=embed`
}

function renderSchoolPoints() {
  const wrap = document.querySelector('#school-points')
  const mapEl = document.querySelector('#school-map')
  if (!wrap || !mapEl) return

  const pts = schoolDropPoints
  if (pts.length && !mapEl.dataset.i) {
    mapEl.src = pointMapSrc(pts[0])
    mapEl.dataset.i = '0'
  }

  wrap.innerHTML = pts.map((p, i) => `
    <article class="school-point${String(i) === mapEl.dataset.i ? ' active' : ''}" data-i="${i}" tabindex="0" role="button">
      <h4><span class="sp-num">${i + 1}</span> ${p.name}</h4>
      <p class="school-accepts">รับ: ${p.accepts}</p>
      ${p.note ? `<p class="school-note">${p.note}</p>` : ''}
    </article>
  `).join('')

  const showPoint = (index) => {
    const p = pts[index]
    if (!p) return
    mapEl.src = pointMapSrc(p)
    mapEl.dataset.i = String(index)
    wrap.querySelectorAll('.school-point').forEach((el) => el.classList.toggle('active', el.dataset.i === String(index)))
    mapEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  wrap.querySelectorAll('.school-point').forEach((card) => {
    const act = () => showPoint(Number(card.dataset.i))
    card.addEventListener('click', act)
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); act() }
    })
  })
}

function updateAuthUI() {
  if (currentUser) {
    authBtn.textContent = `👤 ${currentUser.name}`
    authBtn.dataset.view = 'profile'
  } else {
    authBtn.textContent = 'เข้าสู่ระบบ'
    authBtn.dataset.view = 'auth'
  }
  const adminNav = document.querySelector('#admin-nav')
  if (adminNav) adminNav.hidden = !currentUser?.isAdmin
  applyStudentMode()
}

async function fetchMe() {
  try {
    const response = await fetch('/api/auth/me')
    currentUser = response.ok ? (await response.json()).user : null
  } catch {
    currentUser = null
  }
  updateAuthUI()
}

document.querySelectorAll('.auth-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    authMode = tab.dataset.mode
    document.querySelectorAll('.auth-tab').forEach((t) => t.classList.toggle('active', t === tab))
    authNameField.hidden = authMode !== 'register'
    authSchoolField.hidden = authMode !== 'register'
    authForm.name.required = authMode === 'register'
    authForm.password.autocomplete = authMode === 'register' ? 'new-password' : 'current-password'
    authSubmit.textContent = authMode === 'register' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'
    authError.textContent = ''
  })
})

authForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  authError.textContent = ''
  authSubmit.disabled = true
  const payload = { email: authForm.email.value.trim(), password: authForm.password.value }
  if (authMode === 'register') {
    payload.name = authForm.name.value.trim()
    payload.school = authForm.school.checked ? 'singburi' : ''
  }
  try {
    const response = await fetch(`/api/auth/${authMode === 'register' ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'ทำรายการไม่สำเร็จ')
    currentUser = data.user
    authForm.reset()
    updateAuthUI()
    renderProfile()
    showPage('profile')
  } catch (error) {
    authError.textContent = error.message
  } finally {
    authSubmit.disabled = false
  }
})

function renderProfile() {
  if (!currentUser) return
  const initials = currentUser.name.trim().slice(0, 2).toUpperCase()
  const joined = new Date(currentUser.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
  const history = loadHistory()
  const typeCounts = {}
  history.forEach((item) => { typeCounts[item.type] = (typeCounts[item.type] || 0) + 1 })
  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]

  profileCard.innerHTML = `
    <div class="profile-head">
      <div class="profile-avatar">${initials}</div>
      <div>
        <h2>${currentUser.name}</h2>
        <p>${currentUser.email}</p>
        <small>สมาชิกตั้งแต่ ${joined}</small>
        ${isStudent() ? '<div class="profile-badge"><img src="/public/singburi-school.png" alt=""> โรงเรียนสิงห์บุรี</div>' : ''}
      </div>
    </div>

    <div class="profile-stats">
      <div><strong>${history.length}</strong><span>ครั้งที่สแกน</span></div>
      <div><strong>${topType ? topType[0] : '—'}</strong><span>ชนิดที่เจอบ่อย</span></div>
    </div>

    <div class="profile-form">
      <h3>โหมดโรงเรียนสิงห์บุรี (ครู / นักเรียน)</h3>
      <p class="profile-hint">${isStudent()
        ? 'เปิดอยู่ — หน้า "จุดทิ้งในโรงเรียน" จะแสดงแผนที่จุดทิ้งขยะพลาสติกในโรงเรียนแทนร้านรับซื้อ'
        : 'ปิดอยู่ — เปิดเพื่อดูแผนที่จุดทิ้งขยะพลาสติกในโรงเรียนสิงห์บุรี'}</p>
      <button class="button${isStudent() ? ' school-toggle-on' : ''}" id="profile-school-toggle" type="button">${isStudent() ? 'ปิดโหมดโรงเรียน' : 'เปิดโหมดโรงเรียน'}</button>
      <p class="profile-msg" id="profile-school-msg"></p>
    </div>

    <form class="profile-form" id="profile-name-form">
      <h3>ชื่อที่แสดง</h3>
      <div class="profile-row">
        <input name="name" type="text" value="${currentUser.name}" required>
        <button class="button" type="submit">บันทึก</button>
      </div>
      <p class="profile-msg" id="profile-name-msg"></p>
    </form>

    <form class="profile-form" id="profile-pwd-form">
      <h3>เปลี่ยนรหัสผ่าน</h3>
      <input name="currentPassword" type="password" placeholder="รหัสผ่านเดิม" autocomplete="current-password" required>
      <input name="newPassword" type="password" placeholder="รหัสผ่านใหม่ (อย่างน้อย 8 ตัว)" autocomplete="new-password" minlength="8" required>
      <button class="button" type="submit">เปลี่ยนรหัสผ่าน</button>
      <p class="profile-msg" id="profile-pwd-msg"></p>
    </form>

    ${currentUser.isAdmin ? '<button class="button profile-admin-link" id="profile-admin" type="button">🛠 เปิดหน้าหลังบ้าน (แอดมิน)</button>' : ''}
    <button class="profile-logout" id="profile-logout" type="button">ออกจากระบบ</button>
  `

  document.querySelector('#profile-admin')?.addEventListener('click', () => showPage('admin'))

  document.querySelector('#profile-school-toggle').addEventListener('click', async (event) => {
    const msg = document.querySelector('#profile-school-msg')
    event.target.disabled = true
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ school: isStudent() ? '' : 'singburi' })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      currentUser = data.user
      updateAuthUI()
      renderProfile()
    } catch (error) {
      msg.textContent = error.message
      msg.className = 'profile-msg bad'
      event.target.disabled = false
    }
  })

  document.querySelector('#profile-name-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const msg = document.querySelector('#profile-name-msg')
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: event.target.name.value.trim() })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      currentUser = data.user
      updateAuthUI()
      renderProfile()
    } catch (error) {
      msg.textContent = error.message
      msg.className = 'profile-msg bad'
    }
  })

  document.querySelector('#profile-pwd-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const msg = document.querySelector('#profile-pwd-msg')
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: event.target.currentPassword.value,
          newPassword: event.target.newPassword.value
        })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      event.target.reset()
      msg.textContent = 'เปลี่ยนรหัสผ่านเรียบร้อย'
      msg.className = 'profile-msg ok'
    } catch (error) {
      msg.textContent = error.message
      msg.className = 'profile-msg bad'
    }
  })

  document.querySelector('#profile-logout').addEventListener('click', async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}
    currentUser = null
    updateAuthUI()
    showPage('home')
  })
}

async function renderAdmin() {
  const body = document.querySelector('#admin-body')
  body.innerHTML = '<p class="admin-empty">กำลังโหลด...</p>'
  try {
    const response = await fetch('/api/admin/stats')
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'โหลดข้อมูลไม่สำเร็จ')
    const maxType = Math.max(1, ...data.byType.map(([, n]) => n))
    const dt = (iso) => new Date(iso).toLocaleString('th-TH', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

    body.innerHTML = `
      <div class="admin-tiles">
        <div><strong>${data.totalScans}</strong><span>สแกนทั้งหมด</span></div>
        <div><strong>${data.scansToday}</strong><span>สแกนวันนี้</span></div>
        <div><strong>${data.plasticFound}</strong><span>เจอพลาสติก</span></div>
        <div><strong>${data.notPlastic}</strong><span>ไม่ใช่พลาสติก</span></div>
        <div><strong>${data.totalUsers}</strong><span>สมาชิก</span></div>
        <div><strong>${data.avgConfidence}%</strong><span>ความมั่นใจเฉลี่ย</span></div>
      </div>

      <div class="admin-block">
        <h3>แยกตามชนิดที่เจอ</h3>
        ${data.byType.length
          ? data.byType.map(([type, n]) => `
            <div class="admin-bar-row">
              <span>${type}</span>
              <div class="admin-bar"><i style="width:${Math.round((n / maxType) * 100)}%"></i></div>
              <b>${n}</b>
            </div>
          `).join('')
          : '<p class="admin-empty">ยังไม่มีข้อมูลการสแกน</p>'}
      </div>

      <div class="admin-block">
        <h3>ผู้ใช้ที่สแกนมากสุด</h3>
        ${data.topUsers.length
          ? `<table class="admin-table"><tbody>${data.topUsers.map(([u, n]) => `<tr><td>${u}</td><td>${n} ครั้ง</td></tr>`).join('')}</tbody></table>`
          : '<p class="admin-empty">—</p>'}
      </div>

      <div class="admin-block">
        <h3>สแกนล่าสุด</h3>
        ${data.recent.length
          ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>เวลา</th><th>ผล</th><th>มั่นใจ</th><th>ผู้ใช้</th></tr></thead><tbody>${data.recent.map((r) => `<tr><td>${dt(r.at)}</td><td>${r.type}</td><td>${r.confidence}%</td><td>${r.user}</td></tr>`).join('')}</tbody></table></div>`
          : '<p class="admin-empty">ยังไม่มีการสแกน</p>'}
      </div>
    `
  } catch (error) {
    body.innerHTML = `<p class="admin-empty">${error.message}</p>`
  }
}

fetchMe()

const footerBrand = document.querySelector('footer .brand')
if (footerBrand) {
  footerBrand.innerHTML = '<img src="/public/plas-logo.png" alt="Plas logo"><span>PLAS</span>'
}
