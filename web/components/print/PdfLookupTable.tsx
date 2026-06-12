import { BIG_PINE, dependenciesForSite } from "@/lib/demo-data";
import type { UtilityType } from "@/lib/types";
import { PageHeader } from "./PrintShell";

const COLUMNS: UtilityType[] = ["water", "sewer", "electric", "gas"];

/**
 * Reverse lookup: site number → the asset to act on, per utility.
 * This is the page that answers "leak at 42, which valve?" in one glance.
 */
export function PdfLookupTable() {
  return (
    <section className="pdf-page">
      <PageHeader
        title="Site → Shutoff Reverse Lookup"
        property={BIG_PINE.name}
      />
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b-2 border-stone-700 text-left">
            <th className="py-1 pr-2">Site</th>
            <th className="py-1 pr-2">Water</th>
            <th className="py-1 pr-2">Sewer</th>
            <th className="py-1 pr-2">Electric</th>
            <th className="py-1">Gas</th>
          </tr>
        </thead>
        <tbody>
          {BIG_PINE.sites.map((site) => {
            const deps = dependenciesForSite(site.id);
            return (
              <tr key={site.id} className="border-b border-stone-200">
                <td className="py-1 pr-2 font-bold">
                  {site.label}
                  <span className="ml-1 font-normal text-stone-400">{site.area}</span>
                </td>
                {COLUMNS.map((u) => {
                  const hits = deps.filter((d) => d.asset.utility === u);
                  return (
                    <td key={u} className="py-1 pr-2">
                      {hits.length === 0 ? (
                        <span className="text-red-700">—</span>
                      ) : (
                        hits
                          .map(
                            (h) =>
                              `${h.asset.label}${h.dependency.provenance.confidence === "low" ? " (?)" : ""}`,
                          )
                          .join(", ")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-stone-500">
        (?) = low-confidence record. — = no record; treat as unknown, not as
        &ldquo;none exists.&rdquo;
      </p>
    </section>
  );
}
