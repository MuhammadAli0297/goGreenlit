import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/marketing/aurora-background";
import { BlogHeroScroll } from "@/components/marketing/blog-hero-scroll";

/**
 * The blog's own hero: Dark Slate Grey with the aurora like every deep
 * hero, but with its own scroll behavior (BlogHeroScroll), the heading
 * drifts up and fades while five category chips float and parallax past,
 * the one translate-based scroll effect on the site. Not a PageHero
 * variant, see that component for why. An `<em>` inside the heading is the
 * italic accent word (Sandy Brown on the deep ground), same as PageHero.
 */
export function BlogHero({
  badge,
  children,
  description,
  ctas,
}: {
  badge?: string;
  /** The page's `<h1>` content. Wrap one phrase in `<em>` for the italic accent. */
  children: ReactNode;
  description: string;
  ctas?: ReactNode;
}) {
  return (
    <section className="on-dark bg-deep text-navajo relative overflow-hidden">
      <AuroraBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <BlogHeroScroll>
          {badge ? (
            <span className="font-label border-navajo/40 bg-navajo/10 text-navajo mb-6 inline-flex max-w-full items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-xs tracking-wide whitespace-nowrap uppercase">
              <span className="lb-pulse bg-sandy border-ink/60 inline-block size-2 shrink-0 rounded-full border" />
              <span className="truncate">{badge}</span>
            </span>
          ) : null}

          <h1 className="text-paper [&_em]:text-sandy mx-auto max-w-4xl text-4xl leading-[1.08] font-medium tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl [&_em]:font-normal [&_em]:italic">
            {children}
          </h1>

          <p className="text-navajo/85 mx-auto mt-6 max-w-2xl text-lg text-balance">
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
