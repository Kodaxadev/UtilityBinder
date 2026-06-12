# UtilityBinder — web

Pre-pilot artifacts (per [ADR-0005](../docs/adr/ADR-0005-service-assisted-gtm.md), the SaaS is gated behind two paid pilots — this app is the landing page, demo, and print templates only).

## Routes

| Route | What it is |
|---|---|
| `/` | Landing page + pilot intake form ([PRD-0005](../docs/prd/PRD-0005-landing-page-intake.md)) |
| `/demo` | Staff Emergency Map demo — fictional Big Pine Family Campground ([PRD-0002](../docs/prd/PRD-0002-emergency-mode.md) in miniature) |
| `/sample/emergency-pdf` | UtilityBinder Emergency PDF template — print via browser; watermark + disclaimers structural ([ADR-0002](../docs/adr/ADR-0002-liability-posture-not-a-locate.md)) |
| `/sample/dave-sheet` | Dave Sheet knowledge-capture worksheet (printable) |
| `/maps/big-pine-base-v1.png` | Illustrated demo base plan; labels and utility pins are deterministic overlays |
| `/api/intake` | POST endpoint for the intake form |

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint && npm run build   # verification
```

## Before going live

- **Set `INTAKE_WEBHOOK_URL`** in the hosting environment (Zapier/Make/Supabase function — anything accepting JSON POST). Without it, production submissions are only visible in server logs. In dev, submissions also append to `data/intake.jsonl` (gitignored).
- Real pilot data never goes in this repo. Demo data is fictional by design.

## Architecture notes

- `lib/types.ts` mirrors the ADR-0006 primitives. **No depth/accuracy/tolerance fields — banned by ADR-0002 §4.**
- `components/SafetyDisclaimer.tsx` is the only place disclaimer text lives; `components/print/PrintShell.tsx` injects watermark + footer band on every printed page (fixed-position elements repeat per page in Chromium — same engine as future server-side PDF generation).
- Map is Leaflet 1.9 with `CRS.Simple` over a static illustrated base image in `public/maps/`. `lib/plan-layout.ts` now owns only the overlay coordinates, keeping site labels, click targets, asset pins, and print output aligned against the same `1200x800` plan space; bump the `?rev=` query in `lib/demo-data.ts` `planImage` when the image or overlay coordinates change. The map-art direction is tracked in `docs/audits/live-polish-2026-06-12/real-park-map-research.md`.
- Demo interactions: scenario chips, per-utility layer toggles (the legend is functional), panel↔map hover sync, and a "2 a.m. mode" (CSS-invert night display). **Never let React control `className` on the Leaflet container div** — Leaflet adds runtime classes to it; night mode toggles a class imperatively for this reason.
- **Design system ("field ledger"):** brand tokens live in `app/globals.css` `@theme` (paper/asphalt/caution/work/ink); type is Barlow (display+body) + IBM Plex Mono (anything that is a record: site numbers, stats, provenance, prices); dark is *sectional* (hero/footer asphalt), deliberately not a user theme — buyer is outdoors on glare, artifacts are print-first (ADR-0002).

## Dependency log (vetted live 2026-06-11)

| Package | Version | Note |
|---|---|---|
| next | 16.2.9 | latest stable |
| react / react-dom | 19.2.7 | latest stable |
| leaflet | 1.9.4 | latest stable (2.0 still alpha) |
| tailwindcss | ^4 (4.3.x) | latest stable |
| @types/node | ^24 | matches Node 24 LTS runtime |
| motion | 12.40.0 | latest stable (successor package to framer-motion); reveals + hero card, all variants respect prefers-reduced-motion |
| postcss (override) | ^8.5.10 | forced via `overrides` to clear GHSA-qx2v-qp2m-jg93 (Next 16.2.9 vendors 8.4.31); `npm audit` = 0 vulnerabilities |

**TECH-DEBT:** typescript pinned `^5` (TS 6.0.3 is out; Next's template still pins ^5 — revisit on next Next release). eslint pinned `^9` (eslint 10 out; eslint-config-next compat unverified). Remove the postcss override when Next ships postcss ≥8.5.10 internally.
