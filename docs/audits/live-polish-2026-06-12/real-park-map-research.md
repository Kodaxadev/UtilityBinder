# Real Park Map Research Notes

Date: 2026-06-12

## Why the current demo misses

The demo map should not read like a generic schematic. A campground owner has seen
reservation maps, posted evacuation maps, county permit plans, and old site plans.
If our sample map looks simpler or less grounded than those references, the product
feels like a prototype instead of a paid operational artifact.

## Reference Patterns

- Newport RV Park describes its map as a way to locate RV site areas, tent
  camping, glamping rentals, bathhouses, laundry, dog park access, office,
  pavilion, playground, and other useful campground locations.
  Source: https://newportrvpark.com/rv-park-map/
- Riverbend RV Resort's map emphasizes office, laundry and bath facilities,
  fire rings, gathering patios, cooking spaces, propane, cabins, and dog park.
  Source: https://www.riverbend-rvpark.com/resort-map/
- NPS Gulpha Gorge shows a compact campground map with a legend, road geometry,
  site length categories, accessible sites, restrooms, water, trash, host site,
  scale, north arrow, and nearby roads/trails.
  Source: https://www.nps.gov/hosp/planyourvisit/campground.htm
- Challis Hot Springs Campground uses a visitor-friendly map with curving roads,
  site numbers, RV/tent type legend, river boundary, entrance, office, pump
  house, bath/restroom, parking, and a scale.
  Source: https://parksandrecreation.idaho.gov/wp-content/uploads/Challis-Hot-Springs-LOYF-Campground-Map-v4.pdf
- Lake Conroe RV & Camping Resort shows dense real-world site loops, pull-through
  bands, amenities, bathhouse, laundry, dump station, propane, office, parking,
  boat launch, lake/cove boundaries, and a large icon legend.
  Source: https://rvroddy.com/pdf/Lake_Conroe_RV_Campground.pdf
- River Run RV Park's emergency plan uses a park map with evacuation arrows,
  elevations, site numbers, restrooms, office, clubhouse, pool, river access, and
  phone/contact information.
  Source: https://www.riverrunrvpark.com/RivRunEmerPlan.pdf
- California emergency planning guidance says special occupancy/RV park plans
  should identify essential evacuation routes, make evacuation information
  available, consider blocked exits and section order, and include essential
  routes and emergency contact information.
  Source: https://www.caloes.ca.gov/wp-content/uploads/Preparedness/Documents/05-FEAT-EmergencyPlansforMobile-Home-ParksFEAT-doc.pdf
- Michigan EGLE campground guidance says scaled construction plans must include
  campground layout, roads, water/sewer utilities, sites, site numbers, and site
  dimensions; roads must be at least 20 feet wide and connect to outside roads.
  Source: https://www.michigan.gov/egle/-/media/Project/Websites/egle/Documents/Programs/DWEHD/Campground/New-Campground-Guidance.pdf
- NPS campground development guidance notes that RV water, sewer, and electrical
  hookups are typically on the driver side, and that RV sites should be designed
  around maneuvering, roadway constraints, back-in/pull-through geometry, and
  practical access to pedestals.
  Source: https://npshistory.com/publications/management/campground-dev-guidelines-draft-2020.pdf

## Design Requirements for UtilityBinder Demo Map

1. The base must look like a plausible park plan before utility pins are added.
2. Roads need hierarchy: public road, entrance, loop roads, one-way/service roads.
3. RV pads should be angled/back-in/pull-through, not identical grid boxes.
4. Bathhouse, office, pump house, propane, dump station, laundry, and septic field
   must sit beside roads/service pads, not inside travel lanes.
5. Natural features should be believable boundaries: river/lake/creek edges,
   tree lines, coves, footpaths, and terrain/elevation notes where useful.
6. The UtilityBinder layer should be operational, not tourist decorative:
   shutoffs, cleanouts, panels, pump disconnects, confidence, source, and
   "never verified" warnings.
7. The map needs a real legend, north arrow, scale, revision/date block, and clear
   fictional-data disclaimer.
8. Emergency context should include evacuation/response cues where relevant:
   exits, route arrows, local emergency contact placeholder, and utility shutoff
   priority.
9. The demo should show the difference between source map and product overlay:
   "old guest map / paper plan" underneath, UtilityBinder operational layer on top.
10. Avoid clip-art trees/buildings as the primary credibility device. If icons are
    used, they should be small symbols in a legend, not decorative map art.

## Recommended Visual Direction

Build a hybrid artifact:

- Base layer: monochrome or muted "scanned operations plan" with realistic road
  loops, angled pads, amenity/service buildings, title block, and scale.
- Overlay layer: colored utility traces and high-contrast asset pins for water,
  sewer, electric, gas/propane, irrigation, and unknown hazards.
- Side panel: selected site/asset record with source, confidence, affected sites,
  last verified date, and follow-up notes.

This should feel closer to a field-ready binder page plus interactive pins than a
guest reservation map.

## Implementation Decision

Use a generated illustrated campground plan as the visual base and keep
UtilityBinder data in deterministic overlays. This is the right split for the
demo because road geometry, pad setbacks, tree lines, water edges, and buildings
need to feel like a real place before the software layer appears. The overlay
then remains auditable: site labels, click targets, asset pins, and PDF markers
all derive from `web/lib/plan-layout.ts` and `web/lib/demo-data.ts`.

Rejected path: continuing to hand-draw the entire map in SVG. The previous SVG
approach made every road/pad/building placement error look like product
immaturity, and it was slower to art-direct toward the real campground map
references above.
