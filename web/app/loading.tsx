export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-32" role="status" aria-label="Loading">
      <div className="flex items-center gap-3">
        <span className="inline-block h-3 w-3 animate-pulse rounded-[2px] bg-caution" />
        <span className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-ink-faint">
          Loading…
        </span>
      </div>
    </div>
  );
}
