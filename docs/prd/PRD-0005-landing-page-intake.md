# PRD-0005: Landing page + pilot intake

**Status:** Ready to execute — week 1 artifact, precedes all product code
**Date:** 2026-06-11

## Problem

Discovery outreach needs a destination that (a) makes the offer legible to a 60-year-old owner-operator in 15 seconds, (b) collects qualification data, (c) never implies locating/excavation safety.

## Page spec (single page + intake form)

- **Headline (canonical, per [ADR-0009](../adr/ADR-0009-naming-trademark.md)):** "Know what to shut off when Dave isn't there."
- **Subhead:** "UtilityBinder turns your park's old maps, staff memory, photos, and repair notes into a private emergency reference for shutoffs, breakers, cleanouts, valves, meters, pumps, and utility trouble spots."
- **A/B variant for the headline (test, don't assume):** "Find the right shutoff before a small leak becomes a park-wide emergency." The Dave hook presumes the reader recognizes their own Dave; the leak hook is self-explanatory. Run both in outreach subject lines before locking the page.
- **Primary CTA:** "Get a $499 Emergency Utility Map Pilot" → intake form.
- **Secondary CTA:** "Send us your map for a free 15-minute review" (low-commitment lead capture).
- **Proof section (honest at zero customers):** the problem stats with correct citations — 811 doesn't mark private lines (line to state 811 sites); CGA 2024: 196,977 utility damage events, root causes include inaccurate maps/records; "schools and hospitals already buy emergency shutoff maps — your park's version is a binder."
- **Example artifacts:** one fictional-park UtilityBinder Emergency PDF page (watermarked SAMPLE) + screenshot of the demo Staff Emergency Map. Fictional data only; demo property name obviously fictional ("Big Pine Family Campground").
- **Core sales sentence (use verbatim in body copy):** "We build your UtilityBinder from your old maps, staff memory, photos, and repair notes."
- **Safety line (verbatim, near every CTA):** "UtilityBinder is for internal emergency reference and maintenance records only. It is not a utility locate, survey, or excavation clearance. Call 811 before digging; private utilities may require a private locator."
- **Pricing displayed openly:** $499 pilot (default), $299 PDF-only (objection handler), $999 conversion + verification walk; $29–49/mo hosted map afterward; "your data exports free, always" ([ADR-0008](../adr/ADR-0008-export-first-no-lock-in.md)).

## Intake form fields (doubles as discovery instrument)

park name • state • number of sites • property age • current map (none / paper / PDF / Google Earth / GIS) • PMS in use (Campspot / CampLife / RoverPass / NewBook / other / none) • "In the last 2 years: utility strike, unknown shutoff, sewer backup, major leak, contractor confusion?" (multi-select) • "Who knows where everything is?" (free text — the Dave question) • phone/email + best time.

Form responses land in a spreadsheet; each becomes an interview row in the discovery tracker ([gtm/discovery-kit.md](../gtm/discovery-kit.md)).

## Build notes

Next.js on Vercel, single route + API route → Supabase table or even a form service; analytics: page→form start→submit funnel only. No cookies banner needs beyond basics; no chat widget. Ship in ≤2 days including copy.

## Success metrics

- Outreach→page→form conversion ≥10% from warm association/forum traffic.
- Form answers populate at least 10 of the 15 discovery interviews.
