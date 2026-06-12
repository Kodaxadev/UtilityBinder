import { BIG_PINE } from "@/lib/demo-data";
import { UTILITY_META } from "@/lib/utility-meta";
import { PageHeader } from "./PrintShell";

/**
 * Page 1: full plan with asset pins overlaid as percent-positioned dots —
 * the same coordinates the live map uses, so print and screen agree.
 */
export function PdfOverviewPage() {
  const { planWidth, planHeight, assets } = BIG_PINE;
  return (
    <section className="pdf-page">
      <PageHeader title="Emergency Shutoff Map — Overview" property={BIG_PINE.name} />
      <div className="relative w-full overflow-hidden rounded border border-stone-300">
        {/* eslint-disable-next-line @next/next/no-img-element -- static plan, exact pixel space needed for pin overlay */}
        <img src={BIG_PINE.planImage} alt="Site plan" className="block w-full" />
        {assets.map((a) => (
          <div
            key={a.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center"
            style={{
              left: `${(a.position.x / planWidth) * 100}%`,
              top: `${(a.position.y / planHeight) * 100}%`,
            }}
          >
            <span
              className="inline-block h-3.5 w-3.5 rounded-full border border-stone-900"
              style={{ backgroundColor: UTILITY_META[a.utility].color }}
            />
            <span className="ml-0.5 rounded bg-white/90 px-0.5 text-[9px] font-bold">
              {a.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-xs">
        {Object.entries(UTILITY_META).map(([key, meta]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full border border-stone-700"
              style={{ backgroundColor: meta.color }}
            />
            {meta.label}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs text-stone-500">
        Pin positions are approximate, recorded from staff walks and photos —
        good enough to find a shutoff, never good enough to dig by.
      </p>
    </section>
  );
}
