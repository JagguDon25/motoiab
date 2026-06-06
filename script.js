/* ── Cursor ── */
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
function animCursor(){
  cur.style.left = mx+'px'; cur.style.top = my+'px';
  rx += (mx-rx)*0.14; ry += (my-ry)*0.14;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('button, .photo-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.style.transform='translate(-50%,-50%) scale(2.5)'; });
  el.addEventListener('mouseleave',()=>{ cur.style.transform='translate(-50%,-50%) scale(1)'; });
});

/* ── Particles ── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, stars=[];
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize(); window.addEventListener('resize', resize);
for(let i=0;i<180;i++) stars.push({
  x:Math.random()*9999, y:Math.random()*9999,
  r:Math.random()*1.4+0.3,
  speed:Math.random()*0.3+0.1,
  op:Math.random()
});
let tick=0;
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  tick+=0.008;
  stars.forEach(s=>{
    let op = 0.3 + 0.5*Math.sin(tick*s.speed*10 + s.op*10);
    ctx.beginPath();
    ctx.arc(s.x%W, s.y%H, s.r, 0, Math.PI*2);
    ctx.fillStyle=`rgba(251,113,133,${op})`;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── NO button ── */
const noBtn = document.getElementById('btn-no');
const noTexts = ["Arey nahi! 😅","Pakka? 🤨","Dobara soch 😂","Haha, nope! 😎","Kyun!! 🥺","Ulta jawaab dede 😏","Acha theek hai 😂","Pakka no? 🙈"];
let noCount=0;
noBtn.addEventListener('mouseover', ()=>{
  noBtn.style.left = Math.random()*78+'vw';
  noBtn.style.top  = Math.random()*78+'vh';
  noBtn.innerText  = noTexts[noCount%noTexts.length]; noCount++;
});
noBtn.addEventListener('click', ()=>{
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
});

/* ── Scroll to letter ── */
function scrollToLetter(){
  document.getElementById('letter').scrollIntoView({behavior:'smooth'});
  spawnHearts(document.getElementById('btn-yes'));
}

/* ── Floating hearts on click ── */
document.addEventListener('click', e=>{
  for(let i=0;i<4;i++) spawnHeart(e.clientX, e.clientY);
});
function spawnHearts(el){
  const r = el.getBoundingClientRect();
  for(let i=0;i<12;i++) spawnHeart(r.left+r.width/2, r.top+r.height/2);
}
function spawnHeart(x,y){
  const h = document.createElement('div');
  h.className='float-heart';
  h.textContent = ['💖','💕','🌸','✨','💗','🌷'][Math.floor(Math.random()*6)];
  h.style.left = (x+Math.random()*60-30)+'px';
  h.style.top  = (y+Math.random()*20-10)+'px';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 2500);
}

/* ── Typewriter ── */
const msg = `Thank you for being one of the most special people in my life.

From random conversations to absolutely chaotic memories — you've made everything so much more fun and full of life.

You are not just "Motu." You are not just "Amma Ji."

You are the friend who stayed. The one who makes ordinary moments feel like something worth remembering forever.

No matter where life takes us, no matter how far the roads go — these moments, these laughs, this bond... it lives on.

I'm so grateful the universe decided we'd end up as best friends.

Happy Best Friends Day! 🌸❤️`;

let idx=0;
const typeEl = document.getElementById('type-text');
const typeCur = document.getElementById('type-cursor');
const sign = document.getElementById('sign');

// Wait until letter is visible
const observer = new IntersectionObserver((entries)=>{
  if(entries[0].isIntersecting && idx===0) typeWriter();
},{threshold:0.3});
observer.observe(document.getElementById('letter'));

function typeWriter(){
  if(idx < msg.length){
    typeEl.textContent += msg.charAt(idx);
    idx++;
    setTimeout(typeWriter, idx < 10 ? 80 : 28);
  } else {
    typeCur.style.display='none';
    sign.style.opacity='1';
  }
}

/* ── Gallery scroll reveal ── */
const cards = document.querySelectorAll('.photo-card');
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), i*120);
      revealObs.unobserve(e.target);
    }
  });
},{threshold:0.1});
cards.forEach(c=>revealObs.observe(c));

/* ── Lightbox ── */
function openLightbox(src){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLightbox(); });
