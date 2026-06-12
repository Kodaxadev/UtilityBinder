import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { Hero } from "@/components/landing/Hero";
import { ProblemStats } from "@/components/landing/ProblemStats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustSection } from "@/components/landing/TrustSection";
import { Pricing } from "@/components/landing/Pricing";
import { IntakeForm } from "@/components/landing/IntakeForm";
import { Kicker } from "@/components/ui/Kicker";

const REVIEW_STEPS = [
  "Send the form — a phone photo of your paper map is plenty.",
  "We take a first look and call you for 15 minutes. Free, no obligation.",
  "If it's a fit, we book the $499 pilot. If it isn't, we'll say so and point you somewhere better.",
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <ProblemStats />
        <HowItWorks />
        <Pricing />
        <TrustSection />
        <section id="pilot" className="scroll-mt-20 bg-paper-warm">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <Kicker>Start small — free review first</Kicker>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Send your map. We&rsquo;ll take the first look — free.
            </h2>
            <ol className="mt-6 space-y-2.5">
              {REVIEW_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-ink-soft">
                  <span className="font-mono text-sm font-bold text-work">
                    {i + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Your answers below double as the first 15 minutes of that call —
              nothing here commits you to anything, and what you send stays
              private.
            </p>
            <div className="mt-9">
              <IntakeForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
