import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { SafetyBox } from "@/components/SafetyDisclaimer";
import { DemoApp } from "@/components/demo/DemoApp";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Staff Emergency Map — live demo | UtilityBinder",
  description:
    "Interactive demo of the UtilityBinder Staff Emergency Map using a fictional campground. Search a site number, see which shutoffs control it.",
};

export default function DemoPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <Kicker>Live demo · fictional data</Kicker>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
          Staff Emergency Map
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">
          This is <strong className="text-ink">Big Pine Family Campground</strong>{" "}
          — a fictional park with deliberately imperfect records, because
          honest provenance is the product. Some valves are verified and
          tested; one is on a 1998 paper map and has never been found. Your
          park looks like this too.
        </p>
        <SafetyBox className="mt-5 max-w-3xl" />
        <div className="mt-8">
          <DemoApp />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
