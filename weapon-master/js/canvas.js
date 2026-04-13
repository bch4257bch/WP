// ════════════════════════════════════════
//  CANVAS BACKGROUND
// ════════════════════════════════════════

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particles
const particles = [];
class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : H + 4;
    this.r     = Math.random() * 1.8 + 0.3;
    this.vx    = (Math.random() - 0.5) * 0.4;
    this.vy    = -(Math.random() * 0.45 + 0.15);
    this.life  = 1;
    this.fade  = Math.random() * 0.003 + 0.001;
    this.alpha = Math.random() * 0.45 + 0.08;
    this.blue  = Math.random() > 0.5;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life -= this.fade;
    if (this.life <= 0 || this.y < -8) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.life * 0.65;
    ctx.fillStyle   = this.blue
      ? `rgba(90,180,220,${this.alpha})`
      : `rgba(160,220,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
for (let i = 0; i < 110; i++) particles.push(new Particle());

let shimmerT = 0;
const BUILDINGS = [
  [.02,.55,.06,.2],[.07,.48,.04,.27],[.10,.52,.05,.23],[.16,.44,.07,.31],
  [.22,.50,.04,.25],[.26,.46,.06,.29],[.32,.42,.09,.33],[.40,.50,.05,.25],
  [.44,.47,.04,.28],[.52,.40,.11,.35],[.62,.46,.06,.29],[.68,.52,.04,.23],
  [.72,.44,.08,.31],[.80,.48,.05,.27],[.84,.43,.07,.32],[.90,.50,.04,.25],
  [.93,.47,.06,.28],
];

function renderBg() {
  ctx.fillStyle = '#060e16';
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = 'rgba(28,65,92,.15)';
  ctx.lineWidth = 1;
  const G = 48;
  for (let x = 0; x < W; x += G) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += G) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // Ruins
  ctx.fillStyle = 'rgba(6,14,22,.92)';
  BUILDINGS.forEach(([rx,ry,rw,rh]) => ctx.fillRect(rx*W, ry*H, rw*W, rh*H));
  ctx.fillRect(0, H*.75, W, H*.25);

  // Horizon glow
  const cy = H * .54;
  const g = ctx.createRadialGradient(W/2, cy, 0, W/2, cy, W*.55);
  g.addColorStop(0, 'rgba(18,72,120,.25)');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Shimmer
  shimmerT += .01;
  const sx = (Math.sin(shimmerT) * .3 + .5) * W;
  const sg = ctx.createRadialGradient(sx, H*.3, 0, sx, H*.3, W*.32);
  sg.addColorStop(0, `rgba(55,150,210,${.05 + Math.sin(shimmerT*.7)*.025})`);
  sg.addColorStop(1, 'transparent');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, W, H * .6);

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(renderBg);
}
renderBg();

// ════════════════════════════════════════
//  PIXEL ART PORTRAITS
//  TODO: Aseprite 스프라이트 완성 후 drawPortrait() 함수로 교체
//  교체 방법: assets/portraits/kael.png, lyra.png 파일 추가 후
//  drawMale/drawFemale 대신 이미지 로드 방식으로 변경
// ════════════════════════════════════════

function drawMale(cvs) {
  const c = cvs.getContext('2d');
  const S = 5;
  c.clearRect(0, 0, cvs.width, cvs.height);
  c.imageSmoothingEnabled = false;

  const pixels = [
    // head
    [2,0,'#c8a87a'],[3,0,'#c8a87a'],[4,0,'#c8a87a'],
    [1,1,'#8a9caa'],[2,1,'#c8a87a'],[3,1,'#c8a87a'],[4,1,'#c8a87a'],[5,1,'#8a9caa'],
    [1,2,'#8a9caa'],[2,2,'#c8a87a'],[3,2,'#c8a87a'],[4,2,'#c8a87a'],[5,2,'#8a9caa'],
    [2,3,'#c8a87a'],[3,3,'#c8a87a'],[4,3,'#c8a87a'],
    // neck
    [3,4,'#c8a87a'],
    // body (armor)
    [1,5,'#1a4a6a'],[2,5,'#2a6a9a'],[3,5,'#2a6a9a'],[4,5,'#2a6a9a'],[5,5,'#1a4a6a'],
    [1,6,'#1a4a6a'],[2,6,'#3a8acc'],[3,6,'#3a8acc'],[4,6,'#3a8acc'],[5,6,'#1a4a6a'],
    [0,6,'#0a2a3a'],[6,6,'#0a2a3a'],
    [1,7,'#1a4a6a'],[2,7,'#2a6a9a'],[3,7,'#2a6a9a'],[4,7,'#2a6a9a'],[5,7,'#1a4a6a'],
    [0,7,'#0a2a3a'],[6,7,'#0a2a3a'],
    [1,8,'#1a4a6a'],[2,8,'#2a6a9a'],[3,8,'#2a6a9a'],[4,8,'#2a6a9a'],[5,8,'#1a4a6a'],
    // belt
    [1,9,'#3a5a2a'],[2,9,'#3a5a2a'],[3,9,'#4a7a3a'],[4,9,'#3a5a2a'],[5,9,'#3a5a2a'],
    // legs
    [1,10,'#1a3a5a'],[2,10,'#1a3a5a'],[4,10,'#1a3a5a'],[5,10,'#1a3a5a'],
    [1,11,'#1a3a5a'],[2,11,'#1a3a5a'],[4,11,'#1a3a5a'],[5,11,'#1a3a5a'],
    [1,12,'#0a2a3a'],[2,12,'#1a3a5a'],[4,12,'#1a3a5a'],[5,12,'#0a2a3a'],
    [2,13,'#1a2a3a'],[3,13,'#0a0a0a'],[4,13,'#1a2a3a'],
    [2,14,'#1a2a3a'],[4,14,'#1a2a3a'],
    [1,15,'#1a2a3a'],[2,15,'#1a2a3a'],[4,15,'#1a2a3a'],[5,15,'#1a2a3a'],
    // boots
    [1,16,'#0a1a28'],[2,16,'#0a1a28'],[4,16,'#0a1a28'],[5,16,'#0a1a28'],
    [0,17,'#0a1a28'],[1,17,'#0a1a28'],[2,17,'#0a1a28'],[4,17,'#0a1a28'],[5,17,'#0a1a28'],[6,17,'#0a1a28'],
  ];

  pixels.forEach(([col, row, color]) => {
    c.fillStyle = color;
    c.fillRect(col * S + 4, row * S + 2, S, S);
  });
}

function drawFemale(cvs) {
  const c = cvs.getContext('2d');
  const S = 5;
  c.clearRect(0, 0, cvs.width, cvs.height);
  c.imageSmoothingEnabled = false;

  const pixels = [
    // hair
    [2,0,'#2a1a0a'],[3,0,'#3a2a0a'],[4,0,'#2a1a0a'],
    [1,1,'#3a2a0a'],[2,1,'#3a2a0a'],[3,1,'#3a2a0a'],[4,1,'#3a2a0a'],[5,1,'#3a2a0a'],
    // head
    [1,2,'#3a2a0a'],[2,2,'#d4a87a'],[3,2,'#d4a87a'],[4,2,'#d4a87a'],[5,2,'#3a2a0a'],
    [1,3,'#3a2a0a'],[2,3,'#d4a87a'],[3,3,'#d4a87a'],[4,3,'#d4a87a'],[5,3,'#3a2a0a'],
    [2,4,'#d4a87a'],[3,4,'#d4a87a'],[4,4,'#d4a87a'],
    // neck
    [3,5,'#d4a87a'],
    // outfit (teal/purple)
    [2,6,'#1a6a6a'],[3,6,'#2a8a8a'],[4,6,'#1a6a6a'],
    [1,7,'#1a4a5a'],[2,7,'#2a8a8a'],[3,7,'#2a8a8a'],[4,7,'#2a8a8a'],[5,7,'#1a4a5a'],
    [1,8,'#1a4a5a'],[2,8,'#2a8a8a'],[3,8,'#3a9a9a'],[4,8,'#2a8a8a'],[5,8,'#1a4a5a'],
    [1,9,'#1a4a5a'],[2,9,'#2a8a8a'],[3,9,'#2a8a8a'],[4,9,'#2a8a8a'],[5,9,'#1a4a5a'],
    // skirt
    [1,10,'#1a3a4a'],[2,10,'#1a5a6a'],[3,10,'#2a7a7a'],[4,10,'#1a5a6a'],[5,10,'#1a3a4a'],
    [1,11,'#1a3a4a'],[2,11,'#1a4a5a'],[3,11,'#1a6a6a'],[4,11,'#1a4a5a'],[5,11,'#1a3a4a'],
    // legs
    [2,12,'#c8986a'],[4,12,'#c8986a'],
    [2,13,'#c8986a'],[4,13,'#c8986a'],
    // boots
    [2,14,'#2a1a0a'],[3,14,'#0a0a0a'],[4,14,'#2a1a0a'],
    [1,15,'#2a1a0a'],[2,15,'#2a1a0a'],[4,15,'#2a1a0a'],[5,15,'#2a1a0a'],
    [1,16,'#1a0a0a'],[2,16,'#1a0a0a'],[4,16,'#1a0a0a'],[5,16,'#1a0a0a'],
    // scarf detail
    [2,5,'#4a2a5a'],[4,5,'#4a2a5a'],
  ];

  pixels.forEach(([col, row, color]) => {
    c.fillStyle = color;
    c.fillRect(col * S + 4, row * S + 2, S, S);
  });
}
