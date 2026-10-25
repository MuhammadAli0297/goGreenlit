"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up from 0 once it scrolls into view and replays
 * every time it comes back, the same replay behavior as Reveal, so it
 * can sit inside a Reveal and finish counting as the card finishes
 * fading in.
 *
 * Server-rendered as its final value, so with no JavaScript, or in the
 * page's raw HTML for a crawler, the real number is there. On the client
 * it resets to 0 only while off screen (nobody sees the jump), then
 * eases up to the value when it enters. With reduced motion it simply
 * stays at the final value. The animated digits are aria-hidden and the
 * real value is repeated in an sr-only span.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  delay = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Count length in milliseconds. */
  duration?: number;
  /** Wait before the count starts, to line up with a Reveal's own delay. */
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        stop();
        setDisplay(0);
        if (!entry.isIntersecting) return;

        timer = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className={className}>
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
    </span>
  );
}
