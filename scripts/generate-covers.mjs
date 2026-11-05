// Builds a cover image for every project that has no "Cover image" set in /admin.
// Vite runs it (see vite.config.ts) when the dev server starts, whenever a content file
// changes while it runs (e.g. after a git pull), and on every build/deploy.
// `npm run covers` runs it by hand.
// Output: public/projects-images/auto/<project id>.svg (git-ignored, regenerated each build).
//
// What goes on a cover:
//   top           icon (the project's "Cover icon", or a default for its type), title, subtitle
//   bottom row    centred, divided by hairlines: the company (projects done at a company), the
//                 client (when a client logo is set), then technology marks: Creatio, Ericsson
//                 (EOC/ECM). See LOGO_STYLE for how they are drawn.
// Logos are embedded as data URIs: an SVG shown through <img> cannot load other files.

import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const contentDir = (name) => join(root, "src", "content", name);
const outDir = join(root, "public", "projects-images", "auto");

/** Every JSON file in a folder; a file that can't be parsed (e.g. half-written mid git pull) is skipped. */
const readJsonDir = (dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => {
      try {
        return [JSON.parse(readFileSync(join(dir, f), "utf8"))];
      } catch {
        console.warn(`  covers: skipped ${f} (not valid JSON yet)`);
        return [];
      }
    });

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** A logo from /public as { uri, w, h }, or null if the file is missing. */
function loadLogo(publicPath) {
  if (!publicPath) return null;
  const file = join(root, "public", publicPath.replace(/^\//, ""));
  let data;
  try {
    data = readFileSync(file);
  } catch {
    console.warn(`  covers: logo not found: ${publicPath}`);
    return null;
  }
  const ext = extname(file).toLowerCase();
  if (ext === ".png") {
    // PNG header: width and height are big-endian at bytes 16 and 20
    return { uri: `data:image/png;base64,${data.toString("base64")}`, w: data.readUInt32BE(16), h: data.readUInt32BE(20) };
  }
  if (ext === ".svg") {
    const box = data.toString("utf8").match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/);
    return { uri: `data:image/svg+xml;base64,${data.toString("base64")}`, w: box ? +box[1] : 1, h: box ? +box[2] : 1 };
  }
  // jpg/webp: no size parsing, assume square; the image stays inside the tile either way
  const mime = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : `image/${ext.slice(1)}`;
  return { uri: `data:${mime};base64,${data.toString("base64")}`, w: 1, h: 1 };
}

// How company, client and technology logos are shown in the bottom row:
//   "drawn": everything drawn into the SVG in one light grey: Ericsson's bars and Creatio's arrow
//            as marks, every other name as a wordmark (works for any new company or client)
//   "mono":  the real logo images, turned grey and lightened for the dark cover
export const LOGO_STYLE = "mono";

const INK = "#cfd6de"; // light grey used for the row
const ROW_Y = 548; // vertical centre of the logo row
const MARK_H = 96; // logo height in the row
const GAP = 76; // space between items (a hairline divider sits in the middle)

// Ericsson's three equal bars rising to the right, in 84x84 units
const ericssonBars = (fill) =>
  [0, 1, 2]
    .map((i) => `<path d="M24 ${33 + i * 15} L60 ${23 + i * 15}" stroke="${fill}" stroke-width="10" stroke-linecap="round"/>`)
    .join("");
// Creatio's arrow mark, in 60x44 units
const creatioArrow = (fill) => `<path d="M0 0 L60 22 L0 44 L13 22 Z" fill="${fill}"/>`;

/** Rough rendered width of bold system-ui text: capitals are wider than lowercase, spaces narrow. */
const textWidth = (text, size) =>
  [...text].reduce((w, c) => w + (c === " " ? 0.28 : /[A-Z0-9]/.test(c) ? 0.68 : 0.56), 0) * size;

/** Row item: { w, draw(x) } where x is the item's left edge and the row is centred on ROW_Y. */
function wordmark(text, size = 46) {
  return {
    w: textWidth(text, size),
    draw: (x) =>
      // centred in its slot, so any error in the width estimate splits evenly on both sides
      `<text x="${(x + textWidth(text, size) / 2).toFixed(1)}" y="${ROW_Y + size * 0.35}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${size}" font-weight="700" fill="${INK}">${esc(text)}</text>`,
  };
}

/** A small mark followed by a wordmark, e.g. Ericsson's bars + "ERICSSON". */
function markAndWord(markSvg, markW, markH, text, size = 40) {
  const s = 60 / markH;
  const gap = 16;
  const word = wordmark(text, size);
  return {
    w: markW * s + gap + word.w,
    draw: (x) => `<g transform="translate(${x} ${ROW_Y - 30}) scale(${s.toFixed(3)})">${markSvg}</g>` + word.draw(x + markW * s + gap),
  };
}

function drawnItem(item) {
  if (item.mark === "ericsson") return markAndWord(ericssonBars(INK), 84, 84, "ERICSSON");
  if (item.mark === "creatio") return markAndWord(creatioArrow(INK), 60, 44, "creatio", 44);
  return wordmark(item.label);
}

function monoItem(item) {
  if (item.mark === "ericsson") {
    const s = MARK_H / 60;
    return {
      w: 60 * s,
      draw: (x) => `<g transform="translate(${x - 18 * s} ${ROW_Y - MARK_H / 2 - 12 * s}) scale(${s.toFixed(3)})">${ericssonBars(INK)}</g>`,
    };
  }
  if (!item.logo) return wordmark(item.label);
  const w = Math.min(220, (item.logo.w / item.logo.h) * MARK_H);
  const h = Math.min(MARK_H, (w / item.logo.w) * item.logo.h);
  return {
    w,
    draw: (x) =>
      `<image href="${item.logo.uri}" x="${x}" y="${(ROW_Y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" filter="url(#mono)"/>`,
  };
}

/** The bottom row: items centred on the cover with hairline dividers between them. */
function logoRow(items, style) {
  const parts = items.map(style === "mono" ? monoItem : drawnItem);
  const total = parts.reduce((sum, p) => sum + p.w, 0) + GAP * (parts.length - 1);
  let x = 600 - total / 2;
  const out = [];
  parts.forEach((p, i) => {
    if (i > 0) out.push(`<path d="M${(x - GAP / 2).toFixed(1)} ${ROW_Y - 30} V${ROW_Y + 30}" stroke="#3a4756" stroke-width="2"/>`);
    out.push(p.draw(x));
    x += p.w + GAP;
  });
  return out.map((l) => `  ${l}`).join("\n");
}

// Greys a logo and lifts it towards white so dark logos still read on the dark cover
const MONO_FILTER = `<filter id="mono" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.5" intercept="0.45"/>
        <feFuncG type="linear" slope="0.5" intercept="0.45"/>
        <feFuncB type="linear" slope="0.5" intercept="0.48"/>
      </feComponentTransfer>
    </filter>`;

/** Technology marks, decided from the project's technologies. */
function techMarks(technologies = []) {
  const t = technologies.join(" ").toLowerCase();
  const marks = [];
  if (t.includes("creatio")) marks.push({ label: "Creatio", mark: "creatio", logo: loadLogo("/logos/creatio.png") });
  if (/\b(eoc|ecm|ericsson)\b/.test(t)) marks.push({ label: "Ericsson", mark: "ericsson" });
  return marks;
}

// Centre icons (stroke-only paths around 0,0). Pick one per project with "Cover icon" in /admin.
const ICONS = {
  pipeline: `<rect x="-205" y="-40" width="110" height="80" rx="14"/><rect x="-55" y="-40" width="110" height="80" rx="14"/><rect x="95" y="-40" width="110" height="80" rx="14"/><path d="M-90 0 H-65 M-75 -10 L-63 0 L-75 10 M60 0 H85 M75 -10 L87 0 L75 10"/>`,
  funnel: `<path d="M-200 -80 H-40 L-95 -5 V60 L-145 80 V-5 Z"/><path d="M-15 0 H55 M40 -15 L58 0 L40 15"/><circle cx="140" cy="0" r="62"/><circle cx="140" cy="0" r="38" opacity="0.6"/>`,
  contract: `<path d="M-80 -120 H40 L95 -65 V120 H-80 Z"/><path d="M40 -120 V-65 H95"/><path d="M-45 -50 H40 M-45 -10 H60"/><path d="M-35 55 L-5 85 L55 25"/>`,
  people: `<circle cx="0" cy="-30" r="32"/><path d="M-60 60 Q0 -5 60 60"/><circle cx="0" cy="0" r="130" stroke-dasharray="40 26" opacity="0.6"/>`,
  workload: `<circle cx="-185" cy="-75" r="14"/><circle cx="-185" cy="-15" r="14"/><circle cx="-185" cy="45" r="14"/><circle cx="-185" cy="105" r="14" opacity="0.6"/><path d="M-140 -75 H100 M-140 -15 H180 M-140 45 H20 M-140 105 H120"/>`,
  capsule: `<g transform="rotate(-30)"><rect x="-160" y="-50" width="320" height="100" rx="50"/><path d="M0 -50 V50"/></g>`,
  code: `<path d="M-90 -70 L-170 0 L-90 70 M90 -70 L170 0 L90 70 M30 -100 L-30 100"/>`,
  dashboard: `<rect x="-170" y="-100" width="340" height="200" rx="16"/><path d="M-170 -50 H170 M-60 -50 V100"/><path d="M-20 60 L30 10 L70 40 L130 -20" opacity="0.7"/>`,
  box: `<path d="M0 -110 L120 -50 V70 L0 130 L-120 70 V-50 Z"/><path d="M-120 -50 L0 10 L120 -50 M0 10 V130"/>`,
  handshake: `<path d="M-180 -20 L-110 -60 L-40 -30 M180 -20 L110 -60 L40 -30"/><path d="M-110 50 L-40 -30 L40 -30 L110 50"/><path d="M-60 20 L0 75 L60 20"/>`,
  building: `<rect x="-110" y="-110" width="220" height="220" rx="10"/><path d="M-60 -60 H-20 M20 -60 H60 M-60 -10 H-20 M20 -10 H60 M-60 40 H-20 M20 40 H60"/><path d="M-20 110 V75 H20 V110"/>`,
};
const DEFAULT_ICON = { personal: "code", client: "handshake", service: "box", company: "building" };

export function renderCover(project, companies, style = LOGO_STYLE) {
  const kind = project.kind ?? "personal";
  const icon = ICONS[project.coverIcon] ?? ICONS[DEFAULT_ICON[kind]] ?? ICONS.code;
  const company = project.company ? companies.get(project.company) : null;
  const subtitle =
    project.coverSubtitle ?? (project.client ? `for ${project.client}` : project.company ? `at ${project.company}` : "");

  // Logos, left to right: company, client, then technology marks
  const logos = [];
  if (project.company) logos.push({ label: project.company, logo: loadLogo(company?.logo) });
  if (project.client && project.logo) logos.push({ label: project.client, logo: loadLogo(project.logo) });
  logos.push(...techMarks(project.technologies));

  // Without logos the title block sits in the middle; with them it moves up to make room for the row
  const hasLogos = logos.length > 0;
  const iconY = hasLogos ? 152 : 215;
  const iconScale = hasLogos ? 0.8 : 1;
  const titleY = hasLogos ? 338 : 400;
  const titleSize = project.title.length > 24 ? (hasLogos ? 52 : 60) : hasLogos ? 62 : 72;
  const row = hasLogos ? logoRow(logos, style) : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${esc(project.title)} cover">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e2a38"/>
      <stop offset="1" stop-color="#0f1620"/>
    </linearGradient>
    ${style === "mono" && hasLogos ? MONO_FILTER : ""}
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
  <g fill="none" stroke="#5ba3d9" stroke-width="${(10 / iconScale).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" transform="translate(600 ${iconY}) scale(${iconScale})">
    ${icon}
  </g>
  <text x="600" y="${titleY}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${titleSize}" font-weight="700" fill="#e6edf5">${esc(project.title)}</text>
  <text x="600" y="${titleY + 48}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="25" fill="#8a97a6">${esc(subtitle)}</text>
${row}
</svg>
`;
}

export function generateCovers() {
  const projects = readJsonDir(contentDir("projects"));
  const companies = new Map(readJsonDir(contentDir("experience")).map((e) => [e.company, e]));

  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  let count = 0;
  for (const project of projects) {
    if (project.image) continue; // a cover uploaded in /admin wins
    writeFileSync(join(outDir, `${project.id}.svg`), renderCover(project, companies));
    count++;
  }
  console.log(`covers: generated ${count} project cover(s) in public/projects-images/auto`);
}

// Run directly: node scripts/generate-covers.mjs
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) generateCovers();
