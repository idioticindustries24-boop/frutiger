import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const romsDir = path.join(__dirname, '../roms');
const coversDir = path.join(romsDir, 'covers');

if (!fs.existsSync(coversDir)) fs.mkdirSync(coversDir, { recursive: true });

const extToCore = {nes:'nes', smc:'snes', sfc:'snes', snes:'snes', gba:'gba', gb:'gb', gbc:'gbc', gen:'segaMD', md:'segaMD', bin:'segaMD', n64:'n64', z64:'n64', nds:'nds'};
const coreToColors = {
  nes: {c1:'#ff9a9a', c2:'#ff3b3b', label:'NES', text:'#ff2a2a'},
  snes: {c1:'#b8a6ff', c2:'#6a3bff', label:'SNES', text:'#6a3bff'},
  gba: {c1:'#a0e7ff', c2:'#0078ff', label:'GBA', text:'#0096ff'},
  gb: {c1:'#c8ffc8', c2:'#2ecc71', label:'GB', text:'#2ecc71'},
  gbc: {c1:'#ffe6a0', c2:'#ff9a00', label:'GBC', text:'#ff9a00'},
  segaMD: {c1:'#a0a0ff', c2:'#2a2aff', label:'GEN', text:'#2a2aff'},
  n64: {c1:'#ffb0e0', c2:'#ff00a0', label:'N64', text:'#ff00a0'},
  nds: {c1:'#c8ffb0', c2:'#00c853', label:'NDS', text:'#00c853'},
};

const args = process.argv.slice(2);
const doAutoCovers = args.includes('--auto-covers') || args.includes('-a');

function escapeXml(str){
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function generateSvgCover(name, core){
  const colors = coreToColors[core] || coreToColors.gba;
  const W=400, H=560;
  const lines = [];
  // word wrap approx 16 chars
  const words = name.split(' ');
  let cur='';
  for(const w of words){
    const test = cur ? cur+' '+w : w;
    if(test.length > 18 && cur){ lines.push(cur); cur=w; } else cur=test;
  }
  if(cur) lines.push(cur);
  if(lines.length>3){ lines.length=3; lines[2]=lines[2].slice(0,16)+'...'; }

  const titleY = 260;
  const titleTspans = lines.map((l,i)=>`<tspan x="${W/2}" dy="${i===0?0:38}">${escapeXml(l.toUpperCase())}</tspan>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.c1}"/>
      <stop offset="100%" stop-color="${colors.c2}"/>
    </linearGradient>
    <radialGradient id="light" cx="0.5" cy="0.3" r="0.8">
      <stop offset="0%" stop-color="white" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bubble" cx="0.3" cy="0.25" r="0.8">
      <stop offset="0%" stop-color="white" stop-opacity="0.95"/>
      <stop offset="0.25" stop-color="white" stop-opacity="0.6"/>
      <stop offset="0.6" stop-color="white" stop-opacity="0.2"/>
      <stop offset="1" stop-color="white" stop-opacity="0.05"/>
    </radialGradient>
    <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8ff9a"/>
      <stop offset="100%" stop-color="#4caf50"/>
    </linearGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" rx="18" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" rx="18" fill="url(#light)"/>
  <!-- bubbles -->
  <circle cx="90" cy="120" r="42" fill="url(#bubble)" stroke="white" stroke-opacity="0.7" stroke-width="1.2"/>
  <ellipse cx="75" cy="102" rx="14" ry="8" fill="white" opacity="0.85" transform="rotate(-20 75 102)"/>
  <circle cx="320" cy="180" r="56" fill="url(#bubble)" stroke="white" stroke-opacity="0.7" stroke-width="1.2"/>
  <ellipse cx="300" cy="158" rx="18" ry="10" fill="white" opacity="0.85" transform="rotate(-18 300 158)"/>
  <circle cx="200" cy="100" r="28" fill="url(#bubble)" stroke="white" stroke-opacity="0.6" stroke-width="1"/>
  <circle cx="70" cy="320" r="22" fill="url(#bubble)" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
  <!-- water splash -->
  <path d="M -20 240 C 80 200, 160 300, 320 240 L 320 280 C 160 340, 80 250, -20 300 Z" fill="white" opacity="0.32"/>
  <!-- grass -->
  <rect x="0" y="${H-90}" width="${W}" height="90" fill="url(#grass)"/>
  <!-- daisies -->
  <g>
    <g transform="translate(60 ${H-30})">
      <ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(0)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(72)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(144)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(216)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(288)"/>
      <circle r="7" fill="#ffcc00"/><circle r="2.5" cx="1" cy="1" fill="#ff9900"/>
    </g>
    <g transform="translate(200 ${H-32})">
      <ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(0)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(72)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(144)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(216)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(288)"/>
      <circle r="7" fill="#ffcc00"/><circle r="2.5" cx="1" cy="1" fill="#ff9900"/>
    </g>
    <g transform="translate(340 ${H-28})">
      <ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(0)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(72)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(144)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(216)"/><ellipse cx="0" cy="-6" rx="9" ry="5.5" fill="white" transform="rotate(288)"/>
      <circle r="7" fill="#ffcc00"/><circle r="2.5" cx="1" cy="1" fill="#ff9900"/>
    </g>
  </g>
  <!-- badge -->
  <rect x="14" y="14" width="86" height="28" rx="14" fill="white" opacity="0.94"/>
  <text x="26" y="32" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="${colors.text}">${colors.label} • AUTO</text>
  <!-- title -->
  <text x="${W/2}" y="${titleY}" font-family="Quicksand, Nunito, sans-serif" font-weight="800" font-size="28" fill="white" text-anchor="middle" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.28));">
    ${titleTspans}
  </text>
  <!-- top gloss -->
  <rect width="${W}" height="${H*0.5}" rx="18" fill="url(#gloss)"/>
</svg>`;
}

const files = fs.readdirSync(romsDir).filter(f => {
  const ext = f.split('.').pop().toLowerCase();
  return Object.keys(extToCore).includes(ext);
});

const manifestPath = path.join(romsDir, 'manifest.json');
let existingManifest = [];
if (fs.existsSync(manifestPath)) {
  try { existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch {}
}

const existingByFile = new Map(existingManifest.map(m => [m.file, m]));

const manifest = files.map((file, i) => {
  const fullPath = path.join(romsDir, file);
  const stat = fs.statSync(fullPath);
  const ext = file.split('.').pop().toLowerCase();
  const name = file.replace(/\.[^.]+$/, '');
  const core = extToCore[ext] || 'nes';

  // find existing cover
  let cover = null;
  const existing = existingByFile.get('roms/' + file);
  if (existing && existing.cover) {
    cover = existing.cover;
  } else {
    const coverCandidates = [
      path.join(coversDir, name + '.jpg'),
      path.join(coversDir, name + '.png'),
      path.join(coversDir, name + '.webp'),
      path.join(coversDir, name + '.svg'),
      path.join(coversDir, file + '.jpg'),
    ];
    for (const c of coverCandidates) {
      if (fs.existsSync(c)) {
        cover = path.relative(path.join(__dirname, '..'), c).replace(/\\/g, '/');
        break;
      }
    }
  }

  // auto cover generation
  if (doAutoCovers && !cover) {
    const safeName = name.replace(/[^a-z0-9 _-]/gi, '').trim() || 'game';
    const coverFileName = `Auto - ${safeName}.svg`;
    const coverPath = path.join(coversDir, coverFileName);
    if (!fs.existsSync(coverPath)) {
      const svg = generateSvgCover(name, core);
      fs.writeFileSync(coverPath, svg);
      console.log(`  ✨ Auto cover: ${coverFileName}`);
    }
    cover = 'roms/covers/' + coverFileName;
  }

  return {
    id: (existing?.id) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + i,
    name,
    file: 'roms/' + file,
    cover,
    ext,
    core,
    size: stat.size,
    added: existing?.added || stat.mtimeMs
  };
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\n✅ Generated manifest with ${manifest.length} games -> roms/manifest.json`);
if (!doAutoCovers) {
  console.log(`   Tip: Run with --auto-covers to generate Frutiger Aero covers for games without covers`);
  console.log(`   > node tools/generate-manifest.js --auto-covers`);
} else {
  console.log(`   Auto covers saved in roms/covers/ as SVG (Frutiger Aero style)`);
}
