"use client";

import { useId } from "react";

import { StatusPill } from "@/components/brand/status-pill";
import { useTabs } from "@/lib/use-tabs";
import { cn } from "@/lib/utils";

export interface CompareSide {
  label: string;
  /** One or two sentences that frame the side. */
  summary: string;
  /** Short status label, shown as a bug (sandy) or pass (olive) pill. */
  status: string;
  tone: "bug" | "pass";
  rows: readonly { label: string; value: string }[];
}

/**
 * "Two ways to run QA" as a switch: a two-tab segmented control (ARIA tabs,
 * arrow keys move between them) that flips one card between the usual way
 * and the GoGreenlit way, row by row, on the same four questions. It opens
 * on the GoGreenlit side, so the page at rest (and with scripts off) shows
 * the recommended answer. Both panels are in the server HTML with the
 * inactive one `hidden`, so every word stays crawlable.
 *
 * The overview page of the QA Consulting family uses this, subpages keep
 * the static CompareColumns.
 */
export function CompareSwitch({
  usual,
  ours,
}: {
  usual: CompareSide;
  ours: CompareSide;
}) {
  const sides = [usual, ours];
  const { active, setActive, tabRef, onKeyDown } = useTabs(sides.length, 1);
  const base = useId();

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Two ways to run QA"
        className="border-ink bg-surface mx-auto flex w-fit max-w-full gap-1 rounded-full border-[1.5px] p-1"
      >
        {sides.map((side, index) => {
          const selected = index === active;
          return (
            <button
              key={side.label}
              ref={tabRef(index)}
              type="button"
              role="tab"
              id={`${base}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown(index)}
              className={cn(
                "h-11 min-w-0 rounded-full px-3.5 text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 sm:px-6 sm:text-base",
                selected ? "bg-ink text-paper" : "text-ink hover:bg-ink/10",
              )}
            >
              {side.label}
            </button>
          );
        })}
      </div>

      {sides.map((side, index) => (
        <div
          key={side.label}
          role="tabpanel"
          id={`${base}-panel-${index}`}
          aria-labelledby={`${base}-tab-${index}`}
          hidden={index !== active}
          className={cn(
            "border-ink text-ink animate-in fade-in slide-in-from-bottom-1 mt-8 rounded-[22px] border-[1.5px] p-6 shadow-[6px_6px_0_var(--deep)] duration-300 motion-reduce:animate-none sm:p-10",
            index === 1 ? "bg-olive" : "bg-navajo/45",
          )}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="max-w-2xl text-lg leading-relaxed">{side.summary}</p>
            <StatusPill status={side.tone}>{side.status}</StatusPill>
          </div>

          <dl className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {side.rows.map((row) => (
              <div key={row.label} className="border-ink border-t-[1.5px] pt-4">
                <dt className="font-label text-deep text-xs tracking-widest uppercase">
                  {row.label}
                </dt>
                <dd className="mt-2 text-2xl leading-[1.15] font-medium tracking-[-0.02em] sm:text-3xl">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
