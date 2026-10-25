import { cn } from "@/lib/utils";

export type TermTone = "pass" | "bug" | "note";

export interface TermLine {
  /** Short status word, shown in the line's color, for example "PASS" or "BUG". */
  tag: string;
  tone: TermTone;
  text: string;
}

const toneClass: Record<TermTone, string> = {
  pass: "text-olive",
  bug: "text-sandy",
  note: "text-navajo",
};

/** The most lines the loop has keyframes for, see globals.css (lb-term-N). */
const MAX_LINES = 10;

/**
 * A looping fake test run: lines of a log appear one after another, the
 * last with a blinking caret, then it clears and starts again. The
 * signature "show the work" demo of the Live Build language, used in the
 * homepage hero, the 404 page and the Playwright subpage.
 *
 * It is decorative (aria-hidden), an illustration of what a run looks like
 * and not a record of one. Keep the lines honest and generic, a mix of
 * passes and one caught bug, and never put a number or percentage in them
 * that is not one of the four verified stats (BRAND_GUIDELINES.md section 2).
 * Pure CSS motion, so it stays a Server Component, and with reduced motion
 * every line simply shows at once.
 */
export function TestRunTerminal({
  title,
  lines,
  className,
}: {
  /** Shown in the window bar, for example a spec file name. */
  title: string;
  lines: readonly TermLine[];
  className?: string;
}) {
  const shown = lines.slice(0, MAX_LINES);

  return (
    <div
      aria-hidden="true"
      data-slot="test-run-terminal"
      className={cn(
        "bg-ink text-navajo border-navajo/60 font-label overflow-hidden rounded-[20px] border-[1.5px] text-[13.5px] leading-[1.9] shadow-[8px_8px_0_var(--sandy)]",
        className,
      )}
    >
      <div className="border-navajo/25 flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-leaf size-[11px] rounded-full" />
        <span className="bg-olive size-[11px] rounded-full" />
        <span className="bg-sandy size-[11px] rounded-full" />
        <span className="ml-2 truncate text-xs opacity-75">{title}</span>
      </div>
      <div className="min-h-[18rem] px-5 py-4">
        {shown.map((line, index) => (
          <div key={`${line.tag}-${index}`} className="lb-term-line flex gap-3">
            <span className={cn("shrink-0", toneClass[line.tone])}>
              {line.tag}
            </span>
            <span className="min-w-0 truncate">{line.text}</span>
            {index === shown.length - 1 ? (
              <span className="lb-caret bg-sandy mt-[0.55em] inline-block h-[0.95em] w-2 shrink-0" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
