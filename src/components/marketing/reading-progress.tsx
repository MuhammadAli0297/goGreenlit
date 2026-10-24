"use client";

import { useEffect, useRef } from "react";

/**
 * A thin reading progress bar fixed to the top of the screen. It tracks the
 * article body (the element with `targetId`), not the whole page, so it is
 * empty while the header is on screen, full when the end of the article
 * reaches the bottom of the screen, and never counts the FAQ, related
 * posts or footer below it. Written straight to the DOM from a passive,
 * rAF-throttled scroll listener (gotcha #5), so scrolling never re-renders.
 * It is a position indicator, not an animation, so reduced motion keeps it
 * but there is no transition. Decorative: the page's own scrollbar and the
 * text carry the same information for assistive tech, so it is `aria-hidden`.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const el = bar.current;
    if (!target || !el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const raw =
        range > 0
          ? -rect.top / range
          : rect.bottom <= window.innerHeight
            ? 1
            : 0;
      const progress = Math.min(1, Math.max(0, raw));
      el.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
    >
      <div
        ref={bar}
        className="bg-sandy h-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
