import type { Provenance } from "@/lib/types";
import { CONFIDENCE_META, SOURCE_LABEL } from "@/lib/utility-meta";

export function ProvenanceBadge({ provenance }: { provenance: Provenance }) {
  const conf = CONFIDENCE_META[provenance.confidence];
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px]">
      <span className={`rounded-sm border px-1.5 py-0.5 font-semibold ${conf.badgeClass}`}>
        {conf.label}
      </span>
      <span className="text-ink-faint">
        {SOURCE_LABEL[provenance.source]} · {provenance.recordedBy}
      </span>
      {provenance.lastVerified ? (
        <span className="text-ink-faint">ver. {provenance.lastVerified}</span>
      ) : (
        <span className="rounded-sm border border-red-300 bg-red-50 px-1.5 py-0.5 font-bold text-red-800">
          NEVER VERIFIED
        </span>
      )}
    </div>
  );
}
