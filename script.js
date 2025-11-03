// ================= ชื่อผู้เล่น ==================

ให้ playerName = "";

ในขณะที่ (!playerName) {

  playerName = prompt("กรุณาเยี่ยมชมชื่อผู้เล่น:", "ผู้กล้า");

  if (!playerName) alert("ต้องตั้งชื่อก่อนเริ่มเกม!");

-

// ================= สถานะเกม ==================

const state = {

  ทอง: 60,

  แรงม้า: 100,

  แรงม้าสูงสุด: 100,

  บอสระดับ: 1,

  บอสHP: 0,

  บอสแม็กซ์: 0,

  บัฟ: { ดาบ: 0 },

  inFight: เท็จ,

  บันทึก: [],

  เวลาเริ่มต้น: 0

-

// ================== หน้า ==================

const goldEl = document.getElementById('ทอง'),

  hpHeroBar = document.getElementById('hpHeroBar'),

  hpHeroText = document.getElementById('hpHeroText'),

  hpBossBar = document.getElementById('hpBossBar'),

  hpBossText = document.getElementById('hpBossText'),

  buffsEl = document.getElementById('buffs'),

  bossStageEl = document.getElementById('bossStage'),

  logEl = document.getElementById('log'),

  qPanel = document.getElementById('questionPanel'),

  qText = document.getElementById('qText'),

  qChoices = document.getElementById('qChoices'),

  c = document.getElementById('c'),

  ctx = c.getContext('2d'),

  leaderboardEl = document.getElementById('leaderboard');

// ================== ไฟร์เบส ===================

const firebaseConfig = {

  apiKey: "AIzaSyC4a9DrCeSN_HQFIHXWJhnzN4Jn376CdIc",

  authDomain: "hero-4ebbe.firebaseapp.com",

  URL ฐานข้อมูล: "https://hero-4ebbe-default-rtdb.asia-southeast1.firebasedatabase.app",

  รหัสโครงการ: "hero-4ebbe"

  ที่เก็บข้อมูลBucket: "hero-4ebbe.firebasestorage.app",

  การส่งข้อความรหัสผู้ส่ง: "868857385644"

  appId: "1:868857385644:เว็บ:d5366bee7f5d7b11e60509",

  รหัสการวัด: "G-2DE96HJN7Z"

-

firebase.initializeApp (firebaseConfig);

const dbRef = firebase.database().ref('leaderboard');

// ================== ประโยชน์ใช้สอย ==================

ฟังก์ชัน save() {

  goldEl.textContent = state.gold;

  hpHeroBar.style.width = (state.hp / state.maxhp * 100) + '%';

  เนื้อหาข้อความ hpHeroText = `${state.hp} / ${state.maxhp}`;

  hpBossBar.style.width = (state.bossMax ? (state.bossHP / state.bossMax * 100) : 0) + '%';

  เนื้อหาข้อความ hpBossText = `${state.bossHP} / ${state.bossMax}`;

  buffsEl.textContent = state.buffs.sword ? 'ดาบชาร์จ' : 'ไม่มี';

  bossStageEl.textContent = state.bossStage;

  การเรนเดอร์Log();

-

ฟังก์ชัน addLog(t) {

  state.log.unshift(t);

  หาก state.log.length > 50) state.log.pop();

  การเรนเดอร์Log();

-

ฟังก์ชัน renderLog() {

  logEl.innerHTML = state.log.map(s => `<div>${s}</div>`).join('');

-

// ================= คำถาม ==================

const คำถาม = [

  { q: 'งบดุลประกอบด้วย?', ตัวเลือก: [' ตลอดเวลา/ การเรียกเก็บเงิน', 'รายได้/ค่าใช้จ่าย', 'พยาบาล'], a: 0, diff: 'easy' },

  { q: 'ค่าการปรับปรุงสะท้อนแสง?', choices: ['ขาดทุนเงินสด', 'กระจายต้นทุน', 'รายได้'], a: 1, diff: 'medium' },

  { q: 'บัญชีทุนแสดง?', ตัวเลือก: ['สิทธิของเจ้าของ', 'หนี้ภายนอก', 'สินค้า'], a: 0, diff: 'hard' },

  { q: 'รายการค่าใช้จ่ายใดๆ ไม่ใช่จำนวนเงินที่เพิ่มขึ้น?', choices: ['ค่าโฆษณา', 'ค่าดอกเบี้ยเงินกู้', 'เงินเดือนพนักงาน'], a: 1, diff: 'easy' },

  { q: 'ต้นทุนที่แท้จริงคืออะไร?', choices: ['ต้นทุนที่ไม่ตามปริมาณ', 'ต้นทุนต่อหน่วย', 'ต้นทุนค่าใช้จ่ายของร่างกาย'], a: 0, diff: 'medium' }

-

ฟังก์ชัน goldByDiff(d) {

  ถ้า (d === 'ง่าย') กลับ 20;

  ถ้า (d === 'medium') คืนค่า 40;

  กลับ 60;

-

// ================= การวาดภาพบนผ้าใบ ==================

ฟังก์ชัน drawScene(heroShake = 0, bossShake = 0) {

  ctx.clearRect(0, 0, c.width, c.height);

  ctx.fillStyle = '#02101a';

  ctx.fillRect(0, 0, c.width, c.height);

  // วาดฮีโร่

  ctx.บันทึก();

  ctx.translate(120 + (Math.random() - 0.5) * heroShake, 160);

  ctx.fillStyle = '#38bdf8';

  ctx.beginPath();

  ctx.arc(0, 0, 25, 0, คณิตศาสตร์.PI * 2);

  ctx.เติม();

  ctx.fillStyle = '#fff';

  ctx.beginPath();

  ctx.arc(0, -28, 18, 0, คณิตศาสตร์.PI * 2);

  ctx.เติม();

  ctx.fillStyle = '#111';

  ctx.fillRect(-6, -32, 4, 4);

  ctx.fillRect(4, -32, 4, 4);

  ctx.fillStyle = state.buffs.sword ? '#f97316' : '#000';

  ctx.fillRect(15, 0, 20, 4);

  ctx.restore();

  // วาดบอส

  ถ้า (state.inFight || state.bossHP > 0) {

    ctx.บันทึก();

    ctx.translate(480 + (Math.random() - 0.5) * bossShake, 140);

    ctx.fillStyle = '#fb7185';

    ctx.beginPath();

    ctx.ellipse(0, 0, 40, 35, 0, 0, Math.PI * 2);

    ctx.เติม();

    ctx.fillStyle = '#fff';

    ctx.beginPath();

    ctx.arc(0, -30, 25, 0, คณิตศาสตร์.PI * 2);

    ctx.เติม();

    ctx.fillStyle = '#111';

    ctx.fillRect(-10, -36, 6, 6);

    ctx.fillRect(4, -36, 6, 6);

    ctx.fillStyle = '#f00';

    ctx.fillRect(-15, 0, 10, 4);

    ctx.fillRect(5, 0, 10, 4);

    ctx.restore();

  -

-

ฟังก์ชัน animateAttack(ชนิด) {

  ให้ t = 0;

  const timer = setInterval(() => {

    ที++;

    ถ้า (ชนิด === 'ฮีโร่') drawScene(12, 0);

    ถ้า (ชนิด === 'เจ้านาย') drawScene(0, 12);

    ถ้า (t > 8) {

      clearInterval(ตัวจับเวลา);

      วาดฉาก();

    -

  }, 40);

-

// ================= ตรรกะของเกม ==================

ให้ currentQuestion = null;

ฟังก์ชัน newBoss() {

  state.inFight = true;

  state.bossMax = 300 + (state.bossStage * 100);

  state.bossHP = state.bossMax;

  addLog(`🧿 ด่านด่าน ${state.bossStage} ปรากฏขึ้นแล้ว!`);

  state.timeStart = Date.now();

  บันทึก();

  วาดฉาก();

  แสดงคำถาม();

-

ฟังก์ชัน showQuestion() {

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  qPanel.style.display = 'บล็อก';

  qText.textContent = `[${currentQuestion.diff}] ${currentQuestion.q}`;

  qChoices.innerHTML = currentQuestion.choices.map((c, i) =>

    `<div><label><input type=radio name=ans value=${i}> ${c}</label></div>`).join('');

-

// ================= กิจกรรม ==================

document.getElementById('answerBtn').onclick = () => {

  const sel = [...document.getElementsByName('ans')].find(r => r.checked);

  if (!sel) return alert("เลือกคำตอบก่อน!");

  const idx = Number(sel.value);

  qPanel.style.display = 'ไม่มี';

  ถ้า (idx === currentQuestion.a) {

    const dmg = state.buffs.sword ? 25 : 10;

    state.bossHP = Math.max(0, state.bossHP - dmg);

    state.gold += goldByDiff(คำถามปัจจุบัน.diff);

    addLog(`ตอบถูก! เป็นจุดบอส -${dmg}`);

    state.buffs.sword = 0;

    animateAttack('ฮีโร่');

    ถ้า state.bossHP <= 0) กลับเป็น victory();

  } อื่น {

    state.hp = Math.max(0, state.hp - 20);

    addLog("ตอบผิด! บอสเน้น -20");

    animateAttack('บอส');

    หาก state.hp <= 0 ให้คืนค่า gameOver()

  -

  บันทึก();

  setTimeout(แสดงคำถาม, 600);

-

document.getElementById('skipBtn').onclick = () => {

  qPanel.style.display = 'ไม่มี';

  state.hp = Math.max(0, state.hp - 20);

  addLog("ข้ามคำถาม! -20 HP");

  animateAttack('บอส');

  หาก state.hp <= 0 ให้คืนค่า gameOver()

  บันทึก();

  setTimeout(แสดงคำถาม, 600);

-

document.querySelectorAll('[data-item]').forEach(b => b.onclick = () => {

  const it = b.dataset.item;

  ถ้า (มัน === 'ยา') {

    if (state.gold < 30) return addLog('ทองไม่พอ!');

    สถานะ.ทอง -= 30;

    state.hp = Math.min(state.maxhp, state.hp + 50);

    addLog('ยา +50 HP');

  -

  ถ้า (มัน === 'ดาบ') {

    if (state.gold < 80) return addLog('ทองไม่พอ!');

    สถานะ.ทอง -= 80;

    state.buffs.sword = 1;

    addLog('ซื้อดาบคริสตัล! ใช้ได้ 1 ระยะไกล');

  -

  บันทึก();

-

// ================= ชัยชนะ / จบเกม ===================

ฟังก์ชั่น victory() {

  addLog('🎉 ชนะบอส! 🎉');

  document.getElementById('victory').style.display = 'flex';

  state.inFight = false;

  const elapsed = Math.round((Date.now() - state.timeStart) / 1000);

  dbRef.push({ ชื่อ: ชื่อผู้เล่น, เวลา: ผ่านไป, ทอง: state.gold });

  fetchLeaderboard();

  รัฐ.เวทีเจ้านาย++;

  setTimeout(() => { document.getElementById('victory').style.display = 'none'; }, 2000);

  บันทึก();

-

ฟังก์ชัน gameOver() {

  addLog('💀 เกมจบแล้ว 💀');

  state.inFight = false;

  alert('Game Over! เริ่มใหม่');

  state.hp = 100;

  state.gold = 60;

  state.bossHP = 0;

  state.bossStage = 1;

  บันทึก();

-

// ================== กระดานผู้นำ ==================

ฟังก์ชัน renderLeaderboard(ข้อมูล) {

  ถ้า (!data || data.length === 0) {

    leaderboardEl.innerHTML = '-';

    กลับ;

  -

  leaderboardEl.innerHTML = data.map((p, i) => `${i + 1}. ${p.name} - ${p.time}s`).join('<br>');

-

ฟังก์ชัน fetchLeaderboard() {

  dbRef.orderByChild('time').limitToFirst(10).once('value', snapshot => {

    const data = snapshot.val();

    ถ้า (!data) คืนค่า renderLeaderboard([]);

    const arr = Object.values(data).sort((a, b) => a.time - b.time);

    renderLeaderboard(arr);

  -

-

// ================== ปุ่ม ==================

document.getElementById('startFight').onclick = () => {

  ถ้า (!state.inFight) newBoss();

-

document.getElementById('endFight').onclick = () => {

  ถ้า (state.inFight) {

    state.inFight = false;

    addLog('ยอมแพ้ 😭');

    บันทึก();

  -

-

// ================== วนซ้ำ ==================

ฟังก์ชันลูป() {

  วาดฉาก();

  requestAnimationFrame(ลูป);

-

ลูป();

บันทึก();

fetchLeaderboard();
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Firebase config ของคุณ

const firebaseConfig = {

  apiKey: "AIzaSyC4a9DrCeSN_HQFIHXWJhnzN4Jn376CdIc",

  authDomain: "hero-4ebbe.firebaseapp.com",

  databaseURL: "https://hero-4ebbe-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "hero-4ebbe",

  storageBucket: "hero-4ebbe.firebasestorage.app",

  messagingSenderId: "868857385644",

  appId: "1:868857385644:web:d5366bee7f5d7b11e60509",

  measurementId: "G-2DE96HJN7Z"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// log function

function log(msg){

  document.getElementById('adminLog').innerHTML += msg + "<br>";

}

// เพิ่มทองผู้เล่น

window.addGold = async function(){

  const player = document.getElementById('adminPlayer').value;

  const gold = parseInt(document.getElementById('adminGold').value);

  if(!player || !gold){ log("กรอกข้อมูลให้ครบ"); return; }

  const playerRef = ref(db, 'players/' + player);

  const snapshot = await get(playerRef);

  let currentGold = snapshot.exists() ? snapshot.val().gold : 0;

  await set(playerRef, { gold: currentGold + gold });

  log(`เพิ่ม ${gold} ทอง ให้ผู้เล่น ${player}`);

}

// รีเซ็ตบอส

window.resetBoss = async function(){

  await set(ref(db,'boss'), { hp:100, stage:1 });

  log("รีเซ็ตบอสเรียบร้อย!");

}

// รีอันดับ leaderboard

window.resetLeaderboard = async function(){

  await set(ref(db,'leaderboard'), {});

  log("รีอันดับ leaderboard เรียบร้อย!");

}