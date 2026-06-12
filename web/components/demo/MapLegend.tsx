"use client";

import { UTILITY_META } from "@/lib/utility-meta";
import type { UtilityType } from "@/lib/types";

const SHOWN: UtilityType[] = ["water", "sewer", "electric", "gas", "irrigation", "unknown"];

/**
 * Functional legend: each chip is a layer toggle. A legend you can operate
 * reads as a tool; a legend you can only look at reads as a picture.
 */
export function MapLegend({
  active,
  onToggle,
}: {
  active: Set<UtilityType>;
  onToggle: (u: UtilityType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Utility layers"
      className="flex flex-wrap items-center gap-1.5 rounded-md border border-ink/10 bg-white px-2.5 py-2"
    >
      <span className="mr-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">
        Layers
      </span>
      {SHOWN.map((u) => {
        const on = active.has(u);
        return (
          <button
            key={u}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(u)}
            className={`flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[11px] font-semibold transition-colors ${
              on
                ? "border-ink/25 bg-paper-warm text-ink"
                : "border-transparent bg-transparent text-ink-faint line-through decoration-ink-faint/60"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block h-2.5 w-2.5 rounded-full ring-1 ring-asphalt/30 transition-opacity ${
                on ? "" : "opacity-30"
              }`}
              style={{ backgroundColor: UTILITY_META[u].color }}
            />
            {UTILITY_META[u].label}
          </button>
        );
      })}
    </div>
  );
}
