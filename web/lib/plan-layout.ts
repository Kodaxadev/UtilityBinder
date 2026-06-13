/**
 * Coordinate model for the fictional Big Pine demo map.
 *
 * The illustrated base (/public/maps/big-pine-base-v1.webp) is treated as
 * terrain. Each site is a data-drawn "pad chip": a small rounded rectangle
 * carrying the site number, rotated (`angle`, CSS degrees) and laid out in
 * even rows along the grassy lanes so chips never collide and every site is
 * numbered in a logical walk order. Chips are placed on grass/road, clear of
 * the lake (upper right) and the central tree island.
 *
 * `angle` is demo-presentation only — not part of the persisted schema (see
 * docs/spec/data-model.md §5). Coordinates are plan-pixel space: origin
 * top-left, y increases downward.
 */
import type { Site } from "./types";

export const PLAN_W = 1200;
export const PLAN_H = 800;

/** [number, planX, planY, angleDeg] — listed in logical (walk) order. */
type SiteSeed = readonly [number, number, number, number];

// North arc — across the top, left to right.
const NORTH: SiteSeed[] = [
  [1, 240, 150, 32],
  [2, 288, 130, 26],
  [3, 336, 114, 16],
  [4, 384, 104, 6],
  [5, 432, 100, -4],
  [6, 480, 103, -14],
  [7, 528, 112, -22],
  [8, 574, 126, -30],
  [9, 620, 144, -38],
];

// West outer — down the left edge.
const WEST_OUTER: SiteSeed[] = [
  [10, 150, 190, 68],
  [11, 130, 238, 84],
  [12, 126, 286, 88],
  [13, 120, 348, 78],
  [14, 158, 378, 66],
  [15, 196, 410, 50],
];

// West inner — the parallel inner lane of the west loop.
const WEST_INNER: SiteSeed[] = [
  [16, 225, 215, 58],
  [17, 230, 262, 62],
  [18, 240, 306, 60],
  [19, 252, 355, 54],
  [20, 292, 398, 42],
];

// North-center — the short run above the central island.
const NORTH_CENTER: SiteSeed[] = [
  [21, 330, 180, 52],
  [22, 348, 224, 56],
];

// East ridge — the long diagonal climbing toward the lake side.
const EAST_RIDGE: SiteSeed[] = [
  [23, 448, 182, 54],
  [24, 486, 218, 55],
  [25, 524, 254, 56],
  [26, 562, 290, 57],
  [27, 600, 326, 58],
  [28, 638, 362, 58],
  [29, 676, 398, 58],
  [30, 712, 434, 58],
];

// East ridge upper — the parallel diagonal nearer the lake.
const EAST_RIDGE_2: SiteSeed[] = [
  [31, 560, 168, 55],
  [32, 598, 200, 57],
  [33, 632, 232, 58],
  [34, 666, 264, 58],
  [35, 702, 296, 58],
];

// East row — facing the lake, below the water.
const EAST_ROW: SiteSeed[] = [
  [36, 806, 268, 58],
  [37, 826, 314, 56],
  [38, 856, 352, 52],
  [39, 906, 362, 48],
  [40, 958, 366, 46],
  [41, 1006, 372, 44],
];

// South upper — the upper side of the bottom road.
const SOUTH_UPPER: SiteSeed[] = [
  [42, 330, 460, 40],
  [43, 384, 452, 30],
  [44, 442, 448, 20],
  [45, 522, 446, 8],
  [46, 602, 452, 0],
  [47, 674, 464, -10],
  [48, 742, 478, -18],
];

// South lower — the lower side of the bottom road.
const SOUTH_LOWER: SiteSeed[] = [
  [49, 300, 562, 52],
  [50, 354, 586, 42],
  [51, 414, 594, 32],
  [52, 474, 586, 24],
  [53, 552, 582, 16],
  [54, 630, 580, 10],
  [55, 704, 576, 8],
  [56, 778, 572, 6],
  [57, 850, 566, 4],
  [58, 920, 560, 2],
];

const ALL_SEEDS: { area: string; seeds: SiteSeed[] }[] = [
  { area: "North Loop", seeds: NORTH },
  { area: "West Loop", seeds: WEST_OUTER },
  { area: "West Loop", seeds: WEST_INNER },
  { area: "Center", seeds: NORTH_CENTER },
  { area: "East Ridge", seeds: EAST_RIDGE },
  { area: "East Ridge", seeds: EAST_RIDGE_2 },
  { area: "East Row", seeds: EAST_ROW },
  { area: "South Rows", seeds: SOUTH_UPPER },
  { area: "South Rows", seeds: SOUTH_LOWER },
];

// Cabins — the four cabin buildings (square, untilted).
const CABINS: { id: string; label: string; area: string; x: number; y: number }[] = [
  { id: "site-cb1", label: "CB1", area: "Cabins", x: 556, y: 80 },
  { id: "site-cb2", label: "CB2", area: "Cabins", x: 268, y: 100 },
  { id: "site-cb3", label: "CB3", area: "Cabins", x: 206, y: 458 },
  { id: "site-cb4", label: "CB4", area: "Cabins", x: 470, y: 624 },
];

export function buildSites(): Site[] {
  const sites: Site[] = [];
  for (const { area, seeds } of ALL_SEEDS) {
    for (const [num, x, y] of seeds) {
      sites.push({ id: `site-${num}`, label: String(num), area, position: { x, y } });
    }
  }
  for (const c of CABINS) {
    sites.push({ id: c.id, label: c.label, area: c.area, position: { x: c.x, y: c.y } });
  }
  return sites;
}

/**
 * Per-site label rotation (degrees, CSS rotate) aligning each chip with its
 * row. Demo-presentation only — see docs/spec/data-model.md §5.
 */
export const SITE_ANGLES: Record<string, number> = (() => {
  const m: Record<string, number> = {};
  for (const { seeds } of ALL_SEEDS) {
    for (const [num, , , angle] of seeds) m[`site-${num}`] = angle;
  }
  for (const c of CABINS) m[c.id] = 0;
  return m;
})();
