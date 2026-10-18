import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type Status = "pass" | "bug" | "idle";

const toneClass: Record<Status, string> = {
  pass: "bg-pass",
  bug: "bg-bug",
  idle: "bg-surface",
};

/**
 * The site's status language, used by every widget: Muted Olive means a
 * check passed, Sandy Brown means a bug was found, neutral means idle or
 * queued. Color is never the only signal, each status also carries a
 * small shape (a tick for pass, an exclamation mark for bug) and the
 * caller's own label text, so it still reads without color vision.
 */
export function StatusPill({
  status = "idle",
  className,
  children,
  ...props
}: ComponentProps<"span"> & { status?: Status }) {
  return (
    <span
      data-status={status}
      className={cn(
        "font-label border-ink text-ink inline-flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-xs tracking-wide uppercase",
        toneClass[status],
        className,
      )}
      {...props}
    >
      {status === "pass" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8.5 6.5 12 13 4.5" />
        </svg>
      ) : null}
      {status === "bug" ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
        >
          <path d="M8 3v6.5" />
          <path d="M8 13h.01" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}
