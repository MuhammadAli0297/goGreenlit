import type { Metadata } from "next";
import Link from "next/link";
import {
  Bug,
  CheckCircle2,
  GaugeCircle,
  Radar,
  RefreshCw,
  Smartphone,
  Target,
  TestTubeDiagonal,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { DeepBand } from "@/components/marketing/deep-band";
import { CtaSection } from "@/components/marketing/cta-section";
import { CoverageRing } from "@/components/marketing/coverage-ring";
import { DevicePicker } from "@/components/marketing/device-picker";
import { FrameworkPicker } from "@/components/marketing/framework-picker";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { RunMatrix } from "@/components/marketing/run-matrix";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { siteConfig } from "@/lib/site-config";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";

const title = "Software Testing Services";
const description =
  "Embedded software testing services: manual QA, Playwright and Selenium automation, API and regression testing, all run inside your sprint, not after it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services`,
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

const sprintSteps = [
  "Test cases get written in sprint planning, not after the code is done.",
  "Execution happens alongside development, sprint by sprint.",
  "Coverage and findings get reported in your own standups.",
  "Defects are filed and triaged before a release ships, not discovered after.",
];

const offerings = [
  {
    icon: TestTubeDiagonal,
    title: "Manual testing",
    description:
      "Hands-on exploratory sessions, user acceptance testing, and usability review, testing the product the way your actual customers will use it, not a scripted checklist.",
  },
  {
    icon: Workflow,
    title: "Playwright automation",
    description:
      "TypeScript end-to-end suites checked into your repository, covering multiple browsers, and wired into your CI so a failing test blocks a bad merge instead of a bad release.",
  },
  {
    icon: Bug,
    title: "Selenium testing",
    description:
      "Enterprise automation frameworks built on the Page Object Model, with parallel execution, for teams that already depend on a Selenium suite and need it extended, not rebuilt.",
  },
  {
    icon: Webhook,
    title: "API and data testing",
    description:
      "Contract testing for REST and GraphQL endpoints, plus validation of the ETL jobs and data pipelines that never show up in a UI test but break production just as often.",
  },
  {
    icon: Target,
    title: "QA strategy and process",
    description:
      "Risk-based test planning, a testing pyramid sized to your stack, and sprint-level coverage metrics that show where your actual exposure is, not a generic audit.",
  },
  {
    icon: RefreshCw,
    title: "Regression testing",
    description:
      "Automated regression triggered on every pull request and every deployment, risk-prioritized so the checks that matter most run first.",
  },
  {
    icon: Smartphone,
    title: "Mobile testing",
    description:
      "iOS and Android testing across real device and OS combinations, covering functionality, compatibility, and performance before a build reaches the app store.",
  },
];

const approach = [
  {
    icon: Radar,
    title: "Shift-left by default",
    description:
      "Test cases get written in sprint planning and smoke tests run pre-merge, so a defect gets caught before it is merged, not after it is shipped.",
  },
  {
    icon: Users,
    title: "Embedded in your ceremonies",
    description:
      "Your QA engineer sits in standups and retros like any other engineer on the team, not a vendor waiting on a status update.",
  },
  {
    icon: GaugeCircle,
    title: "Coverage you can actually see",
    description:
      "We track functional test execution, pass rates, and production escapes, the metrics that predict a bad release, not a code coverage percentage that does not.",
  },
];

const stack = [
  {
    label: "Frontend",
    tools: "React, Next.js, Vue, Angular, and server-rendered apps",
  },
  {
    label: "Backend",
    tools: "Node.js, Python, Java, and Go APIs",
  },
  {
    label: "Databases",
    tools: "PostgreSQL, MySQL, MongoDB, and Redis",
  },
  {
    label: "Infrastructure",
    tools: "AWS, GCP, and Azure",
  },
  {
    label: "Testing tools",
    tools: "Playwright, Selenium, Postman, REST Assured, PyTest, and Appium",
  },
  {
    label: "CI/CD",
    tools: "GitHub Actions, Jenkins, GitLab CI, and CircleCI",
  },
];

const faqs = [
  {
    question: "What is included in outsourced software testing services?",
    answer:
      "Manual testing, automated regression, API and data testing, and full test automation builds, all delivered by an engineer embedded in your sprint rather than a separate testing queue.",
  },
  {
    question: "How long does it take a QA engineer to ramp up on our product?",
    answer:
      "Most engagements reach active contribution within 5 to 7 business days: enough time to review your codebase and existing test documentation and get tool access set up, then join sprint ceremonies from day seven onward.",
  },
  {
    question: "Should we use manual or automated testing?",
    answer:
      "Both, for different reasons. Manual testing is where judgment matters, exploratory sessions and usability review a script cannot replace. Automated testing is where scale matters, regression coverage that needs to run on every build. Most engagements run them in parallel rather than picking one.",
  },
  {
    question: "Which automation framework do you use?",
    answer:
      "Playwright by default for new automation work. If your team already has a Selenium suite, we maintain and extend it rather than forcing a rewrite for its own sake.",
  },
  {
    question: "Can you test APIs and microservices, not just the UI?",
    answer:
      "Yes. REST and GraphQL contract testing, and coverage at the service boundary, so a change in one microservice gets caught before it breaks another.",
  },
  {
    question: "How often should regression testing run?",
    answer:
      "Automated regression runs on every pull request. A fuller manual pass before a production release is worth scheduling weekly or biweekly, depending on how often you actually ship.",
  },
  {
    question: "What kind of defect reduction should we expect?",
    answer:
      "Teams that embed a QA engineer into their sprint from day one have seen a 45% reduction in escaped defects within the first 90 days. The mechanism is simple: catching a bug during the sprint that wrote it, instead of after a release ships.",
  },
  {
    question: "What happens during onboarding?",
    answer:
      "A 30 minute kickoff call, a review of your existing documentation, and access set up for your test tools and repositories. From there, your QA engineer joins sprint ceremonies alongside the rest of your team.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: title, href: "/software-testing-services" },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function SoftwareTestingServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        tone="leaf"
        aside={
          <RunMatrix
            rows={["Chrome", "Firefox", "Safari", "Android", "iOS"]}
            title="Cross-browser run"
            label="An example test run sweeping across five browsers and devices, with passes, bugs found and queued checks"
            className="lg:rotate-[1.5deg]"
          />
        }
        badge="Manual and automated, in your sprint"
        description="Most QA vendors test after your team ships and hand defects back on their own schedule. GoGreenlit’s QA engineers join your sprint itself: writing test cases in planning, executing them alongside development, and filing defects before a release goes out, not after."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#offerings"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what we test
            </Link>
          </>
        }
      >
        Software testing services that plug into <em>your sprint</em>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-label text-deep text-xs tracking-widest uppercase">
            Every layer
          </p>
          <SectionHeading className="mt-4">
            Testing across every layer, not just the *UI*
          </SectionHeading>
          <p className="mt-5 text-lg">
            We test the interface your users touch, the APIs and data pipelines
            behind it, and the cross-browser and regression coverage that keeps
            a release from breaking something that used to work. None of it
            happens in a separate cycle bolted onto the end of a sprint.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {sprintSteps.map((step, index) => (
            <Reveal as="li" key={step} delay={index * 80}>
              <StickerCard
                tone="surface"
                interactive={false}
                className="flex h-full gap-4 p-5"
              >
                <span
                  aria-hidden="true"
                  className="border-ink bg-olive mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                >
                  <CheckCircle2 className="size-4" />
                </span>
                <span className="text-[17px] leading-snug">{step}</span>
              </StickerCard>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        id="offerings"
        className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <Reveal className="max-w-3xl">
          <p className="font-label text-deep text-xs tracking-widest uppercase">
            Services
          </p>
          <SectionHeading className="mt-4">
            Every service your product’s *testing pyramid* needs
          </SectionHeading>
          <p className="mt-5 text-lg">
            From hands-on manual sessions to automated suites running in your
            CI, each engagement is scoped around your stack and your release
            cadence, not a fixed package.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((offering, index) => (
            <ServiceCard
              key={offering.title}
              {...offering}
              variant="bold"
              index={index}
            />
          ))}
          <Reveal className="h-full" delay={offerings.length * 80}>
            <StickerCard
              tone="navajo"
              className="flex h-full flex-col justify-between gap-6 p-6"
            >
              <div>
                <p className="font-label text-xs tracking-widest uppercase">
                  Not sure where to start?
                </p>
                <p className="mt-3 text-xl leading-snug font-semibold tracking-tight">
                  Most teams begin with one service and add more as the need
                  shows up.
                </p>
              </div>
              <Link
                href={siteConfig.links.calendar}
                className={ctaVariants({ variant: "cta", size: "md" })}
              >
                Book a call <span aria-hidden="true">&rarr;</span>
              </Link>
            </StickerCard>
          </Reveal>
        </div>
      </section>

      <section className="bg-leaf border-ink border-y-[1.5px]">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="font-label text-xs tracking-widest uppercase">
              Playwright or Selenium?
            </p>
            <SectionHeading className="mt-4">
              Choose the tool that fits your *stack*, not the trend
            </SectionHeading>
            <p className="mt-5 text-lg">
              Playwright is our default for new suites. If your team already
              runs Selenium, we extend it instead of rewriting it for its own
              sake.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <FrameworkPicker />
          </Reveal>
        </div>
      </section>

      <DeepBand
        eyebrow="How we work"
        title="How we work inside *your sprint*"
        items={approach}
      />

      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 lg:px-8">
        <Reveal>
          <StickerCard
            tone="olive"
            interactive={false}
            className="grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14"
          >
            <CoverageRing value={95} />
            <div>
              <p className="font-label text-xs tracking-widest uppercase">
                Proof
              </p>
              <h3 className="mt-3 text-3xl leading-[1.1] font-medium tracking-[-0.025em] text-balance sm:text-4xl">
                Release coverage achieved on a real engagement.
              </h3>
              <p className="mt-4 max-w-xl text-lg">
                Coverage is a number you can read, not a feeling. See how an
                embedded engagement got there in{" "}
                <Link
                  href="/blog/how-we-reached-95-percent-coverage"
                  className="decoration-deep underline decoration-2 underline-offset-4"
                >
                  the 95 percent coverage case study
                </Link>
                .
              </p>
            </div>
          </StickerCard>
        </Reveal>

        <Reveal className="mt-8">
          <StickerCard
            tone="surface"
            interactive={false}
            className="p-7 sm:p-10"
          >
            <p className="font-label text-deep text-xs tracking-widest uppercase">
              Mobile app testing
            </p>
            <h3 className="mt-3 mb-8 text-3xl leading-[1.1] font-medium tracking-[-0.025em] sm:text-4xl">
              Pick a device. See the checks.
            </h3>
            <DevicePicker />
          </StickerCard>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-label text-deep text-xs tracking-widest uppercase">
            Your stack
          </p>
          <SectionHeading className="mt-4">
            Built to test the stack you *already run*
          </SectionHeading>
          <p className="mt-5 text-lg">
            Your QA engineer adapts to the stack you already have, not the other
            way around. A sample of what we test against regularly:
          </p>
        </Reveal>

        <dl className="mt-12 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map(({ label, tools }, index) => (
            <Reveal
              key={label}
              className="border-ink border-t-[1.5px] py-5"
              delay={index * 80}
            >
              <dt className="font-label text-deep text-xs tracking-widest uppercase">
                {label}
              </dt>
              <dd className="mt-2 text-[17px] leading-snug">{tools}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">
          Frequently asked *questions*
        </SectionHeading>

        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaSection
        tone="leaf"
        title="Ready to see it inside *your own sprint?*"
        description="Tell us what you are building, how often you ship, and where testing is falling through the cracks. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
