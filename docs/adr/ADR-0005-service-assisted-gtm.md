# ADR-0005: Service-assisted before self-serve — no product build until two paid pilots

**Status:** Accepted
**Date:** 2026-06-11
**Evidence:** [market-validation.md](../research/market-validation.md) §6, §10; [gtm/go-to-market.md](../gtm/go-to-market.md)

## Context

- The only unverifiable assumption left is direct buyer pain and willingness to pay. Every other claim checked out.
- The buyer is non-technical; the real competitor is a binder and one employee's memory. A self-serve app asks the buyer to do data entry they have avoided for 20 years.
- Defensibility analysis says the moat is the conversion motion, not the code.

## Decision

1. **Sequence:** sales artifacts → 50 outreach contacts → 15 interviews → **2 paid pilots ($499) fulfilled manually** → extract repeated steps → only then build product ([PRD-0001](../prd/PRD-0001-pilot-deliverable-package.md) defines the manual deliverable).
2. **Pilot fulfillment stack (no product code):** Google Sheets or Airtable for records; a static Leaflet/MapLibre page (hand-built per pilot, private link); phone photos; PDF assembled from an HTML template. Ugly is acceptable; the deliverable quality bar is the *artifact set*, not the software.
3. **Pricing of validation:** pilots are never free. Free pilots produce polite lies; $499 produces information ("$299 PDF-only" exists solely as an objection handler). The setup fee is the validation metric, not the subscription.
4. **Build trigger:** product engineering starts only after pilot #2 is delivered and the repeated manual steps are documented. The first software milestone is internal tooling that makes pilot #3 faster, not a customer-facing app.
5. **Anti-trigger:** if the 90-day discovery gate fails ([gtm/discovery-kit.md](../gtm/discovery-kit.md) kill criteria), no code is written, and the idea is formally killed or re-aimed.

## Consequences

- Engineering gratification is delayed; the first "build" is copywriting, a landing page, an example PDF, and a demo map with fictional data.
- Pilot fulfillment doesn't scale — intentionally. Two to five manual conversions are market research that customers pay for.
- The eventual product inherits real-world data shapes (what operators actually know, in what format) instead of guessed schemas — this directly feeds [ADR-0006](ADR-0006-data-model-primitives.md).
- Revenue arrives before architecture risk does.
