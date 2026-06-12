# PRD-0004: Exports and the Emergency Reference Packet (contractor handoff)

**Status:** Specified — PDF generation is needed in manual form for pilot #1 ([PRD-0001](PRD-0001-pilot-deliverable-package.md))
**Date:** 2026-06-11

## Problem

Two distinct jobs:
1. **Trust/exit:** the customer must be able to take everything with them at any time ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)) — this is a *selling* feature against SaaS-abandonment fear.
2. **Contractor handoff:** before a repair, the operator hands an outside contractor what is known — without creating excavation reliance ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)).

## Requirements

### Exports (one click, every plan, churned accounts included)
- **CSV**: one file per primitive (sites, assets, dependencies, event notes), provenance columns always included.
- **GeoJSON**: FeatureCollection of sites + assets with all properties; disclaimer in collection-level `properties` and a bundled `README.txt`.
- **Photos**: zip, original resolution, filenames keyed to asset/site labels.
- **PDFs**: latest UtilityBinder Emergency PDF + Emergency Reference Packets.
- KMZ deferred until a customer asks twice.

### UtilityBinder Emergency PDF
Spec lives in [PRD-0001](PRD-0001-pilot-deliverable-package.md) D1; product version reproduces the manual artifact byte-for-intent: watermark, B/W legibility, reverse-lookup table, per-system pages. Regenerated on demand; footer carries generation date + "data as of."

### Emergency Reference Packet (contractor handoff PDF)
- **Page 1 is the disclaimer**, not a footer: this is unverified prior knowledge from staff records; NOT a locate; contractor must call 811 and arrange private locating where private lines may exist. Layout makes it impossible to photocopy the useful pages without having seen page 1 (disclaimer repeats in every page's header band).
- Scoped generation: operator picks sites/area + utilities → packet includes only relevant assets, dependencies, photos, recent event notes, and the known-unknowns list ("no record of sewer routing in Row D").
- Includes the property's 811 state contact info block.
- Provenance badges on every claim, same as app.

### Rendering architecture
Single HTML template layer → Chromium print-to-PDF; disclaimer/watermark injected by the shared layout so no template can omit it ([ADR-0007](../adr/ADR-0007-tech-stack.md)). The pilot-phase manual PDFs use the same HTML templates, hand-filled — the templates are the first real product code written.

## Success metrics

- Export completeness: a churned account restored from its own export loses nothing but hosting.
- ≥1 pilot customer hands an Emergency Reference Packet to a real contractor in year 1 and reports it was used (referral channel: contractors who receive packets are future leads).
