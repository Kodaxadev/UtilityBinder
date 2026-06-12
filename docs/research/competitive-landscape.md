# Competitive Landscape — UtilityBinder

**Date:** 2026-06-11
**Companion to:** [market-validation.md](market-validation.md)

The product sits in a white space bounded on **five** sides (the brainstorm identified four; verification added a fifth — facility-management emergency-info products).

## The five-sided squeeze

| Side | Players | What they own | Why they don't take this wedge |
|------|---------|---------------|-------------------------------|
| Campground PMS | Campspot (2,700–3,000+ parks), CampLife ($99/mo min + $3.50/res), RoverPass, NewBook, ResNexus, WebRezPro, GraceSoft | Reservations, guest-facing site maps, utility *billing*, metering integrations | Their map is rentable inventory, not physical plant. No shutoffs, dependencies, buried-line memory, or contractor handoff in any marketed feature set. Roadmap incentive is revenue features, not maintenance memory. |
| MH property management | ManageAmerica, Rent Manager, AppFolio ecosystem | Residents, lots, regulated sub-metered utility billing, compliance | Different buyer (property manager vs. owner-operator), regulated billing focus. Reason to defer MH, not a competitor in campgrounds. |
| Pro utility/GIS | PointMan (ProStar), GPRS/SiteMap, ArcGIS Field Maps, Fulcrum, Mergin Maps, QGIS | Locate-grade capture, tolerance zones (patented), SUE deliverables, enterprise GIS | 10–100× our price point; requires GIS skills or pro services; sells to utilities/contractors/municipalities. Patent minefield if we imitate them — so we won't ([ADR-0003](../adr/ADR-0003-patent-risk-avoidance.md)). |
| Facility management / emergency info | **ARC Facilities** (as-builts, shutoffs, emergency info, mobile-first), MaintStar & Novo Solutions (municipal parks EAM/CMMS with GIS pins) | Exactly our value prop — for institutional buildings and city parks departments | Enterprise sales-led, undisclosed pricing, building/as-built-centric data model, no outdoor-hospitality GTM. Validates the category upmarket. Boundary against their territory is formal policy: [ADR-0010](../adr/ADR-0010-arc-facilities-boundary.md). Watch list: if ARC moves down-market into outdoor hospitality, reassess. |
| DIY / status quo | Paper map in the office, the binder, Google Earth/My Maps pins, spreadsheets, Dave's memory and phone photos | Zero cost, zero learning curve | The real competitor. Wins on price, loses on durability: nobody maintains it, it lives in one person's head/account, and it fails exactly at the 2 a.m. emergency. Our pilot must be *less work than the binder*. |

## Positioning consequences

1. **Sales narrative:** "Hospitals and school districts pay for instant shutoff maps (ARC Facilities). Your park's version of that is a binder and a guy named Dave. We build the park-sized version for $499."
2. **Defensibility is the motion, not the code.** Asset pins + photos + a map is replicable in a weekend. What's hard to copy: a repeatable service-assisted conversion process, vertical trust (associations, trade press, referenceable parks), and a liability-safe artifact set refined across dozens of parks.
3. **Partnership posture, not war:** PMS platforms are future channel partners (CSV site import from them; we're a bolt-on, not a rip-out). Never market against them.
4. **Tripwires for reassessment:**
   - A PMS announces an infrastructure/asset layer for operators.
   - ARC Facilities (or similar) launches an outdoor-hospitality or small-property tier.
   - A locating firm productizes "memory maps" as a cheap SaaS upsell (GPRS SiteMap moving down-market is the likeliest version of this).
