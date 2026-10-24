"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";

import type { TocItem } from "@/lib/blog-toc";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** A heading counts as "current" once its top has scrolled above this line. */
const READING_LINE = 160;

/**
 * "On this page" as a floating reading pill: a dark pill showing which section
 * you are in as a number out of the total ("03 / 09", never a title, which
 * would be cut off) with a thin progress line, and tapping it opens the full list
 * upward. It is placed so it never covers the article text while collapsed:
 * from `xl` (1280px) it sits in the empty margin to the right of the
 * article column, below that there is no free space, so it becomes a solid
 * bar docked to the bottom edge of the screen (text scrolls out under its
 * top edge, it is never drawn over the middle of the page). Opening it is
 * the only time it may cover text, and it closes on a link tap, Escape or a
 * tap outside. It only shows while the article is being read: from when the
 * article body reaches the upper half of the screen until `endId` (the FAQ
 * when there is one) has scrolled away, and is `inert` while hidden. One
 * list in the DOM, plain `#hash` links, current section from a passive
 * rAF-throttled scroll listener (gotcha #5), only the state that changes
 * re-renders, the progress line is written to the DOM directly.
 */
export function TableOfContents({
  items,
  bodyId = "article-body",
  endId = "article-body",
}: {
  items: TocItem[];
  /** The element whose top starts the reading range. */
  bodyId?: string;
  /** The element whose bottom ends it (the FAQ section when there is one). */
  endId?: string;
}) {
  const [active, setActive] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    const body = document.getElementById(bodyId);
    const end = document.getElementById(endId);
    if (!body || !end) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const bodyRect = body.getBoundingClientRect();
      const endRect = end.getBoundingClientRect();
      const shown = bodyRect.top <= vh * 0.5 && endRect.bottom >= vh * 0.6;
      setVisible(shown);
      // Never come back already open after being hidden.
      if (!shown) setOpen(false);

      let current: string | undefined;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= READING_LINE) {
          current = heading.id;
        } else break;
      }
      setActive(current);

      const range = bodyRect.height - vh;
      const raw = range > 0 ? -bodyRect.top / range : 0;
      if (line.current) {
        line.current.style.transform = `scaleX(${Math.min(1, Math.max(0, raw))})`;
      }
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
  }, [items, bodyId, endId]);

  // Opening scrolls the list so the current section is fully in view.
  useEffect(() => {
    if (!open) return;
    root.current
      ?.querySelector<HTMLElement>('a[aria-current="location"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (items.length < 2) return null;

  /**
   * Scrolls to a section without adding a history entry. A plain `#hash`
   * link pushes one per click, so after a few jumps Back (and the "Back to
   * the blog" link, which goes back in history) only walked through the
   * sections instead of leaving the post. The `href` stays for no-JS and
   * for modified clicks (new tab), and the address bar hash is updated in
   * place with `replaceState`, keeping Next's own history state.
   */
  const jumpTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    setOpen(false);
    const target = document.getElementById(id);
    if (!target || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(window.history.state, "", `#${id}`);
  };

  const currentIndex = items.findIndex((item) => item.id === active);
  const current = currentIndex >= 0 ? items[currentIndex] : undefined;

  return (
    <nav
      ref={root}
      aria-label="On this page"
      inert={!visible}
      className={cn(
        "bg-ink text-paper fixed inset-x-0 bottom-0 z-40 overflow-hidden rounded-t-2xl pb-[env(safe-area-inset-bottom)] transition-[opacity,translate] duration-300 motion-reduce:transition-none",
        "xl:inset-x-auto xl:bottom-6 xl:left-[calc(50%+384px+24px)] xl:w-56 xl:rounded-2xl xl:pb-0 xl:shadow-[0_10px_30px_rgba(0,0,0,0.22)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ol
        id="toc-list"
        className={cn(
          "px-2 transition-[max-height] duration-300 motion-reduce:transition-none",
          open
            ? "max-h-[60dvh] overflow-y-auto pt-2 pb-2"
            : "max-h-0 overflow-hidden",
        )}
      >
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => jumpTo(e, item.id)}
                tabIndex={open ? undefined : -1}
                className={cn(
                  "flex gap-3 rounded-lg px-3 py-2.5 text-[15px] leading-snug transition-colors motion-reduce:transition-none xl:py-2 xl:text-sm",
                  isActive
                    ? "bg-paper/12 font-semibold"
                    : "text-paper/80 hover:bg-paper/10 hover:text-paper",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-label shrink-0 pt-[3px] text-[11px] tabular-nums",
                    isActive ? "text-sandy" : "text-paper/50",
                  )}
                >
                  {pad(index + 1)}
                </span>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="toc-list"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-12 w-full items-center gap-3 px-4 text-left"
      >
        <span
          aria-hidden="true"
          className="font-label flex items-baseline gap-1.5 tabular-nums"
        >
          <span className="text-sandy text-lg leading-none">
            {pad(currentIndex + 1)}
          </span>
          <span className="text-paper/50 text-[11px]">
            / {pad(items.length)}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="font-label text-paper/60 min-w-0 flex-1 truncate text-[10.5px] tracking-widest uppercase"
        >
          On this page
        </span>
        <span className="sr-only">
          On this page.{" "}
          {current
            ? `Section ${currentIndex + 1} of ${items.length}: ${current.text}`
            : "Introduction"}
        </span>
        <ChevronUp
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <span aria-hidden="true" className="bg-paper/15 block h-[3px]">
        <span
          ref={line}
          className="bg-sandy block h-full origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
    </nav>
  );
}
