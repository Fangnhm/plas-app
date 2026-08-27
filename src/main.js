const plastics = [
  { id: 'PET', code: '01', name: 'พอลิเอทิลีนเทเรฟทาเลต', example: 'ขวดน้ำดื่ม, ขวดน้ำอัดลม', trait: 'ใส แข็งแรง น้ำหนักเบา', use: 'ขวดบรรจุเครื่องดื่ม', recycle: 'เส้นใยโพลีเอสเตอร์, ขวดใหม่', density: '1.38', melt: '250–260°C', chemistry: 'สายโซ่เชิงเส้น มีหมู่เอสเทอร์', color: 'mint' },
  { id: 'HDPE', code: '02', name: 'พอลิเอทิลีนความหนาแน่นสูง', example: 'ขวดแชมพู, แกลลอน', trait: 'ขุ่น เหนียว ทนแรงกระแทก', use: 'ขวดสารเคมี, ภาชนะ', recycle: 'ถังขยะ, ท่อ, ขวดใหม่', density: '0.94–0.97', melt: '130°C', chemistry: 'สายโซ่เชิงเส้น แตกแขนงน้อย', color: 'blue' },
  { id: 'PP', code: '05', name: 'พอลิโพรพิลีน', example: 'กล่องอาหาร, ฝาขวด', trait: 'เบา ทนความร้อนสูง', use: 'ภาชนะอาหาร, ชิ้นส่วนรถยนต์', recycle: 'กล่อง, เฟอร์นิเจอร์, อุปกรณ์', density: '0.90–0.91', melt: '160–165°C', chemistry: 'สายโซ่มีหมู่เมทิลเป็นแขนง', color: 'yellow' },
  { id: 'LDPE', code: '04', name: 'พอลิเอทิลีนความหนาแน่นต่ำ', example: 'ถุงพลาสติก, ฟิล์มห่ออาหาร', trait: 'นิ่ม ยืดหยุ่น โปร่งแสง', use: 'ถุงหูหิ้ว, ฟิล์ม', recycle: 'ถุงขยะ, แผ่นพลาสติก', density: '0.91–0.94', melt: '105–115°C', chemistry: 'สายโซ่แตกแขนงมาก ยืดหยุ่น', color: 'orange' }
]
const steps = [
  ['01', 'ขยะพลาสติก', 'รวบรวมพลาสติกจากชุมชนและส่งต่อเข้าสู่ระบบ'], ['02', 'คัดแยกเบื้องต้น', 'แยกเศษอาหาร โลหะ กระดาษ และสิ่งปนเปื้อนออก'], ['03', 'ตรวจชนิดพอลิเมอร์', 'สังเกตรหัสรีไซเคิลและสมบัติเพื่อจัดกลุ่มให้ถูกต้อง'], ['04', 'บด • ล้าง • ทำให้แห้ง', 'ลดขนาด ล้างคราบ และกำจัดความชื้นก่อนแปรรูป'], ['05', 'หลอมและขึ้นรูป', 'ใช้ความร้อนเปลี่ยนเกล็ดพลาสติกเป็นวัสดุใหม่'], ['06', 'ผลิตภัณฑ์ใหม่', 'วัสดุรีไซเคิลกลับเข้าสู่วงจรการใช้งานอีกครั้ง']
]
const questions = [
  ['ขวดน้ำดื่มทั่วไปมักทำจากพลาสติกชนิดใด?', ['PET', 'HDPE', 'PP', 'LDPE'], 0, 'PET มีความใส แข็งแรง และเหมาะกับการบรรจุเครื่องดื่ม'],
  ['รหัสรีไซเคิลของกล่องอาหารและฝาขวดคืออะไร?', ['01', '02', '04', '05'], 3, 'PP หรือพอลิโพรพิลีน มีรหัสรีไซเคิล 05'],
  ['พลาสติกชนิดใดมีความหนาแน่นต่ำที่สุดโดยประมาณ?', ['PET', 'HDPE', 'PP', 'LDPE'], 2, 'PP มีความหนาแน่นประมาณ 0.90–0.91 g/cm³'],
  ['ขั้นตอนใดช่วยกำจัดคราบสกปรกก่อนการหลอม?', ['บด', 'ล้าง', 'คัดแยก', 'ขึ้นรูป'], 1, 'การล้างช่วยลดสิ่งปนเปื้อนในวัสดุรีไซเคิล'],
  ['เหตุใดจึงต้องแยกพลาสติกตามชนิดพอลิเมอร์?', ['ให้สีสวย', 'ลดน้ำหนัก', 'จุดหลอมเหลวต่างกัน', 'เพิ่มความนิ่ม'], 2, 'พอลิเมอร์แต่ละชนิดมีจุดหลอมเหลวและสมบัติต่างกัน']
]

document.querySelector('#app').innerHTML = `
<header class="topbar"><button class="brand" data-view="home"><img src="/public/plas-logo.png" alt="Plas logo"><span class="brand-copy"><b>PLAS</b><small>SCAN. IDENTIFY. RECYCLE.</small></span></button><nav><button data-view="home">หน้าแรก</button><button data-view="story">ที่มา</button><button data-view="scanner">AI Scanner</button><button data-view="system">ระบบทำงาน</button><button data-view="materials">พลาสติก</button><button data-view="chemistry">เคมีพอลิเมอร์</button><button data-view="outputs">ผลิตภัณฑ์ใหม่</button><button data-view="quiz">Quiz</button></nav><button class="nav-cta scanner-link" data-view="scanner"><span>✦</span> AI SCANNER</button><button class="menu" aria-label="เปิดเมนู">☰</button></header>
<main id="top">
<section class="hero"><div><small class="eyebrow">● PLAS / SCIENCE FOR EVERYONE</small><h1>แยกพลาสติก<br><em>ให้ถูกต้อง</em><br>ตั้งแต่ต้นทาง</h1><p class="lede">แพลตฟอร์มเรียนรู้และทดลองคัดแยกขยะ<br>ด้วยความเข้าใจเรื่องพอลิเมอร์</p><div class="actions"><button class="button" data-view="scanner">ลองใช้ AI Scanner ↗</button><button class="link" data-view="system">ดูแพลตฟอร์มของเรา ↓</button></div><div class="stats"><strong>4</strong><span>กลุ่มพลาสติก<br><i>PET · HDPE · PP · LDPE</i></span><strong>1</strong><span>เป้าหมาย<br><i>ขยะกลับมามีคุณค่า</i></span></div></div><div class="hero-art"><div class="photo"><img src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1100&q=85" alt="ขวดพลาสติกสำหรับรีไซเคิล"><label>● จากขยะสู่ทรัพยากร <b>→</b></label></div><div class="tag tag-a">PLAS<br><b>PROJECT</b></div><div class="tag tag-b">01<br><small>PET</small></div></div></section>
<div class="ticker"><span>PLASTIC WASTE</span><b>✳</b><span>POLYMER SCIENCE</span><b>✳</b><span>CIRCULAR FUTURE</span><b>✳</b><span>PLASTIC WASTE</span></div>
<section class="scanner section" id="scanner"><div class="scanner-heading"><div><small class="kicker">01 / AI PLASTIC SCANNER</small><h2>ถ่ายรูปพลาสติก<br><span>รู้ชนิดในไม่กี่คลิก</span></h2></div><p>อัปโหลดภาพเพื่อประเมินประเภทพลาสติกเบื้องต้น ระบบจะดูรูปร่าง ความใส และลักษณะของบรรจุภัณฑ์</p></div><div class="scanner-layout"><div class="upload-panel"><input id="image-input" type="file" accept="image/png,image/jpeg,image/jpg" hidden><label class="drop-zone" for="image-input" id="drop-zone"><div class="upload-icon">↑</div><strong>ลากรูปภาพมาวางที่นี่</strong><span>หรือคลิกเพื่อเลือกไฟล์</span><small>รองรับ JPG, JPEG และ PNG</small></label><div class="scanner-actions"><label class="camera-button" for="camera-input">ถ่ายภาพพลาสติก</label><input id="camera-input" type="file" accept="image/*" capture="environment" hidden><button id="analyze-button" class="analyze-button" disabled>วิเคราะห์ประเภทพลาสติก <span>→</span></button></div><div class="preview-wrap" id="preview-wrap"><img id="preview-image" alt="ภาพพลาสติกที่อัปโหลด"><button id="remove-image" type="button">ลบภาพ ×</button></div></div><div class="result-panel" id="result-panel"><div class="result-empty"><span>✦</span><strong>AI DETECTED</strong><p>อัปโหลดภาพ แล้วกดวิเคราะห์<br>เพื่อดูผลการจำแนก</p></div></div></div><div class="scanner-disclaimer">ⓘ การจำแนกจากภาพเป็นการประเมินเบื้องต้น ไม่สามารถรับประกันชนิดพอลิเมอร์ได้ 100% ควรตรวจสอบรหัสรีไซเคิลบนผลิตภัณฑ์ทุกครั้ง</div><div class="history" id="history"><div><small class="kicker">SCAN HISTORY</small><h3>ประวัติการสแกน</h3></div><p id="history-empty">ยังไม่มีประวัติการสแกน</p><div id="history-list"></div></div></section>
<section class="section story" id="story"><small class="kicker">02 / ที่มาและปัญหา</small><div class="two-col"><div><h2>ขยะชิ้นหนึ่ง<br>มี <span>อนาคต</span> ซ่อนอยู่</h2><p>ในชุมชนของเรา ขยะพลาสติกหลายชนิดถูกทิ้งรวมกัน พลาสติกที่ยังมีมูลค่าจึงถูกส่งไปฝังกลบหรือเผา ทั้งที่สามารถกลับมาเป็นวัสดุใหม่ได้</p><p>โครงงานนี้ใช้ความรู้เรื่อง <b>โครงสร้างและสมบัติของพอลิเมอร์</b> เป็นตัวช่วยคัดแยกตั้งแต่ต้นทาง</p></div><div class="problems"><article><b>01</b><div><h3>ทิ้งรวมกัน</h3><p>พลาสติกต่างชนิดปะปนกับขยะอื่น ทำให้คัดแยกได้ยาก</p></div></article><article><b>02</b><div><h3>สูญเสียมูลค่า</h3><p>วัสดุที่นำกลับมาใช้ใหม่ได้ถูกกำจัดไปพร้อมขยะทั่วไป</p></div></article><article><b>03</b><div><h3>กระทบสิ่งแวดล้อม</h3><p>การฝังกลบและเผาอาจสร้างผลกระทบต่อดิน อากาศ และชุมชน</p></div></article></div></div></section>
<section class="section" id="system"><small class="kicker">02 / ระบบการทำงาน</small><div class="section-head"><h2>จากถุงหนึ่งใบ<br>สู่ <span>วงจรใหม่</span></h2><p>คลิกแต่ละขั้นตอนเพื่อดูว่าเกิดอะไรขึ้นในระบบ</p></div><div class="steps">${steps.map((s,i)=>`<button class="step ${i===0?'active':''}" data-step="${i}"><small>${s[0]}</small><b>${['◌','⌁','◈','▦','≈','↗'][i]}</b><strong>${s[1]}</strong><span>${s[2]}</span></button>`).join('')}</div><div class="step-detail"><b>01</b><div><small>กำลังทำความเข้าใจ</small><h3>${steps[0][1]}</h3><p>${steps[0][2]}</p></div><i>→</i></div></section>
<section class="section materials"><small class="kicker">03 / ฐานข้อมูลวัสดุ</small><div class="section-head"><h2>รู้จักพลาสติก<br><span>ก่อนแยก</span></h2><p>คลิกการ์ดเพื่อดูข้อมูลการใช้งานและการรีไซเคิล</p></div><div class="cards">${plastics.map(p=>`<button class="plastic ${p.color}" data-plastic="${p.id}"><div class="card-top">♻ ${p.code}<b>↗</b></div><div class="orb">${p.code}</div><h3>${p.id}</h3><p>${p.name}</p><hr><small>ตัวอย่าง</small><strong>${p.example}</strong></button>`).join('')}</div></section>
<section class="section dark" id="chemistry"><small class="kicker">04 / เคมีของการคัดแยก</small><div class="chem-intro"><h2>โครงสร้าง<br>สร้าง <span>สมบัติ</span></h2><div><p>พอลิเมอร์คือโมเลกุลขนาดใหญ่ที่เกิดจากหน่วยเล็ก ๆ ต่อกันเป็นสายโซ่ ความยาว รูปร่าง และการจัดเรียงของสายโซ่ ทำให้พลาสติกแต่ละชนิดมีสมบัติไม่เหมือนกัน</p><small>*ค่าจุดหลอมเหลวและความหนาแน่นเป็นค่าโดยประมาณ อาจเปลี่ยนตามเกรดและสารเติมแต่ง</small></div></div><div class="table-scroll"><table><thead><tr><th>สมบัติ</th>${plastics.map(p=>`<th>${p.id}</th>`).join('')}</tr></thead><tbody><tr><td>โครงสร้าง</td>${plastics.map(p=>`<td>${p.chemistry}</td>`).join('')}</tr><tr><td>ความหนาแน่น (g/cm³)</td>${plastics.map(p=>`<td><b>${p.density}</b></td>`).join('')}</tr><tr><td>จุดหลอมเหลว</td>${plastics.map(p=>`<td><b>${p.melt}</b></td>`).join('')}</tr><tr><td>สมบัติเด่น</td>${plastics.map(p=>`<td>${p.trait}</td>`).join('')}</tr><tr><td>นำไปใช้</td>${plastics.map(p=>`<td>${p.use}</td>`).join('')}</tr></tbody></table></div></section>
<section class="section outputs"><small class="kicker">05 / ผลลัพธ์ของวงจร</small><div class="two-col"><div><h2>เมื่อเรา<br><span>ไม่ทิ้งโอกาส</span></h2><p>การแยกที่ถูกต้องทำให้วัสดุกลับเข้าสู่กระบวนการผลิต และกลายเป็นสิ่งของที่มีประโยชน์ได้อีกครั้ง</p></div><div class="products"><article class="product big"><small>01</small><h3>เส้นใย<br>โพลีเอสเตอร์</h3><b>จาก PET</b></article><article class="product blue"><small>02</small><h3>ภาชนะ<br>พลาสติก</h3><b>จาก HDPE / PP</b></article><article class="product orange"><small>03</small><h3>แผ่นวัสดุ<br>ขึ้นรูป</h3><b>จาก LDPE</b></article></div></div></section>
<section class="section quiz" id="quiz"><small class="kicker">06 / ทดสอบความเข้าใจ</small><div class="quiz-head"><h2>คุณแยกได้<br><span>ถูกชนิดไหม?</span></h2><p>คำถาม <b id="qnum">1</b> / ${questions.length}<i><em id="progress"></em></i></p></div><div class="quiz-box"><div><small>คำถามที่ <b id="qindex">1</b></small><h3 id="question"></h3><div class="answers" id="answers"></div><p class="feedback" id="feedback"></p></div><aside><strong>?</strong><b>ทดสอบความรู้<br>เรื่องพอลิเมอร์</b><button class="button" id="next">ถัดไป →</button></aside></div></section></main><footer><a class="brand" href="#top"><img src="/public/plas-logo.png" alt="Plas logo"><span class="brand-copy"><b>PLAS</b><small>SCAN. IDENTIFY. RECYCLE.</small></span></a><span>โครงงานวิทยาศาสตร์เพื่อการจัดการขยะอย่างยั่งยืน</span><small>© 2025 PLAS PROJECT</small></footer><dialog id="dialog"><button id="close">×</button><div id="dialog-body"></div></dialog>`

document.querySelectorAll('.step').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.step').forEach(item=>item.classList.remove('active')); button.classList.add('active'); const s=steps[button.dataset.step]; document.querySelector('.step-detail').innerHTML=`<b>${s[0]}</b><div><small>กำลังทำความเข้าใจ</small><h3>${s[1]}</h3><p>${s[2]}</p></div><i>→</i>` }))
const dialog=document.querySelector('#dialog'); document.querySelectorAll('.plastic').forEach(card=>card.addEventListener('click',()=>{const p=plastics.find(item=>item.id===card.dataset.plastic); document.querySelector('#dialog-body').innerHTML=`<small>♻ รหัสรีไซเคิล ${p.code}</small><h2>${p.id}</h2><p>${p.name}</p><dl><dt>ลักษณะทั่วไป</dt><dd>${p.trait}</dd><dt>การใช้งาน</dt><dd>${p.use}</dd><dt>รีไซเคิลเป็น</dt><dd>${p.recycle}</dd></dl><small>*ข้อมูลเป็นค่าโดยประมาณ ควรตรวจสอบรหัสบนผลิตภัณฑ์ก่อนคัดแยก</small>`; dialog.showModal()})); document.querySelector('#close').onclick=()=>dialog.close()
let index=0,score=0,answered=false; const render=()=>{const q=questions[index]; answered=false; document.querySelector('#question').textContent=q[0]; document.querySelector('#answers').innerHTML=q[1].map((a,i)=>`<button data-i="${i}"><b>${String.fromCharCode(65+i)}</b>${a}</button>`).join(''); document.querySelector('#feedback').textContent=''; document.querySelector('#qnum').textContent=index+1; document.querySelector('#qindex').textContent=index+1; document.querySelector('#progress').style.width=`${(index+1)/questions.length*100}%`; document.querySelectorAll('.answers button').forEach(button=>button.onclick=()=>{if(answered)return; answered=true; const right=+button.dataset.i===q[2]; if(right)score++; button.classList.add(right?'correct':'wrong'); if(!right)document.querySelector(`[data-i="${q[2]}"]`).classList.add('correct'); const f=document.querySelector('#feedback'); f.textContent=(right?'ถูกต้อง! ':'ยังไม่ใช่: ')+q[3]; f.className=`feedback ${right?'good':'bad'}`})}; render(); document.querySelector('#next').onclick=()=>{if(!answered){document.querySelector('#feedback').textContent='ลองเลือกคำตอบก่อนนะ';return} if(index===questions.length-1){document.querySelector('#question').textContent=`คุณได้ ${score} / ${questions.length} คะแนน`; document.querySelector('#answers').innerHTML=`<p class="result">${score>=4?'ยอดเยี่ยม! คุณเข้าใจหลักการคัดแยกแล้ว':'ทำได้ดี! ลองทบทวนตารางพอลิเมอร์อีกครั้งนะ'}</p>`; document.querySelector('#next').textContent='ทำอีกครั้ง ↻'; document.querySelector('#next').onclick=()=>{index=0;score=0;document.querySelector('#next').onclick=null;render()};return} index++;render()}
document.querySelector('.menu').onclick=()=>document.querySelector('nav').classList.toggle('open')

const pageGroups = {
  home: ['.hero', '.ticker'],
  story: ['.story'],
  scanner: ['.scanner'],
  system: ['#system'],
  materials: ['.materials'],
  chemistry: ['#chemistry'],
  outputs: ['.outputs'],
  quiz: ['#quiz']
}
const allPageSections = ['.hero', '.ticker', '.scanner', '.story', '#system', '.materials', '#chemistry', '.outputs', '#quiz']
function showPage(page) {
  allPageSections.forEach(selector => document.querySelector(selector)?.classList.toggle('page-hidden', !pageGroups[page].includes(selector)))
  document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('active', button.dataset.view === page))
  document.querySelector('nav').classList.remove('open')
  document.querySelector('.menu').setAttribute('aria-expanded', 'false')
  if (window.location.hash !== `#${page}` && page !== 'home') history.replaceState(null, '', `#${page}`)
  if (page === 'home' && window.location.hash) history.replaceState(null, '', window.location.pathname)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const menuButton = document.querySelector('.menu')
const navigation = document.querySelector('nav')
menuButton.setAttribute('aria-expanded', 'false')
menuButton.onclick = () => {
  const open = navigation.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(open))
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navigation.classList.remove('open')
    menuButton.setAttribute('aria-expanded', 'false')
  }
})
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.view)))
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const page = { '#top': 'home', '#system': 'system', '#chemistry': 'chemistry' }[link.getAttribute('href')]
  if (page) { event.preventDefault(); showPage(page) }
}))
const hashPages = { '#story': 'story', '#scanner': 'scanner', '#system': 'system', '#materials': 'materials', '#chemistry': 'chemistry', '#outputs': 'outputs', '#quiz': 'quiz' }
showPage(hashPages[window.location.hash] || 'home')

const imageInput = document.querySelector('#image-input')
const cameraInput = document.querySelector('#camera-input')
const dropZone = document.querySelector('#drop-zone')
const previewWrap = document.querySelector('#preview-wrap')
const previewImage = document.querySelector('#preview-image')
const analyzeButton = document.querySelector('#analyze-button')
const resultPanel = document.querySelector('#result-panel')
const historyList = document.querySelector('#history-list')
let selectedImage = null

function selectImage(file) {
  if (!file || !file.type.startsWith('image/')) return
  selectedImage = file
  previewImage.src = URL.createObjectURL(file)
  previewWrap.classList.add('visible')
  dropZone.classList.add('has-preview')
  analyzeButton.disabled = false
  resultPanel.innerHTML = '<div class="result-empty"><span>✓</span><strong>IMAGE READY</strong><p>ภาพพร้อมแล้ว กดปุ่มวิเคราะห์<br>เพื่อประเมินประเภทพลาสติก</p></div>'
}

imageInput.addEventListener('change', event => selectImage(event.target.files[0]))
cameraInput.addEventListener('change', event => selectImage(event.target.files[0]))
dropZone.addEventListener('dragover', event => { event.preventDefault(); dropZone.classList.add('dragging') })
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragging'))
dropZone.addEventListener('drop', event => { event.preventDefault(); dropZone.classList.remove('dragging'); selectImage(event.dataTransfer.files[0]) })
document.querySelector('#remove-image').addEventListener('click', () => { selectedImage = null; previewWrap.classList.remove('visible'); dropZone.classList.remove('has-preview'); analyzeButton.disabled = true; imageInput.value = ''; resultPanel.innerHTML = '<div class="result-empty"><span>✦</span><strong>AI DETECTED</strong><p>อัปโหลดภาพ แล้วกดวิเคราะห์<br>เพื่อดูผลการจำแนก</p></div>' })

function renderHistory() {
  const items = JSON.parse(localStorage.getItem('plas-scan-history') || '[]')
  historyList.innerHTML = items.length ? items.map(item => `<div class="history-item"><span>${item.time}</span><b>${item.type}</b><strong>${item.confidence}%</strong></div>`).join('') : '<p>ยังไม่มีประวัติการสแกน</p>'
}

analyzeButton.addEventListener('click', () => {
  if (!selectedImage) return
  analyzeButton.disabled = true
  resultPanel.innerHTML = '<div class="analyzing"><span class="scan-line"></span><strong>ANALYZING...</strong><p>Scanning polymer structure<br>Identifying plastic type...</p></div>'
  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: reader.result }) })
      const responseText = await response.text()
      let result
      try { result = JSON.parse(responseText) } catch { throw new Error('Backend ยังไม่ทำงาน กรุณาปิดเซิร์ฟเวอร์เดิม แล้วรัน: npm run server') }
      if (!response.ok) throw new Error(result.error || (response.status === 429 ? 'โควตา OpenAI หมด กรุณาตรวจสอบ Plan และ Billing' : 'ไม่สามารถวิเคราะห์ภาพได้'))
      const type = result.plastic_type || 'UNKNOWN'
      const confidence = Math.round(Number(result.confidence || 0) * 100)
      resultPanel.innerHTML = `<div class="result-card"><small>AI DETECTED</small><h3>${type}</h3><p>${result.polymer_name || 'Unknown polymer'}</p><div class="result-code">RECYCLING CODE <b>${result.recycling_code ?? '—'}</b><span>${confidence}%<small>CONFIDENCE</small></span></div><dl><dt>ตัวอย่างผลิตภัณฑ์</dt><dd>${result.examples || 'ไม่สามารถระบุได้'}</dd><dt>สมบัติเด่น</dt><dd>${result.trait || 'ไม่สามารถระบุได้'}</dd><dt>คำแนะนำ</dt><dd>${result.recommendation || 'ตรวจสอบรหัสรีไซเคิลบนผลิตภัณฑ์ก่อนคัดแยก'}</dd></dl><div class="why"><b>ทำไมระบบจึงจัดเป็น ${type}?</b><p>${result.reason || 'ไม่มีเหตุผลเพิ่มเติมจากโมเดล'}</p></div></div>`
      const items = JSON.parse(localStorage.getItem('plas-scan-history') || '[]')
      items.unshift({ type, confidence, time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) })
      localStorage.setItem('plas-scan-history', JSON.stringify(items.slice(0, 5)))
      renderHistory()
    } catch (error) {
      resultPanel.innerHTML = `<div class="result-empty"><span>!</span><strong>SCAN ERROR</strong><p>${error.message}</p></div>`
    } finally {
      analyzeButton.disabled = false
    }
  }
  reader.readAsDataURL(selectedImage)
})
renderHistory()
document.querySelector('footer .brand').innerHTML = '<img src="/public/plas-logo.png" alt="Plas logo"><span>PLAS</span>'
