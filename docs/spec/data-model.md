# Data Model Specification

**Status:** Authoritative — the field-level realization of [ADR-0006](../adr/ADR-0006-data-model-primitives.md)
**Date:** 2026-06-13
**Build gate:** Product persistence is gated by [ADR-0005](../adr/ADR-0005-service-assisted-gtm.md) (no product code before two paid pilots are delivered). This is a paper spec; manual pilots capture into the CSV templates below, which map 1:1 onto this schema so the pilots double as schema validation.

## Purpose & scope

ADR-0006 fixed the *shape* of the model — six primitives, provenance mandatory, never make the user draw a network. This document fixes the *fields*: the one place that the app types ([`web/lib/types.ts`](../../web/lib/types.ts)), the eventual Postgres schema, the manual-capture CSV templates ([`docs/ops/templates/`](../ops/templates/)), and the export serializer ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)) must all agree with. When any of those drift, this spec is the referee.

It is deliberately not a database DDL file. It is the contract; the DDL is generated from it when the build gate opens.

## Design invariants (non-negotiable)

1. **Provenance is mandatory on `Asset` and `Dependency`** — never optional metadata. `Site` and `EventNote` do not carry a provenance block (their authorship/date is their provenance; sites are typically imported, not claimed).
2. **Humility renders loudly.** `last_verified = null` means "never verified" and must surface visibly, never silently default to today or hide.
3. **Points + text only in V1.** No topology, no edges, no flow direction, no drawn networks. A `path` geometry is reserved for V2 (see §5) and only under a mandatory "approximate path — not located" style.
4. **The banned-field firewall is part of the schema, not a UI nicety** (§7, [ADR-0002 §4](../adr/ADR-0002-liability-posture-not-a-locate.md)). The data layer must be *incapable* of holding locate-grade fields.
5. **Export-first.** Every entity serializes losslessly to CSV + GeoJSON via the same serializer the app uses ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)); the non-reliance disclaimer rides in every export's metadata/header (§8).
6. **The whole model fits in a non-technical operator's head.** Adding a seventh primitive requires a superseding ADR.

## Entities

Six entities: `Property` → `Site`, `Asset` → `Dependency` (Asset↔Sites), `EventNote`, and polymorphic `Attachment`. Field tables below; `req` = required, `enum` values are exhaustive and closed.

### Shared value object — `Provenance`

Embedded on `Asset` and `Dependency` (flattened to columns in CSV/DB; nested object in app types and GeoJSON properties).

| field | type | req | constraint / default | notes |
|---|---|---|---|---|
| `source` | enum | yes | `staff_memory` \| `old_map` \| `photo` \| `as_built` \| `contractor_note` \| `private_locate_report` \| `field_walk` \| `tested` | capture default `field_walk` (PRD-0003) |
| `confidence` | enum | yes | `low` \| `medium` \| `high` | capture default `medium` |
| `last_verified` | date | no | ISO `YYYY-MM-DD`, **nullable** | `null` = never verified → render loudly (invariant 2). Capture default = today. "Verify" action bumps this (PRD-0003 review queue). |
| `recorded_by` | text | yes | free text | capture default = logged-in user |

`tested` is the highest-confidence source — a claim made by shutting the valve and observing the effect ([PRD-0003](../prd/PRD-0003-asset-dependency-capture.md) §Link dependency). It is canonical here; ADR-0006's original seven-value list predates it (see §9).

### `Property`

The park/venue. One per customer site.

| field | type | req | constraint | notes |
|---|---|---|---|---|
| `id` | uuid | yes | PK | opaque; see §6 |
| `name` | text | yes | | e.g. "Big Pine Family Campground" (demo data is fictional, PRD-0005) |
| `plan_image` | text (url/ref) | yes | | base raster/illustrated plan; the demo serves WebP |
| `plan_width` | int | yes | px | base-plan pixel width (demo 1200) |
| `plan_height` | int | yes | px | base-plan pixel height (demo 800) |
| `georeference` | json | no | affine transform or GCPs | **reserved**; present only if the plan is georeferenced (§5). Absent ⇒ plan-pixel space is the only coordinate system. |
| `billing_*` | — | — | **DEFERRED** | pending a pricing/packaging ADR; do not invent billing columns until then |

App note: `PropertyRecord` in `types.ts` embeds the child arrays (`sites`, `assets`, `dependencies`, `eventNotes`) for the read-only demo. In the persisted model these are separate tables keyed by `property_id`; the embedded form is a read projection, not the storage shape.

### `Site`

A rentable/usable unit: pad, cabin, building, or area. No provenance block. Often imported from a PMS CSV ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md) §4).

| field | type | req | constraint | CSV column |
|---|---|---|---|---|
| `id` | uuid | yes | PK | `id` |
| `property_id` | uuid | yes | FK → Property | (implicit per-property file) |
| `label` | text | yes | e.g. `"1"`, `"CB2"` | `label` |
| `area` | text | no | e.g. `"Row A"` | `area` |
| `plan_x` | number | no | plan-pixel X (§5) | `plan_x` |
| `plan_y` | number | no | plan-pixel Y (§5) | `plan_y` |
| `notes` | text | no | | `notes` |

### `Asset`

A physical infrastructure point. Carries `Provenance`.

| field | type | req | constraint | CSV column |
|---|---|---|---|---|
| `id` | uuid | yes | PK | `id` |
| `property_id` | uuid | yes | FK → Property | (implicit) |
| `label` | text | yes | e.g. `"V-07"` | `label` |
| `asset_type` | enum | yes | `valve` \| `cleanout` \| `pedestal` \| `meter` \| `panel` \| `pump` \| `transformer` \| `hydrant` \| `septic` \| `propane` \| `well` \| `other` | `asset_type` |
| `utility` | enum | yes | `water` \| `sewer` \| `electric` \| `gas` \| `irrigation` \| `data` \| `unknown` | `utility` |
| `plan_x` | number | no | plan-pixel X (§5) | `plan_x` |
| `plan_y` | number | no | plan-pixel Y (§5) | `plan_y` |
| `location_text` | text | yes | human directions: "behind shed, west of Row C" | `location_text` |
| `status` | enum | yes | `active` \| `abandoned` \| `unknown` | `status` |
| `notes` | text | no | free text (may mention depth in prose; §7) | `notes` |
| `provenance.*` | — | yes | see Provenance | `source`,`confidence`,`last_verified`,`recorded_by` |

The `utility` value maps to an APWA color at the **presentation** layer only ([`web/lib/utility-meta.ts`](../../web/lib/utility-meta.ts)) — color is derived, never stored.

### `Dependency`

The wedge primitive: "this asset controls/serves/feeds these sites." Asset↔Sites many-to-many. Carries `Provenance`. One asset may have several dependencies.

| field | type | req | constraint | CSV column |
|---|---|---|---|---|
| `id` | uuid | yes | PK | `id` |
| `property_id` | uuid | yes | FK → Property | (implicit) |
| `asset_id` | uuid | yes | FK → Asset | `asset_id` |
| `relation` | enum | yes | `controls` \| `serves` \| `feeds` | `relation` |
| `site_ids` | uuid[] | yes | ≥1; FK → Site each | `site_ids` (`;`-joined) |
| `notes` | text | no | | `notes` |
| `provenance.*` | — | yes | see Provenance | `source`,`confidence`,`last_verified`,`recorded_by` |

Persisted as `dependency` + a `dependency_site` join table (`dependency_id`, `site_id`); `site_ids[]` is the export/app projection. Deleting a `Site` or `Asset` must not silently orphan a dependency — see §6.

### `EventNote`

A dated, geo-taggable note — the entire "repair history" feature. **Not** a work-order system: no status, assignee, or due date ([ADR-0001](../adr/ADR-0001-product-scope-positioning.md)). No provenance block (the note *is* dated, authored prose).

| field | type | req | constraint | CSV column |
|---|---|---|---|---|
| `id` | uuid | yes | PK | `id` |
| `property_id` | uuid | yes | FK → Property | (implicit) |
| `date` | date | yes | ISO `YYYY-MM-DD` | `date` |
| `text` | text | yes | | `text` |
| `asset_id` | uuid | no | FK → Asset (single) | `asset_id` |
| `site_ids` | uuid[] | no | FK → Site each | `site_ids` (`;`-joined) |

Photos on an event note are `Attachment`s owned by the note (below), not a column here.

### `Attachment`

Polymorphic file attached to any primitive. Specified in ADR-0006 but not yet in `types.ts` or the capture templates — defined here so the model is complete (§9). **Professional/private locate reports are stored only as attachments and never parsed into structured fields** ([ADR-0003](../adr/ADR-0003-patent-risk-avoidance.md), §7).

| field | type | req | constraint | notes |
|---|---|---|---|---|
| `id` | uuid | yes | PK | |
| `property_id` | uuid | yes | FK → Property | |
| `owner_type` | enum | yes | `property` \| `site` \| `asset` \| `dependency` \| `event_note` | polymorphic parent |
| `owner_id` | uuid | yes | FK → owner row | |
| `kind` | enum | yes | `photo` \| `scanned_map` \| `contractor_pdf` \| `locate_report` \| `other` | |
| `file_ref` | text | yes | storage key/url | original resolution retained ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md) §1) |
| `original_filename` | text | no | | |
| `mime_type` | text | yes | | |
| `captured_date` | date | no | ISO | |
| `caption` | text | no | | |
| `recorded_by` | text | no | | |

Manual-pilot representation: files live in the pilot workspace; an `attachments.csv` (same columns) records the metadata. See [`docs/ops/templates/attachments.csv`](../ops/templates/attachments.csv).

## §5 Positioning model

V1 positioning is **plan-pixel**, not geographic. The base is an illustrated or scanned plan, not a survey-georeferenced map, so:

- **`plan_x` / `plan_y`** are pixel coordinates in the property's base-plan image space. **Origin is top-left, y increases downward** (SVG/raster convention — matches `PlanPosition` in `types.ts`). The map renderer flips y for Leaflet's `CRS.Simple` (`lat = plan_height − y`); storage is always y-down.
- Coordinates are **optional**. An asset with `location_text` but no pin is valid (PRD-0003 anti-requirement: nothing beyond pin+type is required, and even the pin is draggable/optional). Such records render in lists and the binder PDF, just not as a map pin.
- **Geographic `lat`/`lng` are additive and reserved**, not the V1 primary system. They are populated only when a `Property.georeference` exists (an affine transform from plan-pixel → WGS84, or ground control points). ADR-0006's "Postgres with lat/lng numeric columns" describes that future additive column, not a replacement for plan coordinates.
- **GeoJSON export** (§8): when `georeference` is present, emit true WGS84 geometry; when absent, emit plan-pixel coordinates and declare a local/non-standard CRS in the FeatureCollection metadata with the disclaimer — never emit plan pixels as if they were lat/lng.
- **`path` geometry is deferred to V2** and only if pilots demand drawn lines; it renders dashed with a mandatory "approximate path, not located" treatment (ADR-0006, ADR-0002).

## §6 Identity, keys, integrity

- **Primary keys are opaque UUIDs**, server-generated. The human-facing `label` (`"V-07"`, `"Site 42"`) is a separate display field and may change without breaking references. Demo/CSV slugs (`v-01`, `site-1`) are a manual-capture convenience; the persisted model uses UUIDs and exports carry both `id` and `label`.
- **Foreign keys:** `Site/Asset/Dependency/EventNote/Attachment.property_id` → `Property`; `Dependency.asset_id` → `Asset`; `dependency_site.site_id` → `Site`; `Attachment.(owner_type, owner_id)` → owner.
- **Orphan/cascade rules:**
  - Deleting a `Property` cascades to all its children (full customer offboarding, paired with a final export — ADR-0008 §3).
  - Deleting an `Asset` with dependencies is **blocked** unless the dependencies are deleted first (a valve's control claims are the product; do not silently lose them).
  - Removing a `Site` from a `Dependency` that would leave `site_ids` empty deletes the now-meaningless dependency, with a confirmation.
  - `EventNote.asset_id` / `site_ids` are nullable references; if the target is deleted the link is cleared, the note is retained (history outlives the asset).

## §7 The banned-field firewall (data-layer enforcement)

[ADR-0002 §4](../adr/ADR-0002-liability-posture-not-a-locate.md) is absolute and is enforced *here*, at the schema, not only in the UI. The following must **never exist as structured fields, columns, enums, or export keys** anywhere in this model:

- structured **depth** (no `depth`, `depth_in`, `cover`, `burial_depth`, …)
- **tolerance zone** / offset corridors (also patent-barred, [ADR-0003](../adr/ADR-0003-patent-risk-avoidance.md))
- any **"safe to dig" / "clear to dig"** state, flag, or boolean
- **excavation clearance** output of any kind (`clear` / `not_clear`)
- **GPR / GNSS / RTK** capture fields or precision metadata
- **accuracy grade / positional accuracy class** (no `±x cm`, no SUE quality levels A–D, no `accuracy_class`)
- **route-to-utility / proximity-warning** distances for equipment or excavators

Rules:

1. **Prose may mention depth; structured fields may not.** `Asset.notes` / `EventNote.text` are free text and may say "buried deep near the oak"; there is no parsed depth field, and serializers must not promote prose into structured keys.
2. **No feature takes "dig" as input or produces "clear/not clear" as output.**
3. **Locate reports are opaque attachments** (`Attachment.kind = locate_report`): the file is stored, its contents are never transcribed into structured depth/accuracy fields (ADR-0003).
4. **Enforcement is testable:** a serializer/schema test asserts the exported key set is a subset of the allow-list above; a schema-review checklist item blocks any migration adding a banned field. Adding any banned field requires **superseding ADR-0002 with counsel sign-off and a forced-confidence UI** — until then the list is closed.

## §8 Serialization & exports

Per [ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md): every plan, including churned customers, gets a full one-click export, produced by the **same serializer the app uses** (it cannot rot separately).

- **CSV** — one file per entity (`sites`, `assets`, `dependencies`, `event-notes`, `attachments`), provenance flattened to columns, array fields (`site_ids`) `;`-joined. Columns are exactly the capture templates in [`docs/ops/templates/`](../ops/templates/) (this is the 1:1 guarantee that lets manual pilots validate the schema).
- **GeoJSON** — a `FeatureCollection` per geometry-bearing entity (`Asset`, optionally `Site`, V2 `path`); full properties incl. nested provenance; CRS handled per §5.
- **Photos / attachments** — original resolution, original filenames preserved.
- **PDFs** — the generated Emergency PDF, Dave Sheet, and Emergency Reference Packet ([PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md), [PRD-0004](../prd/PRD-0004-exports-contractor-handoff.md)).
- **Disclaimer rides along, structurally** ([ADR-0002 §2](../adr/ADR-0002-liability-posture-not-a-locate.md)): every CSV/GeoJSON file carries the non-reliance line in a header/metadata field, and the export bundle includes a README repeating it. Generated at the serializer layer so no format can omit it.
- **Import** — PMS CSV exports (Campspot / CampLife / RoverPass) map onto `Site` (`label`, `area`); import never requires an API partnership.

## §9 Reconciliation with ADR-0006 (drift resolved here)

This spec is the current authority; where it extends ADR-0006's original sketch:

1. **`Source` has eight values** — `tested` was added by [PRD-0003](../prd/PRD-0003-asset-dependency-capture.md) and is live in `types.ts` and the capture CSVs. ADR-0006's seven-value list is historical.
2. **Positioning is plan-pixel (`plan_x`/`plan_y`), not `lat`/`lng`, in V1.** Geographic coordinates are additive and georeference-gated (§5). This resolves the apparent conflict between ADR-0006's prose and the implemented `PlanPosition`.
3. **`Attachment` is fully defined here** (fields, polymorphic ownership, manual-capture representation); ADR-0006 named it but left it unspecified, and it is not yet in `types.ts`.
4. **`Property` billing is explicitly deferred** pending a pricing/packaging ADR — no billing columns are defined yet (avoids inventing a monetization model the venture has not decided).

ADR-0006 itself is left intact as the decision of record; it now forward-links here for the field detail.

## §10 Storage & build posture

- **V1 storage:** plain Postgres; `plan_x`/`plan_y`/optional `lat`/`lng` as numeric columns; **no PostGIS** until geometry queries actually appear (likely with V2 paths). GeoJSON is the interchange format from day one regardless.
- **Build is gated** ([ADR-0005](../adr/ADR-0005-service-assisted-gtm.md)): until two paid pilots are delivered, the only instance of this schema is the four CSV templates + the read-only demo types. When the gate opens, the persisted schema and the app types are generated from this document, and any divergence is a spec bug to fix here first.

## Appendix — entity ↔ artifact map

| Entity | App type (`types.ts`) | Capture CSV | Provenance | Geometry |
|---|---|---|---|---|
| Property | `PropertyRecord` | (per-property workspace) | — | base-plan config |
| Site | `Site` | `sites.csv` | no | plan-pixel (opt) |
| Asset | `Asset` | `assets.csv` | **yes** | plan-pixel (opt) |
| Dependency | `Dependency` | `dependencies.csv` | **yes** | — (via asset) |
| EventNote | `EventNote` | `event-notes.csv` | no | — (via refs) |
| Attachment | *(not yet in types)* | `attachments.csv` | no | — |
