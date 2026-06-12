# Pilot Fulfillment Runbook — intake to delivery, solo-operator edition

**Date:** 2026-06-12 · Companion to [PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md) (what the deliverables are); this runbook is **how one unfunded person produces them at professional quality without drowning.**

## 0. The promise policy (what we commit, where)

| Promise | Where it lives | Why it's keepable solo |
|---|---|---|
| Reply within 2 business days | Site (form copy) | It's an email reply, not a deliverable |
| Real delivery date before payment | Site (pilot section) | Date is set per-pilot in the agreement, after seeing materials |
| Binder delivered within **7 calendar days of the walk** | Pilot agreement only — never the site | Internal SLA with buffer; see §5 time budget |
| Lamination | **Nowhere.** PDF is "print-shop-ready"; customers laminate at any office store for a few dollars | We don't own a laminator and don't need one |
| **Capacity rule: max 2 active pilots at once.** | Internal | Third "yes" gets a scheduled start date, framed as scarcity ("next slot opens the 24th") — which is also good positioning |

## 1. Intake channel & file hygiene

**Channel:** email to `justin@kodaxa.dev` (the form has no upload by design — replies arrive as attachments). Acceptable: phone photos (JPG/PNG/HEIC), PDF scans, PMS CSV exports, even a video walkthrough.

**On receipt (same day, ≤15 min):**
1. Acknowledge: *"Got it — [n] files received. I'll confirm everything's readable by tomorrow."* (within the 2-business-day reply promise, usually faster)
2. **Hygiene:** preview PDFs in the browser (never desktop readers with scripting), never enable macros on any Office file, don't unzip archives from unknown senders without scanning. Park owners send messy files, not malware — but the habit costs nothing.
3. File everything per §2 immediately. Inbox is not storage.

## 2. Pilot workspace (one folder per park, NEVER in the git repo)

Location: Zoho WorkDrive (or local `~/UtilityBinder-Pilots/` with cloud backup). Structure:

```
<ParkName>-<YYYYMM>/
  01-intake/        # everything they sent, untouched (read-only originals)
  02-walk/          # photos + voice notes from the walk; rename SAME DAY:
                    #   v07_behind-shed.jpg, c04_under-gravel.jpg (assetID_description)
  03-working/       # the four CSVs (templates: docs/ops/templates/), notes
  04-deliverables/  # final Emergency PDF, Dave Sheet, export zip, delivery email copy
```

**Red line (ADR-0002/0008 applied to ourselves):** customer data never enters the git repo, never in demo content, never in screenshots. The repo's `web/.gitignore` blocks `*.local.ts` for the production step below.

## 3. Data capture — the four CSVs

Templates in [templates/](templates/) match the ADR-0006 primitives exactly: `sites.csv`, `assets.csv`, `dependencies.csv`, `event-notes.csv`. Provenance columns (source, confidence, last_verified, recorded_by) are **mandatory per row** — an empty confidence cell is a bug, not a shortcut. These CSVs are simultaneously: the working data, the customer's free export (ADR-0008), and the schema validation for the eventual product (ADR-0005 consequence).

## 4. Producing the deliverables (reuses the live templates — disclaimers structurally guaranteed)

The web app's print templates (PrintShell watermark, per-system tables, reverse lookup) are the production tooling. For a real pilot:

1. `copy web/lib/demo-data.ts web/lib/pilot-data.local.ts` — fill with the park's real data from the CSVs (gitignored; cannot be committed).
2. In `web/app/sample/emergency-pdf/page.tsx` + `web/lib/plan-layout.ts`, temporarily point imports at the local file / the park's plan image (corner-pinned scan or drawn layout). **Do not commit these import edits** — `git checkout` them after printing.
3. `npm run dev` → print each artifact to PDF via the browser (the watermark + 811 disclaimers render on every page automatically — ADR-0002 §4 holds without any vigilance).
4. The Dave Sheet is filled during the walk (printed blank from `/sample/dave-sheet`), then typed up into `04-deliverables/`.
5. `git status` must be clean (except untracked `.local.ts`) before the laptop closes. Real data stays in the workspace folder.

## 5. The pipeline with internal SLAs and time budget

| Step | SLA (internal) | Time budget |
|---|---|---|
| Acknowledge materials | same day | 15 min |
| Materials review + map prep | ≤2 business days | 1 h |
| 15-min review call | per [questionnaire](../gtm/interview-questionnaire.md) | 0.5 h |
| Walk (on-site or video-guided) | scheduled on the call | 2–4 h |
| Assembly (CSVs → map → PDFs → QA) | — | 3–6 h (pilots 1–2: expect 8–12 h; that's tuition) |
| **Delivery** | **≤7 calendar days after the walk** | — |
| Review call + corrections | ≤3 days after delivery | 1 h |

## 6. QA checklist (before ANY artifact leaves)

- [ ] Watermark + 811 disclaimer on every PDF page (flip through every page, don't assume)
- [ ] No structured depth/accuracy fields anywhere (ADR-0002 §4)
- [ ] Every asset has source + confidence + verified date (or a loud NEVER VERIFIED)
- [ ] Park name, people's names, site numbers spelled right (read them aloud)
- [ ] The 60-second drill passes: pick 3 random sites, find the right shutoff from the PDF alone
- [ ] Unknowns are stated as unknowns ("no record of Row D sewer") — never blank
- [ ] Export zip complete: 4 CSVs + photos + PDFs (their data, theirs to keep)
- [ ] B/W print test of the Emergency PDF — legible at arm's length

## 7. Email templates

**Materials request (after a booked pilot):**
> Subject: UtilityBinder pilot — what to send me
> To get started I need three things, none of them perfect: (1) your site map — a phone photo of the paper one is genuinely fine; (2) a site list export from your reservation software if you use one (CSV from Campspot/CampLife works); (3) any photos, invoices, or war stories from past utility repairs. Reply with attachments to this address. We'll set your walk date and delivery date once I've looked through them.

**Delivery:**
> Subject: Your UtilityBinder is ready — [Park Name]
> Attached: your Emergency Shutoff PDF (print it, put one in the shop and one in the truck — any office store will laminate it for a couple dollars), your Dave Sheet, and a zip of every record and photo — your data, yours forever. Your private Staff Emergency Map link: [link]. One ask: have your newest staff member try the "find the shutoff for site [n]" drill and tell me how long it took. Corrections are included — mark anything wrong and I'll fix it this week.

## 8. When it gets busy (the failure mode to prevent is silent overcommitment)

Two active pilots max. Everything else gets a dated start slot, communicated immediately: *"I build each binder personally — I can start yours [date]."* Nobody is ever told "soon." If a pilot slips, the customer hears it from us before the deadline passes, with a new date. A solo shop's professionalism is measured by date discipline, not headcount.
