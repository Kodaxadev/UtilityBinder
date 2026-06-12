import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { SafetyBox } from "@/components/SafetyDisclaimer";
import { PrintShell } from "@/components/print/PrintShell";
import { PdfOverviewPage } from "@/components/print/PdfOverviewPage";
import { PdfSystemPages } from "@/components/print/PdfSystemPages";
import { PdfLookupTable } from "@/components/print/PdfLookupTable";
import { PrintButton } from "@/components/print/PrintButton";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "Sample UtilityBinder Emergency PDF | UtilityBinder",
  description:
    "What the printable UtilityBinder Emergency PDF looks like — overview map, per-system shutoff tables, and the site-to-shutoff reverse lookup. Fictional data.",
};

export default function SampleEmergencyPdfPage() {
  const generatedAt = "2026-06-11";
  return (
    <>
      <SiteNav />
      <main id="main" className="mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <div className="print:hidden">
          <Kicker>Sample artifact · fictional data</Kicker>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
            The UtilityBinder Emergency PDF
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">
            This is the artifact that goes on the shop wall, laminated by the
            door, and in the truck glovebox. Use your browser&rsquo;s print
            dialog (or the button) to see the real thing — the watermark and
            safety disclaimers are built into every page of the template by
            design.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <PrintButton />
          </div>
          <SafetyBox className="mt-5 max-w-3xl" />
        </div>
        {/* Paper-on-desk frame on screen; frameless when printed */}
        <div className="mt-8 rounded-lg border border-ink/12 bg-white p-6 shadow-[0_32px_64px_-24px_rgba(31,27,22,0.35)] sm:p-10 print:mt-0 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <PrintShell generatedAt={generatedAt}>
            <PdfOverviewPage />
            <PdfSystemPages />
            <PdfLookupTable />
          </PrintShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
