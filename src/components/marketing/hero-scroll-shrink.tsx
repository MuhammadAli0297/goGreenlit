"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Scales the hero down as the user scrolls past it (with a matching fade
 * and rounding corners in, like the panel recedes), and back up to full
 * size when they scroll back to the top. Reads scroll position directly
 * off `window` in a rAF-throttled listener and writes the styles straight
 * to the DOM node (no React state), so scrolling never triggers a
 * re-render, just compositor-friendly transform/opacity updates.
 */
export function HeroScrollShrink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const shrinkRange = window.innerHeight * 0.6;
    const minScale = 0.75;
    const minOpacity = 0.55;
    const maxRadius = 32;
    let ticking = false;

    const applyScale = () => {
      const progress = Math.min(window.scrollY / shrinkRange, 1);
      const scale = 1 - progress * (1 - minScale);
      el.style.transform = `scale(${scale})`;
      el.style.opacity = `${1 - progress * (1 - minOpacity)}`;
      el.style.borderRadius = `${progress * maxRadius}px`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyScale);
      }
    };

    applyScale();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className={cn("origin-top [will-change:transform,opacity]", className)}
    >
      {children}
    </section>
  );
}
