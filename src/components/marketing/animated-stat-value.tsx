"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedStatValue({
  value,
  prefix = "",
  suffix = "",
  duration = 2600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    // Replays the count-up every time the stat scrolls back into view:
    // resets to 0 on exit so the next entry starts the animation fresh.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        cancelAnimationFrame(frame);

        if (!entry.isIntersecting) {
          setDisplay(0);
          return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 5);
          setDisplay(Math.round(eased * value));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <p
      ref={ref}
      className="text-primary font-mono text-3xl font-semibold sm:text-4xl"
    >
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
    </p>
  );
}
