"use client";

import { useState } from "react";

import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

const levels = [
  {
    label: "Low risk",
    effort: "Spot check",
    tile: "bg-surface text-ink",
  },
  {
    label: "Medium risk",
    effort: "Test each sprint",
    tile: "bg-olive text-ink",
  },
  {
    label: "High risk",
    effort: "Test deeply, every release",
    tile: "bg-deep text-navajo",
  },
] as const;

const startingAreas = [
  { name: "Sign in", level: 2 },
  { name: "Checkout", level: 2 },
  { name: "Search", level: 1 },
  { name: "Reports", level: 1 },
  { name: "Profile", level: 0 },
  { name: "Settings", level: 0 },
];

/**
 * "A risk map": six example product areas, each a button that cycles its
 * business risk from low to medium to high, with the testing effort that
 * follows written on the tile. It shows the page's risk model in one
 * gesture (effort goes where the exposure is). Complete at rest with a
 * sensible starting ranking, the result sits in a polite live region, and
 * risk is never color alone: each tile spells its level out. Example areas
 * only, no numbers (BRAND_GUIDELINES.md section 2).
 */
export function RiskMap({ className }: { className?: string }) {
  const [areas, setAreas] = useState(startingAreas);
  const [last, setLast] = useState<string | null>(null);

  function cycle(index: number) {
    setAreas((current) =>
      current.map((area, i) =>
        i === index
          ? { ...area, level: (area.level + 1) % levels.length }
          : area,
      ),
    );
    setLast(areas[index]!.name);
  }

  const changed = last ? areas.find((area) => area.name === last) : undefined;

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <p className="font-label text-deep text-xs tracking-widest uppercase">
        An example risk map, tap to re-rank
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {areas.map((area, index) => {
          const level = levels[area.level]!;
          return (
            <li key={area.name}>
              <button
                type="button"
                onClick={() => cycle(index)}
                aria-label={`${area.name}, ${level.label}. Tap to change.`}
                className={cn(
                  "border-ink flex min-h-[104px] w-full flex-col gap-1.5 rounded-2xl border-[1.5px] p-3 text-left transition-colors duration-200 motion-reduce:transition-none",
                  level.tile,
                )}
              >
                <span className="text-[17px] font-semibold">{area.name}</span>
                <span className="font-label text-[10px] tracking-widest uppercase">
                  {level.label}
                </span>
                <span className="text-[13px] leading-tight">
                  {level.effort}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p aria-live="polite" className="mt-4 min-h-[3.2em] text-[17px]">
        {changed
          ? `${changed.name} now gets: ${levels[changed.level]!.effort.toLowerCase()}. Effort follows risk.`
          : "Effort follows business risk, not habit."}
      </p>
    </StickerCard>
  );
}
