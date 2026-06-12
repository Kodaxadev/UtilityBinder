/**
 * UtilityBinder core primitives — mirrors docs/adr/ADR-0006-data-model-primitives.md.
 *
 * Provenance (source, confidence, lastVerified) is mandatory on Asset and
 * Dependency. Structured depth / accuracy / tolerance-zone fields are
 * forbidden by ADR-0002 §4 — do not add them.
 */

export type UtilityType =
  | "water"
  | "sewer"
  | "electric"
  | "gas"
  | "irrigation"
  | "data"
  | "unknown";

export type AssetType =
  | "valve"
  | "cleanout"
  | "pedestal"
  | "meter"
  | "panel"
  | "pump"
  | "transformer"
  | "hydrant"
  | "septic"
  | "propane"
  | "well"
  | "other";

export type Source =
  | "staff_memory"
  | "old_map"
  | "photo"
  | "as_built"
  | "contractor_note"
  | "private_locate_report"
  | "field_walk"
  | "tested";

export type Confidence = "low" | "medium" | "high";

export type AssetStatus = "active" | "abandoned" | "unknown";

/** Position in base-plan pixel space (SVG coordinates, y-down). */
export interface PlanPosition {
  x: number;
  y: number;
}

export interface Site {
  id: string;
  label: string;
  area: string;
  position: PlanPosition;
  notes?: string;
}

export interface Provenance {
  source: Source;
  confidence: Confidence;
  /** ISO date. Null means "never verified" — render loudly, not silently. */
  lastVerified: string | null;
  recordedBy: string;
}

export interface Asset {
  id: string;
  label: string;
  assetType: AssetType;
  utility: UtilityType;
  position: PlanPosition;
  locationText: string;
  status: AssetStatus;
  notes?: string;
  provenance: Provenance;
}

export type DependencyRelation = "controls" | "serves" | "feeds";

export interface Dependency {
  id: string;
  assetId: string;
  relation: DependencyRelation;
  siteIds: string[];
  provenance: Provenance;
  notes?: string;
}

export interface EventNote {
  id: string;
  date: string;
  text: string;
  assetId?: string;
  siteIds?: string[];
}

export interface PropertyRecord {
  name: string;
  planImage: string;
  planWidth: number;
  planHeight: number;
  sites: Site[];
  assets: Asset[];
  dependencies: Dependency[];
  eventNotes: EventNote[];
}
