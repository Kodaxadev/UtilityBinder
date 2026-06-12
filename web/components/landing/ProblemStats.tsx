import { Kicker } from "../ui/Kicker";

const STATS = [
  {
    figure: "811",
    unit: "won't mark your lines",
    detail:
      "811 marks public utilities up to the meter. Your pedestal feeds, water loops, and sewer runs are private lines — legally your responsibility, and unmapped by default.",
    sources: [
      {
        label: "Missouri 811",
        href: "https://blog.missouri-811.org/public-vs-private-utility-lines",
      },
      {
        label: "Kentucky 811",
        href: "https://kentucky811.org/homeowners/privatelocates/",
      },
    ],
  },
  {
    figure: "196,977",
    unit: "damage events · 2024",
    detail:
      "Reported strikes on buried utilities in the US and Canada — and the industry's own root-cause analysis points at inaccurate maps, lost records, and abandoned facilities.",
    sources: [
      {
        label: "CGA DIRT Report 2024",
        href: "https://dirt.commongroundalliance.com/",
      },
    ],
  },
  {
    figure: "$500–1,000",
    unit: "per locate visit",
    detail:
      "A private locator marks lines with paint that washes away. One pilot costs about the same — and the knowledge stays, searchable, with photos.",
    sources: [
      {
        label: "GeoTek GPR cost guide",
        href: "https://www.geotekservices.com/understanding-the-real-costs-of-a-ground-penetrating-radar-gpr-survey/",
      },
    ],
  },
];

function SourceChip({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-sm border border-work/30 bg-work/5 px-2 py-0.5 font-mono text-[11px] font-semibold text-work transition-colors hover:border-work hover:bg-work/10"
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        className="h-2.5 w-2.5 stroke-current"
        fill="none"
        strokeWidth="1.5"
      >
        <path d="M3.5 8.5 8.5 3.5M5 3.5h3.5V7" />
      </svg>
    </a>
  );
}

export function ProblemStats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Kicker>Sourced research — every claim links out</Kicker>
      <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        The binder in the office isn&rsquo;t a system. Neither is Dave&rsquo;s
        memory.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Hospitals and school districts pay for instant shutoff maps. Your
        park&rsquo;s version is a paper map from 1998, photos on one
        person&rsquo;s phone, and whatever the last contractor remembers.
      </p>
      <div className="mt-10">
        {STATS.map((s) => (
          <div
            key={s.figure}
            className="ledger-rule grid gap-2 py-5 sm:grid-cols-[260px_1fr] sm:gap-8"
          >
            <div>
              <p className="font-mono text-4xl font-semibold tracking-tight text-ink">
                {s.figure}
              </p>
              <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-work">
                {s.unit}
              </p>
            </div>
            <div>
              <p className="max-w-xl leading-relaxed text-ink-soft">
                {s.detail}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  Sources
                </span>
                {s.sources.map((src) => (
                  <SourceChip key={src.href} {...src} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="ledger-rule" />
      </div>
    </section>
  );
}
