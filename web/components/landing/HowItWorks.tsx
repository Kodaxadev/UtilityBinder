import Link from "next/link";
import { Kicker } from "../ui/Kicker";
import { Reveal } from "../ui/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Send what you have",
    body: "Your existing map (a phone photo is fine), a site list from your reservation software, and recent incident stories. 30 minutes on the phone.",
  },
  {
    n: "02",
    title: "We walk it with your staff",
    body: "A 2–4 hour guided walk, on-site or by video. We pin shutoffs, photograph everything, and interview your veteran — every claim gets a source and a confidence level.",
  },
  {
    n: "03",
    title: "You get the binder",
    body: "A printable Emergency PDF for the shop wall, a private Staff Emergency Map for phones, and a Dave Sheet of everything that lived only in someone's head.",
  },
];

const ARTIFACT_LINKS = [
  { href: "/sample/emergency-pdf", label: "Sample Emergency PDF" },
  { href: "/demo", label: "Staff Emergency Map demo" },
  { href: "/sample/dave-sheet", label: "The Dave Sheet" },
];

export function HowItWorks() {
  return (
    <section className="border-y border-ink/10 bg-paper-warm">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <Kicker>Work order</Kicker>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            How the pilot works
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <li className="relative">
                <p className="font-mono text-5xl font-semibold text-ink/15">
                  {s.n}
                </p>
                <h3 className="mt-2 text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {ARTIFACT_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group font-semibold text-work transition-colors hover:text-work-deep"
              >
                {l.label}{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
