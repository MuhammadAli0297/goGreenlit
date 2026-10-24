"use client";

import { useState } from "react";

import { StatusPill } from "@/components/brand/status-pill";
import { StickerCard } from "@/components/brand/sticker-card";
import { cn } from "@/lib/utils";

const findings = [
  {
    area: "Coverage",
    tone: "bug",
    evidence: "Critical checkout flows have no automated check.",
    recommendation:
      "Add a regression check for each critical flow, owned by QA.",
  },
  {
    area: "Process",
    tone: "bug",
    evidence: "Release sign-off has no written criteria.",
    recommendation:
      "Write entry and exit criteria and review them every sprint.",
  },
  {
    area: "Tooling",
    tone: "pass",
    evidence: "The CI pipeline already blocks a failing build.",
    recommendation: "Keep it, and extend the same gate to the API checks.",
  },
] as const;

/**
 * "A page from an example audit report": the deliverable made visible, a
 * finding with its area, evidence and recommendation, and a Next finding
 * button that cycles through three. Each finding carries a status word
 * (Gap found or Strength) as well as its color. It is plainly labelled an
 * example and shows no counts or scores (BRAND_GUIDELINES.md section 2).
 */
export function AuditReportPreview({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const finding = findings[index]!;

  return (
    <StickerCard
      tone="surface"
      interactive={false}
      className={cn("p-5 sm:p-7", className)}
    >
      <p className="font-label text-deep text-xs tracking-widest uppercase">
        A page from an example audit report
      </p>

      <dl
        aria-live="polite"
        className="border-ink bg-paper mt-4 rounded-2xl border-[1.5px] px-5 py-4"
      >
        <dt className="font-label text-deep text-[11px] tracking-widest uppercase">
          Area
        </dt>
        <dd className="mt-1 flex flex-wrap items-center gap-3 text-xl font-semibold">
          {finding.area}
          <StatusPill status={finding.tone}>
            {finding.tone === "pass" ? "Strength" : "Gap found"}
          </StatusPill>
        </dd>
        <dt className="font-label text-deep mt-4 text-[11px] tracking-widest uppercase">
          Evidence
        </dt>
        <dd className="mt-1 text-[17px]">{finding.evidence}</dd>
        <dt className="font-label text-deep mt-4 text-[11px] tracking-widest uppercase">
          Recommendation
        </dt>
        <dd className="mt-1 text-[17px]">{finding.recommendation}</dd>
      </dl>

      <button
        type="button"
        onClick={() => setIndex((index + 1) % findings.length)}
        className="border-ink bg-sandy text-ink mt-5 h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold shadow-[0_4px_0_var(--ink)] transition-[transform,box-shadow] duration-150 hover:translate-y-0.5 hover:shadow-[0_2px_0_var(--ink)] active:translate-y-1 active:shadow-none"
      >
        Next finding
      </button>
    </StickerCard>
  );
}
