# Pilot Service Page Design

Date: 2026-06-12
Status: Design approved for review

## Goal

Create a clearer pilot sales path while preserving the current validation gate:
UtilityBinder is a service-assisted pilot offer, not a self-serve SaaS product
yet. The homepage should answer "what happens if I click $499 Pilot?" quickly.
The new `/pilot` page should be a direct outreach link that explains the offer,
fit, timeline, artifacts, safety boundary, and next step.

## Non-Goals

- No customer dashboard, login, account creation, billing, or subscription flow.
- No file upload form. Real materials are sent by email after the free review.
- No utility-locate, excavation-clearance, depth, tolerance, or line-path claims.
- No second intake backend. Reuse the existing intake form and Zoho flow.
- No broad redesign of the brand system or demo map.

## Audience

Primary reader: independent campground or RV park owner/operator with 50-200
sites, usually evaluating from a cold email, referral, or association post.

The page must feel practical, credible, and worth paying for without sounding
like enterprise GIS software. The buyer should understand that the first step is
a free review, and that payment happens only after fit and delivery timing are
clear.

## Experience Shape

### Homepage Bridge

Replace the current long pilot section with a compact bridge that does four
things:

1. States the service offer: "Send your map. We'll tell you if a binder is a
   fit."
2. Shows the three artifacts: Emergency PDF, Staff Emergency Map, Dave Sheet.
3. Explains the sequence: free review, 15-minute call, paid pilot if it fits.
4. Provides two actions: primary link to `/pilot`, secondary anchor to the
   review form at `/pilot#review`.

The bridge should be concise enough to keep the homepage moving. It should not
duplicate the full `/pilot` page.

### `/pilot` Page

The dedicated page should be the page used in outreach. It should support a
buyer who has never heard of UtilityBinder and is deciding whether to reply.

Recommended page order:

1. Hero: clear pilot offer, price, free-review framing, and CTA.
2. What You Get: the three deliverables with artifact links.
3. How It Works: five-step process from review to delivery.
4. What To Send: map/photo/PMS CSV/incident story checklist.
5. Good Fit / Not A Fit: qualification rules and refusal boundaries.
6. Safety Boundary: not a locate, not excavation clearance, call 811.
7. Timeline And Capacity: delivery date before payment; max two active pilots.
8. FAQ: price, remote/on-site walk, uploads, ownership/export, corrections.
9. Final CTA: start the free map review using the existing intake form.

## Content Requirements

The page should use language from the approved docs:

- Free review first; the review is not a commitment.
- $499 pilot is the default validation offer.
- Customer receives Emergency PDF, Staff Emergency Map, Dave Sheet, and export.
- "Print-shop-ready" is allowed; "laminated by us" is not.
- Delivery date is given before payment, after reviewing materials.
- Real pilot/customer data never enters the repo.
- The artifact is for internal emergency reference and maintenance memory.
- Always call 811 before digging; private lines may need private locators.

Avoid:

- "We locate your utilities."
- "Map every line."
- "Know where it is safe to dig."
- "Instant SaaS setup."
- "Guaranteed accuracy."

## Visual Direction

Match the current UtilityBinder field-ledger system:

- Paper and paper-warm backgrounds for service explanation.
- Asphalt sections only for emphasis and final CTA, not as a dominant theme.
- Caution amber for action and warning accents.
- Working blue for links, map/product trust signals, and artifact references.
- IBM Plex Mono for record-like details: price, steps, source, timeline.
- Cards may be used for individual deliverables or FAQ items, but no nested
  cards or marketing-heavy hero composition.

The page should feel like a professional service packet, not a startup splash
page. Dense but readable is better than airy and vague.

## Component Plan

Use existing components and add only focused service-page components:

- `PilotBridge`: homepage bridge section.
- `PilotHero`: `/pilot` top section.
- `PilotDeliverables`: three artifact summaries linking to `/demo`,
  `/sample/emergency-pdf`, and `/sample/dave-sheet`.
- `PilotProcess`: review-to-delivery sequence.
- `PilotMaterials`: what to send after the review.
- `PilotFit`: good fit / not a fit split.
- `PilotSafety`: disclaimer block reusing the current safety language.
- `PilotFaq`: compact FAQ.
- `PilotCta`: final CTA section that renders the existing `IntakeForm` on the
  page.

Prefer modular files under `web/components/landing/` or
`web/components/pilot/`. Keep every file under 400 lines.

## Routing And Data Flow

- Add route `web/app/pilot/page.tsx`.
- Update nav and CTA links so `$499 Pilot` points to `/pilot`.
- Render the existing `IntakeForm` on `/pilot` inside a `#review` section.
- The homepage bridge links to `/pilot` and `/pilot#review`; it does not render
  the full form.
- The existing `/api/intake` endpoint remains the only submission path.
- No new environment variables are needed.
- No customer materials are uploaded through the site.

## Error And Edge States

- Existing intake success/error behavior remains the source of truth.
- If `INTAKE_WEBHOOK_URL` is missing in production, the existing API rejects
  submissions with 503; do not mask this with new copy.
- The page should still be useful without JavaScript except for the form
  submission interaction.
- The page should have no horizontal overflow on mobile.

## Acceptance Criteria

- `/pilot` exists and is reachable from the nav CTA.
- Homepage still has a clear pilot bridge but is not overloaded.
- `/pilot` explains deliverables, process, fit, materials, safety boundary,
  timeline/capacity, FAQ, and CTA.
- `/pilot#review` renders the existing `IntakeForm`.
- The homepage pilot bridge does not duplicate the full form.
- Sample artifact links remain visible.
- Copy does not imply locating, surveying, excavation clearance, or guaranteed
  accuracy.
- The existing intake API remains the only submission path.
- `npm run lint` and `npm run build` pass.
- Mobile and desktop browser checks show no overflow or broken hierarchy.
