"use client";

import { useState } from "react";
import { SafetyLine } from "../SafetyDisclaimer";

const INCIDENT_OPTIONS = [
  "Utility strike",
  "Couldn't find a shutoff",
  "Sewer backup",
  "Major water leak",
  "Contractor confusion",
  "None of these",
];

const MAP_OPTIONS = ["No map", "Paper map", "PDF / scan", "Google Earth pins", "GIS / CAD"];

type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-md border border-ink/20 bg-white px-3 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-faint focus:border-work focus:outline-none focus:ring-2 focus:ring-work/25";
const label = "block text-sm font-semibold text-ink";

export function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      parkName: data.get("parkName"),
      state: data.get("state"),
      siteCount: data.get("siteCount"),
      propertyAge: data.get("propertyAge"),
      currentMap: data.get("currentMap"),
      pms: data.get("pms"),
      incidents: data.getAll("incidents"),
      daveAnswer: data.get("daveAnswer"),
      contact: data.get("contact"),
      bestTime: data.get("bestTime"),
      website: data.get("website"), // honeypot — humans leave it blank
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-lg border-2 border-work/30 bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-work">
          Received
        </p>
        <p className="mt-2 text-2xl font-extrabold text-ink">
          Got it — thank you.
        </p>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          We&rsquo;ll reach out within two business days to set up a 15-minute
          call. Have your map (or a phone photo of it) handy.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-lg border border-ink/12 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="parkName" className={label}>Park / property name *</label>
          <input id="parkName" name="parkName" required className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label htmlFor="state" className={label}>State *</label>
          <input id="state" name="state" required className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label htmlFor="siteCount" className={label}>Number of sites</label>
          <input id="siteCount" name="siteCount" inputMode="numeric" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label htmlFor="propertyAge" className={label}>Roughly how old is the property?</label>
          <input id="propertyAge" name="propertyAge" className={`mt-1.5 ${field}`} placeholder="e.g. built 1985" />
        </div>
        <div>
          <label htmlFor="currentMap" className={label}>Current utility map</label>
          <select id="currentMap" name="currentMap" className={`mt-1.5 ${field}`} defaultValue="">
            <option value="" disabled>Choose one…</option>
            {MAP_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="pms" className={label}>Reservation software</label>
          <input id="pms" name="pms" className={`mt-1.5 ${field}`} placeholder="Campspot, CampLife, none…" />
        </div>
      </div>

      <fieldset className="rounded-md border border-ink/12 bg-paper px-4 pb-4 pt-3">
        <legend className="px-1 text-sm font-semibold text-ink">
          In the last 2 years, have you had… (check all)
        </legend>
        <div className="mt-1 grid gap-2.5 sm:grid-cols-2">
          {INCIDENT_OPTIONS.map((o) => (
            <label key={o} className="flex items-center gap-2.5 text-sm text-ink-soft">
              <input type="checkbox" name="incidents" value={o} className="h-4 w-4 accent-work" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="daveAnswer" className={label}>
          Who knows where everything is? What happens when they&rsquo;re not there?
        </label>
        <textarea id="daveAnswer" name="daveAnswer" rows={3} className={`mt-1.5 ${field}`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact" className={label}>Email or phone *</label>
          <input id="contact" name="contact" required className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label htmlFor="bestTime" className={label}>Best time to reach you</label>
          <input id="bestTime" name="bestTime" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-md bg-caution px-7 py-3.5 text-base font-extrabold text-asphalt shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Request the $499 pilot"}
        </button>
        {status === "error" && (
          <p className="text-sm font-semibold text-red-700">
            Something went wrong — please email us directly instead.
          </p>
        )}
      </div>
      <SafetyLine />
    </form>
  );
}
