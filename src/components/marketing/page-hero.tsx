import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/marketing/aurora-background";
import { PageHeroScrollZoom } from "@/components/marketing/page-hero-scroll-zoom";
import { cn } from "@/lib/utils";

export type PageHeroTone = "deep" | "leaf" | "olive";

/**
 * Per-tone classes. Deep is the default (the homepage and About family),
 * leaf and olive are the Services and QA Consulting family bands, with
 * ink text since ink on Palm Leaf is 5.48:1 and on Muted Olive 8.20:1.
 * The h1's <em> is the one italic accent word per headline: Sandy Brown
 * on the dark tone, plain ink on the light ones (sandy on leaf or olive
 * fails contrast).
 */
const tones: Record<
  PageHeroTone,
  { section: string; badge: string; description: string; accent: string }
> = {
  deep: {
    section: "bg-deep text-navajo on-dark",
    badge: "border-navajo/40 bg-navajo/10 text-navajo",
    description: "text-navajo/85",
    accent: "[&_em]:text-sandy",
  },
  leaf: {
    section: "bg-leaf text-ink",
    badge: "border-ink bg-surface/70 text-ink",
    description: "text-ink",
    accent: "[&_em]:text-ink",
  },
  olive: {
    section: "bg-olive text-ink",
    badge: "border-ink bg-surface/70 text-ink",
    description: "text-ink",
    accent: "[&_em]:text-ink",
  },
};

/**
 * Hero for secondary pages. Dark Slate Grey with the aurora by default
 * (the same signature as the homepage hero, sized for a page header), or
 * a family band color via `tone`. The badge, heading and description zoom
 * in and fade out as the user scrolls past (see PageHeroScrollZoom).
 * CTAs sit outside the zoom wrapper so they stay normal-sized and
 * clickable at any scroll position.
 *
 * Without `aside` the text is centered, the original layout. With an
 * `aside` (a TestRunTerminal, a RunMatrix, any widget) the hero becomes
 * two columns, text left-aligned, widget right, stacking on small screens.
 *
 * It sits right after the page's Breadcrumbs, which already clear the
 * floating header, so it needs no clearance of its own.
 */
export function PageHero({
  badge,
  children,
  description,
  ctas,
  aside,
  tone = "deep",
}: {
  badge?: string;
  /** The page's `<h1>` content. Wrap one word in `<em>` for the italic accent. */
  children: ReactNode;
  description: string;
  ctas?: ReactNode;
  /** A widget shown beside the text on large screens, below it on small ones. */
  aside?: ReactNode;
  tone?: PageHeroTone;
}) {
  const t = tones[tone];
  const split = Boolean(aside);

  return (
    <section className={cn("relative overflow-hidden", t.section)}>
      <div className={cn(tone !== "deep" && "opacity-60")}>
        <AuroraBackground />
      </div>

      <div
        className={cn(
          "relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24",
          split
            ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            : "flex flex-col items-center justify-center text-center",
        )}
      >
        {/* min-w-0 and w-full keep the column inside the padding while the
            fallback font is showing: the nowrap badge is wider in it, which
            used to widen the track by 16px and reflow the heading when the
            real font arrived (a layout shift, gotcha #65). */}
        <div
          className={cn(
            "w-full min-w-0",
            !split && "flex flex-col items-center",
          )}
        >
          <PageHeroScrollZoom
            className={cn(
              "flex w-full flex-col",
              split ? "items-start" : "items-center",
            )}
          >
            {badge ? (
              <span
                className={cn(
                  "font-label mb-6 inline-flex max-w-full items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-xs tracking-wide whitespace-nowrap uppercase",
                  t.badge,
                )}
              >
                <span className="lb-pulse bg-sandy border-ink/60 inline-block size-2 shrink-0 rounded-full border" />
                <span className="min-w-0 truncate">{badge}</span>
              </span>
            ) : null}

            <h1
              className={cn(
                "max-w-4xl text-4xl leading-[1.08] font-medium tracking-[-0.035em] text-balance sm:text-6xl [&_em]:font-normal [&_em]:italic",
                split ? "lg:text-6xl" : "lg:text-7xl",
                t.accent,
              )}
            >
              {children}
            </h1>

            <p
              className={cn(
                "mt-6 max-w-2xl text-lg text-balance",
                !split && "mx-auto",
                t.description,
              )}
            >
              {description}
            </p>
          </PageHeroScrollZoom>

          {ctas ? (
            <div
              className={cn(
                "mt-10 flex flex-col gap-3 sm:flex-row",
                split ? "items-start" : "items-center justify-center",
              )}
            >
              {ctas}
            </div>
          ) : null}
        </div>

        {split ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}
