import { Kicker } from "../ui/Kicker";

const TIERS = [
  {
    name: "Emergency PDF Mini",
    price: "$299",
    blurb: "One map area, up to 25 assets. Printable Emergency PDF only.",
    featured: false,
  },
  {
    name: "Emergency Utility Map Pilot",
    price: "$499",
    blurb:
      "Up to 75 sites and 40 utility points. Emergency PDF + private Staff Emergency Map + Dave Sheet + full data export.",
    featured: true,
  },
  {
    name: "Conversion + Verification Walk",
    price: "$999",
    blurb:
      "Everything in the pilot, plus a guided staff interview, confidence tagging on every record, printable binder, and QR label drafts.",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <Kicker>Plain pricing</Kicker>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        One locate visit&rsquo;s money. Knowledge that stays.
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        After the pilot: hosted Staff Emergency Map from{" "}
        <span className="font-mono font-semibold text-ink">$29/mo</span>.
        Laminated map + QR kit from{" "}
        <span className="font-mono font-semibold text-ink">$149</span>.
        Annual verification walk from{" "}
        <span className="font-mono font-semibold text-ink">$250</span>.{" "}
        <strong className="text-ink">
          Your data exports free, forever — even if you leave.
        </strong>
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.name} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-lg p-7 ${
                t.featured
                  ? "bg-asphalt text-paper shadow-[0_24px_48px_-16px_rgba(22,20,15,0.45)]"
                  : "border border-ink/12 bg-white"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-sm bg-caution px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-asphalt">
                  Most parks start here
                </span>
              )}
              <p
                className={`font-mono text-xs font-semibold uppercase tracking-[0.15em] ${
                  t.featured ? "text-caution" : "text-work"
                }`}
              >
                {t.name}
              </p>
              <p className="mt-3 font-mono text-5xl font-semibold tracking-tight">
                {t.price}
              </p>
              <p
                className={`mt-4 leading-relaxed ${
                  t.featured ? "text-paper/75" : "text-ink-soft"
                }`}
              >
                {t.blurb}
              </p>
              {t.featured && (
                <p className="mt-auto pt-5 text-sm font-semibold text-paper/90">
                  About the cost of one private locate visit — except the paint
                  doesn&rsquo;t wash off.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
