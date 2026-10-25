"use client";

import { useEffect, useRef, useState } from "react";

import { StatusPill } from "@/components/brand/status-pill";
import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

type Phase = "failed" | "running" | "passed" | "merged";

const checks = ["Lint", "Unit tests", "API tests"] as const;
/** The check that fails until the visitor fixes it. */
const FAILING = 1;
const STEP_MS = 800;

/**
 * A pull request with required checks, the picture of a CI/CD quality gate:
 * one check has failed, so the Merge button is locked. "Fix the failing
 * test" re-runs the checks one by one, they all pass, and Merge unlocks.
 * Complete at rest (the failed state, merge blocked), reduced motion
 * skips the re-run, the status sits in a polite live region and every
 * check carries a word as well as a color. Illustration only, no numbers.
 */
export function MergeGateDemo({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("failed");
  const [done, setDone] = useState<number>(checks.length);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function rerun() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setDone(checks.length);
      setPhase("passed");
      return;
    }
    setPhase("running");
    setDone(0);
    checks.forEach((_, i) =>
      timers.current.push(setTimeout(() => setDone(i + 1), (i + 1) * STEP_MS)),
    );
    timers.current.push(
      setTimeout(() => setPhase("passed"), checks.length * STEP_MS + 100),
    );
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    setDone(checks.length);
    setPhase("failed");
  }

  const ready = phase === "passed";
  const header =
    phase === "running"
      ? { status: "idle" as const, label: "Checking" }
      : phase === "failed"
        ? { status: "bug" as const, label: "Not mergeable" }
        : {
            status: "pass" as const,
            label: phase === "merged" ? "Merged" : "Ready",
          };

  const message =
    phase === "failed"
      ? "A required check failed, so the merge button stays locked. The bug never reaches the main branch."
      : phase === "running"
        ? "The required checks are running again."
        : phase === "passed"
          ? "Every required check passed, so the merge is allowed."
          : "Merged. The change reached the main branch only after every gate passed.";

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-label text-deep text-xs tracking-widest uppercase">
          A pull request, with required checks
        </p>
        <StatusPill status={header.status}>{header.label}</StatusPill>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {checks.map((check, i) => {
          const status =
            i >= done
              ? ({ s: "idle", label: "Running" } as const)
              : phase === "failed" && i === FAILING
                ? ({ s: "bug", label: "Failed" } as const)
                : ({ s: "pass", label: "Passed" } as const);
          return (
            <li
              key={check}
              className="border-ink bg-paper flex items-center justify-between gap-3 rounded-2xl border-[1.5px] px-4 py-3"
            >
              <span className="text-[17px]">{check}</span>
              <StatusPill status={status.s}>{status.label}</StatusPill>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!ready}
          onClick={() => setPhase("merged")}
          className="border-ink bg-sandy text-ink h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold shadow-[0_4px_0_var(--ink)] transition-[transform,box-shadow] duration-150 enabled:hover:translate-y-0.5 enabled:hover:shadow-[0_2px_0_var(--ink)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {ready || phase === "merged" ? "Merge pull request" : "Merge blocked"}
        </button>
        {phase === "failed" ? (
          <button
            type="button"
            onClick={rerun}
            className="border-ink bg-paper text-ink hover:bg-ink/10 h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold"
          >
            Fix the failing test
          </button>
        ) : null}
        {phase === "passed" || phase === "merged" ? (
          <button
            type="button"
            onClick={reset}
            className="border-ink bg-paper text-ink hover:bg-ink/10 h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold"
          >
            Replay
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-4 min-h-[3.6em] text-[17px]">
        {message}
      </p>
    </StickerCard>
  );
}
