# ADR-0012: Data-handling & security posture

**Status:** Accepted
**Date:** 2026-06-13
**Evidence:** [ADR-0002 §5](ADR-0002-liability-posture-not-a-locate.md) (business hygiene, customer owns data); [ADR-0008](ADR-0008-export-first-no-lock-in.md) (export-first, continuity); [ADR-0011 §6](ADR-0011-crm-buy-not-build.md) (CRM red lines); [pilot-fulfillment-runbook §1–2](../ops/pilot-fulfillment-runbook.md); [PRD-0005](../prd/PRD-0005-landing-page-intake.md) (intake flow)

## Context

UtilityBinder's records describe **where to shut off a property's water, gas, electric, and sewer** — operational information that is valuable to the customer precisely because it is consolidated, and sensitive for the same reason: in the wrong hands it is a sabotage/vandalism aid, not just a privacy concern. The pilot phase is run by one person on a personal machine plus a handful of SaaS accounts (Vercel, Zoho Mail/Flow/Bigin/WorkDrive). The practices that keep this safe already exist, but scattered across the runbook, ADR-0002 §5, ADR-0008, and ADR-0011 §6. A leak, an account compromise, or customer data accidentally committed to a **public** GitHub repo (the repo is public — [thesis](../../README.md)) would be an existential trust failure in a business whose entire pitch is "your records are safe with us." This ADR consolidates the posture and sets the requirements the eventual product must meet, without pretending a solo pre-revenue operation has enterprise controls it does not.

## Decision

1. **Three data classes, handled differently:**

   | Class | Examples | Lives in | Rule |
   |---|---|---|---|
   | **Public/marketing** | landing copy, the `/demo` map, sample PDFs | the public repo + Vercel | **Fictional data only.** "Big Pine Family Campground" is invented ([PRD-0005](../prd/PRD-0005-landing-page-intake.md)). No real customer data, ever, including screenshots. |
   | **Relationship/discovery** | leads, interview notes, quotes, pipeline | Zoho Bigin + Zoho Mail | Holds relationship data only — **never pilot deliverables** ([ADR-0011 §6](ADR-0011-crm-buy-not-build.md)). Monthly CSV export to the gate archive. |
   | **Pilot deliverable (sensitive)** | shutoff maps, asset/dependency records, site photos, plan scans | per-park workspace (Zoho WorkDrive, or local `~/UtilityBinder-Pilots/` with cloud backup) — **never the git repo** | Treated as confidential operational-security data. See rules 2–5. |

2. **The git red line is absolute and tooling-enforced.** Customer data never enters the repo — not as content, fixtures, demo data, or screenshots. `web/.gitignore` blocks `*.local.ts(x)`; the production workflow ([runbook §4](../ops/pilot-fulfillment-runbook.md)) fills `pilot-data.local.ts` (gitignored), points imports at it temporarily, prints, then `git checkout`s the import edits. `git status` must be clean (save the untracked `.local.ts`) before the laptop closes. A real customer's data in a commit is a P0 incident, not a cleanup task.

3. **Secrets live only in platform vaults, never in the repo.** Webhook URLs, API keys, and credentials are Vercel environment variables marked sensitive (`INTAKE_WEBHOOK_URL`) or live in the respective SaaS account — never committed, never in client-bundled code unless intentionally public (`NEXT_PUBLIC_*`). Rotating a leaked secret is a vault operation; no secret is ever "fixed" by editing a commit.

4. **Customer owns their data; we are a custodian.** Per [ADR-0002 §5](ADR-0002-liability-posture-not-a-locate.md) and [ADR-0008](ADR-0008-export-first-no-lock-in.md): the pilot agreement states the customer owns their records; full export is free and unconditional (including after churn); on offboarding or request, we delete our copies after delivering a final export, and say so. There are no retention dark patterns.

5. **Transport & delivery hygiene (solo phase):** the public site and all SaaS are HTTPS/TLS only. Intake arrives by email by design (no upload endpoint to harden — [runbook §1](../ops/pilot-fulfillment-runbook.md)); inbound files are previewed in the browser, macros never enabled, unknown archives scanned before opening. Deliverables go out as a private Staff Emergency Map link plus an export zip, not as long-lived public URLs.

6. **Minimal incident posture, sized to the stage:** the realistic threats are a lost/compromised laptop, a phished SaaS account, and accidental public exposure — not targeted attackers. Mitigations: full-disk encryption and a screen-lock on the work machine; 2FA on every SaaS account (Vercel, Zoho, GitHub); cloud backup of the pilot workspace so a dead laptop is not data loss. If customer data is exposed (public commit, shared link leak, account breach), the affected customer is told promptly and plainly — the same date-discipline honesty the runbook applies to deadlines.

7. **This ADR sets product requirements for the gated build.** When product engineering begins ([ADR-0005](ADR-0005-service-assisted-gtm.md)), the build must carry these forward as hard requirements: encryption at rest, per-customer (tenant) data isolation, authenticated access with least privilege, an audit trail on record changes, and per-customer deletion/export that actually purges. Private map links get unguessable tokens and are revocable. None of this is built now; it is the spec the build inherits.

## Consequences

- "Your records are safe and they're yours" becomes a defensible claim with mechanics behind it, reinforcing the same trust argument as export-first ([ADR-0008](ADR-0008-export-first-no-lock-in.md)).
- The solo workflow stays deliberately boring: data in the workspace, secrets in vaults, repo public and clean. The discipline costs minutes per pilot and prevents the one unrecoverable mistake.
- 2FA + disk encryption + backups are the entire pre-revenue security budget — proportionate, not theater.
- Any change that would place customer data in the repo, the CRM, or a public surface, or that weakens the deletion/export promise, requires superseding this ADR. The build-phase requirements in §7 are not optional features to be cut under deadline.
