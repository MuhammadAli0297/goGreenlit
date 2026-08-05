import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/marketing/cta-section";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { StatBand } from "@/components/marketing/stat-band";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
  },
};

const founders = [
  {
    initials: "MA",
    name: "Muhammad Ali",
    title: "Co-Founder and QA Manager",
    bio: "Nine years building and managing QA processes across fintech, SaaS, and e-commerce teams. The one who designs the process before anyone touches a test case, and joins your planning meetings to make sure it stays that way.",
    avatarClassName: "bg-[#ffe0ad] text-[#354639]",
  },
  {
    initials: "MK",
    name: "Mohammad Khan",
    title: "Co-Founder and Lead Automation QA Engineer",
    bio: "Builds automation suites in Playwright and Selenium that live inside your CI pipeline, not next to it. If a bad build gets blocked before it merges, this is usually why.",
    avatarClassName: "bg-[#ee9e58] text-[#354639]",
  },
];

const manifesto = [
  "We're not a testing factory. We don't execute a checklist and hand back a pass or fail report.",
  "Quality is cross-functional. It doesn't live in a QA silo, it lives in planning, in code review, in the retro.",
  "Shift left, always. A defect caught in planning costs a conversation. A defect caught in production costs a weekend.",
  "We're staying small on purpose. Every engagement still has a founder's attention on it.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="Chicago-based, remote-first, founder-led"
        description="GoGreenlit started as a conversation between two QA engineers who'd each spent nearly a decade watching the same problem play out: startups either bolt testing onto the end of a sprint, or pay enterprise prices for QA maturity they don't need yet. We started GoGreenlit to be the option in between."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-[#ee9e58] text-[#354639] hover:bg-[#ee9e58]/85",
              )}
            >
              Book a call
            </Link>
            <Link
              href="#founders"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              Meet the founders
            </Link>
          </>
        }
      >
        Two QA engineers who got tired of{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          watching bugs ship
        </span>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Where GoGreenlit came from
        </h2>
        <p className="text-muted-foreground mt-6">
          Muhammad and Mohammad met working as embedded QA engineers on separate
          teams, watching the same story repeat. Quality either got treated as
          an afterthought, squeezed into the last two days of a sprint, or it
          got the full enterprise treatment: dedicated QA departments and
          process maturity most ten-person startups don&rsquo;t have the
          headcount or the budget for.
        </p>

        <blockquote className="my-10 border-l-4 border-[#ee9e58] pl-6 text-xl text-balance italic sm:text-2xl">
          &ldquo;We didn&rsquo;t want to build a testing factory. We wanted to
          be the QA engineer a startup can&rsquo;t afford to hire yet, but still
          needs.&rdquo;
          <footer className="text-muted-foreground mt-3 text-sm not-italic">
            Muhammad Ali &amp; Mohammad Khan, Co-Founders
          </footer>
        </blockquote>

        <p className="text-muted-foreground">
          Neither extreme fit the teams they&rsquo;d actually worked with. So
          they started GoGreenlit: embedded QA and automation, priced and
          structured for a team that&rsquo;s shipping fast, not one that&rsquo;s
          already scaled past the problem.
        </p>
      </section>

      <StatBand />

      <section id="founders" className="scroll-mt-16 bg-[#354639]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-[#f9f4eb] sm:text-4xl">
              Meet the founders
            </h2>
            <p className="mt-4 text-[#f9f4eb]/75">
              Two people, no account managers in between, and a founder on every
              engagement.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {founders.map((founder, index) => (
              <Reveal
                key={founder.name}
                delay={index * 80}
                className="rounded-2xl border border-[#ffe0ad]/15 bg-[#ffe0ad]/10 p-8"
              >
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-full text-lg font-semibold",
                    founder.avatarClassName,
                  )}
                >
                  {founder.initials}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#f9f4eb]">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm text-[#f9f4eb]/70">
                  {founder.title}
                </p>
                <p className="mt-4 text-sm text-[#f9f4eb]/80">{founder.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          What makes us different
        </h2>

        <ul className="mt-12 space-y-8">
          {manifesto.map((line, index) => (
            <Reveal
              as="li"
              key={line}
              delay={index * 80}
              className="border-l-4 border-[#ee9e58] pl-6"
            >
              <p className="text-xl font-medium text-balance sm:text-2xl">
                {line}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Based in Chicago, built for remote
        </h2>
        <p className="text-muted-foreground mt-6">
          GoGreenlit is headquartered in Chicago, but the work happens wherever
          your team is. Engagements run distributed by default: video standups,
          async updates, and the tools your team already uses, not an office
          requirement dressed up as culture.
        </p>
      </section>

      <CtaSection
        title="Want to work with the people who actually run your QA?"
        description="No account managers between you and the engineers doing the work. Tell us about your team, and one of us will be on the call."
      />
    </>
  );
}
