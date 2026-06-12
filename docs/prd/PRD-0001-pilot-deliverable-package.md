# PRD-0001: The $499 Pilot Deliverable Package (manual fulfillment)

**Status:** Ready to execute — this is the first thing built, before any product code ([ADR-0005](../adr/ADR-0005-service-assisted-gtm.md))
**Owner:** Founder
**Date:** 2026-06-11

## Problem

An independent park's utility knowledge lives in a binder, an old paper map, scattered phone photos, and one veteran employee's head. When a leak/outage happens and that person is unavailable, staff cannot answer "which shutoff controls Site 42?" The pilot converts existing knowledge into three durable artifacts — manually, for $499.

## Users

- **Buyer:** owner/GM of independent campground or RV park (50–200 sites).
- **Primary user:** maintenance staff, including the newest hire, on a phone, possibly with bad connectivity, possibly at night.
- **Secondary user:** outside contractor receiving an Emergency Reference Packet.

## Deliverables (the "product" is these three artifacts)

### D1 — UtilityBinder Emergency PDF (printable/laminatable)
- One page per utility system (water, sewer, electric, gas/propane) + one overview map page.
- Per asset: label, type, photo, location description, **what it controls (site list)**, source, confidence badge, last-verified date.
- Reverse lookup table: site number → relevant assets, sorted by utility.
- Every page: "PRINTED FOR EMERGENCY REFERENCE ONLY" watermark + full 811/not-a-locate disclaimer ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)).
- Format constraint: legible at arm's length, in the dark, printed in B/W on a shop wall.

### D2 — Staff Emergency Map (private link, no login for pilot)
- Static Leaflet page over NAIP/satellite imagery or corner-pinned scan of their existing map ([ADR-0007](../adr/ADR-0007-tech-stack.md)).
- Pins for sites and assets; tap an asset → photo, notes, "controls Sites 38–46," confidence, source, last verified.
- Site search box (number/name) → highlights related assets. This is the seed of [PRD-0002](PRD-0002-emergency-mode.md).
- Unlisted URL + per-property token; clearly marked private.

### D3 — Dave Sheet (knowledge-capture worksheet: "what only Dave knows")
- Structured record of every claim gathered during the walkthrough/interview: claim, source person, basis ("memory," "I repaired it in 2019," "old map says"), confidence, open questions ("nobody knows where Row D sewer runs"), and a **"do not trust" list**.
- Delivered as a clean document; doubles as the gap list that sells the $250/yr verification walk.

## Fulfillment workflow (must be documented as it runs — it becomes the product spec)

1. **Intake (remote, 30 min):** collect existing map (photo/scan/PDF), PMS site-list CSV if any, recent incident stories, software in use.
2. **Capture (on-site walk 2–4 hrs, or guided-video walk if remote):** staff walks property; founder records pins (GPS app or marked-up imagery), photos, voice notes; interviews the veteran.
3. **Assembly (off-site, ≤2 days):** spreadsheet matching the [ADR-0006](../adr/ADR-0006-data-model-primitives.md) primitives → Leaflet page → PDF → Dave Sheet.
4. **Review call (45 min):** correct errors live with staff; corrections logged as new `last_verified` dates.
5. **Delivery:** UtilityBinder Emergency PDF + Staff Emergency Map link + Dave Sheet + raw export (CSV/GeoJSON/photos per [ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)).

## Scope limits (refuse, with referral)

- "Mark where it's safe to dig" → refer to 811 + private locator ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)).
- Guest-facing maps → their PMS does that.
- Work-order system → out of scope ([ADR-0001](../adr/ADR-0001-product-scope-positioning.md)).
- >75 sites/40 assets in the $499 tier → quote the $999 tier.

## Success metrics

- ≤ 6 founder-hours per pilot by pilot #3 (excluding travel).
- Staff can answer the "Site 42 leak" question from D1/D2 in <60 seconds, demonstrated on the review call.
- ≥1 of the first 2 pilots converts to the $29–49/mo hosted map or books a verification walk.
- Documented list of every manual step that took >15 min (the build backlog for the actual product).
