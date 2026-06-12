# PRD-0003: Field capture — assets, dependencies, and event notes

**Status:** Specified — build gated on two delivered pilots ([ADR-0005](../adr/ADR-0005-service-assisted-gtm.md))
**Date:** 2026-06-11

## Problem

Institutional memory is captured in two moments: (1) the paid onboarding walk, and (2) every later moment a staff member learns or fixes something. If moment 2 requires a desktop, a manual, or GIS skills, the data rots and retention dies. The brainstorm's critique was right: retention depends on memory capture feeling like **insurance, not overhead**.

## User stories

1. As maintenance staff mid-task, I drop a pin where I'm standing, snap a photo, say or type one sentence, pick a type — done in under 45 seconds.
2. As the operator, I link a valve to the sites it controls by tapping site chips — never by drawing lines or editing a diagram ([ADR-0006](../adr/ADR-0006-data-model-primitives.md) UX principle).
3. As the veteran (Dave), I answer "what does this control?" prompts during a walk while someone else taps — my knowledge outlives my employment.

## Requirements

### Add asset (mobile, primary flow)
- One screen: GPS-prefilled pin (draggable), camera button (multi-photo), type picker (8 big icons + "other"), utility picker, one text field ("where is it / what is it"), then provenance: source picker + confidence (3 buttons) — defaults `field_walk` / `medium`, `last_verified = today`, `recorded_by` = logged-in user.
- Works offline; queues sync ([ADR-0007](../adr/ADR-0007-tech-stack.md)).

### Link dependency (the wedge interaction)
- From an asset: "What does this control?" → relation picker (controls/serves/feeds) → **site chip grid** (tap to multi-select; ranges auto-suggested: tapping 38 then 46 offers "38–46") → provenance (source/confidence prompts, e.g. "How do you know?" → *Dave told me / old map / traced it / tested it*).
- A dependency claimed by shutting the valve and observing gets a "tested" source option — the highest confidence tier, suggested during verification walks.

### Event notes (the entire "repair history")
- Dated note + photos + optional links to one asset and/or sites. Filterable on the map by utility/date. Explicitly **not** a work-order system: no statuses, assignees, or due dates ([ADR-0001](../adr/ADR-0001-product-scope-positioning.md)).

### Review queue (web, operator)
- New/edited records since last review; one-click "verify" (bumps `last_verified`); staleness report ("14 assets not verified in 24+ months") — the upsell trigger for the annual verification walk.

## Anti-requirements

- No required fields beyond pin + type (perfect data that never gets entered loses to rough data that does; provenance defaults exist for this reason).
- No topology/line drawing in V1; no layers panel resembling GIS.
- No structured depth/accuracy fields ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)).

## Success metrics

- Median add-asset time <60s measured in app.
- ≥5 staff-created records per property per quarter post-onboarding (the retention signal).
- ≥80% of assets carry at least one dependency within 60 days of onboarding.
