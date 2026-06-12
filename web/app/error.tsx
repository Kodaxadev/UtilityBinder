"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-caution-deep">
        Something broke
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
        That wasn&rsquo;t supposed to happen.
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        The error has been noted{error.digest ? ` (ref ${error.digest})` : ""}.
        Try again, or head back to the front page.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="rounded-md bg-asphalt px-5 py-2.5 text-sm font-bold text-paper transition-transform hover:scale-[1.03]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-ink/20 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-ink/40"
        >
          Front page
        </Link>
      </div>
    </main>
  );
}
