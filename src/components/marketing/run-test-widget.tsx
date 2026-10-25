"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Tone = "pass" | "bug" | "note";

export interface RunLine {
  tag: string;
  tone: Tone;
  text: string;
}

const toneClass: Record<Tone, string> = {
  pass: "text-olive",
  bug: "text-sandy",
  note: "text-navajo",
};

const STEP_MS = 650;

/**
 * An interactive test run: a short spec in a terminal window with a Run
 * button. Pressing it plays the result lines one after another (a failure,
 * a trace, a fix, a pass) and the button becomes "Run again". With reduced
 * motion every line appears at once. Unlike TestRunTerminal this is not
 * decorative, it is operable, so the results sit in a polite live region.
 *
 * It illustrates how a run reads, it is not a record of one, so keep the
 * lines free of numbers and timings (BRAND_GUIDELINES.md section 2).
 */
export function RunTestWidget({
  file,
  code,
  results,
  className,
}: {
  /** Spec file name shown in the window bar. */
  file: string;
  code: readonly string[];
  results: readonly RunLine[];
  className?: string;
}) {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const running = started && shown < results.length;

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStarted(true);
    setShown(0);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setShown(results.length);
      return;
    }
    results.forEach((_, index) => {
      timers.current.push(
        setTimeout(() => setShown(index + 1), 250 + index * STEP_MS),
      );
    });
  }

  return (
    <div
      data-slot="run-test-widget"
      className={cn(
        "bg-ink text-navajo border-ink font-label overflow-hidden rounded-[20px] border-[1.5px] text-[13px] leading-[1.9] shadow-[8px_8px_0_var(--sandy)]",
        className,
      )}
    >
      <div className="border-navajo/25 flex items-center gap-2 border-b px-4 py-3">
        <span className="bg-leaf size-[11px] rounded-full" />
        <span className="bg-olive size-[11px] rounded-full" />
        <span className="bg-sandy size-[11px] rounded-full" />
        <span className="ml-2 truncate text-xs opacity-75">{file}</span>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="border-navajo bg-sandy text-ink ml-auto h-9 shrink-0 rounded-full border-[1.5px] px-4 font-sans text-sm font-semibold shadow-[0_3px_0_var(--navajo)] transition-[transform,box-shadow] duration-150 hover:translate-y-0.5 hover:shadow-[0_1px_0_var(--navajo)] disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {!started ? "Run test" : running ? "Running" : "Run again"}
        </button>
      </div>

      <div className="px-5 py-4">
        <pre className="font-label overflow-x-auto break-words whitespace-pre-wrap sm:break-normal sm:whitespace-pre">
          <code className="font-label">
            {code.map((line, index) => (
              <span
                key={index}
                className={cn(
                  "block",
                  index === 0 || index === code.length - 1
                    ? "text-olive"
                    : "text-navajo",
                )}
              >
                {line || " "}
              </span>
            ))}
          </code>
        </pre>

        <div
          aria-live="polite"
          className="border-navajo/25 mt-3 min-h-[9.5rem] border-t pt-3"
        >
          {started ? (
            results.slice(0, shown).map((line, index) => (
              <div
                key={`${line.tag}-${index}`}
                className="animate-in fade-in slide-in-from-bottom-1 flex gap-3 duration-300 motion-reduce:animate-none"
              >
                <span
                  className={cn(
                    "shrink-0 whitespace-pre",
                    toneClass[line.tone],
                  )}
                >
                  {line.tag}
                </span>
                <span className="min-w-0">{line.text}</span>
              </div>
            ))
          ) : (
            <p className="opacity-60">
              Press Run test to execute it.
              <span className="lb-caret bg-sandy ml-2 inline-block h-[0.95em] w-2 align-middle" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
