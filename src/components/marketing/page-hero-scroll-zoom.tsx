"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Zooms the hero's text in and fades it out as the user scrolls past it,
 * reversing back to full size and opacity as they scroll back up to the
 * hero. The zoom range is the hero `<section>`'s own rendered height (via
 * `closest`), so the effect completes right as the section leaves view
 * instead of an arbitrary distance. Reads scroll position directly off
 * `window` in a rAF-throttled listener and writes the transform straight
 * to the DOM node (no React state), so scrolling never triggers a
 * re-render, matching HeroScrollShrink's approach for the homepage hero.
 */
export function PageHeroScrollZoom({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const section = el.closest("section");
    const maxScale = 1.35;
    let zoomRange = section?.offsetHeight ?? window.innerHeight * 0.6;
    let ticking = false;

    const applyZoom = () => {
      const progress = Math.min(Math.max(window.scrollY / zoomRange, 0), 1);
      const scale = 1 + progress * (maxScale - 1);
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${1 - progress}`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyZoom);
      }
    };

    const onResize = () => {
      zoomRange = section?.offsetHeight ?? window.innerHeight * 0.6;
    };

    applyZoom();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} className={cn("[will-change:transform,opacity]", className)}>
      {children}
    </div>
  );
}
