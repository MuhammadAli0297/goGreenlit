import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/marketing/aurora-background";
import { BlogHeroScroll } from "@/components/marketing/blog-hero-scroll";
import { Badge } from "@/components/ui/badge";

/**
 * The blog's own hero, the same on-brand dark Dark Slate Grey + aurora
 * signature as PageHero (so it still reads as this site), but with its own
 * scroll animation via BlogHeroScroll instead of PageHeroScrollZoom, see
 * that component for why. Not a PageHero variant: PageHero is the
 * "secondary page" landing header reused across every other family, and
 * this one needed a genuinely different scroll technique, so it's its own
 * component rather than a prop bolted onto PageHero.
 */
export function BlogHero({
  badge,
  children,
  description,
  ctas,
}: {
  badge?: string;
  /** The page's `<h1>` content. */
  children: ReactNode;
  description: string;
  ctas?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#354639]">
      <AuroraBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <BlogHeroScroll>
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
        </BlogHeroScroll>

        {ctas ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {ctas}
          </div>
        ) : null}
      </div>
    </section>
  );
}
