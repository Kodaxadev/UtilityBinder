# ADR-0007: Tech stack — boring web stack, offline-aware, print-first

**Status:** Accepted (build phase gated by [ADR-0005](ADR-0005-service-assisted-gtm.md))
**Date:** 2026-06-11

## Context

Solo builder, low budget, service-assisted start. Two domain constraints most stacks ignore:

1. **Connectivity is bad at the point of need.** Rural parks have weak cell/Wi-Fi coverage; the 2 a.m. emergency and the field walk both happen outdoors. An online-only SPA fails the core use case.
2. **Print is a first-class output.** The laminated emergency PDF is part of the product promise, and disclaimers must be impossible to omit ([ADR-0002](ADR-0002-liability-posture-not-a-locate.md)).

## Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js (App Router) on Vercel | Solo-velocity default; landing page + app in one repo; SSR for shareable map links. |
| Map rendering | **Leaflet** for V1 (pilot pages and app); MapLibre GL JS if/when vector styling matters | Leaflet is the simplest thing that renders pins over imagery; both are OSS (no per-seat GIS licensing). |
| Base imagery | **USGS NAIP / public-domain aerial imagery for US rural areas**, or uploaded drone/scan image overlay with manual corner-pinning; commercial satellite tiles (MapTiler/Mapbox free tier) as fallback | Esri/Google imagery licensing is a trap for embedded commercial use; NAIP is public domain and rural-focused, which matches the ICP. Image-overlay mode also covers "we only have a paper map" parks. |
| Data | Supabase (Postgres, Storage for photos, magic-link auth, RLS per property) | Managed, cheap at this scale, plain-Postgres exit. PostGIS deferred per [ADR-0006](ADR-0006-data-model-primitives.md). |
| Offline | PWA with cached map tiles/imagery + read-only snapshot of the property's records; field capture queues writes | This is the "emergency mode works in a dead zone" requirement. Print artifacts are the deeper fallback. |
| PDF generation | Server-side HTML→PDF (Playwright/Chromium print) with disclaimer/watermark injected by the shared layout component | One rendering path for screen and print; templates physically cannot omit the disclaimer ([ADR-0002](ADR-0002-liability-posture-not-a-locate.md)). |
| Exports | GeoJSON + CSV generated from the same serializer; KMZ later | Interchange first; see [ADR-0008](ADR-0008-export-first-no-lock-in.md). |
| QR | Static QR per property/asset pointing at short-link routes | Trivial; printed labels are a paid add-on. |

**Explicitly rejected:** native mobile apps (PWA suffices; ICP staff use cheap Android/iPhone browsers); ArcGIS/Esri SDKs (cost, licensing, signals wrong category); real-time/collab infrastructure (single-property, few-user product); any AI/ML extraction pipeline in V1 (the data volume per park is tiny — dozens of assets — manual entry during a paid walk is faster and is itself the service).

## Consequences

- Total infra cost at pilot scale: ~$0–25/month (Vercel hobby/pro + Supabase free/pro). Compatible with service-assisted economics.
- The offline PWA requirement is the only technically non-trivial commitment; it is scheduled *after* pilots prove demand, with the printed PDF as the interim offline story.
- Image-overlay georeferencing (corner-pinning a scanned map) is a known-tricky UX; V1 ships manual placement and accepts imprecision — consistent with the "approximate by design" liability posture.
