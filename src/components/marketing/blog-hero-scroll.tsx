"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { blogCategories } from "@/lib/blog-data";

/**
 * Per-chip scroll drift and resting position, one per category. Alternating
 * sign gives chips on opposite sides of the hero visible motion in opposite
 * directions as the user scrolls, the actual "parallax" part of the effect.
 * `rot` is each chip's resting tilt and `delay` offsets its ambient float
 * (the lb-float loop on the inner element) so they never bob in unison.
 */
const chipLayout = [
  { multiplier: 0.55, className: "top-6 left-[4%]", rot: "-6deg", delay: "0s" },
  {
    multiplier: -0.4,
    className: "top-10 right-[6%]",
    rot: "5deg",
    delay: "-1.5s",
  },
  {
    multiplier: 0.65,
    className: "bottom-14 left-[9%]",
    rot: "4deg",
    delay: "-4s",
  },
  {
    multiplier: -0.55,
    className: "bottom-8 right-[9%]",
    rot: "-3deg",
    delay: "-3s",
  },
  {
    multiplier: 0.4,
    className: "top-1/2 left-[1%]",
    rot: "-2deg",
    delay: "-2s",
  },
];

/** A chip's colors: the category's own cover, except Case Studies, whose Dark Slate Grey would vanish into the hero's ground. */
function chipColors(slug: string, coverClass: string) {
  return slug === "case-studies" ? "bg-surface text-ink" : coverClass;
}

/**
 * The blog hero's own scroll-linked technique, deliberately not a reuse of
 * hero-scroll-shrink.tsx (whole-panel scale down) or page-hero-scroll-zoom.tsx
 * (badge/heading/description scale up), both of which are scale-based. This
 * one is translate-based: the heading/description block drifts upward and
 * fades, while a ring of decorative category-name chips parallax past at
 * different rates and directions, each drifting further and rotating more
 * as the user scrolls, reversing on the way back up. Each chip is the
 * category's own swatch with an ink outline and floats gently on its own
 * (the inner lb-float element, so the loop never fights the scroll
 * transform on the outer one). Same technical recipe
 * as its siblings otherwise: passive rAF-throttled scrollY listener, direct
 * ref writes (no React state), the hero section's own height as the scroll
 * range, and a prefers-reduced-motion bailout.
 */
export function BlogHeroScroll({ children }: { children: ReactNode }) {
  const textRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = textEl.closest("section");
    let scrollRange = section?.offsetHeight ?? window.innerHeight * 0.6;
    let ticking = false;

    const apply = () => {
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);

      textEl.style.transform = `translateY(${progress * -36}px)`;
      textEl.style.opacity = `${1 - progress}`;

      chipRefs.current.forEach((chip, index) => {
        if (!chip) return;
        const { multiplier } = chipLayout[index % chipLayout.length]!;
        const drift = progress * 160 * multiplier;
        const rotate = progress * 16 * Math.sign(multiplier);
        chip.style.transform = `translateX(${drift}px) rotate(${rotate}deg)`;
        chip.style.opacity = `${1 - progress * 0.85}`;
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const onResize = () => {
      scrollRange = section?.offsetHeight ?? window.innerHeight * 0.6;
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
      >
        {blogCategories.map((category, index) => {
          const layout = chipLayout[index]!;
          return (
            <span
              key={category.slug}
              ref={(el) => {
                chipRefs.current[index] = el;
              }}
              className={`absolute [will-change:transform,opacity] ${layout.className}`}
            >
              <span
                className={`lb-float border-ink font-label block rounded-full border-[1.5px] px-4 py-2 text-xs tracking-wide whitespace-nowrap uppercase ${chipColors(category.slug, category.coverClass)}`}
                style={
                  {
                    "--lb-rot": layout.rot,
                    animationDelay: layout.delay,
                  } as React.CSSProperties
                }
              >
                {category.label}
              </span>
            </span>
          );
        })}
      </div>

      <div
        ref={textRef}
        className="flex flex-col items-center [will-change:transform,opacity]"
      >
        {children}
      </div>
    </>
  );
}
