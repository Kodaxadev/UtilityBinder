import type { ReactNode } from "react";
import { RECORD_DISCLAIMER } from "../SafetyDisclaimer";

/**
 * Every printable artifact MUST render inside PrintShell (ADR-0002 §4):
 * the watermark and disclaimer band are injected here, at the rendering
 * layer, so no individual template can omit them. `position: fixed`
 * elements repeat on every printed page in Chromium — which is also the
 * engine used for server-side PDF generation later (ADR-0007).
 */
export function PrintShell({
  children,
  watermark = "EMERGENCY REFERENCE ONLY — NOT A UTILITY LOCATE",
  generatedAt,
}: {
  children: ReactNode;
  watermark?: string;
  generatedAt: string;
}) {
  return (
    <div className="bg-white text-stone-900">
      <div className="pdf-watermark" aria-hidden="true">
        {watermark}
      </div>
      <div className="pdf-footer-band" aria-hidden="true">
        PRINTED FOR EMERGENCY REFERENCE ONLY — {RECORD_DISCLAIMER} Data as of{" "}
        {generatedAt}.
      </div>
      {children}
    </div>
  );
}

/** Per-page header strip with the short warning — used at the top of each pdf-page. */
export function PageHeader({ title, property }: { title: string; property: string }) {
  return (
    <header className="mb-4 border-b-2 border-stone-800 pb-2">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-sm font-semibold text-stone-600">{property}</span>
      </div>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
        Emergency reference only · Not a utility locate · Call 811 before digging
      </p>
    </header>
  );
}
