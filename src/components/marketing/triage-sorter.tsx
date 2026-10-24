"use client";

import { useState } from "react";

import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

const severities = [
  {
    label: "Blocker",
    lane: "Fix now",
    result: "The release holds until this is fixed and retested.",
  },
  {
    label: "Major",
    lane: "Next sprint",
    result: "Scheduled for the next sprint with a named owner.",
  },
  {
    label: "Minor",
    lane: "Backlog",
    result:
      "Goes to the backlog and is reviewed monthly so it does not pile up silently.",
  },
] as const;

/**
 * "Triage a bug": one example bug, three severity buttons, three lanes.
 * Picking a severity lights the lane the bug lands in and says what
 * happens next, which is the page's point: a consistent triage rule so
 * release decisions do not depend on who is in the room. Opens on Blocker
 * so the page at rest already shows a result. ARIA pressed buttons, the
 * result in a polite live region, the chosen lane marked in text as well
 * as color.
 */
export function TriageSorter({ className }: { className?: string }) {
  const [selected, setSelected] = useState(0);
  const chosen = severities[selected]!;

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <p className="font-label text-deep text-xs tracking-widest uppercase">
        Triage a bug, see where it goes
      </p>

      <div className="border-ink bg-paper mt-4 rounded-2xl border-[1.5px] px-4 py-3">
        <p className="font-label text-[10px] tracking-widest uppercase">
          Example bug
        </p>
        <p className="mt-1 text-[17px]">
          The checkout button does nothing on Safari.
        </p>
      </div>

      <div
        role="group"
        aria-label="Severity"
        className="mt-4 flex flex-wrap gap-2"
      >
        {severities.map((severity, index) => (
          <button
            key={severity.label}
            type="button"
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
            className={cn(
              "border-ink h-11 rounded-2xl border-[1.5px] px-4 text-[15px] font-semibold transition-colors duration-200 motion-reduce:transition-none",
              index === selected
                ? "bg-deep text-navajo"
                : "bg-paper text-ink hover:bg-ink/10",
            )}
          >
            {severity.label}
          </button>
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2">
        {severities.map((severity, index) => (
          <li
            key={severity.lane}
            className={cn(
              "border-ink min-h-[88px] rounded-2xl border-[1.5px] p-3 text-sm transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none",
              index === selected
                ? "bg-navajo shadow-[0_3px_0_var(--ink)]"
                : "bg-paper",
            )}
          >
            <span className="font-label text-[10px] tracking-widest uppercase">
              {severity.lane}
            </span>
            {index === selected ? (
              <p className="mt-1.5 leading-tight">The bug lands here.</p>
            ) : null}
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="mt-4 min-h-[3.2em] text-[17px]">
        <strong className="font-semibold">{chosen.label}.</strong>{" "}
        {chosen.result}
      </p>
    </StickerCard>
  );
}
