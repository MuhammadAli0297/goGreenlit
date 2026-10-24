import Link from "next/link";

import { ctaVariants } from "@/components/brand/cta-variants";
import { BackToTop } from "@/components/layout/back-to-top";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/lib/site-config";

/** Services and QA Consulting each carry a full set of subpages, mirror them as footer link columns. */
const footerNavGroups = siteConfig.nav.filter(
  (item) => item.label === "Services" || item.label === "QA Consulting",
);
const aboutItem = siteConfig.nav.find((item) => item.label === "About");
const blogItem = siteConfig.nav.find((item) => item.label === "Blog");

const linkClass =
  "text-navajo/85 hover:text-sandy relative inline-block py-1 text-[15px] transition-colors after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-sandy after:transition-[width] after:duration-300 hover:after:w-full";

const headingClass =
  "font-label text-olive text-xs font-medium tracking-widest uppercase";

/**
 * Closing anchor of every page: Dark Slate Grey ground (the same bold
 * treatment the hero and About's founders section use), link columns
 * built from siteConfig.nav, a Back to top link, and an oversized
 * wordmark that lights up Sandy Brown on hover. The wordmark is
 * decorative (aria-hidden), the real Logo above it is the accessible one.
 * The row above it is z-10 because the wordmark's glyph boxes extend up
 * past its tight line-height and would otherwise swallow clicks on the
 * Back to top button.
 * Stays a Server Component, Back to top is a small client leaf (back-to-top.tsx).
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-deep text-navajo relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="onDark" />
            <p className="text-navajo/85 mt-4 max-w-sm text-[15px] leading-relaxed">
              {siteConfig.footerDescription}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className={`${linkClass} mt-3`}
            >
              {siteConfig.email}
            </a>
            <div className="mt-5">
              <Link
                href={siteConfig.links.calendar}
                className={ctaVariants({ variant: "cta", size: "md" })}
              >
                Book a call
              </Link>
            </div>
          </div>

          {footerNavGroups.map((group) => (
            <nav key={group.href} aria-label={group.label}>
              <h3 className={headingClass}>
                <Link
                  href={group.href}
                  className="hover:text-sandy relative after:absolute after:inset-x-0 after:-inset-y-3.5"
                >
                  {group.label}
                </Link>
              </h3>
              <ul className="mt-3 space-y-0.5">
                {group.items?.map((sub) => (
                  <li key={sub.href}>
                    <Link href={sub.href} className={linkClass}>
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Company">
            <h3 className={headingClass}>Company</h3>
            <ul className="mt-3 space-y-0.5">
              {aboutItem ? (
                <li>
                  <Link href={aboutItem.href} className={linkClass}>
                    {aboutItem.label}
                  </Link>
                </li>
              ) : null}
              {blogItem ? (
                <li>
                  <Link href={blogItem.href} className={linkClass}>
                    {blogItem.label}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link href={siteConfig.links.calendar} className={linkClass}>
                  Book a call
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-navajo/25 relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="font-label text-navajo/85 text-xs tracking-widest uppercase">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <BackToTop />
        </div>

        <p
          aria-hidden="true"
          className="text-navajo/10 hover:text-sandy mt-6 mb-[-0.12em] cursor-default text-[clamp(4.5rem,17vw,15.5rem)] leading-[0.85] font-medium tracking-[-0.06em] whitespace-nowrap transition-colors duration-500 select-none"
        >
          goGreenlit
        </p>
      </div>
    </footer>
  );
}
