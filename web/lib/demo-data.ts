/**
 * Fictional demo property: Big Pine Family Campground.
 * Every record here is invented for demonstration (PRD-0005: fictional
 * data only, obviously fictional property name). The data deliberately
 * includes low-confidence, never-verified, and unknown records — showing
 * honest provenance is the product (ADR-0006).
 */
import type {
  Asset,
  Confidence,
  Dependency,
  EventNote,
  PropertyRecord,
  Provenance,
  Source,
} from "./types";
import { buildSites, PLAN_H, PLAN_W } from "./plan-layout";

function prov(
  source: Source,
  confidence: Confidence,
  lastVerified: string | null,
  recordedBy: string,
): Provenance {
  return { source, confidence, lastVerified, recordedBy };
}

const sites = buildSites();

const range = (from: number, to: number): string[] =>
  Array.from({ length: to - from + 1 }, (_, i) => `site-${from + i}`);

const ALL_RV_SITES = range(1, 48);
const CABIN_IDS = ["site-cb1", "site-cb2", "site-cb3", "site-cb4"];

const assets: Asset[] = [
  {
    id: "w-01", label: "W-01", assetType: "pump", utility: "water",
    position: { x: 118, y: 70 },
    locationText: "Inside well house, disconnect on left wall",
    status: "active",
    provenance: prov("tested", "high", "2026-04-18", "Dave (spring opening)"),
  },
  {
    id: "v-01", label: "V-01", assetType: "valve", utility: "water",
    position: { x: 168, y: 92 },
    locationText: "Main shutoff, green cover 10 ft east of well house door",
    status: "active",
    provenance: prov("tested", "high", "2026-04-18", "Dave (spring opening)"),
  },
  {
    id: "v-03", label: "V-03", assetType: "valve", utility: "water",
    position: { x: 196, y: 140 },
    locationText: "Row A feed, valve box at NE corner of Row A road",
    status: "active",
    provenance: prov("old_map", "medium", "2025-05-02", "Dave"),
  },
  {
    id: "v-04", label: "V-04", assetType: "valve", utility: "water",
    position: { x: 376, y: 140 },
    locationText: "Row B feed — old map shows valve box near Row B road entrance. NOT FOUND on last walk.",
    status: "unknown",
    notes: "Candidate for verification walk. May be buried under gravel.",
    provenance: prov("old_map", "low", null, "1998 paper map"),
  },
  {
    id: "v-07", label: "V-07", assetType: "valve", utility: "water",
    position: { x: 778, y: 158 },
    locationText: "Behind shed, west side of Row C — round cover under hose reel",
    status: "active",
    provenance: prov("staff_memory", "medium", "2026-06-02", "Dave + field photo"),
  },
  {
    id: "c-01", label: "C-01", assetType: "cleanout", utility: "sewer",
    position: { x: 968, y: 640 },
    locationText: "Main cleanout at septic field NW corner",
    status: "active",
    provenance: prov("contractor_note", "high", "2025-11-20", "Hartley Septic invoice #2241"),
  },
  {
    id: "c-02", label: "C-02", assetType: "cleanout", utility: "sewer",
    position: { x: 376, y: 436 },
    locationText: "Row B line, flush cap between sites 22 and 23",
    status: "active",
    provenance: prov("field_walk", "medium", "2025-09-14", "Marcus"),
  },
  {
    id: "c-04", label: "C-04", assetType: "cleanout", utility: "sewer",
    position: { x: 872, y: 520 },
    locationText: "Under gravel by picnic table near site 42 — found during 2025 backup",
    status: "active",
    provenance: prov("photo", "medium", "2025-12-03", "Marcus (backup repair)"),
  },
  {
    id: "p-01", label: "P-01", assetType: "panel", utility: "electric",
    position: { x: 662, y: 736 },
    locationText: "Main panel, office back wall",
    status: "active",
    provenance: prov("tested", "high", "2026-05-30", "Dave"),
  },
  {
    id: "p-02", label: "P-02", assetType: "panel", utility: "electric",
    position: { x: 776, y: 300 },
    locationText: "Row C sub-panel on pole mid-row",
    status: "active",
    provenance: prov("tested", "high", "2026-05-30", "Dave"),
  },
  {
    id: "p-03", label: "P-03", assetType: "panel", utility: "electric",
    position: { x: 252, y: 384 },
    locationText: "Rows A/B sub-panel on pole between rows",
    status: "active",
    provenance: prov("staff_memory", "medium", "2025-07-04", "Dave"),
  },
  {
    id: "g-01", label: "G-01", assetType: "propane", utility: "gas",
    position: { x: 676, y: 356 },
    locationText: "Propane tank shutoff, east side of bathhouse",
    status: "active",
    provenance: prov("photo", "high", "2026-03-12", "Delivery driver walkthrough"),
  },
  {
    id: "ir-01", label: "IR-01", assetType: "valve", utility: "irrigation",
    position: { x: 520, y: 560 },
    locationText: "Old irrigation valve in common lawn — purpose unclear",
    status: "abandoned",
    notes: "Do not trust. Nobody knows what this serves or if it is live.",
    provenance: prov("staff_memory", "low", null, "Previous owner, secondhand"),
  },
  {
    id: "x-01", label: "X-01", assetType: "other", utility: "unknown",
    position: { x: 940, y: 420 },
    locationText: "Marker stake east of Row C — unknown buried line reported by mower crew",
    status: "unknown",
    notes: "DO NOT DIG in this area without 811 + private locator.",
    provenance: prov("staff_memory", "low", null, "Mower crew, 2024"),
  },
];

const dependencies: Dependency[] = [
  {
    id: "d-01", assetId: "v-01", relation: "controls",
    siteIds: [...ALL_RV_SITES, ...CABIN_IDS],
    provenance: prov("tested", "high", "2026-04-18", "Dave"),
    notes: "Whole-park water. Shutting this kills the bathhouse too.",
  },
  {
    id: "d-02", assetId: "v-03", relation: "controls", siteIds: range(1, 14),
    provenance: prov("old_map", "medium", "2025-05-02", "Dave"),
  },
  {
    id: "d-03", assetId: "v-04", relation: "controls", siteIds: range(15, 30),
    provenance: prov("old_map", "low", null, "1998 paper map"),
    notes: "Never verified. If V-04 can't be found, fall back to V-01 (whole park).",
  },
  {
    id: "d-04", assetId: "v-07", relation: "controls", siteIds: range(31, 46),
    provenance: prov("staff_memory", "medium", "2026-06-02", "Dave"),
    notes: "Sites 47–48 unknown — may be teed off the Row B line instead.",
  },
  {
    id: "d-05", assetId: "c-02", relation: "serves", siteIds: range(18, 26),
    provenance: prov("field_walk", "medium", "2025-09-14", "Marcus"),
  },
  {
    id: "d-06", assetId: "c-04", relation: "serves", siteIds: range(40, 44),
    provenance: prov("photo", "medium", "2025-12-03", "Marcus"),
  },
  {
    id: "d-07", assetId: "c-01", relation: "serves",
    siteIds: [...ALL_RV_SITES, ...CABIN_IDS],
    provenance: prov("contractor_note", "high", "2025-11-20", "Hartley Septic"),
  },
  {
    id: "d-08", assetId: "p-02", relation: "feeds", siteIds: range(31, 48),
    provenance: prov("tested", "high", "2026-05-30", "Dave"),
  },
  {
    id: "d-09", assetId: "p-03", relation: "feeds", siteIds: range(1, 30),
    provenance: prov("staff_memory", "medium", "2025-07-04", "Dave"),
  },
  {
    id: "d-10", assetId: "g-01", relation: "feeds", siteIds: CABIN_IDS,
    provenance: prov("photo", "high", "2026-03-12", "Delivery driver"),
    notes: "Also feeds bathhouse water heater.",
  },
  {
    id: "d-11", assetId: "w-01", relation: "controls",
    siteIds: [...ALL_RV_SITES, ...CABIN_IDS],
    provenance: prov("tested", "high", "2026-04-18", "Dave"),
    notes: "Pump disconnect — stops supply without closing V-01.",
  },
];

const eventNotes: EventNote[] = [
  {
    id: "e-01", date: "2025-12-03",
    text: "Sewer backup near site 41. Cleanout C-04 located under gravel by picnic table after 3 hours of searching. Photo taken; position recorded.",
    assetId: "c-04", siteIds: ["site-41"],
  },
  {
    id: "e-02", date: "2024-08-19",
    text: "Lightning strike tripped Row C sub-panel (P-02). Pedestal at site 37 replaced.",
    assetId: "p-02", siteIds: ["site-37"],
  },
  {
    id: "e-03", date: "2026-02-07",
    text: "Frozen line at site 22. Took ~2 hours to find a shutoff because V-04 could not be located; ended up closing whole-park V-01.",
    assetId: "v-04", siteIds: ["site-22"],
  },
];

export const BIG_PINE: PropertyRecord = {
  name: "Big Pine Family Campground (fictional demo)",
  // Query param versions the cached drawing — bump when plan-layout.ts changes.
  planImage: "/plan.svg?rev=2",
  planWidth: PLAN_W,
  planHeight: PLAN_H,
  sites,
  assets,
  dependencies,
  eventNotes,
};

/** Dependencies that cover a given site id, with their assets resolved. */
export function dependenciesForSite(siteId: string) {
  return BIG_PINE.dependencies
    .filter((d) => d.siteIds.includes(siteId))
    .map((d) => ({
      dependency: d,
      asset: BIG_PINE.assets.find((a) => a.id === d.assetId)!,
    }));
}
