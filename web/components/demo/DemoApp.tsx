"use client";

import { useMemo, useState } from "react";
import { BIG_PINE } from "@/lib/demo-data";
import type { UtilityType } from "@/lib/types";
import { EmergencyMap } from "./EmergencyMap";
import { ResultsPanel } from "./ResultsPanel";
import { MapLegend } from "./MapLegend";

const ALL_UTILITIES: UtilityType[] = [
  "water", "sewer", "electric", "gas", "irrigation", "data", "unknown",
];

const SCENARIOS: { label: string; siteId?: string; assetId?: string }[] = [
  { label: "2 a.m. — water spraying at Site 42", siteId: "site-42" },
  { label: "Sewer backup near 41", siteId: "site-41" },
  { label: "Pedestal dead at 37", siteId: "site-37" },
  { label: "Find the propane shutoff", assetId: "g-01" },
];

export function DemoApp() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [hoveredAssetId, setHoveredAssetId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [night, setNight] = useState(false);
  const [activeUtilities, setActiveUtilities] = useState<Set<UtilityType>>(
    () => new Set(ALL_UTILITIES),
  );

  const stats = useMemo(() => {
    const assets = BIG_PINE.assets.length;
    const deps = BIG_PINE.dependencies.length;
    const unverified = BIG_PINE.assets.filter(
      (a) => a.provenance.lastVerified === null,
    ).length;
    return { assets, deps, unverified };
  }, []);

  function selectSite(id: string) {
    setSelectedSiteId(id);
    setSelectedAssetId(null);
    setQuery(BIG_PINE.sites.find((s) => s.id === id)?.label ?? "");
    setNotFound(false);
  }

  function search(value: string) {
    setQuery(value);
    setNotFound(false);
    const q = value.trim().toLowerCase();
    if (!q) {
      setSelectedSiteId(null);
      setSelectedAssetId(null);
      return;
    }
    const site = BIG_PINE.sites.find((s) => s.label.toLowerCase() === q);
    if (site) {
      setSelectedSiteId(site.id);
      setSelectedAssetId(null);
    } else {
      setNotFound(true);
    }
  }

  function runScenario(s: (typeof SCENARIOS)[number]) {
    if (s.siteId) selectSite(s.siteId);
    if (s.assetId) {
      setSelectedAssetId(s.assetId);
      setSelectedSiteId(null);
      setQuery("");
      setNotFound(false);
    }
  }

  function toggleUtility(u: UtilityType) {
    setActiveUtilities((prev) => {
      const next = new Set(prev);
      if (next.has(u)) next.delete(u);
      else next.add(u);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      {/* Toolbar: scenarios + record stats + night mode */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">
            Run a scenario
          </span>
          {SCENARIOS.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => runScenario(s)}
              className="rounded-full border border-ink/20 bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-work hover:text-work"
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            {stats.assets} assets · {stats.deps} dependencies ·{" "}
            <span className="font-bold text-red-700">
              {stats.unverified} never verified
            </span>
          </p>
          <button
            type="button"
            aria-pressed={night}
            onClick={() => setNight((n) => !n)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
              night
                ? "border-caution bg-asphalt text-caution"
                : "border-ink/20 bg-white text-ink-soft hover:border-ink/40"
            }`}
          >
            2 a.m. mode
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-3">
          <MapLegend active={activeUtilities} onToggle={toggleUtility} />
          <EmergencyMap
            selectedSiteId={selectedSiteId}
            selectedAssetId={selectedAssetId}
            hoveredAssetId={hoveredAssetId}
            activeUtilities={activeUtilities}
            night={night}
            onSelectSite={selectSite}
            onSelectAsset={(id) => {
              setSelectedAssetId(id);
              setNotFound(false);
            }}
            onHoverAsset={setHoveredAssetId}
          />
          <p className="font-mono text-xs text-ink-faint">
            Tap a site pad to see what controls it · tap an asset tag for its
            record
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg bg-asphalt p-4">
            <label className="block">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-caution">
                Site number or cabin
              </span>
              <input
                value={query}
                onChange={(e) => search(e.target.value)}
                inputMode="numeric"
                placeholder="42"
                aria-label="Search by site number or cabin"
                className="mt-2 w-full rounded-md border-2 border-paper/20 bg-asphalt-2 px-4 py-3 font-mono text-3xl font-semibold tracking-widest text-paper placeholder:text-paper/25 focus:border-caution focus:outline-none"
              />
            </label>
            {notFound && (
              <p className="mt-2 text-sm font-semibold text-caution">
                No site &ldquo;{query}&rdquo; — this demo park has sites 1–48
                and cabins CB1–CB4.
              </p>
            )}
          </div>
          <ResultsPanel
            selectedSiteId={selectedSiteId}
            selectedAssetId={selectedAssetId}
            onHoverAsset={setHoveredAssetId}
          />
          <div className="rounded-lg border border-ink/10 bg-paper-warm p-4 text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
              If this were real
            </p>
            <p className="mt-1.5 leading-relaxed text-ink-soft">
              Your emergency contacts and local 811 info would be pinned here.
              Call 811 before any digging — always.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
