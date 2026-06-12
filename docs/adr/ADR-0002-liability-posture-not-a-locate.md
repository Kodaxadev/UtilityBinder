# ADR-0002: Liability posture — "not a locate," enforced by design

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md](../research/market-validation.md) §1, §2, §7

## Context

Buried-utility damages numbered 196,977 reported events in 2024 (CGA DIRT) with societal costs estimated at ~$30B (2019 CGA estimate; later estimates higher). If anyone relies on our records to excavate and hits a line, the legal exposure could end the business. The product's entire value is *records of uncertain, human-sourced knowledge* — the opposite of locate-grade data. Ambiguity about that distinction is the single biggest existential risk.

## Decision

1. **Product claim:** UtilityBinder is an internal records and emergency-reference tool. It is never marketed, labeled, or sold as utility locating, mapping for excavation, damage prevention, or survey.
2. **Disclaimer everywhere, structurally:** Every screen that renders infrastructure data, every PDF, every export file (including CSV/GeoJSON metadata headers) carries: *"Staff memory record — NOT a utility locate. Do not rely on this for excavation. Call 811 before digging; private lines may require a private utility locator."* PDFs additionally carry a **"PRINTED FOR EMERGENCY REFERENCE ONLY"** watermark. This is generated at the rendering layer so no template can omit it.
3. **Data model enforces humility:** Every asset and dependency requires a `source` (staff memory / old map / photo / as-built / contractor note / private locate) and `confidence` (low/medium/high) plus `last_verified` date. Free-text notes may mention depth; structured fields may not.
4. **Structural firewall — the app must be *incapable* of drifting into locate territory.** The following are banned from schema, UI, exports, and marketing copy; adding any of them requires superseding this ADR with counsel sign-off:
   - structured **depth** fields
   - **tolerance zones** (also patent-barred, [ADR-0003](ADR-0003-patent-risk-avoidance.md))
   - any **"safe to dig"** state, flag, or wording
   - **excavation clearance** outputs of any kind ("clear/not clear")
   - **GPR / GNSS / RTK** integrations or language
   - **accuracy grades** or precision classes that read as survey-grade (no "±x cm," no SUE quality levels A–D)
   - **route-to-utility / proximity warnings** for equipment or excavators
   - every contractor-facing and exported PDF carries the **emergency-reference watermark**, injected at the rendering layer (no template can omit it)

   No feature may take "dig" as an input or produce "clear/not clear" as an output. The Emergency Reference Packet ([PRD-0004](../prd/PRD-0004-exports-contractor-handoff.md)) leads with the 811 warning and frames all content as unverified prior knowledge.
5. **Business hygiene before first paid pilot:** form an LLC; carry general liability + professional (E&O) insurance; pilot agreement includes a non-reliance clause and IP/data terms (customer owns their data). A lawyer reviews the disclaimer language and pilot agreement once before pilot #1 — this is a budgeted line item, not optional.
6. **Positive reframe in sales:** the 2024 DIRT root-cause finding (locator errors "likely mask… inaccurate maps… abandoned facilities") may be cited as evidence the *records problem* is real — never as a claim that we *prevent damages*.

## Consequences

- Some buyers will ask for "just tell me where it's safe to dig." That request is a disqualifier, not a roadmap item — they need PointMan/GPRS/a locator, and we say so (this builds trust and referral positioning).
- The watermark/disclaimer-at-render-layer requirement constrains the PDF/export architecture ([ADR-0007](ADR-0007-tech-stack.md)).
- Insurance + legal review adds ~$1.5–3k pre-revenue cost. Accepted as the price of operating in this domain.
- Any item on the §4 banned list may be revisited only by a superseding ADR with counsel sign-off and a forced-confidence UI; until then the list is absolute.
