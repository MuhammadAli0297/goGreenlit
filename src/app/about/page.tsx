import type { Metadata } from "next";
import Link from "next/link";

import { ctaVariants } from "@/components/brand/cta-variants";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { CountUp } from "@/components/marketing/count-up";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { buildFounderPersonSchema, founders } from "@/lib/founders";
import { siteConfig } from "@/lib/site-config";
import { verifiedStats } from "@/lib/verified-stats";
import { cn } from "@/lib/utils";

const title = "About";
const description =
  "GoGreenlit was founded by two QA engineers, Muhammad Ali and Mohammad Khan, tired of watching bugs ship. Chicago-based, remote-first, and still founder-led.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/about`,
    title: `${title} | ${siteConfig.name}`,
    description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
  },
};

const manifesto = [
  {
    line: "We are not a testing factory. We do not execute a checklist and hand back a pass or fail report.",
    color: "border-sandy hover:bg-sandy",
  },
  {
    line: "Quality is cross-functional. It does not live in a QA silo, it lives in planning, in code review, in the retro.",
    color: "border-olive hover:bg-olive",
  },
  {
    line: "Shift left, always. A defect caught in planning costs a conversation. A defect caught in production costs a weekend.",
    color: "border-leaf hover:bg-leaf",
  },
  {
    line: "We are staying small on purpose. Every engagement still has a founder's attention on it.",
    color: "border-navajo hover:bg-navajo",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: title, href: "/about" },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

const founderStructuredData = {
  "@context": "https://schema.org",
  "@graph": founders.map(buildFounderPersonSchema),
};

/**
 * The headline's words, each its own inline-block so they rise one after
 * another on load (`lb-word`). `accent` words get the marker stroke inside an
 * `<em>`. The text stays one run of words with real spaces between them, so a
 * screen reader reads the sentence normally.
 */
function HeroWords({ before, accent }: { before: string; accent: string }) {
  const lead = before.split(" ");
  const marked = accent.split(" ");
  return (
    <>
      {lead.map((word, i) => (
        <span key={`b-${i}`}>
          <span
            className="lb-word"
            style={{ "--lb-i": i } as React.CSSProperties}
          >
            {word}
          </span>{" "}
        </span>
      ))}
      <em className="lb-marker">
        {marked.map((word, i) => (
          <span key={`a-${i}`}>
            <span
              className="lb-word"
              style={{ "--lb-i": lead.length + i } as React.CSSProperties}
            >
              {word}
            </span>
            {i < marked.length - 1 ? " " : ""}
          </span>
        ))}
      </em>
    </>
  );
}

export default function AboutPage() {
  const experience = verifiedStats.experience;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(founderStructuredData),
        }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Typographic hero: no icons anywhere on this page, big type on paper. */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-14 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-deep text-xs tracking-widest uppercase">
            Chicago-based, remote-first, founder-led
          </p>
          <h1 className="mt-6 text-[44px] leading-[0.98] font-medium tracking-[-0.04em] sm:text-7xl lg:text-8xl xl:text-[112px]">
            <HeroWords
              before="Two QA engineers who got tired of"
              accent="watching bugs ship"
            />
          </h1>
          <p className="text-deep mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl">
            GoGreenlit started as a conversation between two QA engineers who
            had each spent nearly a decade watching the same problem play out:
            startups either bolt testing onto the end of a sprint, or pay
            enterprise prices for QA maturity they do not need yet. We started
            GoGreenlit to be the option in between.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#founders"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              Meet the founders
            </Link>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="lb-parallax bg-sandy pointer-events-none absolute top-24 -right-16 hidden size-72 rounded-full opacity-90 min-[1400px]:block"
        />
        <div
          aria-hidden="true"
          className="lb-parallax-soft border-ink bg-olive pointer-events-none absolute right-40 bottom-24 hidden size-36 rounded-full border-[1.5px] min-[1400px]:block"
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Where GoGreenlit came from
        </h2>
        <p className="text-deep mt-6 text-lg leading-relaxed">
          Muhammad and Mohammad met working as embedded QA engineers on separate
          teams, watching the same story repeat. Quality either got treated as
          an afterthought, squeezed into the last two days of a sprint, or it
          got the full enterprise treatment: dedicated QA departments and
          process maturity most ten-person startups do not have the headcount or
          the budget for.
        </p>
        <p className="text-deep mt-5 text-lg leading-relaxed">
          Neither extreme fit the teams they had actually worked with. So they
          started GoGreenlit: embedded QA and automation, priced and structured
          for a team that is shipping fast, not one that has already scaled past
          the problem.
        </p>
      </section>

      <section
        id="founders"
        className="bg-deep text-navajo relative scroll-mt-16 overflow-hidden"
      >
        <AuroraBackground />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-label text-olive text-xs tracking-widest uppercase">
              The founders
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Meet the founders
            </h2>
            <p className="text-navajo/80 mt-4 text-lg">
              Two people, no account managers in between, and a founder on every
              engagement.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {founders.map((founder, index) => (
              <Reveal
                key={founder.name}
                id={founder.slug}
                delay={index * 80}
                className="group border-ink bg-surface text-ink scroll-mt-16 rounded-[28px] border-[1.5px] p-7 shadow-[8px_8px_0_var(--ink)] transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-9"
              >
                <div className="flex items-center gap-5">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "border-ink flex size-24 shrink-0 items-center justify-center rounded-full border-[1.5px] text-3xl font-semibold tracking-tight transition-transform duration-700 group-hover:rotate-[360deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0 sm:size-28 sm:text-4xl",
                      founder.avatarClassName,
                    )}
                  >
                    {founder.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {founder.name}
                    </h3>
                    <p className="font-label text-deep mt-2 text-[11px] leading-snug tracking-widest uppercase">
                      {founder.jobTitle}
                    </p>
                  </div>
                </div>
                <p className="text-deep mt-6 text-base leading-relaxed sm:text-lg">
                  {founder.bio}
                </p>
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on LinkedIn (opens in a new tab)`}
                  className="relative mt-5 inline-block font-semibold underline-offset-4 after:absolute after:inset-x-0 after:-inset-y-3 hover:underline"
                >
                  LinkedIn <span aria-hidden="true">&rarr;</span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p className="text-7xl leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-8xl">
              <CountUp
                value={experience.value}
                suffix={experience.suffix}
                duration={1800}
              />
            </p>
            <p className="font-label text-xs tracking-widest uppercase">
              {experience.label}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="lb-wipe text-4xl leading-[1.05] font-normal tracking-[-0.03em] text-balance italic sm:text-5xl lg:text-6xl">
            &ldquo;We did not want to build a testing factory. We wanted to be
            the QA engineer a startup{" "}
            <span className="lb-marker">cannot afford to hire yet</span>, but
            still needs.&rdquo;
          </p>
          <footer className="font-label text-deep mt-8 text-xs tracking-widest uppercase">
            Muhammad Ali &amp; Mohammad Khan, Co-Founders
          </footer>
        </blockquote>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <p className="font-label text-deep text-xs tracking-widest uppercase">
          How we work
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          What makes us different
        </h2>

        <ul className="mt-10 space-y-3.5">
          {manifesto.map((item, index) => (
            <Reveal
              as="li"
              key={item.line}
              delay={index * 80}
              className={cn(
                "grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-3 border-l-8 px-4 py-5 transition-[background-color,translate] duration-300 hover:translate-x-2.5 motion-reduce:transition-none motion-reduce:hover:translate-x-0 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-4 sm:px-7 sm:py-7",
                item.color,
              )}
            >
              <span className="font-label text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-2xl leading-tight font-medium tracking-tight text-balance sm:text-3xl">
                {item.line}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Based in Chicago, built for remote
        </h2>
        <p className="text-deep mt-6 text-lg leading-relaxed">
          GoGreenlit is headquartered in Chicago, but the work happens wherever
          your team is. Engagements run distributed by default: video standups,
          async updates, and the tools your team already uses, not an office
          requirement dressed up as culture.
        </p>
      </section>

      <CtaSection
        tone="olive"
        title="Want to work with the people who actually run your *QA?*"
        description="No account managers between you and the engineers doing the work. Tell us about your team, and one of us will be on the call."
      />
    </>
  );
}
