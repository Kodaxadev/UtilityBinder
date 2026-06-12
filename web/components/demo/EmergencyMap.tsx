"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, LayerGroup, Marker, Rectangle } from "leaflet";
import "leaflet/dist/leaflet.css";
import { BIG_PINE, dependenciesForSite } from "@/lib/demo-data";
import { UTILITY_META } from "@/lib/utility-meta";
import type { PlanPosition, UtilityType } from "@/lib/types";
import { assetPinHtml, setPinActive, siteLabelHtml } from "./map-markers";

interface Props {
  selectedSiteId: string | null;
  selectedAssetId: string | null;
  hoveredAssetId: string | null;
  activeUtilities: Set<UtilityType>;
  night: boolean;
  onSelectSite: (siteId: string) => void;
  onSelectAsset: (assetId: string) => void;
  onHoverAsset: (assetId: string | null) => void;
}

/** Convert plan pixel coords (y-down) to Leaflet CRS.Simple latlng (y-up). */
function toLatLng(p: PlanPosition): [number, number] {
  return [BIG_PINE.planHeight - p.y, p.x];
}

export function EmergencyMap({
  selectedSiteId,
  selectedAssetId,
  hoveredAssetId,
  activeUtilities,
  night,
  onSelectSite,
  onSelectAsset,
  onHoverAsset,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const highlightRef = useRef<LayerGroup | null>(null);
  const utilityGroupsRef = useRef<Map<UtilityType, LayerGroup>>(new Map());
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const padsRef = useRef<Map<string, Rectangle>>(new Map());

  // Initialize the map once.
  useEffect(() => {
    let cancelled = false;
    const utilityGroups = utilityGroupsRef.current;
    const markers = markersRef.current;
    const pads = padsRef.current;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const bounds: [[number, number], [number, number]] = [
        [0, 0],
        [BIG_PINE.planHeight, BIG_PINE.planWidth],
      ];
      const map = L.map(containerRef.current, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomSnap: 0,
        attributionControl: false,
      });
      L.imageOverlay(BIG_PINE.planImage, bounds).addTo(map);
      map.fitBounds(bounds);

      // Site hit targets sit on the visible pads in the base image.
      for (const site of BIG_PINE.sites) {
        const { x, y } = site.position;
        const rect = L.rectangle(
          [toLatLng({ x: x - 30, y: y + 15 }), toLatLng({ x: x + 30, y: y - 15 })],
          { weight: 0, color: "#1d56c0", fillOpacity: 0, interactive: true },
        )
          .addTo(map)
          .on("click", () => onSelectSite(site.id))
          .on("mouseover", () => rect.setStyle({ weight: 2, fillOpacity: 0.07 }))
          .on("mouseout", () => rect.setStyle({ weight: 0, fillOpacity: 0 }));
        pads.set(site.id, rect);
        L.marker(toLatLng(site.position), {
          interactive: false,
          keyboard: false,
          icon: L.divIcon({
            className: "",
            html: siteLabelHtml(site),
            iconSize: [0, 0],
          }),
        }).addTo(map);
      }

      // Asset pins grouped per utility for layer filtering.
      for (const asset of BIG_PINE.assets) {
        let group = utilityGroups.get(asset.utility);
        if (!group) {
          group = L.layerGroup().addTo(map);
          utilityGroups.set(asset.utility, group);
        }
        const marker = L.marker(toLatLng(asset.position), {
          icon: L.divIcon({ className: "", html: assetPinHtml(asset), iconSize: [0, 0] }),
          riseOnHover: true,
        })
          .on("click", () => onSelectAsset(asset.id))
          .on("mouseover", () => onHoverAsset(asset.id))
          .on("mouseout", () => onHoverAsset(null));
        marker.addTo(group);
        markers.set(asset.id, marker);
      }

      highlightRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      utilityGroups.clear();
      markers.clear();
      pads.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Night mode: toggled imperatively — React must never rewrite className
  // on this div, because Leaflet owns it and adds its own runtime classes.
  useEffect(() => {
    containerRef.current?.classList.toggle("map-night", night);
  }, [night]);

  // Layer filtering: add/remove utility groups.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    for (const [utility, group] of utilityGroupsRef.current) {
      if (activeUtilities.has(utility)) {
        if (!map.hasLayer(group)) map.addLayer(group);
      } else if (map.hasLayer(group)) {
        map.removeLayer(group);
      }
    }
  }, [activeUtilities]);

  // Hover sync from panel cards (and the map's own hover).
  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      setPinActive(marker.getElement() ?? undefined, id === hoveredAssetId);
    }
  }, [hoveredAssetId]);

  // Selection highlights: frame the site, ring its related assets.
  useEffect(() => {
    (async () => {
      const map = mapRef.current;
      const group = highlightRef.current;
      if (!map || !group) return;
      const L = (await import("leaflet")).default;
      group.clearLayers();

      if (selectedSiteId) {
        const site = BIG_PINE.sites.find((s) => s.id === selectedSiteId);
        if (site) {
          const { x, y } = site.position;
          L.rectangle(
            [toLatLng({ x: x - 34, y: y + 19 }), toLatLng({ x: x + 34, y: y - 19 })],
            { color: "#1d56c0", weight: 2.5, fillOpacity: 0.1 },
          ).addTo(group);
          for (const { asset } of dependenciesForSite(selectedSiteId)) {
            L.circleMarker(toLatLng(asset.position), {
              radius: 22,
              color: UTILITY_META[asset.utility].color,
              weight: 2.5,
              fillOpacity: 0,
              dashArray: "5 5",
              interactive: false,
            }).addTo(group);
          }
        }
      }

      if (selectedAssetId) {
        const asset = BIG_PINE.assets.find((a) => a.id === selectedAssetId);
        if (asset) {
          L.circleMarker(toLatLng(asset.position), {
            radius: 24,
            color: UTILITY_META[asset.utility].color,
            weight: 3,
            fillOpacity: 0,
            interactive: false,
          }).addTo(group);
          map.panTo(toLatLng(asset.position));
        }
      }
    })();
  }, [selectedSiteId, selectedAssetId]);

  return (
    <div
      ref={containerRef}
      className="h-[320px] w-full rounded-lg border border-ink/15 bg-[#f7f3e8] shadow-[inset_0_1px_4px_rgba(31,27,22,0.08)] sm:aspect-[3/2] sm:h-auto"
      role="application"
      aria-label="Staff Emergency Map of Big Pine Family Campground (fictional demo)"
    />
  );
}
