# ADR-0010: The ARC Facilities boundary — specialize in outdoor site-dependency records

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md §6](../research/market-validation.md), [competitive-landscape.md](../research/competitive-landscape.md)

## Context

ARC Facilities ([arcfacilities.com](https://www.arcfacilities.com/)) is the proven enterprise analog: mobile access to building plans, shutoffs, and critical documentation — sold to hospitals, school districts, and corporate campuses. It even uses our institutional-memory framing (legacy knowledge lost when key people retire). ARC is simultaneously:

- **Validation:** the category ("instant shutoff/emergency info as a product") has paying buyers upmarket.
- **Warning:** "map with pins + documents" is not a moat. If we drift toward general facility-document management, we are a worse ARC with no sales team.

## Decision

A named strategic constraint, binding on roadmap and marketing:

> **We will not compete on general facilities-document search, building plans/as-built management, AI document retrieval, enterprise emergency management, first-responder sharing, or institutional campus workflows. We specialize in *outdoor private-site dependency records*: which shutoff, valve, breaker, cleanout, meter, or utility point affects which site/row/area.**

Operationally:

1. **The differentiating primitive is the `Dependency`** (asset → controls/serves/feeds → sites, with provenance) — not document storage. ARC organizes *documents about buildings*; we organize *claims about outdoor infrastructure relationships*. Features are judged by whether they strengthen that primitive.
2. **Document handling stays minimal:** attachments only ([ADR-0006](ADR-0006-data-model-primitives.md)) — no OCR, no document search, no plan-room features. A customer asking for "all our building plans in the app" gets pointed to ARC-class tools.
3. **Buyer firewall:** we do not pursue hospitals, school districts, municipalities, or any buyer with a facilities *department* — they have ARC-shaped needs and procurement. Our buyer has a maintenance *person*, not a department ([ADR-0004](ADR-0004-beachhead-market.md)).
4. **Language firewall:** marketing never uses "facility management," "as-built management," or "emergency management platform." We say: emergency shutoff map, site dependency records, staff memory.
5. **Tripwire (carried from the competitive landscape):** if ARC or similar ships an outdoor-hospitality or small-property tier, reassess within 2 weeks — the response is deeper vertical specialization (campground language, PMS imports, the paid conversion walk), not feature breadth.

## Consequences

- Roadmap stays narrow even when enterprise-flavored feature requests arrive with money attached; saying no to a school district is policy, not a missed sale.
- The pitch gets sharper: "ARC Facilities for hospitals exists and costs enterprise money; this is the $499 version for your park — and it knows what a Row C pedestal is."
- The moat thesis is explicit: outdoor-property packaging + paid conversion workflow + campground/RV vocabulary + low-friction pilot. None of that is technology; all of it must show up in the GTM execution ([gtm/go-to-market.md](../gtm/go-to-market.md)).
