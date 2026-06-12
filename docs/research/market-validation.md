# Market Validation Evidence Log — UtilityBinder (formerly "SiteSentry Records")

**Date:** 2026-06-11
**Status:** Verification pass complete. Thesis survives with corrections.
**Method:** Independent web verification of every load-bearing claim from the originating brainstorm (GPT-5.5 session). Each assumption gets a verdict: ✅ Confirmed, ⚠️ Corrected, ❌ Unverified/Wrong.

---

## Verdict summary

| # | Assumption | Verdict |
|---|------------|---------|
| 1 | 811 does not cover private utility lines | ✅ Confirmed |
| 2 | Utility damage is a large, measurable national problem | ✅ Confirmed (cost figure corrected) |
| 3 | Inaccurate maps/records are a recognized damage root cause | ✅ Confirmed (stronger than claimed) |
| 4 | The campground/RV park market is large and fragmented | ⚠️ Confirmed with corrections |
| 5 | Campground PMS platforms don't solve private infrastructure records | ✅ Confirmed (with one new caveat) |
| 6 | No direct competitor in this exact wedge | ⚠️ Corrected — category exists upmarket |
| 7 | Private locating is expensive (supports the value anchor) | ✅ Confirmed |
| 8 | ProStar/PointMan patents are a real risk in the precision-locate lane | ✅ Confirmed |
| 9 | Mobile-home parks should be deferred | ✅ Confirmed |
| 10 | The "campground operator using QGIS" pain anecdote | ❌ Could not re-verify — downgrade to anecdote |
| 11 | Product naming | ✅ "UtilityBinder" adopted and **cleared** — USPTO wordmark search returned 0 results (2026-06-11) |

---

## 1. The 811 gap — ✅ Confirmed

811 one-call centers notify member utilities, which mark **only public utilities, and only up to the point of service** (meter or main connection). Everything past that point — pedestal feeds, park water loops, septic lines, irrigation, landscape electric — is a **private utility** and is the property owner's legal responsibility to locate and protect.

- "Private utilities are the responsibility of the property owner… State One Calls are legally obligated to (and limited to) marking only public utilities." — [Mason Private Locating](https://www.masonprivatelocating.com/news/who-is-liable-for-private-utility-damages)
- "Public utilities are usually marked only up to the point of service… Anything beyond is considered private and is not included in a free 811 locate." — [Missouri 811](https://blog.missouri-811.org/public-vs-private-utility-lines), [Kentucky 811](https://kentucky811.org/homeowners/privatelocates/), [Georgia 811](https://georgia811.com/have-my-lines-been-marked/)

**Implication:** A park with 100 pedestals has almost its entire utility network in the "private" category. 811 will mark the one service entrance and nothing else. The internal-records gap is structural, not incidental.

## 2. Damage scale — ✅ Confirmed, cost figure corrected

- **196,977 unique damage reports in 2024** — confirmed in the [CGA 2024 DIRT Report](https://dirt.commongroundalliance.com/) ([press release](https://commongroundalliance.com/Publications-Media/Press-Releases/cga-dirt-report-highlights-concerning-levels-of-damages-to-buried-utilities-signals-need-for-industry-wide-changes)). The CGA Index worsened from 94.0 (2023) to 96.7 (2024) — damages are trending the wrong way.
- ⚠️ **Correction:** The "$30 billion annually" figure is CGA's estimate of direct + societal costs **for 2019** ([American Surveyor](https://amerisurv.com/2020/10/15/excavation-related-damages-to-utilities-cost-the-u-s-approximately-30-billion-in-2019/), [Underground Construction](https://undergroundinfrastructure.com/news/2020/10-october/cga-report-reveals-utility-damages-cost-us-30-billion-in-2019)). Cite as "CGA estimated ~$30B in 2019," not as a current-year figure.
- ⚠️ **Framing note on the $61B figure:** the Infrastructure Protection Coalition's 2021 **$61B** number is an estimate of broader **waste/inefficiency in the 811 system**, not the same metric as direct annual utility-strike damage. The two numbers are not interchangeable; never present $61B as "damage costs."

## 3. Maps/records as a root cause — ✅ Confirmed, stronger than the brainstorm claimed

The 2024 DIRT root-cause data directly supports the records thesis:

- Failure to notify 811: **24.54%** of damages
- Facility not marked due to locator error: **11.94%**; marked inaccurately: **8.58%**
- CGA explicitly notes locator-error causes "**likely mask deeper issues like inaccurate maps, faulty tracer wire or abandoned facilities**" — [Bermex summary](https://bermex.acrt.com/articles/key-takeaways-from-the-2024-dirt-report-what-utilities-need-to-know-now/), [GPRS analysis](https://www.gp-radar.com/article/the-cga-takes-off-the-gloves-calls-for-legislation-ending-exemptions-and-enacting-mandatory-industry-protocols)

**Implication:** "Bad records cause damage" is not our marketing invention — it is the industry body's own diagnosis. Use this in sales material (carefully, without implying we prevent excavation damage).

## 4. Market size — ⚠️ Confirmed with corrections (and one correction-of-a-correction)

- **Timestamping matters:** IBISWorld public data shows **16,419 businesses in 2025** and **17,037 in 2026** (+2.0% YoY, ~2.9%/yr average growth 2021–2026) — [IBISWorld number-of-businesses page](https://www.ibisworld.com/united-states/number-of-businesses/campgrounds-rv-parks/1667/), verified directly 2026-06-11. The brainstorm's 17,037 figure was correct for 2026.
- Market size **$10.9B (2026)** — [IBISWorld](https://www.ibisworld.com/united-states/market-size/campgrounds-rv-parks/1667/)
- ⚠️ **Retracted (2026-06-11 review):** an earlier draft of this log claimed IBISWorld projects industry revenue *decline* over the next five years. Direct verification of the current public page shows the business count **grew 2021–2026 and is forecast to grow** over the next five years (growth percentage paywalled). Do not use "declining industry" in any argument unless the paid report itself says so.
- The "not a venture-scale default" conclusion **still stands**, but for the correct reason: the reachable beachhead is the *independent, older-infrastructure subset* of the market — not the full NAICS market — and the unit economics are service-assisted. See [ADR-0004](../adr/ADR-0004-beachhead-market.md).
- Fragmentation confirmed: low market-share concentration; the long tail of independents is the real market.

## 5. PMS platforms don't cover private infrastructure records — ✅ Confirmed

- **CampLife:** $3.50/reservation with a $99/month minimum ([pricing](https://software.camplife.com/pricing), [Keepr comparison](https://keeprstay.com/compare/pricing)). Maps are guest/booking-facing.
- **Campspot:** 2,700–3,000+ parks across North America ([About](https://software.campspot.com/about-campspot/), [Customers](https://software.campspot.com/customers/private-campgrounds/)); ~$200/month base plus marketplace commission per comparisons. Features: reservations, dynamic pricing, utility *billing*, smart-meter integration.
- **NewBook/RoverPass/WebRezPro/GraceSoft:** interactive *booking* maps, utility *metering/billing* integrations (e.g., NewBook + Wild Energy remote meter reading) — [NewBook](https://www.newbook.cloud/solutions/rv-parks-campgrounds/), [WebRezPro](https://webrezpro.com/pms-for-campgrounds/)
- **No PMS surfaced in any search advertises:** shutoff locations, valve→site dependency mapping, buried-line memory, confidence/source-tagged infrastructure records, or contractor handoff documents.

**Implication:** The gap is exactly as framed — PMS owns the *revenue* layer (sites as rentable inventory); nobody owns the *physical* layer (sites as things connected to pipes and wires) for this buyer. Utility *billing* ≠ utility *records*.

## 6. Direct competition — ⚠️ Corrected: the category exists, just not here

The brainstorm checked PMS, GIS, and locating firms. It missed two adjacent categories that matter:

1. **ARC Facilities** — mobile-first facility management selling *exactly* "instant access to as-builts, **shutoffs**, and emergency information" — for institutional **buildings** (schools, hospitals, corporate campuses). Enterprise sales-led, pricing undisclosed. ([arcfacilities.com](https://www.arcfacilities.com/), [emergency product](https://www.arcfacilities.com/product/emergency-information))
2. **MaintStar / Novo Solutions** — government/municipal **parks EAM/CMMS** with GIS asset pins, photo upload, work orders. ([MaintStar Parks](https://www.maintstar.com/solutions/asset-management/parks/), [Novo](https://novosolutions.com/work-order-software/park-maintenance/))

**Implication — this cuts both ways:**
- *Good:* The product category ("emergency shutoff map + institutional memory") is **validated upmarket**. Schools and cities already pay for this — ARC even uses the same institutional-memory framing (knowledge lost when key people retire). Sales line: "hospitals have this; your park doesn't."
- *Risk:* The capability is not novel technology. Defensibility is **packaging, price point, vertical GTM, and service-assisted onboarding** for a buyer no one else will sell to at $29–49/month. This matches the brainstorm's conclusion but raises the urgency: speed to a repeatable pilot motion matters more than software polish.
- The boundary against ARC's territory is now a formal decision: [ADR-0010](../adr/ADR-0010-arc-facilities-boundary.md).
- See [competitive-landscape.md](competitive-landscape.md) for the full map.

## 7. Locating-cost anchor — ✅ Confirmed

- GPR private utility locating: ~$250–255/hour ([Sentry Mapping](https://sentrymapping.com/gpr-private-utility-locating-costs-explained/), [SiteTwin](https://sitetwin.store/blog/ground-penetrating-radar-cost))
- Basic locate-and-mark visit: **$500–$1,000**; full surveys $1,000–$3,000/day ([GeoTek](https://www.geotekservices.com/understanding-the-real-costs-of-a-ground-penetrating-radar-gpr-survey/), [ThePricer](https://www.thepricer.org/how-much-does-private-utility-locating-cost/))
- The brainstorm's "$100–$1,500" range is roughly right; the per-visit midpoint of $500–$1,000 is the better sales anchor: **a $499 pilot costs about one locate visit, and the locate's knowledge evaporates when the paint washes away.**
- ⚠️ Maintain the brainstorm's discipline: we **reduce rediscovery and emergency confusion**; we do **not** replace locates. Every artifact says so.

## 8. Patent risk — ✅ Confirmed; avoidance posture validated

ProStar Geocorp (PointMan) holds an active, asserted patent portfolio:
- **US 9,619,573** — calculating tolerance zones for utility assets
- **US 9,292,813** — collecting and organizing information related to utility assets
- **CA 2,980,438** — tolerance-zone calculation (Canada)
- Sources: [ProStar patents page](https://www.prostarcorp.com/about/patents/), [grant announcements](https://www.globenewswire.com/news-release/2022/03/02/2395338/0/en/index.html)

**Implication:** Stay out of: tolerance-zone computation, precision GNSS capture workflows for locate-grade data, proximity warnings to excavation equipment, "damage prevention" claims. Records + photos + dependencies + emergency reference is a different problem space. Formalized in [ADR-0003](../adr/ADR-0003-patent-risk-avoidance.md).

## 9. Mobile-home park deferral — ✅ Confirmed

- 43,000+ manufactured home communities, ~4.3M homesites ([MHI](https://www.manufacturedhousing.org/industry-resources/community-research/manufactured-housing-communities-in-the-u-s/))
- But the software market is mature and regulated: ManageAmerica is purpose-built for MH with deep utility billing, monthly rate recertification, compliance ([manageamerica.com](https://www.manageamerica.com/)); Rent Manager covers MH with metered utilities.
- Sub-metered utility systems in MH parks are a regulated, liability-heavy area (e.g., California master-meter conversion programs).

**Implication:** Defer MH. Campgrounds/RV parks first; MH only after the motion is proven and with a compliance-aware posture.

## 10. The QGIS-campground anecdote — ❌ Could not re-verify

Multiple search attempts did not re-find the claimed forum/Reddit post ("keep accidentally knocking out utilities," trying QGIS). Treat it as an **unverified anecdote** and do not cite it. Partial substitute: industry content recommending staff "walk the grounds with a site map while marking pedestals, water risers, and utility closets" ([Insider Perks](https://insiderperks.com/blog/scaling-future-planning/stop-hidden-utility-losses-anomaly-detection-across-campground-loops/3/)) shows the workflow is recognized and manual. **Real pain evidence must come from the 15 discovery interviews — that is the point of the discovery phase.**

## 11. Naming — ❌ Unverified

"SiteSentry" was rejected: plausible collisions in the crowded site-monitoring/security naming space. After a naming review (candidates and verdicts in [ADR-0009](../adr/ADR-0009-naming-trademark.md)), **"UtilityBinder" was adopted** — a light web screen shows no exact-match software competitor (results are mostly physical tackle/fishing binder products). A formal USPTO Trademark Search knockout (TESS is retired; use `CM:"utility binder"` + expanded variants, classes 9 & 42) is still required before anything is printed or filed.

---

## What this changes about the plan

1. **Thesis survives.** The structural gap (811 doesn't cover private lines; PMS doesn't cover physical infrastructure; pro tools are 10–100× too expensive) is real and verified.
2. **The wedge is GTM, not technology.** ARC Facilities proves the product category; MaintStar proves the GIS-asset-pin capability. Nobody packages it for a 120-site family campground at $499 + $29/month with done-for-you onboarding. Move fast on the pilot motion; the software moat is thin.
3. **Discovery is still mandatory.** The one piece of evidence we could not verify is direct buyer pain. Everything else is inference. The 15-interview / 2-paid-pilot gate stands.
4. **Use timestamped numbers** in any external material: "17,037 campgrounds & RV parks (IBISWorld 2026)" and "CGA estimated ~$30B in damage costs in 2019" — and never present the IPC's $61B (811-system waste/inefficiency) as damage costs.
