import Link from "next/link";
import { ClipboardCheck, Compass, Users } from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { CtaSection } from "@/components/marketing/cta-section";
import { Hero } from "@/components/marketing/hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { ServiceExplorer } from "@/components/marketing/service-explorer";
import { StatBand } from "@/components/marketing/stat-band";
import { WhatWeTestMarquee } from "@/components/marketing/what-we-test-marquee";
import { WhyEmbeddedBento } from "@/components/marketing/why-embedded-bento";

const processSteps = [
  {
    title: "Discovery call",
    description:
      "A founder walks through your product, your stack, and where your test coverage is thinnest right now.",
  },
  {
    title: "Sprint onboarding",
    description:
      "Your embedded QA engineer joins your sprint, your tools, and your standups, typically within days.",
  },
  {
    title: "Embedded testing",
    description:
      "Manual coverage where it matters most, automation where it compounds, and defect tracking that keeps escaped bugs out of production.",
  },
  {
    title: "Continuous improvement",
    description:
      "We tighten your CI/CD quality gates and testing pyramid release over release, so your release coverage keeps climbing.",
  },
];

const consultingOfferings = [
  {
    icon: Compass,
    title: "Test strategy consulting",
    description:
      "We design your testing pyramid, define coverage metrics, and set the quality gates that match how fast your team actually ships.",
  },
  {
    icon: Users,
    title: "Embedded QA team",
    description:
      "A dedicated QA engineer who ramps into your sprint cycle fast and stays for as long as you need embedded coverage.",
  },
  {
    icon: ClipboardCheck,
    title: "CI/CD quality gates",
    description:
      "Automated checks wired into your pipeline that block what matters and stay out of the way of everything else.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeTestMarquee />
      <StatBand />

      <section
        id="services"
        className="on-dark bg-deep text-navajo relative overflow-hidden"
      >
        <div className="opacity-55">
          <AuroraBackground />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-label text-navajo text-xs tracking-widest uppercase">
              Services
            </p>
            <SectionHeading className="text-paper [&_em]:text-sandy mt-4 max-w-3xl">
              Software testing services built for *shipping teams*
            </SectionHeading>
            <p className="text-navajo mt-5 max-w-2xl text-lg">
              Our QA engineers cover the full testing pyramid, from hands-on
              manual sessions to automated regression suites, so nothing slips
              through before a release. Pick one and watch an example run.
            </p>
          </Reveal>

          <Reveal className="mt-10">
            <ServiceExplorer />
          </Reveal>

          <Reveal className="mt-8">
            <p className="text-navajo/90 text-[15px]">
              Also on the bench:{" "}
              <Link
                href="/software-testing-services/selenium-testing"
                className="text-paper decoration-sandy underline decoration-2 underline-offset-4"
              >
                Selenium testing
              </Link>
              ,{" "}
              <Link
                href="/software-testing-services/mobile-app-testing"
                className="text-paper decoration-sandy underline decoration-2 underline-offset-4"
              >
                mobile app testing
              </Link>
              , or{" "}
              <Link
                href="/software-testing-services"
                className="text-paper decoration-sandy underline decoration-2 underline-offset-4"
              >
                every testing service in one place
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="qa-consulting"
        className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-label text-deep text-xs tracking-widest uppercase">
            QA consulting
          </p>
          <SectionHeading className="mt-4">
            Not just testing. *Strategy* and process too.
          </SectionHeading>
          <p className="mt-5 text-lg">
            Some engagements need hands-on testing today. Others need a QA
            strategy that outlasts any single sprint. We do both.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {consultingOfferings.map((offering, index) => (
            <ServiceCard key={offering.title} {...offering} index={index} />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/qa-consulting"
            className={ctaVariants({ variant: "outline", size: "lg" })}
          >
            Explore QA consulting <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </section>

      <section className="bg-leaf border-ink border-y-[1.5px]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-label text-xs tracking-widest uppercase">
              Why embedded
            </p>
            <SectionHeading className="mt-4">
              Not a vendor. Not a ticket queue. *Your team.*
            </SectionHeading>
            <p className="mt-5 max-w-2xl text-lg">
              We embed inside your sprints instead of testing from the outside.
              Same standups, same tickets, same release date.
            </p>
          </Reveal>
          <WhyEmbeddedBento />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-label text-deep text-xs tracking-widest uppercase">
              How it works
            </p>
            <SectionHeading className="mt-4">
              From kickoff call to *shipped* release
            </SectionHeading>
            <p className="mt-5 text-lg">
              Four moves, and the line fills in as you scroll.
            </p>
            <Link
              href="/about"
              className={`${ctaVariants({ variant: "outline", size: "lg" })} mt-8`}
            >
              Meet the founders
            </Link>
          </Reveal>
          <div className="lg:-mt-12">
            <PhaseTimeline phases={processSteps} />
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
