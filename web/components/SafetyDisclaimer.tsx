/**
 * Liability disclaimers — ADR-0002. The verbatim safety line lives here and
 * ONLY here so no page can drift to its own wording.
 */

export const SAFETY_LINE =
  "UtilityBinder is for internal emergency reference and maintenance records only. " +
  "It is not a utility locate, survey, or excavation clearance. Call 811 before " +
  "digging; private utilities may require a private locator.";

export const RECORD_DISCLAIMER =
  "Staff memory record — NOT a utility locate. Do not rely on this for excavation. " +
  "Call 811 before digging; private lines may require a private utility locator.";

/** Compact one-liner placed near CTAs and under interactive views. */
export function SafetyLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ink-faint ${className}`}>
      {SAFETY_LINE}
    </p>
  );
}

/** Loud boxed variant for screens that render infrastructure records. */
export function SafetyBox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-md border-l-4 border-caution-deep bg-caution/10 px-4 py-3 text-sm font-semibold text-ink ${className}`}
      role="note"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="mt-0.5 h-4.5 w-4.5 shrink-0 fill-caution-deep"
      >
        <path d="M12 2.5 23 21H1L12 2.5Zm0 6.2c-.6 0-1 .4-1 1v4.6a1 1 0 0 0 2 0V9.7c0-.6-.4-1-1-1Zm0 8.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
      </svg>
      <span>{RECORD_DISCLAIMER}</span>
    </div>
  );
}
