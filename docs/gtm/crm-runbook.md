# CRM Runbook — Zoho Bigin setup and wiring

**Date:** 2026-06-12 · **Decision:** [ADR-0011](../adr/ADR-0011-crm-buy-not-build.md) · Budget: one evening.

## 1. Create the Bigin account

1. [bigin.zoho.com](https://bigin.zoho.com) → sign in with the existing Zoho account (`justin@kodaxa.dev`). Free tier is sufficient to start.
2. Org name: **UtilityBinder**.

## 2. Pipeline

Create one Team Pipeline named **Discovery → Pilot** with exactly these stages (order matters — they mirror the funnel):

| Stage | Meaning | Entry trigger |
|---|---|---|
| New Lead | In the system, untouched | CSV import or website intake |
| Outreach Sent | First email/DM/call attempt made | You acted |
| Replied | Any response, even "not interested" | They acted |
| Review Call Scheduled | 15-min call booked | Calendar invite accepted |
| Interviewed | Call done, questionnaire captured | [Questionnaire](interview-questionnaire.md) completed |
| Pilot Proposed | $499 (or $299/$999) offer made | The ask happened |
| Pilot Won (Paid) | **Money received** — the only validation that counts | Payment |
| Closed Lost | Out, with mandatory loss reason | Any dead end |

**Closed Lost requires a loss reason** (create as mandatory picklist — this IS the kill-criteria instrumentation):
`PMS suffices` · `No recent incidents` · `Wants locate-grade accuracy` · `DIY works (maintained)` · `No budget for setup fee` · `Wrong ICP` · `No response (10+ attempts over 3 weeks)`

## 3. Custom fields

**On Company (the park):**

| Field | Type |
|---|---|
| State | text |
| Sites | number |
| Property Age | text |
| PMS | picklist: Campspot / CampLife / RoverPass / NewBook / Other / None |
| Map Status | picklist: None / Paper / PDF-scan / Google Earth / GIS-CAD |
| ICP Fit | picklist: Primary (campground 50–200) / Secondary (marina, fairground, venue…) / Out |
| Source | picklist: website / outreach / referral / association / contractor |

**On the Pipeline record (the deal):**

| Field | Type |
|---|---|
| Temperature | picklist: Hot / Warm / Cold |
| Incidents | multi-select: Strike / Lost shutoff / Sewer backup / Major leak / Contractor confusion / None |
| Incident Story | multi-line (verbatim) |
| Dave Answer | multi-line (verbatim) |
| Dave Gap | multi-line (verbatim) |
| Map Trusted | picklist: Yes / Partly / No |
| Dependency Known | picklist: Yes / Partly / No |
| DIY History | multi-line |
| Review Reaction | picklist: Leaned in / Polite / Flat |
| Objection | multi-line |
| Tier | picklist: $299 Mini / $499 Pilot / $999 Walk |
| Call Role | text (who you talked to) |

## 4. Wire the website intake (extends the EXISTING Zoho Flow)

The live flow (webhook → send email) gets one more action:

1. Zoho Flow → open the intake flow → after the Webhook trigger, **parallel to** the Send Email action, add **Bigin → "Create Record"** (authorize the Bigin connection when prompted).
2. Module: Pipelines (and let it create the Contact/Company). Map:
   - Company name ← `parkName` · State ← `state` · Sites ← `siteCount` · PMS ← `pms` · Map Status ← `currentMap`
   - Pipeline record name ← `parkName` + " — website intake" · Stage ← **Replied** (a form fill is a reply, not a cold lead) · Source ← `website`
   - Incidents ← `incidents` · Dave Answer ← `daveAnswer` · Contact email/phone ← `contact`
3. Save → flow stays ON. Test by submitting the live form once ("CRM WIRE TEST" as park name); confirm the record appears, then delete it.

## 5. Import the outreach list

The 50-park list lives in [outreach-list-template.csv](outreach-list-template.csv) — fill it, then Bigin → Import → map columns to the §3 fields. Every import lands at stage `New Lead`, Source `outreach`.

## 6. The weekly ritual (Mondays, 20 minutes — this replaces "vibes" with the gate)

1. Pipeline review: every record stalled >7 days gets an action or moves to Closed Lost (with reason).
2. **Gate counters** (saved filters — create these views once):
   - `Interviews done` = stage ≥ Interviewed → target 15
   - `Incident-positive` = Incidents ≠ None → need ≥5
   - `PMS-gap confirmed` = Dependency Known ≠ Yes AND PMS ≠ None → need ≥3
   - `Pilots paid` = Pilot Won → **need ≥2 (the gate)**
   - `Kill signals` = Closed Lost grouped by loss reason → if `PMS suffices` ≥ ⅓ of interviews, that's kill criterion #1 firing
3. Export all records → CSV → archive (monthly minimum) — our own ADR-0008 medicine.
4. Day-45 checkpoint (~2026-07-27) and day-90 gate (~2026-09-09): run the counters against [discovery-kit.md](discovery-kit.md) §3–4 and write the one-page verdict memo either way.

## 7. What does NOT go in the CRM

Pilot deliverable data (maps, asset records, photos of customer infrastructure) — that's pilot-workspace material. The CRM holds relationships and discovery evidence only ([ADR-0011](../adr/ADR-0011-crm-buy-not-build.md) red lines).
