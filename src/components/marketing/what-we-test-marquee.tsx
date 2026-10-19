import { StatusPill, type Status } from "@/components/brand/status-pill";

/** What the work covers. The pass / bug / idle mix is decoration, not data. */
const topics: readonly { label: string; status: Status }[] = [
  { label: "Web apps", status: "pass" },
  { label: "Mobile apps", status: "idle" },
  { label: "Flaky tests", status: "bug" },
  { label: "APIs", status: "idle" },
  { label: "Regression", status: "pass" },
  { label: "Release checks", status: "idle" },
  { label: "Edge cases", status: "bug" },
  { label: "CI/CD gates", status: "idle" },
  { label: "Playwright", status: "pass" },
  { label: "Selenium", status: "idle" },
  { label: "Race conditions", status: "bug" },
  { label: "Test strategy", status: "idle" },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "What we test"}
      className="flex gap-3.5 pr-3.5"
    >
      {topics.map((topic) => (
        <li key={topic.label} className="list-none">
          <StatusPill status={topic.status} className="text-sm normal-case">
            {topic.label}
          </StatusPill>
        </li>
      ))}
    </ul>
  );
}

/**
 * A slow strip of what the work covers, directly under the hero. The row
 * is rendered twice and slides by half its width, so the loop is seamless;
 * the second copy is aria-hidden so a screen reader hears the list once.
 * Pauses on hover, and rests still under reduced motion.
 */
export function WhatWeTestMarquee() {
  return (
    <section
      aria-label="What we test"
      className="border-ink bg-navajo border-y-[1.5px] py-5"
    >
      <div className="lb-marquee">
        {/* The track slides by half its width, so its two rows must be
            identical and carry their own spacing (hence the overrides). */}
        <div className="lb-marquee-track gap-0! pr-0!">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
