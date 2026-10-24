"use client";

import { useEffect, useRef, useState } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StatusPill } from "@/components/brand/status-pill";
import { cn } from "@/lib/utils";

type Phase = "scan" | "held" | "fixing" | "open";

export interface AuditArea {
  name: string;
  /** A gap keeps the gate shut until the visitor closes it. */
  gap?: boolean;
}

const SCAN_MS = 800;
const FIX_MS = 900;

const nodes = ["Commit", "Build", "Tests", "Gate", "Deploy"] as const;

/**
 * A demo of how a consulting engagement works: an example audit reads each
 * area of a QA setup and finds gaps, and those gaps keep a release gate
 * shut. "Close the gaps" turns them to passed one by one and the gate
 * opens, "Run the audit again" replays the scan.
 *
 * It is complete at rest: the server render and a reduced-motion visitor
 * both see the audit finished with its gaps and the gate holding. The scan
 * plays once, the first time the card scrolls into view. Results sit in a
 * polite live region. It is an illustration, so it carries no numbers
 * (BRAND_GUIDELINES.md section 2) and says it is an example.
 */
export function QualityGateDemo({
  areas,
  className,
}: {
  areas: readonly AuditArea[];
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("held");
  const [shown, setShown] = useState(areas.length);
  const [fixed, setFixed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const gapIndexes = areas.flatMap((area, i) => (area.gap ? [i] : []));

  function clear() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function later(fn: () => void, ms: number) {
    timers.current.push(setTimeout(fn, ms));
  }

  function reduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scan() {
    clear();
    setFixed(0);
    if (reduced()) {
      setShown(areas.length);
      setPhase("held");
      return;
    }
    setPhase("scan");
    setShown(0);
    areas.forEach((_, i) => later(() => setShown(i + 1), (i + 1) * SCAN_MS));
    later(() => setPhase("held"), areas.length * SCAN_MS + 500);
  }

  function fix() {
    clear();
    if (reduced()) {
      setFixed(gapIndexes.length);
      setPhase("open");
      return;
    }
    setPhase("fixing");
    gapIndexes.forEach((_, i) =>
      later(() => setFixed(i + 1), (i + 1) * FIX_MS),
    );
    later(() => setPhase("open"), gapIndexes.length * FIX_MS + 500);
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !played.current) {
          played.current = true;
          scan();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clear();
    };
    // scan only reads stable props and refs, it runs once on first view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scanning = phase === "scan";
  const held = phase === "held" || phase === "fixing";
  const open = phase === "open";

  function rowStatus(i: number) {
    if (i >= shown) {
      return i === shown && scanning
        ? { status: "idle" as const, label: "Scanning" }
        : { status: "idle" as const, label: "Waiting" };
    }
    const isGap = areas[i]?.gap;
    const gapPosition = gapIndexes.indexOf(i);
    if (isGap && gapPosition >= fixed) {
      return { status: "bug" as const, label: "Gap found" };
    }
    return { status: "pass" as const, label: "Passed" };
  }

  const heading = scanning
    ? "Scanning"
    : phase === "held"
      ? "Gaps found"
      : phase === "fixing"
        ? "Closing the gaps"
        : "All areas passed";

  const message = scanning
    ? "The audit is reading each area of the QA setup."
    : phase === "held"
      ? "The audit found gaps, so the gate holds the build. Nothing ships on a gut feeling."
      : phase === "fixing"
        ? "Each gap gets a fix and a check that proves it."
        : "Every area passes, so the gate opens. The release decision now rests on evidence.";

  return (
    <div
      ref={root}
      data-slot="quality-gate-demo"
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12",
        className,
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-label text-xs tracking-widest uppercase">
            An example audit
          </p>
          <p className="font-label text-xs tracking-widest uppercase">
            {heading}
          </p>
        </div>
        <ul className="mt-3">
          {areas.map((area, i) => {
            const { status, label } = rowStatus(i);
            return (
              <li
                key={area.name}
                className="border-ink flex items-center justify-between gap-3 border-t-[1.5px] py-3.5 first:border-t-0"
              >
                <span className="text-[17px]">{area.name}</span>
                <StatusPill status={status}>{label}</StatusPill>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="font-label text-xs tracking-widest uppercase">
            A release, with a gate
          </p>
          <div aria-hidden="true" className="relative mt-6">
            <div className="bg-ink/25 absolute top-[26px] right-[10%] left-[10%] h-[3px]" />
            {scanning ? null : (
              <span
                className={cn(
                  "bg-sandy border-ink absolute top-4 z-10 size-[22px] rounded-full border-[1.5px]",
                  held ? "lb-packet-held" : "lb-packet",
                )}
              />
            )}
            <div className="relative flex">
              {nodes.map((label, i) => {
                const gated = i === 2 || i === 3;
                const tone =
                  i < 2
                    ? "bg-olive"
                    : i === 4
                      ? open
                        ? "bg-olive"
                        : "bg-surface"
                      : scanning
                        ? "bg-surface"
                        : held
                          ? "bg-sandy"
                          : "bg-olive";
                const text =
                  i === 4
                    ? open
                      ? "GO"
                      : held
                        ? "HOLD"
                        : "…"
                    : i === 3
                      ? "GATE"
                      : label === "Commit"
                        ? "git"
                        : label.toLowerCase();
                return (
                  <div
                    key={label}
                    className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
                  >
                    <span
                      className={cn(
                        "border-ink font-label relative z-10 grid size-[52px] place-items-center rounded-2xl border-[1.5px] text-[11px] transition-colors duration-300",
                        gated || i === 4 ? tone : "bg-olive",
                      )}
                    >
                      {text}
                    </span>
                    <span className="font-label text-[10px] tracking-wide uppercase">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p aria-live="polite" className="mt-6 min-h-[4.5rem] text-lg">
            {message}
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={open ? scan : fix}
            disabled={scanning || phase === "fixing"}
            className={cn(
              ctaVariants({ variant: "cta", size: "md" }),
              scanning && "invisible",
            )}
          >
            {open ? "Run the audit again" : "Close the gaps"}
          </button>
        </div>
      </div>
    </div>
  );
}
