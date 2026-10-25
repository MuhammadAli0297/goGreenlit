import type { Status } from "@/components/brand/status-pill";

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
      className="flex pr-7"
    >
      {topics.map((topic) => (
        <li
          key={topic.label}
          className="font-label flex items-center gap-3 pr-7 text-[13px] tracking-[0.14em] whitespace-nowrap uppercase"
        >
          <span
            aria-hidden="true"
            className={topic.status === "bug" ? "text-sandy" : "text-olive"}
          >
            {topic.status === "bug" ? "!" : "\u2713"}
          </span>
          {topic.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * An ink ticker tape of what the work covers, directly under the hero: mono
 * capitals with an olive tick or a sandy flag before each topic (the tick and
 * flag are decoration, the mix is not data). The row
 * is rendered twice and slides by half its width, so the loop is seamless;
 * the second copy is aria-hidden so a screen reader hears the list once.
 * Pauses on hover, and rests still under reduced motion.
 */
export function WhatWeTestMarquee() {
  return (
    <section aria-label="What we test" className="bg-ink text-navajo py-4">
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
