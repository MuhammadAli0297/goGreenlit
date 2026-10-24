"use client";

import Link from "next/link";
import { useId } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { useTabs } from "@/lib/use-tabs";
import { cn } from "@/lib/utils";

type CodeTone = "plain" | "pass" | "assert";

type Framework = {
  id: string;
  label: string;
  kicker: string;
  blurb: string;
  fits: readonly string[];
  href: string;
  /** Short example of the same check, written for illustration. */
  code: readonly { text: string; tone: CodeTone }[];
};

/**
 * Honest guidance, mirrored from the page's FAQ: Playwright is the default
 * for new work, an existing Selenium suite is extended rather than rewritten.
 * There is deliberately no score or percentage "fit" bar, that would be an
 * invented number (BRAND_GUIDELINES.md section 2).
 */
const frameworks: readonly Framework[] = [
  {
    id: "playwright",
    label: "Playwright",
    kicker: "Modern web apps",
    blurb:
      "Fast, reliable, and built for the way modern front ends behave. Our default for new automation work.",
    fits: [
      "Your app is React, Vue, or similar",
      "You want traces and video on every failure",
      "You run tests in CI on every pull request",
    ],
    href: "/software-testing-services/playwright-automation",
    code: [
      {
        text: 'import { test, expect } from "@playwright/test";',
        tone: "plain",
      },
      { text: "", tone: "plain" },
      {
        text: 'test("coupon applies once", async ({ page }) => {',
        tone: "pass",
      },
      { text: '  await page.goto("/cart");', tone: "plain" },
      {
        text: '  await page.getByLabel("Coupon").fill("WELCOME");',
        tone: "plain",
      },
      {
        text: '  await page.getByRole("button", { name: "Apply" }).click();',
        tone: "plain",
      },
      {
        text: '  await expect(page.getByTestId("discount")).toHaveCount(1);',
        tone: "assert",
      },
      { text: "});", tone: "pass" },
    ],
  },
  {
    id: "selenium",
    label: "Selenium",
    kicker: "Established stacks",
    blurb:
      "Mature, widely supported, and the right call when a large suite already works and your team knows it. We extend it rather than force a rewrite.",
    fits: [
      "You already have a Selenium suite",
      "You need broad language support",
      "Your grid and tooling are already in place",
    ],
    href: "/software-testing-services/selenium-testing",
    code: [
      { text: "WebDriver driver = new ChromeDriver();", tone: "pass" },
      { text: 'driver.get(baseUrl + "/cart");', tone: "plain" },
      { text: "", tone: "plain" },
      {
        text: 'driver.findElement(By.id("coupon")).sendKeys("WELCOME");',
        tone: "plain",
      },
      { text: 'driver.findElement(By.id("apply")).click();', tone: "plain" },
      { text: "", tone: "plain" },
      { text: "assertEquals(1, driver", tone: "assert" },
      {
        text: '  .findElements(By.className("discount")).size());',
        tone: "assert",
      },
      { text: "driver.quit();", tone: "pass" },
    ],
  },
];

const toneClass: Record<CodeTone, string> = {
  plain: "text-navajo",
  pass: "text-olive",
  assert: "text-sandy",
};

/**
 * "Playwright or Selenium?" A two-way segmented control (ARIA tabs, arrow
 * keys move between them) that swaps a short fit checklist and an example
 * of the same check in each tool. Both panels are in the server HTML with
 * the inactive one `hidden`, so the copy and links stay crawlable.
 */
export function FrameworkPicker() {
  const { active, setActive, tabRef, onKeyDown } = useTabs(frameworks.length);
  const base = useId();

  return (
    <div>
      <div
        role="tablist"
        aria-label="Automation framework"
        className="border-ink bg-surface inline-flex gap-1 rounded-full border-[1.5px] p-1"
      >
        {frameworks.map((fw, index) => {
          const selected = index === active;
          return (
            <button
              key={fw.id}
              ref={tabRef(index)}
              type="button"
              role="tab"
              id={`${base}-tab-${fw.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel-${fw.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown(index)}
              className={cn(
                "h-11 rounded-full px-6 text-base font-semibold transition-colors duration-200",
                selected ? "bg-sandy text-ink" : "text-ink hover:bg-ink/10",
              )}
            >
              {fw.label}
            </button>
          );
        })}
      </div>

      {frameworks.map((fw, index) => (
        <div
          key={fw.id}
          role="tabpanel"
          id={`${base}-panel-${fw.id}`}
          aria-labelledby={`${base}-tab-${fw.id}`}
          hidden={index !== active}
          className="mt-6 grid gap-6 lg:grid-cols-2"
        >
          <div className="border-ink bg-surface text-ink rounded-[22px] border-[1.5px] p-7 shadow-[6px_6px_0_var(--deep)] sm:p-9">
            <p className="font-label text-deep text-xs tracking-widest uppercase">
              {fw.kicker}
            </p>
            <h3 className="mt-3 text-4xl font-medium tracking-[-0.025em]">
              {fw.label}
            </h3>
            <p className="mt-4 text-[17px] leading-relaxed">{fw.blurb}</p>
            <p className="font-label mt-6 text-xs tracking-widest uppercase">
              A good fit when
            </p>
            <ul className="mt-3 flex flex-col gap-3">
              {fw.fits.map((fit) => (
                <li key={fit} className="flex items-center gap-3">
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
                  {fit}
                </li>
              ))}
            </ul>
            <Link
              href={fw.href}
              className={cn(ctaVariants({ size: "md" }), "mt-8")}
            >
              See {fw.label} testing <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="border-ink bg-ink text-navajo min-w-0 rounded-[22px] border-[1.5px] shadow-[6px_6px_0_var(--sandy)]">
            <div className="border-navajo/25 font-label flex items-center gap-2 border-b px-5 py-3 text-xs">
              <span className="bg-leaf size-[11px] rounded-full" />
              <span className="bg-olive size-[11px] rounded-full" />
              <span className="bg-sandy size-[11px] rounded-full" />
              <span className="ml-2 opacity-75">same check, in {fw.label}</span>
            </div>
            <pre
              tabIndex={0}
              aria-label={`Example ${fw.label} test`}
              className="font-label overflow-x-auto p-5 text-[13px] leading-[1.9] sm:p-7"
            >
              <code className="font-label">
                {fw.code.map((line, lineIndex) => (
                  <span
                    key={lineIndex}
                    className={cn("block", toneClass[line.tone])}
                  >
                    {line.text || " "}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}
