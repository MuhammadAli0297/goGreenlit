"use client";

import { useState } from "react";

import { StatusPill } from "@/components/brand/status-pill";
import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

const startingIssues = [
  { name: "Slow load on the reports page", accepted: true },
  { name: "Typo in an error message", accepted: true },
  { name: "Export fails for very large files", accepted: false },
];

/**
 * "Known issues, your call": three deferred bugs, each toggled between
 * Accept (ship with it, documented) and Block (hold the release), and a
 * verdict that follows, GO only when none block. It shows the page's
 * known-issues list as a decision, not a document. Opens with one issue
 * blocking, so the page at rest already shows a HOLD. Toggles are ARIA
 * pressed buttons, the verdict is a status pill with its word in a polite
 * live region. Example bugs only, no numbers.
 */
export function KnownIssuesDemo({ className }: { className?: string }) {
  const [issues, setIssues] = useState(startingIssues);
  const blocked = issues.some((issue) => !issue.accepted);

  function set(index: number, accepted: boolean) {
    setIssues((current) =>
      current.map((issue, i) => (i === index ? { ...issue, accepted } : issue)),
    );
  }

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <p className="font-label text-deep text-xs tracking-widest uppercase">
        Known issues, your call
      </p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {issues.map((issue, index) => (
          <li
            key={issue.name}
            className="border-ink bg-paper flex flex-wrap items-center justify-between gap-3 rounded-2xl border-[1.5px] px-4 py-3"
          >
            <span className="min-w-0 flex-1 text-[17px]">{issue.name}</span>
            <span
              role="group"
              aria-label={`${issue.name}: accept or block`}
              className="flex gap-1.5"
            >
              {(
                [
                  ["Accept", true],
                  ["Block", false],
                ] as const
              ).map(([label, value]) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={issue.accepted === value}
                  onClick={() => set(index, value)}
                  className={cn(
                    "border-ink h-9 rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors duration-150 motion-reduce:transition-none",
                    issue.accepted === value
                      ? "bg-deep text-navajo"
                      : "bg-surface text-ink hover:bg-ink/10",
                  )}
                >
                  {label}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-5">
        <div className="flex items-center gap-3">
          <p className="font-label text-xs tracking-widest uppercase">
            Verdict
          </p>
          <StatusPill status={blocked ? "bug" : "pass"}>
            {blocked ? "Hold" : "Go"}
          </StatusPill>
        </div>
        <p className="mt-2 min-h-[3.6em] text-[17px]">
          {blocked
            ? "A deferred bug is marked as blocking. Fix it, or accept it with a written reason."
            : "Every known issue is accepted with a reason on record, so the release can ship."}
        </p>
      </div>
    </StickerCard>
  );
}
