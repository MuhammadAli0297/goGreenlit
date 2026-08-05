import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/marketing/aurora-background";
import { PageHeroScrollZoom } from "@/components/marketing/page-hero-scroll-zoom";
import { Badge } from "@/components/ui/badge";

/**
 * Bold hero treatment for secondary pages, the same on-brand dark
 * Dark Slate Grey + aurora signature as the homepage hero
 * (src/components/marketing/hero.tsx), sized for a page header rather
 * than a full billboard moment. The badge, heading, and description zoom
 * in and fade out as the user scrolls past (see PageHeroScrollZoom), the
 * mirror of the homepage hero's scroll-shrink, distinct enough from it
 * that both can be standing patterns rather than the same one reused.
 * CTAs sit outside the zoom wrapper so they stay normal-sized and
 * clickable regardless of scroll position.
 */
export function PageHero({
  badge,
  children,
  description,
  ctas,
}: {
  badge?: string;
  /** The page's `<h1>` content, can include an `aurora-glow` highlight span like the homepage hero. */
  children: ReactNode;
  description: string;
  ctas?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#354639]">
      <AuroraBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <PageHeroScrollZoom className="flex flex-col items-center">
          {badge ? (
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border border-[#ffe0ad]/15 bg-[#ffe0ad]/10 text-[#ffe0ad]"
            >
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#ee9e58]" />
              {badge}
            </Badge>
          ) : null}

          <h1 className="mx-auto max-w-4xl text-4xl leading-[1.45] font-semibold tracking-tight text-balance text-[#f9f4eb] sm:text-6xl">
            {children}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-[#f9f4eb]/75">
            {description}
          </p>
        </PageHeroScrollZoom>

        {ctas ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {ctas}
          </div>
        ) : null}
      </div>
    </section>
  );
}
