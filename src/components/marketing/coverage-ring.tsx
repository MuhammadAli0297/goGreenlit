"use client";

import { useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/marketing/count-up";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A ring that fills to a percentage, with the number counting up in the
 * middle. Like CountUp it is time-based and replays: the server renders it
 * full to the final value, the client empties it only while it is off
 * screen, then fills it over 1.8 seconds as it enters. With reduced motion
 * it just stays filled. The SVG is decorative, the number carries the
 * accessible text (CountUp repeats the real value for screen readers).
 *
 * Only pass a verified stat as `value` (BRAND_GUIDELINES.md section 2).
 */
export function CoverageRing({
  value,
  className,
}: {
  /** 0 to 100. */
  value: number;
  className?: string;
}) {
  const [filled, setFilled] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setFilled(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const offset = CIRCUMFERENCE * (1 - (filled ? value : 0) / 100);

  return (
    <div ref={ref} className={className}>
      <div className="relative size-52 sm:size-56">
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="size-full -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.15"
            strokeWidth="10"
          />
          <circle
            data-slot="ring-fill"
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="var(--deep)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transition: filled
                ? "stroke-dashoffset 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
                : "none",
            }}
          />
        </svg>
        <p className="absolute inset-0 flex items-center justify-center text-6xl tracking-[-0.04em] tabular-nums">
          <CountUp value={value} suffix="%" />
        </p>
      </div>
    </div>
  );
}
