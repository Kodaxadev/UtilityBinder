"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-asphalt px-5 py-2.5 text-sm font-bold text-paper shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      Print / Save as PDF
    </button>
  );
}
