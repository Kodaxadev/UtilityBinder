import Link from "next/link";
import { SafetyLine } from "../SafetyDisclaimer";
import { LaminatedCard } from "./LaminatedCard";

export function Hero() {
  return (
    <section className="plat-grid relative overflow-hidden bg-asphalt text-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-caution">
            Independent campgrounds · RV parks · outdoor properties
          </p>
          <h1 className="mt-4 max-w-2xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
            Know what to shut off when{" "}
            <span className="text-caution">Dave</span>
            {" isn’t there."}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            UtilityBinder turns your park&rsquo;s old maps, staff memory,
            photos, and repair notes into a private emergency reference for
            shutoffs, breakers, cleanouts, valves, meters, pumps, and utility
            trouble spots.
          </p>
          <p className="mt-4 max-w-xl font-medium text-paper/90">
            Built <em>for</em> you, not <em>by</em> you — we do the conversion.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="#pilot"
              className="rounded-md bg-caution px-6 py-3.5 text-base font-extrabold text-asphalt shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_8px_24px_-8px_rgba(245,166,35,0.6)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Get the $499 Pilot
            </Link>
            <Link
              href="/demo"
              className="rounded-md border border-paper/30 px-6 py-3.5 text-base font-bold text-paper transition-colors hover:border-caution hover:text-caution"
            >
              Try the live demo
            </Link>
          </div>
          <SafetyLine className="mt-7 max-w-xl !text-paper/45" />
        </div>
        <div className="flex justify-center lg:justify-end">
          <LaminatedCard />
        </div>
      </div>
      {/* asphalt-to-paper transition seam */}
      <div
        aria-hidden="true"
        className="h-2 w-full bg-[repeating-linear-gradient(135deg,var(--color-caution)_0_14px,var(--color-asphalt)_14px_28px)] opacity-80"
      />
    </section>
  );
}
