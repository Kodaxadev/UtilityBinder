# Discovery Kit — interviews, outreach, and kill criteria

**Date:** 2026-06-11
**Rule:** This document is the governing gate. If thresholds fail, [ADR-0005](../adr/ADR-0005-service-assisted-gtm.md) forbids building product.

## 1. Outreach message (email / FB DM / association intro)

> Hi — I'm testing a small service for independent RV parks and campgrounds.
>
> The idea: turn your old utility notes, staff memory, photos, and site maps into an **emergency shutoff map**, so anyone on staff can answer "which valve controls Site 42?" — even when your usual maintenance person is off.
>
> This is *not* utility locating or excavation clearance — it's internal emergency reference and maintenance memory.
>
> I'm looking for 2–3 parks for a paid pilot where I build the first map for you from your existing materials and a short walkthrough.
>
> Quick question even if you're not interested: do you currently have a reliable way to know which shutoffs, cleanouts, or breakers serve which sites?

That last question alone generates interview conversations.

## 2. Interview script (15 needed; record answers verbatim in tracker)

1. "Who knows where everything is?" *(the Dave question)*
2. "What happens when that person is off-site, sick, or gone?"
3. "In the last two years — any utility strike, unknown shutoff, sewer backup, big leak, or contractor confusion?" *(then be quiet)*
4. "Do you have a map today? Paper, PDF, Google Earth, CAD, memory?"
5. "Do you trust it?"
6. "Does anything show which valve/breaker/cleanout controls which sites?"
7. "Where do repair photos and notes live?"
8. "Have you tried Google Earth / My Maps / a binder / spreadsheet? What happened to it?"
9. "What software runs the park — Campspot, CampLife, RoverPass, NewBook, spreadsheets? Does it cover any of this?"
10. **The only question that validates:** "Would you pay $499 for me to build the first emergency shutoff map from your map, photos, and a walkthrough?"

### Lead temperature guide

**Hot:** "we call Dave" • "there's an old map somewhere" • "the map is wrong" • "we've hit lines before" • "the old maintenance guy left with all of it" • "we tried Google Earth and it died"
**Cold:** "our PMS handles it" • "everything's new and documented" • "our contractor has all that" • "we'd just use Google Earth" *(and they actually maintain it)* • "we rarely have issues"

## 3. Pass thresholds (all required by day 90)

- [ ] 15 completed interviews with primary-ICP operators ([ADR-0004](../adr/ADR-0004-beachhead-market.md))
- [ ] ≥5 report a painful incident in the last ~2 years (Q3)
- [ ] ≥3 confirm their PMS/current tools do not cover infrastructure records (Q6/Q9)
- [ ] ≥2 **paid** pilot agreements at ≥$499
- [ ] ≥1 sends real materials (map/photos) for conversion
- [ ] Pilot #1 delivered with staff passing the 60-second drill ([PRD-0002](../prd/PRD-0002-emergency-mode.md) metric, run manually)

## 4. Kill criteria (any one of these, sustained, kills or re-aims)

1. **PMS suffices:** ≥1/3 of interviews say their existing software cleanly handles shutoffs/dependencies/repair memory.
2. **No incidents:** <5 of 15 report a relevant incident — pain isn't urgent enough to buy.
3. **No money:** subscription interest without setup-fee willingness; or zero paid pilots after 15 interviews + 50 contacts.
4. **Wrong ask:** majority demand excavation-grade accuracy → they need locators/PointMan; we must not become that ([ADR-0002](../adr/ADR-0002-liability-posture-not-a-locate.md)/[0003](../adr/ADR-0003-patent-risk-avoidance.md)).
5. **DIY suffices:** repeated "Google Earth works fine for us" from operators who demonstrably maintain it.
6. **Economics fail:** pilot fulfillment still >10 founder-hours at pilot #5 with no price headroom.
7. **Tripwire:** a PMS or ARC-like vendor ships this for parks during discovery ([competitive-landscape.md](../research/competitive-landscape.md) §4) — reassess within 2 weeks, don't auto-kill.

Kill output: a one-page memo (what we believed, what we observed, what reusable assets remain — the engine, the artifacts, the channel learnings) before any re-aim decision.

## 5. Discovery tracker columns

`park • state • sites • age • PMS • map status • Dave answer • incident(s) verbatim • Q10 answer • temperature • next step • pilot $ • notes`

Keep verbatim quotes — they become landing-page copy and the case study after pilots.
