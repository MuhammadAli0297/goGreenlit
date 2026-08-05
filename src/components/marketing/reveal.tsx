"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds, applied as a transition-delay once revealed. */
  delay?: number;
  as?: "div" | "li";
}) {
  const [visible, setVisible] = useState(false);
  const node = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = node.current;
    if (!el) return;

    // Toggles every time the tile crosses the threshold (both entering and
    // leaving), so the reveal replays each time it's scrolled back into
    // view instead of firing once. Reduced-motion users always see the
    // fully-visible state regardless, via the CSS override below.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        node.current = el;
      }}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "reveal-on-scroll transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
