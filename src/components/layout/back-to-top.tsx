"use client";

import { ctaVariants } from "@/components/brand/cta-variants";

/**
 * Footer "Back to top" control. A button rather than a `#` link on
 * purpose: Next's router swallows a bare `#` click on this layout and
 * never scrolls, so a real scrollTo is the reliable way. Scrolls
 * instantly for visitors who ask for reduced motion.
 */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={ctaVariants({ variant: "outlineOnDark", size: "md" })}
    >
      Back to top <span aria-hidden="true">&uarr;</span>
    </button>
  );
}
