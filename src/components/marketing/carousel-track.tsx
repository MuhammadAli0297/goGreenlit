"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const EDGE = 4;

/**
 * A horizontal scroll-snap track with previous and next buttons and a
 * progress rail. The track is a plain scrolling list, so touch swipe,
 * trackpad, shift-wheel and keyboard (each card is a link, and focusing one
 * scrolls it into view) all work without the buttons; the buttons are for
 * mouse users on a desktop with no sideways scroll. They only appear when
 * the cards actually overflow, and a button disables at its end.
 *
 * The rail's thumb is written straight to the DOM from a passive scroll
 * listener (no React state per scroll), only the two button flags are
 * state, since they change at most twice per pass. Smooth scrolling is
 * dropped under reduced motion.
 */
export function CarouselTrack({
  children,
  label,
  className,
}: {
  /** The cards, as `<li>` elements. */
  children: ReactNode;
  /** Names the list for assistive tech, for example "QA consulting services". */
  label: string;
  className?: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const [flags, setFlags] = useState({
    overflowing: false,
    canPrev: false,
    canNext: false,
  });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const overflowing = max > EDGE;
    const canPrev = overflowing && el.scrollLeft > EDGE;
    const canNext = overflowing && el.scrollLeft < max - EDGE;
    const size = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    if (thumb.current) {
      const progress = max > 0 ? el.scrollLeft / max : 0;
      thumb.current.style.width = `${Math.min(1, size) * 100}%`;
      thumb.current.style.left = `${progress * (1 - Math.min(1, size)) * 100}%`;
    }
    setFlags((current) =>
      current.overflowing === overflowing &&
      current.canPrev === canPrev &&
      current.canNext === canNext
        ? current
        : { overflowing, canPrev, canNext },
    );
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  function page(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 320) + 24;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * step,
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <div className={className}>
      <ul
        ref={track}
        aria-label={label}
        className="-mx-2 flex snap-x snap-mandatory scroll-px-2 [scrollbar-width:none] gap-6 overflow-x-auto px-2 pt-2 pb-5 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div
        className={cn(
          "mt-4 flex items-center gap-5",
          !flags.overflowing && "hidden",
        )}
      >
        <div
          aria-hidden="true"
          className="bg-ink/15 relative h-[3px] flex-1 rounded-full"
        >
          <span
            ref={thumb}
            className="bg-ink absolute top-0 h-full rounded-full"
          />
        </div>
        <div className="flex gap-3">
          {(
            [
              ["Previous service", -1, ArrowLeft, flags.canPrev],
              ["Next service", 1, ArrowRight, flags.canNext],
            ] as const
          ).map(([name, direction, Icon, enabled]) => (
            <button
              key={name}
              type="button"
              aria-label={name}
              disabled={!enabled}
              onClick={() => page(direction)}
              className="border-ink bg-surface text-ink hover:bg-ink hover:text-paper inline-flex size-11 items-center justify-center rounded-full border-[1.5px] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-40"
            >
              <Icon aria-hidden="true" className="size-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
