/**
 * Display metadata for utility types, confidence, and sources.
 * Marker colors loosely follow APWA uniform color codes (blue=water,
 * green=sewer, red=electric, yellow=gas) so the map reads naturally to
 * anyone who has seen locate paint — used for *display only*, never to
 * imply locate-grade data (ADR-0002).
 */
import type { Confidence, Source, UtilityType } from "./types";

export const UTILITY_META: Record<
  UtilityType,
  { label: string; color: string }
> = {
  water: { label: "Water", color: "#2563eb" },
  sewer: { label: "Sewer", color: "#16a34a" },
  electric: { label: "Electric", color: "#dc2626" },
  gas: { label: "Gas / Propane", color: "#ca8a04" },
  irrigation: { label: "Irrigation", color: "#0d9488" },
  data: { label: "Data / Comms", color: "#ea580c" },
  unknown: { label: "Unknown", color: "#6b7280" },
};

export const CONFIDENCE_META: Record<
  Confidence,
  { label: string; badgeClass: string }
> = {
  high: {
    label: "High confidence",
    badgeClass: "bg-green-100 text-green-900 border-green-300",
  },
  medium: {
    label: "Medium confidence",
    badgeClass: "bg-yellow-100 text-yellow-900 border-yellow-300",
  },
  low: {
    label: "Low confidence",
    badgeClass: "bg-red-100 text-red-900 border-red-300",
  },
};

export const SOURCE_LABEL: Record<Source, string> = {
  staff_memory: "Staff memory",
  old_map: "Old map",
  photo: "Field photo",
  as_built: "As-built drawing",
  contractor_note: "Contractor note",
  private_locate_report: "Private locate report (attached)",
  field_walk: "Field walk",
  tested: "Tested (shut off & observed)",
};

export const RELATION_LABEL = {
  controls: "controls",
  serves: "serves",
  feeds: "feeds",
} as const;
