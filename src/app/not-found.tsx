import type { Metadata } from "next";
import Link from "next/link";

import { ctaVariants } from "@/components/brand/cta-variants";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import {
  TestRunTerminal,
  type TermLine,
} from "@/components/marketing/test-run-terminal";

export const metadata: Metadata = { title: "Page not found" };

/** A route check that ends on the failed address. Generic, no numbers. */
const routeLines: readonly TermLine[] = [
  { tag: "PASS", tone: "pass", text: "home" },
  { tag: "PASS", tone: "pass", text: "/software-testing-services" },
  { tag: "PASS", tone: "pass", text: "/qa-consulting" },
  { tag: "FAIL", tone: "bug", text: "the page you asked for" },
  { tag: "NOTE", tone: "note", text: "nothing found at this address" },
  { tag: "TRY ", tone: "pass", text: "/blog or /about" },
  { tag: "GO  ", tone: "pass", text: "back to a working page" },
];

const otherLinks = [
  { href: "/software-testing-services", label: "Software testing services" },
  { href: "/qa-consulting", label: "QA consulting" },
  { href: "/about", label: "About" },
];

export default function NotFound() {
  return (
    <section className="on-dark bg-deep border-navajo/20 relative overflow-hidden border-b">
      <AuroraBackground />

      <div className="relative mx-auto grid min-h-dvh max-w-6xl items-center gap-14 px-4 pt-(--header-clearance) pb-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div className="text-center lg:text-left">
          <p
            aria-hidden="true"
            className="text-sandy text-[clamp(8rem,28vw,14rem)] leading-[0.8] font-medium tracking-[-0.06em]"
          >
            4<span className="lb-wobble inline-block">0</span>4
          </p>

          <h1 className="text-paper [&_em]:text-sandy mt-10 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-6xl [&_em]:font-normal [&_em]:italic">
            <span className="sr-only">Error 404. </span>
            This test <em>failed.</em> The page is not here.
          </h1>

          <p className="text-navajo/90 mx-auto mt-5 max-w-lg text-lg text-balance lg:mx-0">
            The link may be old, or the page may have moved. Here are the places
            most people were looking for.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/"
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Back to home <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/blog"
              className={ctaVariants({ variant: "outlineOnDark", size: "xl" })}
            >
              Browse the blog
            </Link>
          </div>

          <ul className="font-label text-navajo mt-8 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs tracking-widest uppercase lg:justify-start">
            {otherLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-navajo relative underline decoration-1 underline-offset-4 after:absolute after:-inset-x-1 after:-inset-y-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <TestRunTerminal
          title="route-check"
          lines={routeLines}
          className="rotate-1"
        />
      </div>
    </section>
  );
}
