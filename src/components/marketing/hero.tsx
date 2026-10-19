import Link from "next/link";
import type { CSSProperties } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StatusPill } from "@/components/brand/status-pill";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { HeroScrollShrink } from "@/components/marketing/hero-scroll-shrink";
import {
  TestRunTerminal,
  type TermLine,
} from "@/components/marketing/test-run-terminal";
import { siteConfig } from "@/lib/site-config";

/**
 * An example run, generic on purpose: passes, one caught bug, a fix and a
 * go. No numbers appear in it (BRAND_GUIDELINES.md section 2), it shows what
 * a run looks like and is not a record of one.
 */
const runLines: readonly TermLine[] = [
  { tag: "PASS", tone: "pass", text: "signup flow, three browsers" },
  { tag: "PASS", tone: "pass", text: "checkout, saved card" },
  { tag: "BUG ", tone: "bug", text: "coupon stacks twice on mobile" },
  { tag: "NOTE", tone: "note", text: "ticket filed, repro attached" },
  { tag: "PASS", tone: "pass", text: "API contract, every endpoint" },
  { tag: "PASS", tone: "pass", text: "regression suite, nightly" },
  { tag: "FIXD", tone: "pass", text: "coupon stacks once, verified" },
  { tag: "GO  ", tone: "pass", text: "release is green" },
];

/**
 * Homepage hero: one viewport tall (gotcha #20), Dark Slate Grey with the
 * aurora, the headline on the left and a live test-run terminal on the
 * right from `lg` up. Below `lg` the terminal is left out so the hero keeps
 * filling exactly one screen on a phone. The wrapping HeroScrollShrink
 * recedes the whole panel as the page scrolls.
 */
export function Hero() {
  return (
    <HeroScrollShrink className="on-dark bg-deep relative overflow-hidden">
      <AuroraBackground />

      <div className="relative mx-auto grid min-h-dvh max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:px-8 [@media(max-height:700px)]:pt-(--header-clearance) [@media(max-height:700px)]:pb-10">
        <div className="text-center lg:text-left">
          <StatusPill className="bg-navajo/10 text-navajo border-navajo/50 mb-6 normal-case [@media(max-height:700px)]:hidden">
            <span className="lb-pulse bg-sandy inline-block size-2 rounded-full" />
            No long-term contracts, founder-embedded from day one
          </StatusPill>

          <h1 className="text-paper [&_em]:text-sandy text-5xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-7xl [&_em]:font-normal [&_em]:italic">
            Embedded QA teams for startups that <em>ship fast</em>
          </h1>

          <p className="text-navajo/90 mx-auto mt-6 max-w-2xl text-lg text-balance lg:mx-0 [@media(max-height:700px)]:mt-3">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start [@media(max-height:700px)]:mt-6">
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#services"
              className={ctaVariants({ variant: "outlineOnDark", size: "xl" })}
            >
              Explore services
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <TestRunTerminal
            title="release-candidate / example run"
            lines={runLines}
            className="rotate-[-1.5deg]"
          />
          <div
            aria-hidden="true"
            className="lb-float border-ink bg-navajo text-ink font-label absolute -right-4 -bottom-8 flex items-center gap-2 rounded-2xl border-[1.5px] px-4 py-3 text-xs tracking-widest uppercase shadow-[4px_4px_0_var(--ink)]"
            style={{ "--lb-rot": "3deg" } as CSSProperties}
          >
            Found before launch
          </div>
          <div
            aria-hidden="true"
            className="lb-float border-ink bg-olive text-ink font-label absolute -top-7 -left-6 rounded-2xl border-[1.5px] px-4 py-3 text-xs tracking-widest uppercase shadow-[4px_4px_0_var(--ink)]"
            style={
              {
                "--lb-rot": "-4deg",
                animationDelay: "-2s",
              } as CSSProperties
            }
          >
            Playwright + manual
          </div>
        </div>
      </div>
    </HeroScrollShrink>
  );
}
