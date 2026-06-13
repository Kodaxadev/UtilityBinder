# ADR-0013: Pricing & packaging

**Status:** Accepted
**Date:** 2026-06-13
**Evidence:** [go-to-market §2](../gtm/go-to-market.md) (offer ladder); [competitive-landscape](../research/competitive-landscape.md) (PMS price floors); [market-validation §7](../research/market-validation.md) (locate/GPR anchors); [ADR-0005](ADR-0005-service-assisted-gtm.md) (money-gated validation); [ADR-0008](ADR-0008-export-first-no-lock-in.md) (free export); [PRD-0005](../prd/PRD-0005-landing-page-intake.md) (public pricing)

## Context

The offer ladder is fully worked out in [go-to-market §2](../gtm/go-to-market.md), the price anchors in [market-validation §7](../research/market-validation.md), and public display rules in [PRD-0005](../prd/PRD-0005-landing-page-intake.md) — but pricing has never been ratified as a decision record, so the rationale and the hard constraints (what the price must *never* imply, what must stay free, the no-discount rule during validation) are easy to erode under a buyer's pushback. Pricing in this category is also load-bearing for two existential commitments: the liability posture ([ADR-0002](ADR-0002-liability-posture-not-a-locate.md)) — we must never price as though we sell locate-grade certainty — and the trust posture ([ADR-0008](ADR-0008-export-first-no-lock-in.md)) — export stays free forever. This ADR fixes pricing as policy.

## Decision

1. **Anchor to the locate visit, not to SaaS.** The reference price is *one private utility locate* ($500–$1,000, and the paint washes off) and GPR services (~$250/hr) ([market-validation §7](../research/market-validation.md)). The pitch is **"one locate visit's price, but the knowledge stays"** — never "cheaper software." We never claim to replace a locate ([ADR-0002](ADR-0002-liability-posture-not-a-locate.md)).

2. **The offer ladder and each tier's role:**

   | Offer | Price | Role |
   |---|---|---|
   | Emergency PDF Mini (one area, ≤25 assets, PDF only) | $299 | **Objection handler only — never lead with it** |
   | **Emergency Utility Map Pilot** (≤75 sites, ≤40 assets; Emergency PDF + Staff Emergency Map + Dave Sheet) | **$499** | **Default offer; the validation instrument** ([PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md)) |
   | Map Conversion + Verification Walk | $999 | Premium pilot / deeper learning |
   | Hosted Staff Map subscription | $29–49/mo | Retention; priced under PMS floors (see §3) |
   | QR + printed emergency kit | $149–249 | Physical-artifact margin; printing outsourced (~$10–25 COGS). **Not on the public site until pilot #1 ships** |
   | Annual verification walk / refresh | $250–750 | The renewal ritual; triggered by the staleness report ([PRD-0003](../prd/PRD-0003-asset-dependency-capture.md)) |
   | Full data export | **$0 forever** | Trust weapon ([ADR-0008](ADR-0008-export-first-no-lock-in.md)) |

3. **The subscription ceiling is a hard constraint:** the hosted map stays **below the cheapest campground PMS minimum** (CampLife $99/mo + $3.50/res — [competitive-landscape](../research/competitive-landscape.md)). It must read as an add-on the operator keeps alongside their PMS, never a line item they weigh against it. Hence $29–49/mo, and never above the PMS floor without superseding this ADR.

4. **Money-gated validation — no free pilots, no discounting during discovery.** The $499 pilot price is fixed through the validation phase ([ADR-0005](ADR-0005-service-assisted-gtm.md)); free or discounted pilots are forbidden because they destroy the only signal that matters (willingness to pay). A "yes, but free?" is a disqualifier, not a negotiation.

5. **Price discovery happens only after the gate passes.** Per [go-to-market §4](../gtm/go-to-market.md): once ≥2 pilots are delivered and the day-90 gate passes, the next 3 pilots are priced at **$749** to probe elasticity. Subscription and walk pricing are revisited then with real fulfillment-cost data — not before.

6. **Pricing is displayed openly** ([PRD-0005](../prd/PRD-0005-landing-page-intake.md)): the $499 pilot, the $299 objection-handler, the $999 premium, and the $29–49/mo subscription are public, with "your data exports free, always" stated beside them. Transparent pricing is itself a trust signal to a small operator wary of sales-led enterprise vendors ([competitive-landscape](../research/competitive-landscape.md): ARC Facilities' pricing is undisclosed; we are the opposite).

7. **Pricing copy obeys the liability firewall.** No tier is ever described in terms that imply excavation safety, "clear to dig," or locate-grade accuracy ([ADR-0002 §4](ADR-0002-liability-posture-not-a-locate.md)). We sell *records and emergency reference*, priced accordingly.

## Consequences

- The single most likely failure mode — buyers who love it but won't pay — is surfaced early and cheaply, because the price is real and fixed during validation ([go-to-market §6](../gtm/go-to-market.md)).
- Margins are deliberately thin on the subscription and the printed kit; the pilot setup fee and verification walks carry the economics. This is a cashflow business by design ([ADR-0004](ADR-0004-beachhead-market.md)), not a venture-scale ARR story.
- Free export forever raises churn but earns re-subscription at the next infrastructure change instead of resentment ([ADR-0008](ADR-0008-export-first-no-lock-in.md)) — an accepted trade.
- Changing the pilot price during validation, introducing free pilots, lifting the subscription above the PMS floor, or paywalling export each require superseding this ADR. The post-gate $749 ramp is pre-authorized; nothing below the gate is.
