# ADR-0011: CRM — buy, don't build (Zoho Bigin wired into the existing intake Flow)

**Status:** Accepted
**Date:** 2026-06-12

## Context

Discovery is starting: 50 outreach contacts → 15 interviews → 2 paid pilots by ~2026-09-09 ([discovery-kit.md](../gtm/discovery-kit.md)). That motion needs durable lead tracking, stage visibility, and the ability to count gate metrics (interviews done, incidents reported, pilots proposed/won) without spreadsheet archaeology. The founder's stack is already Zoho (Mail + Flow); the intake webhook → Zoho Flow → email pipeline is live and verified.

Building a custom CRM was considered for zero seconds longer than it took to write this sentence: ADR-0005 gates product engineering on paid pilots, CRM is a solved commodity, and every hour of CRM-building is an hour not spent calling parks.

## Decision

1. **Zoho Bigin** is the CRM (free tier; Express tier ~$7/mo if automation limits bite). Chosen over Zoho CRM (overkill, slower to drive), spreadsheets (no automation, no pipeline discipline), and HubSpot-free (second vendor for no benefit when Flow/Mail are already Zoho).
2. **One pipeline, stages mirroring the discovery funnel:**
   `New Lead → Outreach Sent → Replied → Review Call Scheduled → Interviewed → Pilot Proposed → Pilot Won (Paid)` plus `Closed Lost`.
3. **Loss reasons ARE the kill-criteria taxonomy.** Every Closed Lost requires one of: `PMS suffices` / `No recent incidents` / `Wants locate-grade accuracy` / `DIY works (maintained)` / `No budget for setup fee` / `Wrong ICP` / `No response`. This makes the day-45/day-90 gate review a CRM filter, not a judgment call.
4. **Two lead sources, one pipeline:** website intake auto-creates a Contact + Pipeline record via a new action on the *existing* Zoho Flow (source=`website`); the 50-park outreach list imports from CSV (source=`outreach`).
5. **Interview data lives on the record.** The [interview questionnaire](../gtm/interview-questionnaire.md) fields map 1:1 to Bigin custom fields — verbatim quotes included, because quotes become landing-page copy and case-study material.
6. **Red lines:** no pilot *deliverable* data in the CRM (maps, photos, asset records stay in the pilot workspace — the CRM holds relationship and discovery data only); no marketing automation sequences until the motion is proven manually; export the CRM data monthly to the repo-adjacent archive (CSV) so the gate review is reproducible.

## Consequences

- Setup is a runbook, not a sprint: [crm-runbook.md](../gtm/crm-runbook.md). Budget one evening.
- The kill-criteria counters ([discovery-kit.md](../gtm/discovery-kit.md) §3–4) become live CRM views; the day-45 checkpoint is a 10-minute filter review.
- If Bigin is outgrown (>3 users, quoting, inventory — i.e., the business worked), migration to Zoho CRM is vendor-native and the pipeline taxonomy carries over.
- Vendor risk accepted: monthly CSV export is the hedge, consistent with ADR-0008's export-first values applied to ourselves.
