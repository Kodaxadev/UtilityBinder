# ADR-0003: Patent risk avoidance — stay out of the precision-locate lane

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md](../research/market-validation.md) §8

## Context

ProStar Geocorp (PointMan) holds an active, publicized patent portfolio covering utility-asset data workflows, including:

- US 9,619,573 — system and method for calculating **tolerance zones** for utility assets
- US 9,292,813 — system and method for **collecting and organizing information related to utility assets**
- CA 2,980,438 — tolerance-zone calculation (Canada)

ProStar markets itself aggressively as a patent holder ("pioneer patent" press releases). The brainstorm also flagged adjacent expired patents; revival of fee-lapsed patents is possible when delay is "unintentional," so expired-patent arbitrage is not a strategy.

## Decision

1. **Feature firewall.** UtilityBinder will not implement: tolerance-zone calculation; precision GNSS/RTK capture workflows; locate-grade accuracy metadata; proximity/warning alerts relative to excavation equipment; GPR/EMI sensor integration; field-crew damage-prevention workflows. These are both the patent minefield and the wrong product ([ADR-0001](ADR-0001-product-scope-positioning.md)).
2. **Vocabulary firewall.** Marketing and UI avoid the terms "locate," "tolerance zone," "damage prevention system," "precision mapping." We say: records, memory, emergency reference, shutoff map, Emergency Reference Packet.
3. **Design-around posture, not legal-opinion posture.** We do not pay for freedom-to-operate analysis at pilot stage; we stay categorically outside the claimed space instead. If the product later approaches that space (e.g., importing professional locate deliverables as *attachments* is fine; *generating* them is not), commission an FTO review first (new ADR).
4. **Prior-art file.** Keep dated notes of our independent development and the generic prior art for "pins + photos + notes on a map" (Google My Maps, QGIS, Fulcrum all predate us) in case of nuisance assertions.

## Consequences

- Closes off the highest-margin adjacent market (utility contractors / SUE) — accepted; it was already excluded by scope and price point.
- "Attachments of professional locate reports" is the approved pattern for when customers have real locate data: we store the PDF, we don't structure it.
- Cheap insurance: the entire posture costs nothing and aligns with the liability ADR.
