import Link from "next/link";
import { SafetyLine } from "./SafetyDisclaimer";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur print:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-baseline gap-1.5 text-lg font-extrabold tracking-tight text-ink"
        >
          <span
            aria-hidden="true"
            className="inline-block h-3 w-3 translate-y-px rounded-[2px] bg-caution ring-1 ring-asphalt/20"
          />
          <span>
            Utility<span className="text-work">Binder</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <Link
            href="/demo"
            className="px-1 py-1 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            Live demo
          </Link>
          <Link
            href="/sample/emergency-pdf"
            className="hidden px-1 py-1 text-sm font-semibold text-ink-soft transition-colors hover:text-ink sm:block"
          >
            Sample PDF
          </Link>
          <Link
            href="/#pilot"
            className="rounded-md bg-asphalt px-3.5 py-2 text-sm font-bold text-paper shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            $499 Pilot
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="plat-grid mt-auto bg-asphalt text-paper print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-baseline gap-1.5 text-lg font-extrabold tracking-tight">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 translate-y-px rounded-[2px] bg-caution"
              />
              <span>
                Utility<span className="text-caution">Binder</span>
              </span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
              Emergency utility records for the things only your maintenance
              person knows. Built for independent campgrounds, RV parks, and
              outdoor properties.
            </p>
          </div>
          <nav aria-label="Footer" className="text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-caution">
              Artifacts
            </p>
            <ul className="mt-3 space-y-2 text-paper/80">
              <li><Link href="/demo" className="hover:text-paper">Staff Emergency Map demo</Link></li>
              <li><Link href="/sample/emergency-pdf" className="hover:text-paper">Sample Emergency PDF</Link></li>
              <li><Link href="/sample/dave-sheet" className="hover:text-paper">The Dave Sheet</Link></li>
            </ul>
          </nav>
          <div className="text-sm">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-caution">
              Before you dig
            </p>
            <p className="mt-3 font-mono text-2xl font-semibold text-paper">811</p>
            <p className="mt-1 text-paper/70">
              Always. Private lines may also require a private locator.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-paper/15 pt-6">
          <SafetyLine className="!text-paper/55" />
          <p className="mt-3 font-mono text-xs text-paper/40">
            © 2026 UtilityBinder · Demo content uses fictional data only
          </p>
        </div>
      </div>
    </footer>
  );
}
