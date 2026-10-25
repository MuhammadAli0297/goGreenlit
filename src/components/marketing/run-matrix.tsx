import type { CSSProperties } from "react";

import { StatusPill } from "@/components/brand/status-pill";
import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

/** Cells staggered by this many positions per row, so the sweep runs diagonally. */
const ROW_OFFSET = 3;

/**
 * A grid of test results sweeping through a run: every cell goes from
 * idle, to a bug (Sandy Brown), to pass (Muted Olive), and back, one after
 * another across the grid. The visual for "we test across browsers and
 * devices" in the Services hero, and reusable for any rows-by-checks
 * claim. Rows are labels (browsers, devices, environments), columns are
 * just checks, so the cells carry no data of their own.
 *
 * Decorative: the grid is an illustration and not a result, so the whole
 * card is one `role="img"` with a plain-language label, and the legend
 * pills use the shared StatusPill language. Pure CSS motion (the lb-sweep
 * utility), a Server Component, with reduced motion every cell rests idle.
 */
export function RunMatrix({
  rows,
  columns = 8,
  title = "Cross-browser run",
  label = "An example test run sweeping across browsers and devices",
  className,
}: {
  rows: readonly string[];
  columns?: number;
  title?: string;
  /** Accessible name for the illustration. */
  label?: string;
  className?: string;
}) {
  return (
    <StickerCard
      interactive={false}
      role="img"
      aria-label={label}
      className={cn("p-6", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-label text-xs font-medium tracking-widest uppercase">
          {title}
        </span>
        <StatusPill status="pass" aria-hidden="true">
          <span className="lb-pulse bg-ink inline-block size-1.5 rounded-full" />
          running
        </StatusPill>
      </div>

      <div
        aria-hidden="true"
        className="mt-5 grid items-center gap-1.5"
        style={{
          gridTemplateColumns: `5.25rem repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {rows.map((row, rowIndex) => (
          <div key={row} className="contents">
            <span className="font-label truncate text-[11px] tracking-wide uppercase">
              {row}
            </span>
            {Array.from({ length: columns }, (_, col) => (
              <i
                key={col}
                className="lb-sweep border-ink bg-surface h-8 rounded-[9px] border-[1.5px]"
                style={
                  { "--lb-i": rowIndex * ROW_OFFSET + col } as CSSProperties
                }
              />
            ))}
          </div>
        ))}
      </div>

      <div aria-hidden="true" className="mt-5 flex flex-wrap gap-2">
        <StatusPill status="pass">passed</StatusPill>
        <StatusPill status="bug">bug found</StatusPill>
        <StatusPill>queued</StatusPill>
      </div>
    </StickerCard>
  );
}
