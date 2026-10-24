"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import type { TocItem } from "@/lib/blog-toc";
import { cn } from "@/lib/utils";

/** A heading counts as "current" once its top has scrolled above this line. */
const READING_LINE = 160;

/**
 * "On this page" for a post: a link per section heading. From `xl` it sits in
 * the empty margin beside the article and stays on screen while you read
 * (sticky), with the section you are in marked. Below `xl` it is a collapsed
 * toggle above the article so it never pushes the text down. It is one list
 * in the DOM for both, so crawlers and assistive tech see each link once.
 * The current section is found from a passive rAF-throttled scroll listener
 * (gotcha #5) and only the state that names it re-renders. Links are plain
 * `#hash` anchors, so they work without JavaScript.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | undefined;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= READING_LINE) {
          current = heading.id;
        } else break;
      }
      setActive(current);
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
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="mb-8 xl:absolute xl:top-0 xl:left-full xl:mb-0 xl:ml-6 xl:h-full xl:w-56"
    >
      <div className="xl:sticky xl:top-28">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="toc-list"
          onClick={() => setOpen((o) => !o)}
          className="border-ink/20 font-label text-ink flex min-h-11 w-full items-center justify-between rounded-[10px] border px-4 text-xs tracking-wide uppercase xl:pointer-events-none xl:min-h-0 xl:border-0 xl:px-0 xl:pb-3 xl:text-[11px] xl:tracking-widest"
        >
          On this page
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-4 transition-transform duration-200 motion-reduce:transition-none xl:hidden",
              open && "rotate-180",
            )}
          />
        </button>
        <ol
          id="toc-list"
          className={cn(
            "border-ink/15 mt-2 space-y-0.5 border-l xl:mt-0 xl:block",
            !open && "hidden",
          )}
        >
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "relative -ml-px block border-l-2 py-2 pr-2 pl-4 text-[15px] leading-snug transition-colors motion-reduce:transition-none xl:py-1.5 xl:text-sm",
                    isActive
                      ? "border-sandy text-ink font-semibold"
                      : "text-deep hover:text-ink border-transparent",
                  )}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
