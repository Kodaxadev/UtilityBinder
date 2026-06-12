import type { Metadata } from "next";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { PrintShell, PageHeader } from "@/components/print/PrintShell";
import { PrintButton } from "@/components/print/PrintButton";
import { Kicker } from "@/components/ui/Kicker";

export const metadata: Metadata = {
  title: "The Dave Sheet — knowledge capture worksheet | UtilityBinder",
  description:
    "The structured worksheet we use to capture what only your veteran maintenance person knows — claims, sources, confidence, and the do-not-trust list.",
};

const CLAIM_ROWS = 10;

function BlankRows({ count, cols }: { count: number; cols: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <tr key={i} className="border-b border-stone-300">
          {Array.from({ length: cols }, (_, j) => (
            <td key={j} className="h-9" />
          ))}
        </tr>
      ))}
    </>
  );
}

export default function DaveSheetPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="mx-auto max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <div className="print:hidden">
          <Kicker>Internal worksheet</Kicker>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
            The Dave Sheet
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-soft">
            Every park has a Dave — the person whose head holds twenty years of
            &ldquo;the valve is behind the shed&rdquo; and &ldquo;don&rsquo;t
            dig there.&rdquo; During the pilot walk we fill this in together.
            Every claim gets a source, a confidence level, and a date — because
            &ldquo;Dave says&rdquo; is real data once you write down that
            it&rsquo;s Dave who said it.
          </p>
          <div className="mt-5">
            <PrintButton />
          </div>
        </div>
        <div className="mt-8 rounded-lg border border-ink/12 bg-white p-6 shadow-[0_32px_64px_-24px_rgba(31,27,22,0.35)] sm:p-10 print:mt-0 print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <PrintShell generatedAt="________" watermark="INTERNAL WORKSHEET — NOT A UTILITY LOCATE">
          <section className="pdf-page">
            <PageHeader title="Knowledge Capture — the Dave Sheet" property="Property: ______________________" />
            <p className="mb-3 text-sm text-stone-600">
              Interviewee: ____________________ · Role / years here: ________ ·
              Walked with: ____________________ · Date: ____________
            </p>
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-700">
              Claims (one per line)
            </h3>
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-stone-700 text-left">
                  <th className="w-[34%] py-1 pr-2">What they said (verbatim)</th>
                  <th className="w-[18%] py-1 pr-2">Basis (memory / repaired it / old map / saw it)</th>
                  <th className="w-[12%] py-1 pr-2">Confidence (L/M/H)</th>
                  <th className="w-[18%] py-1 pr-2">Photo taken? Pin dropped?</th>
                  <th className="w-[18%] py-1">Follow-up needed</th>
                </tr>
              </thead>
              <tbody>
                <BlankRows count={CLAIM_ROWS} cols={5} />
              </tbody>
            </table>
          </section>
          <section className="pdf-page">
            <PageHeader title="Unknowns & Do-Not-Trust List" property="Property: ______________________" />
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-stone-700">
              Open questions nobody could answer
            </h3>
            <table className="w-full border-collapse text-xs">
              <tbody>
                <BlankRows count={6} cols={1} />
              </tbody>
            </table>
            <h3 className="mb-1 mt-6 text-sm font-bold uppercase tracking-wide text-red-800">
              DO NOT TRUST — known-wrong maps, abandoned lines, suspect areas
            </h3>
            <table className="w-full border-collapse text-xs">
              <tbody>
                <BlankRows count={6} cols={1} />
              </tbody>
            </table>
            <p className="mt-6 rounded border-2 border-amber-400 bg-amber-50 p-3 text-xs font-semibold text-amber-900">
              Anything on this sheet is staff memory, not verified
              infrastructure data. Before any digging: call 811, and use a
              private utility locator where private lines may exist.
            </p>
          </section>
        </PrintShell>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
