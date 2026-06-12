import { Kicker } from "../ui/Kicker";

const PROMISES = [
  {
    title: "Your data leaves with you",
    body: "Full export — CSV, GeoJSON, every photo, every PDF — free, forever, one click. Even if you cancel. Especially if you cancel.",
  },
  {
    title: "The paper keeps working",
    body: "The laminated map on your shop wall doesn't need our servers. If we vanished tomorrow, your binder still answers the 2 a.m. question.",
  },
  {
    title: "We know what we're not",
    body: "Not a locate. Not a survey. Not excavation clearance. When you need locate-grade accuracy, we'll tell you to call a locator — by name if you want.",
  },
];

export function TrustSection() {
  return (
    <section className="plat-grid bg-asphalt text-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Kicker tone="paper">Straight answers</Kicker>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Built like the tools you already trust: no tricks, no lock-in.
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {PROMISES.map((p) => (
            <div key={p.title} className="border-t-2 border-caution pt-4">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-paper/80">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
