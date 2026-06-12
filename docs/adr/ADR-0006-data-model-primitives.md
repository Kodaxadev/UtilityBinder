# ADR-0006: Data model — five primitives, provenance mandatory

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [ADR-0002](ADR-0002-liability-posture-not-a-locate.md); brainstorm's model audit (Site/Asset/Dependency/EventNote) extended after review

## Context

The product's wedge primitive is the **dependency**: "Valve V-07 controls Sites 38–46, per Dave's memory, medium confidence, last verified 2026-06-11." GIS-style topology (networks, edges, flow direction) would be more "correct" and is exactly what the buyer cannot maintain. The UX principle from the brainstorm stands: **never make the user draw a network.**

## Decision

Five primitives (the brainstorm's four, plus `Property` and first-class `Attachment`):

```
Property      — the park/venue. Base imagery config, plan, billing.
Site          — rentable/usable unit (pad, cabin, building, area). id, label, area/row, lat/lng (optional), notes.
Asset         — physical infrastructure point. type (valve, cleanout, pedestal, meter, panel,
                pump, transformer, hydrant, septic, propane, well, other), utility (water, sewer,
                electric, gas/propane, irrigation, data, unknown), label, lat/lng, location_text
                ("behind shed, west of Row C"), status (active/abandoned/unknown).
Dependency    — Asset ↔ Sites many-to-many with semantics: relation (controls | serves | feeds),
                site_ids[], plus provenance (below). One asset may have several dependencies.
EventNote     — dated geo-taggable note: text, photos, optional asset/site refs.
                This is the entire "repair history" feature — NOT a work-order system.
Attachment    — photo, scanned map, contractor/locate PDF. Attachable to any primitive.
                Professional locate reports are stored as attachments, never structured (ADR-0003).
```

**Provenance is mandatory, not optional metadata.** `Asset` and `Dependency` require:
- `source`: staff_memory | old_map | photo | as_built | contractor_note | private_locate_report | field_walk
- `confidence`: low | medium | high
- `last_verified`: date (nullable = "never verified," displayed loudly)
- `recorded_by`: free text

**Forbidden fields (per ADR-0002/0003):** structured depth, positional accuracy class, tolerance zone, "clear to dig" status.

**Lines/polygons are deferred.** V1 is points + text. A `path` geometry on Asset is reserved for V2 only if pilots demand drawn lines — and renders with a mandatory "approximate path, not located" style (dashed, with disclaimer).

**Storage:** plain Postgres with `lat`/`lng` numeric columns in V1. PostGIS is adopted only when geometry queries actually appear (likely with V2 paths/exports). GeoJSON is the interchange format from day one.

## Consequences

- The emergency screen ([PRD-0002](../prd/PRD-0002-emergency-mode.md)) is a simple query: dependencies covering Site X, ordered by utility type, rendered with confidence badges. No graph traversal.
- "Which valve serves this site" can be wrong if the operator's memory is wrong — by design, the product records *that the claim has a source and a confidence*, it does not promise the claim is true.
- Pilot data captured in spreadsheets ([ADR-0005](ADR-0005-service-assisted-gtm.md)) maps 1:1 onto these primitives, so manual pilots double as schema validation.
- Five primitives fit in a non-technical operator's head, which is the real constraint.
