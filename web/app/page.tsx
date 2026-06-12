import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { Hero } from "@/components/landing/Hero";
import { ProblemStats } from "@/components/landing/ProblemStats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { TrustSection } from "@/components/landing/TrustSection";
import { Pricing } from "@/components/landing/Pricing";
import { IntakeForm } from "@/components/landing/IntakeForm";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";

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
            <Reveal>
              <Kicker>Start here</Kicker>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Request the Emergency Utility Map Pilot
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Tell us about your property. These answers double as the first
                15 minutes of your onboarding call — and there&rsquo;s no
                commitment until we&rsquo;ve both agreed it&rsquo;s a fit.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10">
                <IntakeForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
