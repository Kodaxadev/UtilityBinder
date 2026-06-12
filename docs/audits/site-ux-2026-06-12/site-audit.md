# UtilityBinder Site UX Audit

Date: 2026-06-12
Auditor: Codex
Target: local production build at http://localhost:3000

## Scope

Combined web design, UX, content, accessibility, and lightweight performance
audit of the current UtilityBinder marketing/demo site.

Routes captured:

1. `/`
2. `/demo`
3. `/sample/emergency-pdf`
4. `/sample/dave-sheet`
5. `/does-not-exist`

Screenshots are saved in this folder as `01-...png` through `12-...png`.
Lighthouse output is saved as `lighthouse-home-mobile.json`.

## User Goal

A campground/RV park operator should quickly understand:

1. What UtilityBinder is.
2. Why it matters.
3. What they get for the pilot.
4. Why it is trustworthy and not a locate.
5. What to do next with low enough friction to become a lead.

Accessibility target: usable with keyboard, readable on mobile, semantically
clear to assistive technology, and honest about limits.

## Evidence

- Fresh production build passed with Next 16.2.9.
- Route smoke: `/`, `/demo`, `/sample/emergency-pdf`, `/sample/dave-sheet`,
  and `/plan.svg` returned 200; `/does-not-exist` returned 404.
- Browser captures showed no horizontal overflow at 1280px desktop or 390px
  mobile.
- Demo map rendered one image layer and 14 pins.
- Intake happy path returned the visible confirmation state.
- Lighthouse mobile homepage:
  - Performance: 70
  - Accessibility: 89
  - Best Practices: 100
  - SEO: 100
  - FCP: 1.6 s
  - LCP: 3.9 s
  - TBT: 650 ms
  - CLS: 0

## Strengths

1. Strong first impression.
   Evidence: `01-home-desktop-first-fold.png`,
   `02-home-mobile-first-fold.png`.
   The headline is concrete, memorable, and immediately tied to a real
   operational moment. The laminated card makes the product feel tangible.

2. Visual language fits the domain.
   Evidence: homepage, demo, and print samples. The field-ledger palette,
   caution color, mono record details, and paper/asphalt contrast feel aligned
   with maintenance, outdoor operations, and print artifacts.

3. The demo proves the product idea better than a static mock.
   Evidence: `06-demo-desktop.png`, `11-demo-search-site-42.png`.
   Searching "42" exposes related assets, provenance, notes, and uncertainty.
   That demonstrates the real product value: not a map, but retrievable
   operational memory.

4. The liability boundary is visibly present.
   Evidence: hero disclaimer, demo warning box, PDF shell, Dave Sheet shell.
   The site consistently says this is not a locate.

5. Print artifacts are credible.
   Evidence: `08-sample-pdf-desktop.png`, `09-dave-sheet-desktop.png`.
   These look like sellable pilot outputs, not placeholder marketing assets.

6. Basic responsive integrity is good.
   Evidence: capture manifest reports no horizontal overflow on sampled pages.
   The nav, hero, forms, demo, samples, and 404 reflow without obvious layout
   breakage.

## UX Risks

1. The primary lead path is too high-commitment for cold traffic.
   Evidence: `02-home-mobile-first-fold.png`, `05-intake-mobile.png`.
   The first fold offers "Get the $499 Pilot" and "Try the live demo", but the
   PRD specifies a lower-friction secondary CTA: "Send us your map for a free
   15-minute review." That option is absent. For a new buyer, the jump from
   "this is interesting" to a paid pilot form is steep.

2. Proof is present but not public-proof quality.
   Evidence: `03-home-proof-section.png`.
   The stats are compelling, but the sources are rendered as small text labels
   rather than clickable citations. For claims like "196,977 damage events" and
   "$500-1,000 per locate visit", this weakens trust. The repo has source docs;
   the public site should expose them.

3. Mobile demo shows controls before payoff.
   Evidence: `07-demo-mobile.png`.
   On mobile, users see scenario chips, asset counts, the night-mode button,
   and layer toggles before the map result. It reads as a tool surface before
   the user has seen the value. A selected scenario preview or search-first
   panel would make the first mobile demo screen more legible.

4. Intake form reads long even though only two fields are required.
   Evidence: `05-intake-mobile.png`.
   The form is useful as discovery, but it asks for a lot of context before
   trust is fully established. The user sees a tall form with no nearby privacy
   note, no "you can send the map later" reassurance, and no alternate contact
   path.

5. Error recovery lacks a real fallback.
   Evidence: `web/components/landing/IntakeForm.tsx`.
   The error copy says "please email us directly instead" but does not show an
   email address. In production, if the webhook fails, the user gets stuck.

6. The PDF page overclaims immutability.
   Evidence: `08-sample-pdf-desktop.png`.
   "The watermark and disclaimers print on every page and cannot be removed"
   is stronger than what browser printing can guarantee. Better wording:
   "generated into every page by default" or "included in every printed
   template."

## Accessibility Risks

1. Lighthouse reports insufficient contrast.
   Evidence: `lighthouse-home-mobile.json`, `color-contrast` audit.
   Failing examples include 10px `text-ink-faint` on paper in the hero card:
   "DAVE + PHOTO - VER. 2026-06-02" and the small emergency-reference line.
   These are safety/trust details, so they should not be faint.

2. Ordered list semantics are broken by animation wrappers.
   Evidence: `lighthouse-home-mobile.json`, `list` and `listitem` audits;
   `web/components/landing/HowItWorks.tsx`.
   The `<ol>` direct children are Motion-generated `<div>` wrappers, and each
   `<li>` is nested inside that wrapper. Assistive tech may not perceive the
   "How the pilot works" list correctly.

3. Several interactive targets are visually small.
   Evidence: DOM heuristic on homepage and demo.
   Nav links, artifact links, footer links, demo scenario chips, and layer
   toggles commonly render under 44px high. Some are still usable because text
   width is large, but mobile/touch comfort is not consistent.

4. Custom map pins need keyboard verification or an explicit accessible path.
   Evidence: demo DOM audit.
   The map itself is focusable and pins expose labels, but pins are custom
   Leaflet div icons rather than native buttons. The search field gives a good
   fallback path, but the UI should clarify that typing a site number is the
   primary accessible path.

5. Disclaimer and source microcopy is too small in several important places.
   Evidence: Lighthouse contrast details and screenshot review.
   Safety and provenance copy should be quiet, but not visually disposable.

## Performance Risks

1. Mobile homepage performance is acceptable but not yet sharp.
   Evidence: Lighthouse performance 70, LCP 3.9 s, TBT 650 ms.
   This is not catastrophic, but the page is a marketing funnel for a rural,
   likely mobile audience. It should feel lighter.

2. Motion is probably carrying too much cost.
   Evidence: `web/components/ui/Reveal.tsx` and
   `web/components/landing/LaminatedCard.tsx`.
   The whole landing page uses client-side Motion wrappers for reveals. The
   visual benefit is modest compared with the bundle and main-thread cost.

3. Homepage unused JavaScript is visible in Lighthouse.
   Evidence: Lighthouse `unused-javascript` audit estimates about 50 KiB of
   savings.

## Content And Trust Risks

1. "Zero customers" proof needs to be transparent.
   The page does a good job using fictional data, but the homepage proof should
   link to the source material because there are no customer logos or
   testimonials yet.

2. The site should say exactly what happens after submit.
   Current success copy says "within two business days", which is good. It
   should also reinforce: no charge yet, bring your map/photo, and the pilot is
   only accepted if both sides agree it is a fit.

3. The pricing section is honest but may be premature before proof.
   On first read, $299/$499/$999 is clear. But the low-friction review CTA
   should probably precede the full pricing matrix for cold outreach traffic.

## Step Health

1. Homepage desktop first fold: Healthy.
   Clear, credible, differentiated.

2. Homepage mobile first fold: Mostly healthy.
   Strong copy, no overflow, but paid CTA dominates without a softer entry.

3. Proof section: Needs work.
   Good claims, weak public evidence presentation.

4. Intake mobile: Functional but high friction.
   Good labels and confirmation, but too much commitment too early.

5. Demo desktop: Healthy.
   The best proof surface on the site.

6. Demo mobile: Mixed.
   Works, but controls crowd out the result before the map is visible.

7. Demo search-to-results: Healthy.
   Strong accessible fallback and clear operational value.

8. Sample PDF: Healthy with copy caution.
   Strong artifact; soften the "cannot be removed" claim.

9. Dave Sheet: Healthy.
   Plain, useful, and aligned with the product promise.

10. 404 mobile: Healthy.
   On-brand and easy to recover from.

11. Intake success: Healthy locally.
   Clear confirmation, but production durability depends on configured storage.

## Priority Recommendations

1. Add the low-friction CTA.
   Add "Send us your map for a free 15-minute review" near the hero and near
   the intake section. Route it to a shorter form or the same form with fewer
   required fields.

2. Turn proof labels into real links.
   Link the 811, CGA DIRT, and private-locate cost sources directly from the
   stats section. Keep the labels short, but make the evidence reachable.

3. Fix the ordered-list semantics.
   Make `Reveal` able to render `as="li"` or move the animation inside the
   `<li>` so `<ol>` contains direct `<li>` children.

4. Raise contrast for safety/provenance microcopy.
   Use `text-ink-soft` or a dedicated accessible muted token for disclaimers,
   source labels, and provenance. Do not use very faint 10px text for safety
   claims.

5. Make mobile demo payoff-first.
   Put the search box or one selected scenario result above the control stack
   on mobile. Let the layers/night-mode tools sit below the first result.

6. Make intake production-safe before public launch.
   If `INTAKE_WEBHOOK_URL` is missing or failing, do not show a normal success
   message. Provide a direct email/phone fallback in the UI.

7. Reduce landing-page JavaScript.
   Replace most scroll reveals with CSS or static rendering. Keep only the
   artifact-card animation if it materially helps the first impression.

8. Add minimal funnel analytics after privacy review.
   Track page view -> demo click -> form start -> submit success/failure.
   The PRD calls for this, and it is the only way to learn which CTA is working.

## Evidence Limits

- This was a local production audit, not a live Vercel/domain audit.
- Screenshots and DOM checks do not prove full WCAG compliance.
- No real screen reader pass was run.
- No real mobile device/network throttling pass was run beyond Lighthouse's
  simulated mobile audit.
- No live customer data or external webhook was used.
