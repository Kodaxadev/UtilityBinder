# UtilityBinder

**Emergency utility records for the things only your maintenance person knows.**

> **Know what to shut off when Dave isn't there.**

The product replaces the office binder, the whiteboard, and Dave's phone — not any software. Name + hook are a paired decision ([ADR-0009](docs/adr/ADR-0009-naming-trademark.md)): the broad operational name carries the category, the headline carries the emergency.

**Status (2026-06-11): Validated enough to sell. Not validated enough to build.**

> **No product build begins until two operators pay for a manual emergency utility map pilot.** ([ADR-0005](docs/adr/ADR-0005-service-assisted-gtm.md))

All desk-research assumptions verified or corrected (one correction was itself retracted after a second source check — see the evidence log); the remaining unknown is direct buyer pain + willingness to pay, which only the discovery gate can answer.

## The one-sentence wedge

811 never marks a park's private utility lines, PMS software only maps rentable inventory, and professional GIS/locating costs 10–100× too much — so a park's infrastructure knowledge lives in a binder and one employee's head until we convert it into an emergency shutoff map for $499.

## Document map

### Research (evidence with citations)
- [Market validation evidence log](docs/research/market-validation.md) — every brainstorm claim verified/corrected, with sources
- [Competitive landscape](docs/research/competitive-landscape.md) — the five-sided squeeze, incl. the ARC Facilities finding

### ADRs (decisions)
| # | Decision |
|---|----------|
| [0001](docs/adr/ADR-0001-product-scope-positioning.md) | Scope: memory layer + emergency map; seven questions; explicit non-goals |
| [0002](docs/adr/ADR-0002-liability-posture-not-a-locate.md) | Liability: "not a locate," enforced structurally; LLC + insurance before pilot #1 |
| [0003](docs/adr/ADR-0003-patent-risk-avoidance.md) | Patents: stay out of ProStar's precision-locate lane entirely |
| [0004](docs/adr/ADR-0004-beachhead-market.md) | Beachhead: independent campgrounds 50–200 sites; MH parks deferred |
| [0005](docs/adr/ADR-0005-service-assisted-gtm.md) | Service-assisted first; build gated on 2 paid pilots |
| [0006](docs/adr/ADR-0006-data-model-primitives.md) | Data model: 5 primitives, provenance mandatory, never draw a network |
| [0007](docs/adr/ADR-0007-tech-stack.md) | Stack: Next.js/Leaflet/Supabase, offline-aware PWA, print-first PDFs |
| [0008](docs/adr/ADR-0008-export-first-no-lock-in.md) | Export-first; free full export forever |
| [0009](docs/adr/ADR-0009-naming-trademark.md) | Naming: **UtilityBinder** adopted + brand architecture (Dave Sheet, Staff Emergency Map, Emergency Reference Packet); formal USPTO knockout before print |
| [0010](docs/adr/ADR-0010-arc-facilities-boundary.md) | ARC Facilities boundary: outdoor site-dependency records only; no facility-document/enterprise territory |
| [0011](docs/adr/ADR-0011-crm-buy-not-build.md) | CRM: buy not build — Zoho Bigin, loss reasons = kill-criteria taxonomy |

### PRDs (what gets built, in order)
| # | Artifact | Gate |
|---|----------|------|
| [0001](docs/prd/PRD-0001-pilot-deliverable-package.md) | $499 pilot deliverable (manual) | **Build now** |
| [0005](docs/prd/PRD-0005-landing-page-intake.md) | Landing page + intake | **Build now** (week 1) |
| [0002](docs/prd/PRD-0002-emergency-mode.md) | Emergency mode screen | After 2 paid pilots |
| [0003](docs/prd/PRD-0003-asset-dependency-capture.md) | Field capture + dependencies | After 2 paid pilots |
| [0004](docs/prd/PRD-0004-exports-contractor-handoff.md) | Exports + contractor handoff | Templates now (manual), product later |

### GTM
- [Go-to-market plan](docs/gtm/go-to-market.md) — offer ladder, channels, 30/60/90, financial sketch
- [Discovery kit](docs/gtm/discovery-kit.md) — outreach copy, interview script, **pass thresholds and kill criteria (the governing gate)**
- [Interview questionnaire](docs/gtm/interview-questionnaire.md) — the call-ready 15-minute review-call instrument
- [CRM runbook](docs/gtm/crm-runbook.md) — Zoho Bigin pipeline, field schema, intake-Flow wiring, weekly gate ritual ([ADR-0011](docs/adr/ADR-0011-crm-buy-not-build.md))

## Deployment (one model — dashboard Root Directory)

- **App lives in [web/](web/)** (Next.js 16). The Vercel project (`utility-binder`) must have **Root Directory = `web`** in Settings → Build and Deployment. [web/vercel.json](web/vercel.json) pins `framework: nextjs` in-repo (Vercel reads it once Root Directory is set). There is deliberately **no root-level vercel.json** — a legacy `builds` entry there would make dashboard settings ignored.
- **Build-skip gotcha:** with Root Directory set, Vercel's default "Automatic" ignored-build-step **skips builds for commits that don't touch `web/**`** (empty commits, docs-only changes) and reuses the previous output. If a deploy looks instant with no logs, that's why — push a change inside `web/` or use "Redeploy" with cache off.
- **Required env vars (Production):** `INTAKE_WEBHOOK_URL` — JSON POST target for intake submissions; the API returns **503 without it** so leads are never silently dropped. Recommended: `NEXT_PUBLIC_CONTACT_EMAIL` for the form's email fallback. See [web/.env.example](web/.env.example).
- **Domain:** `utilitybinder.kodaxa.dev` (added in Vercel → Domains).
- **CI:** [.github/workflows/ci.yml](.github/workflows/ci.yml) runs `npm ci` → audit (high+) → lint → build on pushes/PRs to `main`. Deploys are Vercel's GitHub integration, not Actions.
- Real pilot/customer data never enters this repo — `web/data/` and all `.env*` files are gitignored; demo data is fictional by design.

## Immediate next actions (in order)

1. ~~USPTO knockout for "UtilityBinder"~~ ✅ **Done 2026-06-11 — wordmark search returned 0 results; name cleared** ([ADR-0009](docs/adr/ADR-0009-naming-trademark.md)). LLC/insurance quotes still open — [ADR-0002](docs/adr/ADR-0002-liability-posture-not-a-locate.md)
2. ~~Sample UtilityBinder Emergency PDF + demo Staff Emergency Map~~ ✅ **Done — [web/](web/) `/sample/emergency-pdf`, `/sample/dave-sheet`, `/demo` (verified in browser)** — [PRD-0001](docs/prd/PRD-0001-pilot-deliverable-package.md)
3. ~~Landing page + intake form~~ ✅ **Done — [web/](web/) `/` + `/api/intake` (set `INTAKE_WEBHOOK_URL` before going live)** — [PRD-0005](docs/prd/PRD-0005-landing-page-intake.md)
   - Deploy [web/](web/) to hosting (Vercel) + point a domain at it
4. Build 50-park outreach list; start interviews — [discovery kit](docs/gtm/discovery-kit.md)
5. Day-45 and day-90 gate reviews against the kill criteria
