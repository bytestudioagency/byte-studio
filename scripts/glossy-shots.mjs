// Turns the raw portfolio screenshots into glossy, presentation-style mockups.
//
//   node scripts/glossy-shots.mjs
//
// Reads  public/portfolio/<project>/<n>.png  (the screenshots with the flat browser frame baked in),
// cuts the page out of that frame, and re-composes it on a lit gradient backdrop with a glass browser
// window, layered shadows and a soft sheen. Writes public/portfolio/<project>/<n>.webp (16:10).
// The .png sources are left untouched, so the script can be re-run after tweaking the look.
// Portrait .jpeg/.jpg phone screenshots are framed in a phone instead of a browser window.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../public/portfolio");

// Folder -> accent colour (matches `accent` in src/lib/site.ts) and the label shown in the address bar.
const PROJECTS = {
  "apna-store": { accent: "#c6ff3a", label: "Apna Store" },
  elevate: { accent: "#8fa2ff", label: "Elevate Developers" },
  turant: { accent: "#ff5a6e", label: "Turant News" },
  "stay-finder": { accent: "#ff9a3c", label: "Stayfinder" },
  keanas: { accent: "#ff7ab6", label: "Keanas Clinic" },
  "booking-badhao": { accent: "#a66bff", label: "Booking Badhao" },
};

const W = 2560;
const H = 1600;
const MAX_WIN_W = 2140;
const MAX_WIN_H = 1260;
const PLATE = 26; // glass rim around the window
const BAR = 68; // title bar height
const R = 30; // window corner radius

/* ----------------------------------- colour ---------------------------------- */

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) => "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToRgb([h, s, l]) {
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
}
const shiftHue = (c, deg, sat = 1, light = 1) => {
  const [h, s, l] = rgbToHsl(c);
  return hslToRgb([(h + deg + 360) % 360, Math.min(1, s * sat), Math.min(1, l * light)]);
};

/* ---------------------------------- pieces ----------------------------------- */

const svg = (w, h, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);

function backdrop(accent) {
  const a = hex(accent);
  const [hue] = rgbToHsl(a);
  const base = toHex(hslToRgb([hue, 0.55, 0.06]));
  const mid = toHex(hslToRgb([hue, 0.7, 0.22]));
  const bright = toHex(shiftHue(a, 0, 1.05, 1.02));
  const warm = toHex(hslToRgb([(hue + 42) % 360, 0.85, 0.55]));
  const cool = toHex(hslToRgb([(hue + 320) % 360, 0.75, 0.45]));
  return svg(W, H, `
    <defs>
      <radialGradient id="m" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="${mid}"/><stop offset="1" stop-color="${base}"/></radialGradient>
      <radialGradient id="b1" cx="18%" cy="6%" r="48%"><stop offset="0" stop-color="${bright}" stop-opacity=".9"/><stop offset="1" stop-color="${bright}" stop-opacity="0"/></radialGradient>
      <radialGradient id="b2" cx="92%" cy="96%" r="52%"><stop offset="0" stop-color="${warm}" stop-opacity=".7"/><stop offset="1" stop-color="${warm}" stop-opacity="0"/></radialGradient>
      <radialGradient id="b3" cx="90%" cy="0%" r="42%"><stop offset="0" stop-color="${cool}" stop-opacity=".55"/><stop offset="1" stop-color="${cool}" stop-opacity="0"/></radialGradient>
      <linearGradient id="streak" x1="0" y1="0" x2="1" y2=".62"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".4" stop-color="#fff" stop-opacity=".07"/><stop offset=".44" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".04"/><stop offset=".53" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="16" cy="16" r="1.4" fill="#fff" fill-opacity=".07"/></pattern>
      <radialGradient id="dm" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <mask id="dmask"><rect width="100%" height="100%" fill="url(#dm)"/></mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#m)"/>
    <rect width="100%" height="100%" fill="url(#b1)"/>
    <rect width="100%" height="100%" fill="url(#b2)"/>
    <rect width="100%" height="100%" fill="url(#b3)"/>
    <rect width="100%" height="100%" fill="url(#dots)" mask="url(#dmask)"/>
    <rect width="100%" height="100%" fill="url(#streak)"/>`);
}

async function grain() {
  const px = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const v = 128 + (Math.random() - 0.5) * 90;
    px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
    px[i * 4 + 3] = 20;
  }
  return sharp(px, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

const roundedMask = (w, h, r) => svg(w, h, `<rect width="${w}" height="${h}" rx="${r}" fill="#fff"/>`);

function titleBar(w, label) {
  const pillW = Math.min(620, w * 0.36), pillX = (w - pillW) / 2;
  const light = (cx, c1, c2) => `
    <circle cx="${cx}" cy="${BAR / 2}" r="11" fill="${c1}"/>
    <circle cx="${cx}" cy="${BAR / 2}" r="11" fill="url(#lg)"/>
    <circle cx="${cx}" cy="${BAR / 2}" r="10.5" fill="none" stroke="${c2}" stroke-opacity=".6"/>`;
  return svg(w, BAR, `
    <defs>
      <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34343a"/><stop offset="1" stop-color="#232327"/></linearGradient>
      <radialGradient id="lg" cx="50%" cy="25%" r="60%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${w}" height="${BAR}" fill="url(#bar)"/>
    <rect y="${BAR - 1}" width="${w}" height="1" fill="#000" fill-opacity=".55"/>
    ${light(40, "#ff5f57", "#c0362f")}${light(76, "#febc2e", "#b98a14")}${light(112, "#28c840", "#17902a")}
    <rect x="${pillX}" y="15" width="${pillW}" height="${BAR - 30}" rx="${(BAR - 30) / 2}" fill="#000" fill-opacity=".28" stroke="#fff" stroke-opacity=".07"/>
    <g transform="translate(${w / 2 - label.length * 7.4 - 22} ${BAR / 2 - 9})" fill="none" stroke="#a1a1aa" stroke-width="2">
      <rect x="1" y="7" width="13" height="10" rx="2.5" fill="#a1a1aa" stroke="none"/><path d="M4 7V5a3.5 3.5 0 0 1 7 0v2"/>
    </g>
    <text x="${w / 2 + 10}" y="${BAR / 2 + 7}" text-anchor="middle" font-family="Segoe UI, Inter, Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#d4d4d8" letter-spacing=".2">${label}</text>`);
}

// A frosted glass slab the window sits in, with a bright rim along the top.
function glassPlate(w, h, pad, radius = R) {
  const pw = w + pad * 2, ph = h + pad * 2, r = radius + pad * 0.8;
  return svg(pw, ph, `
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient>
      <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".25" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient>
    </defs>
    <rect width="${pw}" height="${ph}" rx="${r}" fill="url(#fill)"/>
    <rect x="1" y="1" width="${pw - 2}" height="${ph - 2}" rx="${r - 1}" fill="none" stroke="url(#rim)" stroke-width="2"/>`);
}

function windowOverlay(w, h) {
  // Glass edge, top highlight, and a soft sheen that catches the upper-left of the window.
  return svg(w, h, `
    <defs>
      <linearGradient id="sheen" x1="0" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".14"/><stop offset=".22" stop-color="#fff" stop-opacity=".03"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="glare" x1="0" y1="0" x2="1" y2=".55"><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset=".4" stop-color="#fff" stop-opacity=".09"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset=".56" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".12" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#fff" stop-opacity=".08"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${R}" fill="url(#sheen)"/>
    <rect width="${w}" height="${h}" rx="${R}" fill="url(#glare)"/>
    <rect x=".75" y=".75" width="${w - 1.5}" height="${h - 1.5}" rx="${R - 0.75}" fill="none" stroke="url(#edge)" stroke-width="1.5"/>`);
}

async function shadow(w, h, x, y, { blur, dy, opacity, color = "#000", spread = 0, radius = R }) {
  // Drawn on a full-size canvas so the blurred edge can run off the frame.
  const s = await sharp(svg(W, H, `<rect x="${x - spread}" y="${y + dy - spread}" width="${w + spread * 2}" height="${h + spread * 2}" rx="${Math.max(0, radius + spread)}" fill="${color}" fill-opacity="${opacity}"/>`))
    .blur(blur)
    .png()
    .toBuffer();
  return { input: s, left: 0, top: 0 };
}

/* ----------------------------------- crop ------------------------------------ */

// The sources sit in a flat frame: a gradient margin, then a #3a3a3c title bar, then the page.
async function extractPage(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const px = (x, y) => { const i = (y * w + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  const diff = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const midY = h >> 1, midX = w >> 1;
  let L = 0, Rt = w - 1, T = 0, B = h - 1;
  for (let x = 5; x < w / 3; x++) if (diff(px(x, midY), px(5, midY)) > 60) { L = x; break; }
  for (let x = w - 5; x > (w * 2) / 3; x--) if (diff(px(x, midY), px(w - 5, midY)) > 60) { Rt = x; break; }
  for (let y = 5; y < h / 3; y++) if (diff(px(midX, y), px(midX, 5)) > 60) { T = y; break; }
  for (let y = h - 5; y > (h * 2) / 3; y--) if (diff(px(midX, y), px(midX, h - 5)) > 60) { B = y; break; }
  // Title bar ends where the bar colour stops, measured clear of the traffic lights and any centred title.
  const probeX = L + Math.round((Rt - L) * 0.3);
  const bar = px(probeX, T + 8);
  let top = T + 40;
  for (let y = T + 8; y < T + 160; y++) if (diff(px(probeX, y), bar) > 30) { top = y; break; }
  const inset = 2;
  return sharp(file).extract({ left: L + inset, top: top + 1, width: Rt - L - inset * 2, height: B - top - inset - 1 });
}

/* ----------------------------------- build ----------------------------------- */

async function build(file, { accent, label }, noise) {
  const page = await extractPage(file);
  const { width: pw, height: ph } = await page.clone().png().toBuffer().then((b) => sharp(b).metadata());

  // Fit the window: as wide as allowed, then crop the page from the top if it would be too tall.
  let winW = MAX_WIN_W;
  let contentH = Math.round((ph * winW) / pw);
  if (contentH + BAR > MAX_WIN_H) contentH = MAX_WIN_H - BAR;
  const winH = contentH + BAR;
  const x = Math.round((W - winW) / 2);
  const y = Math.round((H - winH) / 2) + 10;

  const content = await page
    .resize({ width: winW })
    .extract({ left: 0, top: 0, width: winW, height: contentH })
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();

  const windowImg = await sharp({ create: { width: winW, height: winH, channels: 4, background: "#18181b" } })
    .composite([
      { input: await sharp(titleBar(winW, label)).png().toBuffer(), left: 0, top: 0 },
      { input: content, left: 0, top: BAR },
      { input: await sharp(windowOverlay(winW, winH)).png().toBuffer(), left: 0, top: 0 },
      { input: roundedMask(winW, winH, R), blend: "dest-in" },
    ])
    .png()
    .toBuffer();

  const glowColor = toHex(shiftHue(hex(accent), 0, 1.1, 1));
  const plate = await sharp(glassPlate(winW, winH, PLATE)).png().toBuffer();
  const layers = [
    await shadow(winW, winH, x, y, { blur: 120, dy: 30, opacity: 0.7, color: glowColor, spread: 10 }),
    await shadow(winW, winH, x, y, { blur: 80, dy: 90, opacity: 0.65, spread: -20 }),
    { input: plate, left: x - PLATE, top: y - PLATE },
    await shadow(winW, winH, x, y, { blur: 10, dy: 8, opacity: 0.5 }),
    { input: windowImg, left: x, top: y },
    { input: noise, left: 0, top: 0, blend: "overlay" },
  ];

  return sharp(backdrop(accent)).composite(layers).webp({ quality: 86, effort: 6 });
}

/* ----------------------------------- phone ----------------------------------- */

const PHONE_H = 1330; // outer height of the phone body
const BEZEL = 20;
const PHONE_R = 92;

function phoneBody(w, h) {
  return svg(w, h, `
    <defs>
      <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset=".5" stop-color="#141416"/><stop offset="1" stop-color="#2a2a2f"/></linearGradient>
      <linearGradient id="rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".2" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${PHONE_R}" fill="url(#body)"/>
    <rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="${PHONE_R - 1.5}" fill="none" stroke="url(#rim)" stroke-width="3"/>`);
}

function screenOverlay(w, h, r) {
  return svg(w, h, `
    <defs>
      <linearGradient id="glare" x1="0" y1="0" x2="1" y2=".7"><stop offset=".3" stop-color="#fff" stop-opacity="0"/><stop offset=".38" stop-color="#fff" stop-opacity=".1"/><stop offset=".5" stop-color="#fff" stop-opacity=".04"/><stop offset=".56" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="url(#glare)"/>`);
}

async function buildPhone(file, { accent }, noise) {
  const meta = await sharp(file).metadata();
  const screenH = PHONE_H - BEZEL * 2;
  const screenW = Math.round((meta.width * screenH) / meta.height);
  const bodyW = screenW + BEZEL * 2;
  const x = Math.round((W - bodyW) / 2);
  const y = Math.round((H - PHONE_H) / 2) + 10;
  const sr = PHONE_R - BEZEL;

  const screen = await sharp(file)
    .resize({ width: screenW, height: screenH, fit: "cover", position: "top" })
    .sharpen({ sigma: 0.5 })
    .composite([
      { input: await sharp(screenOverlay(screenW, screenH, sr)).png().toBuffer(), left: 0, top: 0 },
      { input: roundedMask(screenW, screenH, sr), blend: "dest-in" },
    ])
    .png()
    .toBuffer();

  const phone = await sharp(phoneBody(bodyW, PHONE_H))
    .composite([{ input: screen, left: BEZEL, top: BEZEL }])
    .png()
    .toBuffer();

  const glowColor = toHex(shiftHue(hex(accent), 0, 1.1, 1));
  const plate = await sharp(glassPlate(bodyW, PHONE_H, PLATE, PHONE_R)).png().toBuffer();
  const o = { radius: PHONE_R };
  const layers = [
    await shadow(bodyW, PHONE_H, x, y, { ...o, blur: 120, dy: 30, opacity: 0.7, color: glowColor, spread: 10 }),
    await shadow(bodyW, PHONE_H, x, y, { ...o, blur: 80, dy: 90, opacity: 0.65, spread: -20 }),
    { input: plate, left: x - PLATE, top: y - PLATE },
    await shadow(bodyW, PHONE_H, x, y, { ...o, blur: 10, dy: 8, opacity: 0.5 }),
    { input: phone, left: x, top: y },
    { input: noise, left: 0, top: 0, blend: "overlay" },
  ];

  return sharp(backdrop(accent)).composite(layers).webp({ quality: 86, effort: 6 });
}

const noise = await grain();
for (const [dir, cfg] of Object.entries(PROJECTS)) {
  const folder = path.join(ROOT, dir);
  if (!fs.existsSync(folder)) continue;
  for (const f of fs.readdirSync(folder).filter((n) => /\.(png|jpe?g)$/.test(n))) {
    const src = path.join(folder, f);
    const out = path.join(folder, f.replace(/\.(png|jpe?g)$/, ".webp"));
    const make = /\.jpe?g$/.test(f) ? buildPhone : build;
    await (await make(src, cfg, noise)).toFile(out);
    console.log("wrote", path.relative(process.cwd(), out), Math.round(fs.statSync(out).size / 1024) + "KB");
  }
}
