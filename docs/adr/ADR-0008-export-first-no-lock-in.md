# ADR-0008: Export-first, no data lock-in

**Status:** Accepted
**Date:** 2026-06-11

## Context

The records are emotionally and operationally irreplaceable to the customer — they are literally the point of the product. The buyer is a small operator with justified fear of SaaS abandonment ("what happens to our map if you disappear?"). Solo-builder ventures have exactly that risk profile, and the buyer knows it. Trust is the purchase blocker more than price.

## Decision

1. **Every plan, including churned customers, gets full export free:** CSV (all primitives, provenance included), GeoJSON (geometry + properties), all photos in original resolution, and the generated PDFs. One click, no sales call, no retention dark patterns.
2. **Exports are the same serializer as the app** — they cannot rot separately ([ADR-0007](ADR-0007-tech-stack.md)).
3. **Continuity promise in the pilot agreement:** if the service shuts down, customers receive their full export and the printable artifacts remain theirs. (The PDFs and laminated maps are durable deliverables independent of our uptime — this is a deliberate product property, not a side effect.)
4. **PMS-adjacent interop:** import site lists from PMS CSV exports (Campspot/CampLife/RoverPass); never require API partnerships to function.
5. Disclaimers ride along in every export (file headers/metadata + a bundled README) per [ADR-0002](ADR-0002-liability-posture-not-a-locate.md).

## Consequences

- "You own your data, here's the proof" becomes a closing argument against both DIY inertia and big-vendor fear.
- Churn is easier — accepted. A product whose artifacts (laminated map, binder PDF) keep working after churn earns re-subscription at the next infrastructure change instead of resentment.
- Slight build cost (export pipeline early). Mitigated by it being the same code path as the pilot deliverables.
