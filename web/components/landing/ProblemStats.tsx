import { Kicker } from "../ui/Kicker";
import { Reveal } from "../ui/Reveal";

const STATS = [
  {
    figure: "811",
    unit: "won't mark your lines",
    detail:
      "811 marks public utilities up to the meter. Your pedestal feeds, water loops, and sewer runs are private lines — legally your responsibility, and unmapped by default.",
    source: "State 811 programs (e.g., Missouri 811, Kentucky 811)",
  },
  {
    figure: "196,977",
    unit: "damage events · 2024",
    detail:
      "Reported strikes on buried utilities in the US and Canada — and the industry's own root-cause analysis points at inaccurate maps, lost records, and abandoned facilities.",
    source: "Common Ground Alliance, 2024 DIRT Report",
  },
  {
    figure: "$500–1,000",
    unit: "per locate visit",
    detail:
      "A private locator marks lines with paint that washes away. One pilot costs about the same — and the knowledge stays, searchable, with photos.",
    source: "Published private-locating rate ranges",
  },
];

export function ProblemStats() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <Kicker>The problem on paper</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          The binder in the office isn&rsquo;t a system. Neither is
          Dave&rsquo;s memory.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Hospitals and school districts pay for instant shutoff maps. Your
          park&rsquo;s version is a paper map from 1998, photos on one
          person&rsquo;s phone, and whatever the last contractor remembers.
        </p>
      </Reveal>
      <div className="mt-12">
        {STATS.map((s, i) => (
          <Reveal key={s.figure} delay={i * 0.08}>
            <div className="ledger-rule grid gap-2 py-6 sm:grid-cols-[260px_1fr] sm:gap-8">
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
                <p className="mt-2 font-mono text-xs text-ink-faint">
                  {s.source}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="ledger-rule" />
      </div>
    </section>
  );
}
