"use client";

import { useRef, useState, type KeyboardEvent } from "react";

/**
 * Shared state and keyboard handling for the site's ARIA tab widgets (the
 * homepage service explorer, the Playwright or Selenium picker, the device
 * picker). Arrow keys, Home and End move between tabs and wrap around, the
 * active tab takes focus, and only it is in the tab order (roving tabindex,
 * set by the caller from `active`). `initial` picks the starting tab (the
 * first by default). Left and right always work, up and down
 * too, since the tablists are short.
 */
export function useTabs(count: number, initial = 0) {
  const [active, setActive] = useState(initial);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + count) % count;
    setActive(next);
    nodes.current[next]?.focus();
  }

  return {
    active,
    setActive,
    /** Pass as the tab button's `ref`. */
    tabRef: (index: number) => (node: HTMLButtonElement | null) => {
      nodes.current[index] = node;
    },
    onKeyDown: (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        focusTab(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        focusTab(index - 1);
      } else if (event.key === "Home") focusTab(0);
      else if (event.key === "End") focusTab(count - 1);
      else return;
      event.preventDefault();
    },
  };
}
