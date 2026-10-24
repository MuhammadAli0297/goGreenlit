"use client";

import { useId } from "react";

import { StickerCard } from "@/components/brand/sticker-card";
import { useTabs } from "@/lib/use-tabs";
import { cn } from "@/lib/utils";

export interface WeekDay {
  /** Short tab label, for example "Mon". */
  label: string;
  /** Full name for assistive tech, for example "Monday". */
  name: string;
  kicker: string;
  title: string;
  body: string;
  items: readonly string[];
}

/**
 * "An example week, embedded": five day tabs (ARIA tabs, arrow keys move
 * between them) that swap what an embedded QA engineer does on that day.
 * Meant as a hero widget on a card: a single column, so it fits the half
 * of a two-column hero. Every panel is in the server HTML and they sit
 * stacked in one grid cell with the inactive ones invisible, so the card
 * keeps the height of the tallest day and the hero does not jump when the
 * day changes, and the copy stays crawlable.
 *
 * It illustrates a typical rhythm, it is not a schedule, so it carries no
 * numbers or times (BRAND_GUIDELINES.md section 2).
 */
export function WeekPicker({
  days,
  className,
}: {
  days: readonly WeekDay[];
  className?: string;
}) {
  const { active, setActive, tabRef, onKeyDown } = useTabs(days.length);
  const base = useId();

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <p className="font-label text-deep text-xs tracking-widest uppercase">
        An example week, embedded
      </p>

      <div
        role="tablist"
        aria-label="Day of the week"
        className="mt-4 grid grid-cols-5 gap-2"
      >
        {days.map((day, index) => {
          const selected = index === active;
          return (
            <button
              key={day.label}
              ref={tabRef(index)}
              type="button"
              role="tab"
              aria-label={day.name}
              id={`${base}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown(index)}
              className={cn(
                "border-ink h-12 min-w-0 rounded-2xl border-[1.5px] text-[15px] font-semibold transition-[background-color,color,transform,box-shadow] duration-200 motion-reduce:transition-none sm:text-base",
                selected
                  ? "bg-deep text-navajo -translate-y-1 shadow-[0_4px_0_var(--ink)]"
                  : "bg-paper text-ink hover:-translate-y-0.5",
              )}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid">
        {days.map((day, index) => (
          <div
            key={day.label}
            role="tabpanel"
            id={`${base}-panel-${index}`}
            aria-labelledby={`${base}-tab-${index}`}
            aria-hidden={index !== active}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none",
              index === active ? "opacity-100" : "invisible opacity-0",
            )}
          >
            <p className="font-label text-deep text-xs tracking-widest uppercase">
              {day.kicker}
            </p>
            <p className="mt-2 text-3xl leading-[1.05] font-medium tracking-[-0.03em]">
              {day.title}
            </p>
            <p className="mt-3 text-[17px] leading-relaxed">{day.body}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {day.items.map((item) => (
                <li
                  key={item}
                  className="border-ink bg-olive/45 flex items-center gap-3 rounded-2xl border-[1.5px] px-4 py-2.5 text-[16px]"
                >
                  <span
                    aria-hidden="true"
                    className="border-ink bg-olive inline-flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StickerCard>
  );
}
