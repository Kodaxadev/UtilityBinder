"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The hero visual: a laminated emergency shutoff card — the actual artifact
 * the buyer receives, rendered as UI. Tilted like it's lying on a desk;
 * a specular "laminate" sheen runs across it once on entrance.
 */
export function LaminatedCard() {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      aria-label="Example laminated emergency shutoff card for valve V-07"
      initial={{ opacity: 0, y: reduce ? 0 : 18, rotate: reduce ? -2 : 0 }}
      animate={{ opacity: 1, y: 0, rotate: -2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      className="relative w-full max-w-sm overflow-hidden rounded-lg bg-paper shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)] ring-1 ring-paper/20"
    >
      {/* laminate sheen */}
      {!reduce && (
        <motion.span
          aria-hidden="true"
          initial={{ x: "-130%" }}
          animate={{ x: "130%" }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.7 }}
          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />
      )}
      <figcaption className="flex items-center justify-between bg-[#2563eb] px-4 py-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-white">
          Water · Shutoff
        </span>
        <span className="font-mono text-lg font-bold text-white">V-07</span>
      </figcaption>
      <div className="space-y-3 px-4 py-4 text-ink">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">
            Controls
          </p>
          <p className="text-xl font-bold leading-tight">Sites 31–46</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-faint">
            Where
          </p>
          <p className="text-sm leading-snug">
            Behind shed, west side of Row C — round cover under the hose reel
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide">
          <span className="rounded-sm bg-yellow-100 px-1.5 py-0.5 font-semibold text-yellow-900 ring-1 ring-yellow-300">
            Medium confidence
          </span>
          <span className="text-ink-faint">Dave + photo · ver. 2026-06-02</span>
        </div>
        <div className="ledger-rule pt-2">
          <p className="text-[10px] leading-relaxed text-ink-faint">
            EMERGENCY REFERENCE ONLY — not a utility locate. Call 811 before
            digging.
          </p>
        </div>
      </div>
      {/* punched lanyard hole */}
      <span
        aria-hidden="true"
        className="absolute right-3 top-2 h-2.5 w-2.5 rounded-full bg-asphalt/70 ring-2 ring-white/60"
      />
    </motion.figure>
  );
}
