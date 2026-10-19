"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { cn } from "@/lib/utils";

type LogTone = "pass" | "bug" | "note";

type ExplorerService = {
  id: string;
  label: string;
  kicker: string;
  title: string;
  body: string;
  points: readonly string[];
  href: string;
  /** An illustration of the work, never a record of a real run. */
  log: readonly { tag: string; tone: LogTone; text: string }[];
};

/**
 * Four of the six services, the ones with a distinct way of working that a
 * log shows well. Selenium and mobile testing are linked underneath instead.
 * Keep the log lines generic: no counts, percentages or invented results
 * (BRAND_GUIDELINES.md section 2). Copy for each body comes from the
 * homepage's earlier service cards.
 */
const services: readonly ExplorerService[] = [
  {
    id: "manual",
    label: "Manual testing",
    kicker: "Human eyes",
    title: "Exploratory and manual testing",
    body: "Exploratory testing, user acceptance testing, and smoke testing from engineers who read your product the way a real user would, not just a script.",
    points: [
      "Exploratory sessions on every release",
      "Repro steps your developers can use",
      "Edge cases found early",
    ],
    href: "/software-testing-services/manual-testing",
    log: [
      { tag: "SESSION", tone: "pass", text: "checkout, guest user" },
      { tag: "BUG    ", tone: "bug", text: "back button clears cart" },
      { tag: "BUG    ", tone: "bug", text: "promo field accepts spaces" },
      { tag: "NOTE   ", tone: "note", text: "repro video attached" },
      { tag: "DONE   ", tone: "pass", text: "tickets filed, no blockers" },
    ],
  },
  {
    id: "playwright",
    label: "Playwright automation",
    kicker: "Code that guards",
    title: "Playwright test automation",
    body: "End-to-end suites written in TypeScript, checked into your repository, and run in your CI on every pull request, not handed back as a black box.",
    points: [
      "Maintainable suites, not brittle scripts",
      "Runs in your CI on every merge",
      "Traces and videos on failure",
    ],
    href: "/software-testing-services/playwright-automation",
    log: [
      { tag: "RUN    ", tone: "pass", text: "chromium, firefox, webkit" },
      { tag: "PASS   ", tone: "pass", text: "login.spec.ts" },
      { tag: "PASS   ", tone: "pass", text: "checkout.spec.ts" },
      { tag: "RETRY  ", tone: "bug", text: "upload.spec.ts, flaky locator" },
      { tag: "PASS   ", tone: "pass", text: "upload.spec.ts, stabilized" },
    ],
  },
  {
    id: "api",
    label: "API and data",
    kicker: "Under the hood",
    title: "API and data testing",
    body: "REST and GraphQL contract testing, schema validation, and data integrity checks that catch backend regressions before they reach your frontend.",
    points: [
      "Contract checks on every endpoint",
      "Bad payloads and auth edge cases",
      "Data consistency across services",
    ],
    href: "/software-testing-services/api-data-testing",
    log: [
      { tag: "GET    ", tone: "pass", text: "/orders 200 OK" },
      { tag: "POST   ", tone: "pass", text: "/orders 201 Created" },
      {
        tag: "BUG    ",
        tone: "bug",
        text: "/orders accepts a negative quantity",
      },
      { tag: "NOTE   ", tone: "note", text: "validation gap reported" },
      { tag: "PASS   ", tone: "pass", text: "schema matches contract" },
    ],
  },
  {
    id: "regression",
    label: "Regression",
    kicker: "Never break twice",
    title: "Regression testing",
    body: "Risk-prioritized automated regression that runs against every release, so the features your users already depend on keep working.",
    points: [
      "Risk-ranked, not run-everything",
      "Nightly and pre-release runs",
      "Clear pass or fail for each release",
    ],
    href: "/software-testing-services/regression-testing",
    log: [
      { tag: "SUITE  ", tone: "pass", text: "regression, nightly" },
      { tag: "PASS   ", tone: "pass", text: "core flows hold" },
      { tag: "BUG    ", tone: "bug", text: "invoice PDF missing tax line" },
      { tag: "BUG    ", tone: "bug", text: "timezone off by one day" },
      { tag: "GATE   ", tone: "bug", text: "hold release until fixed" },
    ],
  },
];

const toneClass: Record<LogTone, string> = {
  pass: "text-olive",
  bug: "text-sandy",
  note: "text-navajo",
};

/**
 * "Pick a service. See it run." Tabs for four services; the active one
 * shows its summary on the left and an example log on the right, whose
 * lines type in one after another each time a tab opens. Every panel is in
 * the server-rendered HTML (inactive ones are only `hidden`), so the copy
 * and links are crawlable and still there without JavaScript. Arrow keys,
 * Home and End move between tabs, as the tabs pattern expects.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const next = (index + services.length) % services.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight") focusTab(index + 1);
    else if (event.key === "ArrowLeft") focusTab(index - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(services.length - 1);
    else return;
    event.preventDefault();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Testing services"
        className="flex flex-wrap gap-2.5"
      >
        {services.map((service, index) => {
          const selected = index === active;
          return (
            <button
              key={service.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${service.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${service.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "h-11 rounded-full border-[1.5px] px-5 text-[15px] font-semibold transition-[transform,background-color,color] duration-200 hover:-translate-y-0.5",
                selected
                  ? "border-sandy bg-sandy text-ink"
                  : "border-navajo text-navajo hover:bg-navajo/10 bg-transparent",
              )}
            >
              {service.label}
            </button>
          );
        })}
      </div>

      {services.map((service, index) => (
        <div
          key={service.id}
          role="tabpanel"
          id={`${base}-panel-${service.id}`}
          aria-labelledby={`${base}-tab-${service.id}`}
          hidden={index !== active}
          className="border-ink bg-surface text-ink mt-6 overflow-hidden rounded-[22px] border-[1.5px] shadow-[8px_8px_0_var(--ink)]"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-7 sm:p-10">
              <p className="font-label text-deep text-xs tracking-widest uppercase">
                {service.kicker}
              </p>
              <h3 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.02em] sm:text-4xl">
                {service.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed">{service.body}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="border-ink bg-olive inline-flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8.5 6.5 12 13 4.5" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={service.href}
                className={cn(ctaVariants({ size: "md" }), "mt-8")}
              >
                See {service.label.toLowerCase()}{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div
              aria-hidden="true"
              className="bg-ink text-navajo font-label flex flex-col justify-center gap-0 p-7 text-[13.5px] leading-[1.95] sm:p-10"
            >
              <p className="text-navajo/60 mb-3 text-xs tracking-widest uppercase">
                Example run
              </p>
              {service.log.map((line, lineIndex) => (
                <div
                  key={`${line.tag}-${lineIndex}`}
                  className="animate-in fade-in slide-in-from-left-3 fill-mode-both flex gap-3 duration-500 motion-reduce:animate-none"
                  style={{ animationDelay: `${lineIndex * 140}ms` }}
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
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
