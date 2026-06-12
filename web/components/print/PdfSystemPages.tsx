import { BIG_PINE } from "@/lib/demo-data";
import { formatSiteList } from "@/lib/site-format";
import {
  CONFIDENCE_META,
  RELATION_LABEL,
  SOURCE_LABEL,
  UTILITY_META,
} from "@/lib/utility-meta";
import type { UtilityType } from "@/lib/types";
import { PageHeader } from "./PrintShell";

const SYSTEMS: UtilityType[] = ["water", "sewer", "electric", "gas"];

/** One page per utility system: every asset, what it controls, and how much to trust it. */
export function PdfSystemPages() {
  return (
    <>
      {SYSTEMS.map((utility) => {
        const assets = BIG_PINE.assets.filter((a) => a.utility === utility);
        if (assets.length === 0) return null;
        return (
          <section key={utility} className="pdf-page">
            <PageHeader
              title={`${UTILITY_META[utility].label} System`}
              property={BIG_PINE.name}
            />
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-stone-700 text-left">
                  <th className="py-1.5 pr-2">Asset</th>
                  <th className="py-1.5 pr-2">Where it is</th>
                  <th className="py-1.5 pr-2">What it affects</th>
                  <th className="py-1.5">Trust level</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => {
                  const deps = BIG_PINE.dependencies.filter(
                    (d) => d.assetId === asset.id,
                  );
                  return (
                    <tr key={asset.id} className="border-b border-stone-200 align-top">
                      <td className="py-2 pr-2 font-bold whitespace-nowrap">
                        {asset.label}
                        <div className="text-xs font-normal text-stone-500">
                          {asset.assetType}
                          {asset.status !== "active" ? ` · ${asset.status.toUpperCase()}` : ""}
                        </div>
                      </td>
                      <td className="py-2 pr-2">
                        {asset.locationText}
                        {asset.notes ? (
                          <div className="text-xs font-semibold text-amber-800">
                            {asset.notes}
                          </div>
                        ) : null}
                      </td>
                      <td className="py-2 pr-2">
                        {deps.length === 0 ? (
                          <span className="font-semibold text-red-700">
                            Unknown — needs verification
                          </span>
                        ) : (
                          deps.map((d) => (
                            <div key={d.id}>
                              {RELATION_LABEL[d.relation]} sites{" "}
                              {formatSiteList(d.siteIds, BIG_PINE.sites)}
                              {d.notes ? (
                                <div className="text-xs text-stone-500">{d.notes}</div>
                              ) : null}
                            </div>
                          ))
                        )}
                      </td>
                      <td className="py-2 text-xs">
                        <div className="font-semibold">
                          {CONFIDENCE_META[asset.provenance.confidence].label}
                        </div>
                        <div className="text-stone-500">
                          {SOURCE_LABEL[asset.provenance.source]}
                        </div>
                        <div>
                          {asset.provenance.lastVerified ? (
                            `Verified ${asset.provenance.lastVerified}`
                          ) : (
                            <span className="font-bold text-red-700">NEVER VERIFIED</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </>
  );
}
