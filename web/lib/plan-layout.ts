/**
 * Coordinate model for the fictional Big Pine demo map.
 *
 * The visual base is /public/maps/big-pine-base-v1.png. These positions are
 * mapped against that image so clickable targets sit on site pads beside the
 * roads, not on the roads themselves.
 */
import type { Site } from "./types";

export const PLAN_W = 1200;
export const PLAN_H = 800;

type SiteSeed = readonly [number, number, number];

const ROW_A: SiteSeed[] = [
  [1, 292, 160],
  [2, 328, 138],
  [3, 372, 122],
  [4, 416, 110],
  [5, 462, 102],
  [6, 508, 98],
  [7, 166, 190],
  [8, 206, 230],
  [9, 224, 278],
  [10, 208, 342],
  [11, 184, 424],
  [12, 254, 238],
  [13, 286, 312],
  [14, 306, 380],
];

const ROW_B: SiteSeed[] = [
  [15, 300, 446],
  [16, 358, 426],
  [17, 404, 432],
  [18, 476, 386],
  [19, 478, 332],
  [20, 476, 278],
  [21, 470, 190],
  [22, 516, 498],
  [23, 474, 536],
  [24, 426, 558],
  [25, 392, 588],
  [26, 520, 598],
  [27, 618, 538],
  [28, 552, 470],
  [29, 598, 488],
  [30, 610, 612],
];

const ROW_C: SiteSeed[] = [
  [31, 616, 186],
  [32, 650, 218],
  [33, 684, 250],
  [34, 718, 284],
  [35, 752, 320],
  [36, 786, 356],
  [37, 822, 392],
  [38, 850, 432],
  [39, 902, 454],
  [40, 956, 458],
  [41, 1010, 462],
  [42, 658, 552],
  [43, 720, 570],
  [44, 780, 574],
  [45, 838, 574],
  [46, 898, 570],
  [47, 956, 572],
  [48, 1028, 596],
];

const CABINS: Site[] = [
  { id: "site-cb1", label: "CB1", area: "Cabins", position: { x: 588, y: 142 } },
  { id: "site-cb2", label: "CB2", area: "Cabins", position: { x: 432, y: 222 } },
  { id: "site-cb3", label: "CB3", area: "Cabins", position: { x: 254, y: 534 } },
  { id: "site-cb4", label: "CB4", area: "Cabins", position: { x: 586, y: 588 } },
];

function makeSites(area: string, seeds: readonly SiteSeed[]): Site[] {
  return seeds.map(([num, x, y]) => ({
    id: `site-${num}`,
    label: String(num),
    area,
    position: { x, y },
  }));
}

export function buildSites(): Site[] {
  return [
    ...makeSites("Row A", ROW_A),
    ...makeSites("Row B", ROW_B),
    ...makeSites("Row C", ROW_C),
    ...CABINS,
  ];
}
