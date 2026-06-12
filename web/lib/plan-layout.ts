/**
 * Single source of truth for the fictional Big Pine Family Campground
 * base plan. Both the rendered SVG (app/plan.svg/route.ts) and the demo
 * site records (lib/demo-data.ts) derive from these constants, so map
 * pads and data pins cannot drift apart.
 *
 * Art direction: an engineering site plan — vellum paper, drafting grid,
 * hairline ink, hatched structures, north arrow, scale bar, title block.
 * Coordinates are SVG pixel space: origin top-left, y increases downward.
 */
import type { Site } from "./types";

export const PLAN_W = 1200;
export const PLAN_H = 800;

const INK = "#44403a";
const INK_LIGHT = "#8a8273";
const PAPER = "#f7f3e8";
const FONT = "'Courier New', Courier, monospace";

interface RowDef {
  area: string;
  startNum: number;
  count: number;
  x: number;
  yStart: number;
  spacing: number;
}

const ROWS: RowDef[] = [
  { area: "Row A", startNum: 1, count: 14, x: 140, yStart: 130, spacing: 38 },
  { area: "Row B", startNum: 15, count: 16, x: 320, yStart: 130, spacing: 38 },
  { area: "Row C", startNum: 31, count: 18, x: 820, yStart: 130, spacing: 34 },
];

const CABINS = [1, 2, 3, 4].map((n, i) => ({
  id: `site-cb${n}`,
  label: `CB${n}`,
  area: "Cabins",
  position: { x: 430 + i * 80, y: 64 },
}));

export function buildSites(): Site[] {
  const sites: Site[] = [];
  for (const row of ROWS) {
    for (let i = 0; i < row.count; i++) {
      const num = row.startNum + i;
      sites.push({
        id: `site-${num}`,
        label: String(num),
        area: row.area,
        position: { x: row.x, y: row.yStart + i * row.spacing },
      });
    }
  }
  return [...sites, ...CABINS];
}

const PAD_W = 56;
const PAD_H = 26;

function padRect(x: number, y: number, label: string): string {
  return (
    `<rect x="${x - PAD_W / 2}" y="${y - PAD_H / 2}" width="${PAD_W}" height="${PAD_H}" ` +
    `fill="#fcf9f1" stroke="${INK}" stroke-width="0.75"/>` +
    `<text x="${x}" y="${y + 4}" font-size="11.5" font-weight="bold" text-anchor="middle" ` +
    `fill="${INK}" font-family="${FONT}">${label}</text>`
  );
}

function building(x: number, y: number, w: number, h: number, label: string): string {
  const text = label
    ? `<text x="${x + w / 2}" y="${y + h + 13}" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="${INK}" font-family="${FONT}">${label.toUpperCase()}</text>`
    : "";
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#hatch)" stroke="${INK}" stroke-width="1.1"/>` +
    text
  );
}

function tree(x: number, y: number): string {
  return (
    `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="${INK_LIGHT}" stroke-width="0.8" stroke-dasharray="3 2.5"/>` +
    `<circle cx="${x}" cy="${y}" r="2" fill="${INK_LIGHT}"/>`
  );
}

function road(x: number, y: number, w: number, h: number): string {
  const center =
    w > h
      ? `<line x1="${x + 6}" y1="${y + h / 2}" x2="${x + w - 6}" y2="${y + h / 2}" stroke="${INK_LIGHT}" stroke-width="0.7" stroke-dasharray="9 7"/>`
      : `<line x1="${x + w / 2}" y1="${y + 6}" x2="${x + w / 2}" y2="${y + h - 6}" stroke="${INK_LIGHT}" stroke-width="0.7" stroke-dasharray="9 7"/>`;
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#efe9d9" stroke="${INK}" stroke-width="0.9"/>` +
    center
  );
}

function rowLabel(x: number, text: string): string {
  return (
    `<text x="${x}" y="112" font-size="12" font-weight="bold" letter-spacing="2" text-anchor="middle" fill="${INK}" font-family="${FONT}">${text.toUpperCase()}</text>` +
    `<line x1="${x - 34}" y1="117" x2="${x + 34}" y2="117" stroke="${INK}" stroke-width="0.75"/>`
  );
}

function northArrow(): string {
  const x = 1126;
  const y = 64;
  return (
    `<circle cx="${x}" cy="${y}" r="24" fill="none" stroke="${INK}" stroke-width="1"/>` +
    `<path d="M ${x} ${y - 18} L ${x + 6} ${y + 10} L ${x} ${y + 4} L ${x - 6} ${y + 10} Z" fill="${INK}"/>` +
    `<text x="${x}" y="${y + 38}" font-size="11" font-weight="bold" text-anchor="middle" fill="${INK}" font-family="${FONT}">N</text>`
  );
}

function scaleBar(): string {
  const x = 40;
  const y = 762;
  const seg = 44;
  return (
    `<rect x="${x}" y="${y}" width="${seg}" height="6" fill="${INK}"/>` +
    `<rect x="${x + seg}" y="${y}" width="${seg}" height="6" fill="none" stroke="${INK}" stroke-width="0.8"/>` +
    `<rect x="${x + seg * 2}" y="${y}" width="${seg}" height="6" fill="${INK}"/>` +
    `<text x="${x}" y="${y - 5}" font-size="8.5" fill="${INK}" font-family="${FONT}" letter-spacing="1">SCALE: FICTIONAL — DO NOT SCALE DRAWING</text>`
  );
}

function titleBlock(): string {
  const x = 856;
  const y = 706;
  const w = 322;
  const line = (dy: number) =>
    `<line x1="${x}" y1="${y + dy}" x2="${x + w}" y2="${y + dy}" stroke="${INK}" stroke-width="0.6"/>`;
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${78}" fill="${PAPER}" stroke="${INK}" stroke-width="1.2"/>` +
    line(24) + line(44) + line(61) +
    `<text x="${x + 10}" y="${y + 17}" font-size="12.5" font-weight="bold" letter-spacing="1.5" fill="${INK}" font-family="${FONT}">BIG PINE FAMILY CAMPGROUND</text>` +
    `<text x="${x + 10}" y="${y + 38}" font-size="9" letter-spacing="1" fill="${INK}" font-family="${FONT}">EMERGENCY UTILITY REFERENCE — SITE PLAN</text>` +
    `<text x="${x + 10}" y="${y + 56}" font-size="9" font-weight="bold" letter-spacing="1" fill="#a16207" font-family="${FONT}">FICTIONAL DEMO DATA — NOT A SURVEY</text>` +
    `<text x="${x + 10}" y="${y + 73}" font-size="8.5" letter-spacing="1" fill="${INK}" font-family="${FONT}">SHEET UB-001 · REV 2026-06-11 · UTILITYBINDER</text>`
  );
}

/** Build the full base-plan SVG document as a string. */
export function makePlanSvg(): string {
  const pads = buildSites()
    .map((s) => padRect(s.position.x, s.position.y, s.label))
    .join("\n");

  const trees = [
    [60, 250], [70, 420], [55, 600], [240, 700], [470, 250], [500, 420],
    [690, 480], [700, 620], [1050, 380], [1100, 500], [960, 90], [260, 80],
    [540, 660], [120, 720],
  ]
    .map(([x, y]) => tree(x, y))
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${PLAN_W} ${PLAN_H}" width="${PLAN_W}" height="${PLAN_H}">
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="${INK}" stroke-width="0.55"/>
    </pattern>
    <pattern id="gridMinor" width="25" height="25" patternUnits="userSpaceOnUse">
      <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e9e3d2" stroke-width="0.5"/>
    </pattern>
    <pattern id="gridMajor" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#ddd5bf" stroke-width="0.7"/>
    </pattern>
  </defs>
  <rect width="${PLAN_W}" height="${PLAN_H}" fill="${PAPER}"/>
  <rect width="${PLAN_W}" height="${PLAN_H}" fill="url(#gridMinor)"/>
  <rect width="${PLAN_W}" height="${PLAN_H}" fill="url(#gridMajor)"/>
  <rect x="10" y="10" width="${PLAN_W - 20}" height="${PLAN_H - 20}" fill="none" stroke="${INK}" stroke-width="1.6"/>
  <rect x="16" y="16" width="${PLAN_W - 32}" height="${PLAN_H - 32}" fill="none" stroke="${INK}" stroke-width="0.5"/>

  <!-- lake -->
  <ellipse cx="1030" cy="150" rx="150" ry="85" fill="#f0efe4" stroke="${INK}" stroke-width="1"/>
  <path d="M 920 150 q 18 -7 36 0 q 18 7 36 0" fill="none" stroke="${INK_LIGHT}" stroke-width="0.8"/>
  <path d="M 1000 178 q 18 -7 36 0 q 18 7 36 0" fill="none" stroke="${INK_LIGHT}" stroke-width="0.8"/>
  <path d="M 1030 120 q 18 -7 36 0" fill="none" stroke="${INK_LIGHT}" stroke-width="0.8"/>
  <text x="1030" y="155" font-size="11" letter-spacing="4" text-anchor="middle" fill="${INK}" font-family="${FONT}">BIG PINE LAKE</text>

  ${trees}

  <!-- roads -->
  ${road(585, 100, 30, 690)}
  ${road(120, 100, 940, 26)}
  ${road(185, 100, 22, 540)}
  ${road(365, 100, 22, 620)}
  ${road(765, 100, 22, 640)}

  <!-- structures -->
  ${building(620, 700, 72, 50, "Office")}
  ${building(570, 350, 72, 50, "Bathhouse")}
  ${building(92, 42, 62, 40, "Well House")}
  ${building(725, 125, 38, 28, "Shed")}
  ${building(410, 36, 44, 30, "")}${building(490, 36, 44, 30, "")}${building(570, 36, 44, 30, "")}${building(650, 36, 44, 30, "")}
  <text x="552" y="28" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="${INK}" font-family="${FONT}">CABINS CB1–CB4</text>

  <!-- septic field -->
  <rect x="930" y="600" width="130" height="78" fill="url(#hatch)" fill-opacity="0.35" stroke="${INK}" stroke-width="0.9" stroke-dasharray="7 4"/>
  <text x="995" y="694" font-size="8.5" letter-spacing="1.5" text-anchor="middle" fill="${INK}" font-family="${FONT}">SEPTIC FIELD</text>

  ${rowLabel(140, "Row A")}
  ${rowLabel(320, "Row B")}
  ${rowLabel(820, "Row C")}

  ${pads}
  ${northArrow()}
  ${scaleBar()}
  ${titleBlock()}
</svg>`;
}
