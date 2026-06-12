/**
 * Section label in ledger type — uppercase mono with a caution tick.
 * The recurring "stamped label" motif that ties sections together.
 */
export function Kicker({
  children,
  tone = "ink",
}: {
  children: React.ReactNode;
  tone?: "ink" | "paper";
}) {
  return (
    <p
      className={`flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "paper" ? "text-caution" : "text-work"
      }`}
    >
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current" />
      {children}
    </p>
  );
}
