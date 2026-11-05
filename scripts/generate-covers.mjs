// Builds a cover image for every project that has no "Cover image" set in /admin.
// Vite runs it (see vite.config.ts) when the dev server starts, whenever a content file
// changes while it runs (e.g. after a git pull), and on every build/deploy.
// `npm run covers` runs it by hand.
// Output: public/projects-images/auto/<project id>.svg (git-ignored, regenerated each build).
//
// What goes on a cover:
//   centre        icon (the project's "Cover icon", or a default for its type), title, subtitle
//   bottom-left   the company's logo, for projects done at a company
//   top-right     the client's logo, when the project has a client and a client logo
//   bottom-right  technology marks: Creatio, Ericsson (EOC/ECM)
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

const TILE = 84;

/** White rounded tile holding a logo (or a drawing), with a label beside it. */
function badge({ x, y, label, logo, drawing, alignRight = false }) {
  const tileX = alignRight ? x - TILE : x;
  let inner = drawing ? `<g transform="translate(${tileX} ${y})">${drawing}</g>` : "";
  if (logo) {
    const s = Math.min((TILE - 20) / logo.w, (TILE - 20) / logo.h);
    const w = logo.w * s;
    const h = logo.h * s;
    inner = `<image href="${logo.uri}" x="${(tileX + (TILE - w) / 2).toFixed(1)}" y="${(y + (TILE - h) / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/>`;
  }
  const textX = alignRight ? tileX - 18 : tileX + TILE + 18;
  return `  <rect x="${tileX}" y="${y}" width="${TILE}" height="${TILE}" rx="18" fill="#ffffff"/>
  ${inner}
  <text x="${textX}" y="${y + TILE / 2 + 9}" text-anchor="${alignRight ? "end" : "start"}" font-family="system-ui, sans-serif" font-size="26" font-weight="600" fill="#e6edf5">${esc(label)}</text>`;
}

// Ericsson's mark: three equal, left-aligned bars rising gently to the right, drawn inside an 84x84 tile
const ERICSSON_MARK = [0, 1, 2]
  .map((i) => `<path d="M24 ${33 + i * 15} L60 ${23 + i * 15}" stroke="#000000" stroke-width="10" stroke-linecap="round"/>`)
  .join("");

/** Technology marks for the bottom-right corner, decided from the project's technologies. */
function techMarks(technologies = []) {
  const t = technologies.join(" ").toLowerCase();
  const marks = [];
  if (t.includes("creatio")) marks.push({ label: "Creatio", logo: loadLogo("/logos/creatio.png") });
  if (/\b(eoc|ecm|ericsson)\b/.test(t)) marks.push({ label: "Ericsson", drawing: ERICSSON_MARK });
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

function cover(project, companies) {
  const kind = project.kind ?? "personal";
  const icon = ICONS[project.coverIcon] ?? ICONS[DEFAULT_ICON[kind]] ?? ICONS.code;
  const company = project.company ? companies.get(project.company) : null;
  const subtitle =
    project.coverSubtitle ?? (project.client ? `for ${project.client}` : project.company ? `at ${project.company}` : "");
  const titleSize = project.title.length > 24 ? 60 : 72;

  const parts = [];
  if (project.company) parts.push(badge({ x: 48, y: 547, label: project.company, logo: loadLogo(company?.logo) }));
  if (project.client && project.logo) {
    parts.push(badge({ x: 1152, y: 44, label: project.client, logo: loadLogo(project.logo), alignRight: true }));
  }
  // Technology marks line up from the bottom-right corner leftwards
  let right = 1152;
  for (const mark of techMarks(project.technologies)) {
    parts.push(badge({ x: right, y: 547, ...mark, alignRight: true }));
    right -= TILE + 18 + mark.label.length * 15 + 36;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${esc(project.title)} cover">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e2a38"/>
      <stop offset="1" stop-color="#0f1620"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g)"/>
${parts.join("\n")}
  <g fill="none" stroke="#5ba3d9" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" transform="translate(600 215)">
    ${icon}
  </g>
  <text x="600" y="400" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${titleSize}" font-weight="700" fill="#e6edf5">${esc(project.title)}</text>
  <text x="600" y="455" text-anchor="middle" font-family="system-ui, sans-serif" font-size="26" fill="#8a97a6">${esc(subtitle)}</text>
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
    writeFileSync(join(outDir, `${project.id}.svg`), cover(project, companies));
    count++;
  }
  console.log(`covers: generated ${count} project cover(s) in public/projects-images/auto`);
}

// Run directly: node scripts/generate-covers.mjs
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) generateCovers();
