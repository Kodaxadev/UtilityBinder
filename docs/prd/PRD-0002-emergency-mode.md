# PRD-0002: Emergency Mode (the 2 a.m. screen)

**Status:** Specified — build gated on two delivered pilots ([ADR-0005](../adr/ADR-0005-service-assisted-gtm.md))
**Date:** 2026-06-11

## Problem

Water is spraying at Site 42. The person on duty is the newest hire. They have a phone, weak signal, and adrenaline. The product's entire reputation is decided in the next 60 seconds.

## User story

> As on-duty staff, I type or tap a site number and immediately see the shutoffs/cleanouts/panels that affect it, with a photo and plain-language directions to each, so I can act before damage spreads — without calling anyone.

## Requirements

### Functional
1. **Entry:** single search box (site number/name) + tappable site pins on the map. No menus between "open app" and "type 42."
2. **Result:** ranked list of related assets via `Dependency` records ([ADR-0006](../adr/ADR-0006-data-model-primitives.md)), grouped by utility, water first by default:
   - `V-07 — Water shutoff — controls Sites 38–46 — [photo] — "behind shed, west of Row C" — Confidence: Medium (Dave's memory + photo) — Verified 2026-06-11`
3. **Asset detail one tap away:** full-screen photo, location text, notes, dependency list, provenance.
4. **Unknowns are loud:** if a site has no recorded dependency for a utility, show "No recorded shutoff for water at this site" — never an empty list that reads as "nothing exists."
5. **Escalation footer:** property-defined emergency contacts + "Call 811 before any digging" line ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)).
6. **Works offline:** PWA serves the last-synced snapshot read-only with a "data as of {date}" banner ([ADR-0007](../adr/ADR-0007-tech-stack.md)). The printed PDF ([PRD-0001](PRD-0001-pilot-deliverable-package.md) D1) is the final fallback and the app links to "print latest."

### Non-functional
- Search-to-answer in <10 seconds on a mid-tier phone on 3G; snapshot cache <20 MB for a 200-site property.
- Readable in dark/glare: high contrast, huge type on result rows; one-hand operation.
- Zero training: a person who has never seen the app must succeed; validated by usability test with a pilot park's newest employee.

## Out of scope

- Editing from emergency mode (capture is [PRD-0003](PRD-0003-asset-dependency-capture.md); emergencies are read-only by design — no fat-finger data loss at 2 a.m.).
- Any "shut it off remotely" IoT integration.
- Incident logging during the event (one tap "log this as an event note — fill in later" stub is allowed).

## Success metrics

- Pilot drill: staff member finds correct asset for 3 random sites in <60s each.
- ≥1 real incident per pilot property in first 12 months where the customer reports the map was used (this is the renewal story).
