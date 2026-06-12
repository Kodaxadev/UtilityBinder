# ADR-0001: Product scope and positioning

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md](../research/market-validation.md) §1–6, [competitive-landscape.md](../research/competitive-landscape.md)

## Context

The originating idea drifted through three framings: (a) cemetery record digitization, (b) general "utility mapping for RV parks," (c) private-infrastructure memory + emergency shutoff maps. Verification confirmed:

- 811 marks only public utilities up to the point of service; a park's internal network is legally the owner's problem and is unmapped by default.
- Campground PMS platforms own the reservation/billing layer and their maps are guest-facing inventory, not physical plant.
- Professional GIS/locating tools (PointMan, GPRS, ArcGIS) are priced and skilled far above this buyer, and carry patent risk if imitated.
- The product category ("instant shutoff/emergency info") is already validated upmarket by ARC Facilities for institutional buildings — and absent for small outdoor properties.
- The everyday competitor is the paper binder, Google Earth pins, and one veteran employee's memory.

## Decision

Build **UtilityBinder** (named in [ADR-0009](ADR-0009-naming-trademark.md)): a **private-infrastructure memory layer and emergency shutoff map** for independent outdoor hospitality properties (campgrounds, RV parks, rural venues, retreat centers, fairgrounds, marinas). The product replaces the office binder, the whiteboard, and the veteran employee's phone — not any software.

The product is positioned **below** reservation/PMS software, **below** professional locating, and **above** paper/DIY. It answers seven questions and nothing else:

1. What do we shut off?
2. Where is it?
3. What does it control?
4. Who/what is the source of that claim?
5. How confident are we?
6. When was it last verified?
7. What do we hand a contractor before work starts?

**Marketing leads with the emergency** — canonical hook: *"Know what to shut off when Dave isn't there."* ([ADR-0009](ADR-0009-naming-trademark.md) pairs name and hook); **retention rests on institutional memory** (capturing what Dave knows before Dave retires).

### Explicitly out of scope (V1 and until revisited by a new ADR)

- Reservations, guest-facing maps, anything PMS-shaped
- Utility billing, meter reading
- Work orders / dispatch beyond a geo-tagged note + photo
- Any "safe to dig," locate, tolerance-zone, or excavation-clearance feature ([ADR-0002](ADR-0002-liability-posture-not-a-locate.md), [ADR-0003](ADR-0003-patent-risk-avoidance.md))
- Automated line detection, GPR/RTK integrations
- Mobile-home parks ([ADR-0004](ADR-0004-beachhead-market.md))

## Consequences

- Every feature request gets filtered through the seven questions; anything else is declined or deferred.
- The product can be described in one sentence to a non-technical owner, which is required for the cold-outreach motion in the GTM plan.
- We deliberately forgo larger TAM claims (MH parks, municipalities, contractors) until the beachhead motion is proven.
- Defensibility is the vertical go-to-market and service motion, not the software ([competitive-landscape.md](../research/competitive-landscape.md) §Positioning) — so speed-to-pilot beats feature depth.
