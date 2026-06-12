import Link from "next/link";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
        <p className="font-mono text-6xl font-semibold text-ink/15">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">
          No record at this location.
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Like a 1998 paper map, this link points at something that
          isn&rsquo;t where it says it is.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-caution px-6 py-3 text-base font-extrabold text-asphalt transition-transform hover:scale-[1.03]"
        >
          Back to the front page
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
