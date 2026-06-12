# The 15-Minute Review Call — Interview Questionnaire

**Version 1.0 · 2026-06-12 · The discovery instrument.** Every answer feeds the Bigin record ([crm-runbook.md](crm-runbook.md)); the bolded **capture** fields map 1:1 to CRM fields. Record verbatim quotes — quotes become copy, case studies, and gate evidence.

**Prime directive: this is a listening call, not a pitch.** You reviewed their map; you're asking questions a good contractor would ask. The pilot ask comes only in the last two minutes, and only if they qualify. If they talk for 12 of the 15 minutes, the call went well.

---

## Before the call (5 min prep)

- [ ] Read their intake form / outreach notes; have their map (or satellite view of the park) open
- [ ] Write down 2–3 specific observations about *their* property ("I noticed Row C backs onto the creek — where does that sewer line run?") — this is the "free review" they were promised
- [ ] Open their Bigin record; stage → `Review Call Scheduled`

## 0:00–1:30 — Frame

> "Thanks for sending the map. I'll keep this to 15 minutes. Quick context: I help independent parks turn maps, staff memory, and old photos into an emergency shutoff reference — so anyone on staff can answer 'which valve controls site 42' at 2 a.m. **This isn't utility locating and it's not a sales pitch** — I want to understand how you run things, share what I saw in your map, and only if it makes sense, talk about a paid pilot. Fair?"

**capture:** call date · who's on the call (owner? GM? maintenance lead?) → `Call Role`

## 1:30–3:00 — Verify context (fast, factual)

1. "How many sites, and roughly when was the infrastructure put in?" → **`Sites` / `Property Age`**
2. "Who handles maintenance — staff, you, contractors?" → **`Maint Setup`** (count + names)
3. "What runs the bookings — Campspot, CampLife, spreadsheet?" → **`PMS`**

## 3:00–8:00 — The Dave block (THE evidence; slow down, shut up after each)

4. **"Who knows where everything is?"** → **`Dave Answer`** (verbatim — name, tenure)
5. **"What happens when that person is off, sick, or gone?"** → **`Dave Gap`** (verbatim)
6. **"In the last two years — any utility strike, shutoff nobody could find, sewer backup, big leak, or contractor standing around asking where the lines are?"**
   *(Silence. Let them fill it. Then: "walk me through that day.")*
   → **`Incidents`** (multi-select: strike / lost shutoff / backup / leak / contractor confusion / none) + **`Incident Story`** (verbatim — time lost, money lost, who panicked)

## 8:00–11:00 — Current system & past attempts

7. "What does the utility map situation look like today — paper, PDF, Google Earth, memory?" → **`Map Status`**
8. "Do you trust it?" → **`Map Trusted`** (yes / no / partly — capture the laugh if there is one)
9. "Does anything tell you which valve or breaker controls which sites?" → **`Dependency Known`** (yes / partly / no)
10. "Ever tried to fix this — Google Earth pins, a binder, a spreadsheet? What happened to it?" → **`DIY History`** (verbatim — *abandoned DIY = hot; maintained DIY = cold*)

## 11:00–13:00 — The free review (give value, earn the ask)

Share your 2–3 prep observations + the gaps the conversation exposed:

> "From your map and what you've told me, here's what I'd flag: [observation 1]. [Observation 2]. And nobody currently has [the Row C sewer path / the Row B valve / …] written down anywhere — that's the kind of thing that walks out the door with [Dave]."

**capture:** their reaction → `Review Reaction` (leaned in / polite / flat)

## 13:00–15:00 — The ask (only if qualified — see scoring below)

> "Here's the pilot: **$499**. I take your map, your photos, and a 2–4 hour walk with your staff, and you get three things — a printable emergency shutoff PDF for the shop wall, a private phone map for staff, and a written record of everything that currently lives only in [Dave]'s head. Every record is marked with how confident we are and who said it. It's not a locate — you still call 811 before digging — it's your park's memory, on paper. **Want to book the walk?**"

| Their answer | Your move | CRM |
|---|---|---|
| Yes | Book the walk date NOW, on the call. Send pilot agreement + materials list same day | Stage → `Pilot Proposed`, then `Pilot Won` on payment |
| "Need to think" | "Totally fair — what's the part you'd need to think over?" (capture the real objection) Offer the $299 PDF-only mini if price is it | Stage stays `Interviewed`, **`Objection`** captured, follow-up task +5 days |
| No | "Helpful either way — what makes it a no?" + "Anyone you know who fights this more than you?" | `Closed Lost` + **loss reason** + referral note |

---

## Scoring (set `Temperature` before leaving the record)

**HOT — make the ask, push to book:** named a real incident with cost/time pain · "we call Dave" + no backup · abandoned DIY attempt · map exists but isn't trusted · asked "how soon could you come?"

**WARM — ask, expect objection-handling:** pain is real but vague ("we manage") · incidents minor · interested in the PDF artifact specifically

**COLD — do not ask; close politely:** "our PMS handles it" *and it does* · everything new/documented · maintained Google Earth system · wants locate-grade accuracy ("can you mark where to dig?") → refer to 811/private locator, loss reason `Wants locate-grade accuracy` · no incidents and no fear

**Kill-criteria signals — log even when the call goes well** ([discovery-kit.md](discovery-kit.md) §4): PMS-suffices claims · zero-incident parks · locate-grade asks · maintained-DIY parks. These counters decide the day-45/day-90 gates.

## After the call (5 min, same hour — memory rots)

- [ ] Complete every **capture** field in Bigin; paste verbatim quotes
- [ ] Set `Temperature` + stage; create the follow-up task
- [ ] If pilot proposed: send agreement + materials list (map scan, PMS site-list CSV, recent invoices from utility repairs if handy)
- [ ] Tally check: does this call move any gate counter? (interviews done / incidents / PMS-gap confirms / pilots)
