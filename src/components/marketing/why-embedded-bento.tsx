import type { CSSProperties } from "react";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Cells in the "coverage you can see" grid, two rows of ten. */
const CELLS = 20;

type Tile = {
  tone: "deep" | "navajo" | "surface" | "sandy" | "olive";
  span: string;
  kicker: string;
  title: string;
  body?: string;
  big?: boolean;
  cells?: boolean;
};

/**
 * The four differentiators the homepage has always made (no contracts,
 * founder-led, embedded, transparent reporting), plus the manual and
 * automated pairing the whole site is built on, laid out as a bento. The
 * copy is the earlier section's, so the claims are unchanged.
 */
const tiles: readonly Tile[] = [
  {
    tone: "deep",
    span: "lg:col-span-3",
    kicker: "Founder-led engagements",
    title: "The people you meet are the people who test.",
    body: `${siteConfig.founders} are hands-on in every engagement, not just the sales call.`,
    big: true,
  },
  {
    tone: "navajo",
    span: "lg:col-span-3",
    kicker: "Transparent reporting",
    title: "Coverage you can see.",
    body: "You see the same defect tracking and coverage dashboards we do, updated as we test, not summarized after the fact.",
    cells: true,
  },
  {
    tone: "surface",
    span: "lg:col-span-2",
    kicker: "No long-term contracts",
    title: "Scale up or down in a sprint.",
    body: "Month-to-month engagements. If we are not earning our seat in your sprint, you should be free to walk away.",
  },
  {
    tone: "sandy",
    span: "lg:col-span-2",
    kicker: "Embedded in your sprint",
    title: "Your standups, your backlog, your team chat.",
    body: "Working alongside your developers instead of behind a ticket queue.",
  },
  {
    tone: "olive",
    span: "lg:col-span-2",
    kicker: "Manual plus automated",
    title: "Humans find the odd bugs. Code guards the rest.",
  },
];

export function WhyEmbeddedBento() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      {tiles.map((tile, index) => (
        <Reveal
          key={tile.kicker}
          delay={index * 80}
          className={cn(
            "sm:col-span-1",
            tile.span,
            index < 2 && "sm:col-span-2",
          )}
        >
          <StickerCard
            tone={tile.tone}
            interactive={false}
            className={cn(
              "flex h-full flex-col p-7 sm:p-8",
              tile.big ? "lg:min-h-80" : "lg:min-h-60",
            )}
          >
            <p
              className={cn(
                "font-label text-xs tracking-widest uppercase",
                tile.tone === "deep" && "text-sandy",
              )}
            >
              {tile.kicker}
            </p>
            <h3
              className={cn(
                "mt-3 leading-[1.1] font-medium tracking-[-0.025em] text-balance",
                tile.big ? "text-3xl sm:text-4xl" : "text-2xl",
              )}
            >
              {tile.title}
            </h3>
            {tile.body ? (
              <p
                className={cn(
                  "mt-3 text-[15px] leading-relaxed",
                  tile.tone === "deep" && "text-navajo/90",
                )}
              >
                {tile.body}
              </p>
            ) : null}
            {tile.cells ? (
              <div
                aria-hidden="true"
                className="mt-auto grid grid-cols-10 gap-1.5 pt-6"
              >
                {Array.from({ length: CELLS }, (_, i) => (
                  <i
                    key={i}
                    className="lb-sweep border-ink bg-surface h-5 rounded-md border-[1.5px]"
                    style={{ "--lb-i": i } as CSSProperties}
                  />
                ))}
              </div>
            ) : null}
          </StickerCard>
        </Reveal>
      ))}
    </div>
  );
}
