# ADR-0004: Beachhead market — independent campgrounds/RV parks; defer MH parks

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md](../research/market-validation.md) §4, §9; [competitive-landscape.md](../research/competitive-landscape.md)

## Context

- IBISWorld public data shows **16,419 US campground/RV park businesses in 2025 and 17,037 in 2026** (+2.0% YoY, ~2.9%/yr average 2021–2026), with the current public page forecasting continued growth over the next five years. Market revenue ~$10.9B (2026). Low concentration, long tail of independents. (An earlier draft cited a revenue-decline forecast; that was retracted after direct verification — see [market-validation.md §4](../research/market-validation.md).)
- 43,000+ manufactured-home communities (~4.3M homesites) look bigger, but the MH software market is mature (ManageAmerica, Rent Manager) and sub-metered utilities are a regulated, liability-heavy domain (e.g., California master-meter conversion programs).
- PMS data shows the upper tier of campgrounds is well-served on revenue tooling (Campspot 2,700–3,000+ parks) but nothing serves physical-plant memory at any tier.

## Decision

**Primary ICP (first 25 customers):** independent US campground/RV park, roughly 50–200 sites, 15+ years old (aging infrastructure), 1–2 maintenance staff, owner-operated, no GIS capability.

**Why campgrounds (stated honestly):** because they look like the **easiest sales cycle**, not because they provably have the worst documentation problem. The ideal first buyer is: independent operator, older infrastructure, one maintenance lead, no facilities department, no GIS person, no corporate procurement, and a real fear of "only Dave knows." Campgrounds/RV parks fit that profile better than MH parks, schools, hospitals, municipalities, or utilities — the documentation problem may be just as bad elsewhere, but the sales cycle gets worse fast. Secondary (opportunistic, same product): rural event venues, retreat/conference centers, fairgrounds, marinas, private lake associations, agritourism farms with lodging.

**Explicitly deferred:** manufactured-home/mobile-home parks; municipalities (procurement friction); large chains (corporate asset systems); utility/construction contractors (need SUE-grade deliverables — see [ADR-0003](ADR-0003-patent-risk-avoidance.md)).

**Honest market math (for our own planning, not a pitch deck):**
- TAM-ish: ~17,000 campgrounds (IBISWorld 2026) + adjacent venue types.
- Realistic serviceable segment: independents with aging infrastructure and no system — assume 30–50% of the long tail ≈ 5,000–8,000 properties.
- A 1% capture (~60 properties) at $499 setup + $29–49/mo ≈ $30k setup revenue + $25–35k ARR. **This is a solo-builder cashflow business, possibly a wedge into a bigger "small outdoor property ops" position — it is not a venture-scale default.** The reason is not industry trajectory (the industry is growing modestly); it is that the *reachable beachhead* is the independent, older-infrastructure subset — not the full NAICS market — served with service-assisted unit economics.

## Consequences

- All discovery outreach, copy, and the pilot offer target the primary ICP exclusively; secondary markets are accepted if they come inbound.
- MH entry requires a new ADR with a compliance review.
- Revenue expectations are set for service-assisted economics: setup fees are the early profit engine, subscriptions the retention proof.
- If discovery shows the ICP won't pay (see kill criteria in [gtm/discovery-kit.md](../gtm/discovery-kit.md)), the engine (memory maps for small institutions) may be re-aimed at the brainstorm's other candidates (e.g., historical societies) — but only after a formal kill decision.
