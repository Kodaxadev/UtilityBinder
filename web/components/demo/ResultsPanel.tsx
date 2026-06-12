"use client";

import { BIG_PINE, dependenciesForSite } from "@/lib/demo-data";
import { formatSiteList } from "@/lib/site-format";
import { RELATION_LABEL, UTILITY_META } from "@/lib/utility-meta";
import type { UtilityType } from "@/lib/types";
import { ProvenanceBadge } from "./ProvenanceBadge";

interface Props {
  selectedSiteId: string | null;
  selectedAssetId: string | null;
  onHoverAsset: (assetId: string | null) => void;
}

const CORE_UTILITIES: UtilityType[] = ["water", "sewer", "electric"];

function PhotoPlaceholder() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-dashed border-ink/20 px-3 py-2">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 stroke-ink-faint"
        fill="none"
        strokeWidth="1.8"
      >
        <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7H7l1.5-2h7L17 7h2.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="font-mono text-xs text-ink-faint">
        Field photos of this asset appear here in a real pilot
      </span>
    </div>
  );
}

function UtilityChip({ utility }: { utility: UtilityType }) {
  const meta = UTILITY_META[utility];
  return (
    <span
      className="rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-white"
      style={{ backgroundColor: meta.color }}
    >
      {meta.label}
    </span>
  );
}

function AssetDetail({
  assetId,
  onHoverAsset,
}: {
  assetId: string;
  onHoverAsset: (id: string | null) => void;
}) {
  const asset = BIG_PINE.assets.find((a) => a.id === assetId);
  if (!asset) return null;
  const deps = BIG_PINE.dependencies.filter((d) => d.assetId === assetId);
  return (
    <div
      onMouseEnter={() => onHoverAsset(asset.id)}
      onMouseLeave={() => onHoverAsset(null)}
      className="space-y-3 rounded-lg border border-ink/12 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <UtilityChip utility={asset.utility} />
        <h3 className="font-mono text-xl font-bold text-ink">{asset.label}</h3>
        <span className="text-sm font-medium text-ink-soft">{asset.assetType}</span>
        {asset.status !== "active" && (
          <span className="rounded-sm bg-ink/10 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-ink-soft">
            {asset.status}
          </span>
        )}
      </div>
      <p className="leading-snug text-ink">{asset.locationText}</p>
      {asset.notes && (
        <p className="rounded-md border-l-2 border-caution bg-paper-warm px-3 py-2 text-sm text-ink-soft">
          {asset.notes}
        </p>
      )}
      <ProvenanceBadge provenance={asset.provenance} />
      <div className="ledger-rule space-y-1.5 pt-3">
        {deps.map((d) => (
          <p key={d.id} className="text-sm text-ink">
            <strong>{RELATION_LABEL[d.relation]}</strong>{" "}
            <span className="font-mono">
              {formatSiteList(d.siteIds, BIG_PINE.sites)}
            </span>
            {d.notes ? <span className="text-ink-faint"> — {d.notes}</span> : null}
          </p>
        ))}
      </div>
      <PhotoPlaceholder />
    </div>
  );
}

function SiteResults({
  siteId,
  onHoverAsset,
}: {
  siteId: string;
  onHoverAsset: (id: string | null) => void;
}) {
  const site = BIG_PINE.sites.find((s) => s.id === siteId);
  if (!site) return null;
  const results = dependenciesForSite(siteId);
  const coveredUtilities = new Set(results.map((r) => r.asset.utility));
  const missing = CORE_UTILITIES.filter((u) => !coveredUtilities.has(u));

  // Water first — the 2 a.m. default (PRD-0002).
  const order: UtilityType[] = ["water", "sewer", "electric", "gas", "irrigation", "data", "unknown"];
  const sorted = [...results].sort(
    (a, b) => order.indexOf(a.asset.utility) - order.indexOf(b.asset.utility),
  );

  const notes = BIG_PINE.eventNotes.filter((n) => n.siteIds?.includes(siteId));

  return (
    <div className="space-y-3">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
        Site {site.label} · {site.area} — related assets
      </h3>
      {sorted.map(({ dependency, asset }) => (
        <div
          key={dependency.id}
          onMouseEnter={() => onHoverAsset(asset.id)}
          onMouseLeave={() => onHoverAsset(null)}
          className="rounded-lg border border-ink/12 bg-white p-4 shadow-sm transition-colors hover:border-work/50"
        >
          <div className="flex flex-wrap items-center gap-2">
            <UtilityChip utility={asset.utility} />
            <span className="font-mono text-base font-bold text-ink">
              {asset.label}
            </span>
            <span className="text-sm text-ink-soft">
              {RELATION_LABEL[dependency.relation]}{" "}
              <span className="font-mono font-semibold text-ink">
                {formatSiteList(dependency.siteIds, BIG_PINE.sites)}
              </span>
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-snug text-ink">
            {asset.locationText}
          </p>
          {dependency.notes && (
            <p className="mt-1.5 rounded-md border-l-2 border-caution bg-paper-warm px-3 py-1.5 text-sm text-ink-soft">
              {dependency.notes}
            </p>
          )}
          <div className="mt-2.5">
            <ProvenanceBadge provenance={dependency.provenance} />
          </div>
        </div>
      ))}
      {missing.map((u) => (
        <div
          key={u}
          className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4 text-sm font-semibold text-red-900"
        >
          No recorded {UTILITY_META[u].label.toLowerCase()} shutoff for this
          site — that gap is itself a finding. A verification walk would
          resolve it.
        </div>
      ))}
      {notes.length > 0 && (
        <div className="rounded-lg border border-ink/10 bg-paper-warm p-4">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink-faint">
            History at this site
          </p>
          {notes.map((n) => (
            <p key={n.id} className="mt-2 text-sm leading-relaxed text-ink-soft">
              <span className="font-mono text-xs text-ink-faint">{n.date}</span>{" "}
              {n.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function ResultsPanel({
  selectedSiteId,
  selectedAssetId,
  onHoverAsset,
}: Props) {
  if (selectedAssetId)
    return <AssetDetail assetId={selectedAssetId} onHoverAsset={onHoverAsset} />;
  if (selectedSiteId)
    return <SiteResults siteId={selectedSiteId} onHoverAsset={onHoverAsset} />;
  return (
    <div className="rounded-lg border-2 border-dashed border-ink/15 bg-white/60 p-6 text-center">
      <p className="font-semibold text-ink">
        Type a site number, or tap the map.
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        Try <span className="font-mono font-bold text-ink">42</span> (the
        classic 2 a.m. water leak) or{" "}
        <span className="font-mono font-bold text-ink">22</span> (the
        frozen-line incident).
      </p>
    </div>
  );
}
