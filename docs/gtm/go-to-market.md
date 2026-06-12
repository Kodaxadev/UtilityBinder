# Go-to-Market Plan — UtilityBinder

**Date:** 2026-06-11
**Stage gate:** This plan executes discovery + pilots only. Product build is gated by [ADR-0005](../adr/ADR-0005-service-assisted-gtm.md). Kill criteria in [discovery-kit.md](discovery-kit.md) override everything below.

## 1. Thesis (one paragraph)

Independent campgrounds/RV parks own private utility networks that 811 will never mark and their PMS will never map. Their current system is a binder, Google Earth pins, and one veteran employee. Institutions already buy the solution upmarket (ARC Facilities for buildings); nobody sells it to a 120-site family park at a park-sized price. We sell a **$499 done-for-you emergency shutoff map** (one locate-visit's worth of money for knowledge that doesn't wash away), retain with a **$29–49/mo hosted staff map**, and expand with **annual verification walks**. Evidence: [market-validation.md](../research/market-validation.md).

## 2. Offer ladder

| Offer | Price | Role |
|-------|-------|------|
| Emergency PDF Mini (one area, ≤25 assets, PDF only) | $299 | Objection handler only — never lead with it |
| **Emergency Utility Map Pilot** (≤75 sites, ≤40 assets, UtilityBinder Emergency PDF + Staff Emergency Map + Dave Sheet) | **$499** | Default offer; the validation instrument ([PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md)) |
| Map Conversion + Verification Walk (staff interview, confidence tagging, binder, QR draft) | $999 | Premium pilot / deeper learning |
| Hosted staff map subscription | $29–49/mo | Retention proof; priced deliberately under PMS minimums (CampLife $99/mo) so it's an add-on, never a tradeoff |
| QR + printed emergency kit | $149–249 | Physical artifact margin — printing/lamination outsourced to a local print shop (~$10–25 COGS); **not on the public site until pilot #1 is delivered** |
| Annual verification walk / refresh | $250–750 | The renewal ritual; triggered by staleness report ([PRD-0003](../prd/PRD-0003-asset-dependency-capture.md)) |
| Full export | $0 forever | Trust weapon ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)) |

Anchors with evidence: a single private locate visit runs $500–$1,000 and its paint washes off; GPR services run ~$250/hr ([market-validation.md §7](../research/market-validation.md)). The pitch: *"one locate visit's price, but the knowledge stays."* Never claim to replace locates.

## 3. Channels (ranked)

1. **Direct outreach** — 50 hand-picked parks: independent, 50–200 sites, founded pre-2005, within driving distance first (walks are in person early). Source from state association directories, Campendium/Good Sam listings filtered by age/size signals.
2. **State & national associations** — state ARVC affiliates, OHCE (Outdoor Hospitality Conference & Expo): newsletter pieces, "emergency preparedness" angle webinars. Associations love safety content; we are safety-adjacent without claiming safety outcomes.
3. **Owner communities** — campground-owner Facebook groups and forums: contribute genuinely useful free content (a printable one-page "emergency shutoff checklist" template) → soft CTA.
4. **Trade press** — Woodall's Campground Magazine, Modern Campground: pitch the story as "what parks can learn from how hospitals manage shutoff records."
5. **Contractor flywheel (later)** — every Emergency Reference Packet ([PRD-0004](../prd/PRD-0004-exports-contractor-handoff.md)) is a branded artifact in a local contractor's hands; plumbers/electricians who serve multiple parks become referrers.
6. **PMS partnerships (later)** — bolt-on posture; CSV import from Campspot/CampLife exports. Approach only after 10+ referenceable customers.

## 4. 30 / 60 / 90 plan

### Days 1–30 — artifacts + outreach (no product code)
- Name clearance day ([ADR-0009](../adr/ADR-0009-naming-trademark.md)); LLC + insurance quotes started ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md) §5).
- Build: landing page + intake ([PRD-0005](../prd/PRD-0005-landing-page-intake.md)); sample emergency PDF (fictional park); demo Leaflet map; outreach sequences.
- Contact 50 parks; goal: 15 completed interviews ([discovery-kit.md](discovery-kit.md) script).

### Days 31–60 — pilots
- Close ≥2 paid pilots from interview hot leads; fulfill manually ([PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md)); document every step + timing.
- Run the kill-criteria checkpoint at day 45 regardless of pipeline optimism.

### Days 61–90 — decide
- **Pass** (thresholds met): write pilot case study; raise pilot price to $749 for the next 3 (price-discovery); begin internal tooling that makes pilot #3 take ≤6 hours; schedule product build per PRDs 0002–0004.
- **Fail:** execute kill memo; archive learnings; evaluate re-aim targets ([ADR-0004](../adr/ADR-0004-beachhead-market.md) consequences).

## 5. Financial sketch (solo, conservative)

- Pre-revenue costs: LLC + insurance + legal review ~$2–3.5k; tools/hosting <$50/mo; travel per local pilot ~$50–150.
- Break-even on cash costs: ~5–7 pilots.
- Year-1 realistic good case: 10–15 pilots ($5–10k), 8 subscriptions (~$3–4k ARR), 4 verification walks (~$1.5k) → **~$10–15k revenue while validating**. The decision at that point is scale-the-motion (hire/automate), raise prices, or fold the learning into a bigger play. Consistent with [ADR-0004](../adr/ADR-0004-beachhead-market.md): cashflow business, not venture story.

## 6. Risks & mitigations (top 5)

| Risk | Mitigation |
|------|------------|
| Buyers like it, won't pay (the classic) | Money-gated validation only; no free pilots ([ADR-0005](../adr/ADR-0005-service-assisted-gtm.md)) |
| Liability event from misuse of records | Structural disclaimers, no-locate posture, insurance, counsel review ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)) |
| ARC Facilities / GPRS SiteMap moves down-market | Speed + vertical trust; tripwires defined ([competitive-landscape.md](../research/competitive-landscape.md)) |
| Pilot fulfillment doesn't compress below ~6 hrs | Timing log from pilot #1; if pilot #5 still >10 hrs, raise prices or kill ([discovery-kit.md](discovery-kit.md)) |
| Seasonality (parks busy May–Sep, buying happens off-season) | Time pushes for Sep–Nov and Jan–Mar; mid-season pitch = "we do the work, you spend 3 hours total" |

## 7. What success buys (the bigger arc, explicitly deferred)

The engine — *service-assisted memory maps for small institutions with physical infrastructure and no GIS department* — generalizes to fairgrounds, marinas, camps, HOAs/lake associations, and eventually MH parks ([ADR-0004](../adr/ADR-0004-beachhead-market.md)). No expansion until 25 paying campground customers prove the motion.
