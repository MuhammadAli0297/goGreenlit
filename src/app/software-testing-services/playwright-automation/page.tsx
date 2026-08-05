import type { Metadata } from "next";
import Link from "next/link";
import {
  AppWindow,
  ArrowRightLeft,
  Camera,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Globe,
  ListChecks,
  PlayCircle,
  Puzzle,
  Rocket,
  Timer,
  Waypoints,
  Wrench,
  Zap,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "Playwright Automation Services";
const description =
  "Playwright test automation services from GoGreenlit: TypeScript suites, Page Object Model, CI/CD integration, and phased migrations off Selenium or Cypress.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/playwright-automation",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/playwright-automation`,
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

const advantages = [
  {
    icon: Globe,
    title: "True cross-browser coverage",
    description:
      "One suite runs against Chromium, Firefox, and WebKit, so a Safari-only bug gets caught before your users find it, not after.",
  },
  {
    icon: Zap,
    title: "Parallel execution by default",
    description:
      "Tests shard across workers out of the box, so a full suite finishes in minutes instead of blocking your pipeline for an hour.",
  },
  {
    icon: Timer,
    title: "Auto-wait built in",
    description:
      "Playwright waits for an element to actually be ready before acting on it, which removes most of the arbitrary sleep calls that make older suites flaky.",
  },
  {
    icon: Waypoints,
    title: "Network interception",
    description:
      "Requests can be mocked, modified, or inspected directly, so a test can cover an edge case your backend doesn't need to actually produce.",
  },
  {
    icon: AppWindow,
    title: "Multi-tab and multi-frame support",
    description:
      "Real coverage for OAuth redirects, payment popups, and embedded iframes, the flows that break most other automation tools.",
  },
];

const whatWeBuild = [
  {
    icon: FileCode2,
    title: "TypeScript suites, Page Object Model",
    description:
      "Typed, structured test code that reads like the rest of your codebase, not a separate scripting layer nobody else on the team can touch.",
  },
  {
    icon: Puzzle,
    title: "Fixture-based test setup",
    description:
      "Reusable fixtures for auth, seed data, and test users, so every new test starts from a consistent state instead of duplicating setup logic.",
  },
  {
    icon: GitBranch,
    title: "CI/CD integration",
    description:
      "Wired into GitHub Actions, Jenkins, GitLab CI, or CircleCI, whichever your team already runs, not a separate pipeline to maintain.",
  },
  {
    icon: Wrench,
    title: "Flakiness management",
    description:
      "Retry logic, trace capture, and root-cause triage on any test that fails intermittently, so a flaky test gets fixed instead of muted.",
  },
];

const migration = [
  {
    icon: ArrowRightLeft,
    title: "Phased, by test area",
    description:
      "We migrate one area of coverage at a time, running old and new suites side by side, instead of a single high-risk rewrite.",
  },
  {
    icon: Rocket,
    title: "New projects move fast",
    description:
      "A project with no existing suite gets a working Playwright foundation, config, fixtures, and CI wiring, inside two weeks.",
  },
  {
    icon: ListChecks,
    title: "Existing suites take longer",
    description:
      "A typical migration covering 200 to 500 existing Selenium or Cypress tests runs three to six months, scoped around your release schedule.",
  },
];

const pipeline = [
  {
    icon: GitPullRequest,
    title: "Pull request gates",
    description:
      "A failing test blocks the merge itself, not a release two weeks later.",
  },
  {
    icon: PlayCircle,
    title: "Parallel runs in CI",
    description:
      "The same sharding that speeds up local runs carries over to your pipeline, so coverage doesn't cost you build time.",
  },
  {
    icon: Camera,
    title: "Artifact capture",
    description:
      "Screenshots and trace files on every failure, so debugging a CI run doesn't mean reproducing it locally first.",
  },
  {
    icon: ListChecks,
    title: "Scheduled regression runs",
    description:
      "A full suite run on a schedule, independent of deploys, to catch drift that only shows up over time.",
  },
];

const faqs = [
  {
    question: "Is Playwright better than Cypress?",
    answer:
      "For most teams building today, yes. Playwright covers every major browser, including Safari through WebKit, without a plugin. Cypress still has an edge in its debugging experience and plugin ecosystem, which matters if your team already has deep Cypress tooling in place.",
  },
  {
    question: "How long does it take to set up Playwright for a new project?",
    answer:
      "A basic setup takes one to two days. A production-quality suite with fixtures, page objects, and CI wiring takes two to four weeks, depending on how much of your app there is to cover.",
  },
  {
    question: "Can Playwright test our mobile app?",
    answer:
      "It can emulate mobile browsers for responsive web testing, but it can't drive a native iOS or Android app. For that, we bring in Appium as part of our mobile testing engagements.",
  },
  {
    question: "What browsers does Playwright actually support?",
    answer:
      "Chromium, which covers Chrome and Edge, Firefox, and WebKit, which covers Safari. True cross-browser coverage from a single suite, no separate tooling per browser.",
  },
  {
    question: "Do we need to use TypeScript?",
    answer:
      "No, JavaScript works fine. We default to TypeScript because the type safety catches selector and fixture mistakes before a test even runs, not because Playwright requires it.",
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

export default function PlaywrightAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="TypeScript suites, CI/CD wiring, and phased Selenium or Cypress migrations"
        description="Playwright is the default choice for new end-to-end suites for good reason: real cross-browser coverage, parallel execution out of the box, and less flake than the tools it replaced. GoGreenlit builds and maintains Playwright suites in TypeScript, checked into your repository and wired into CI, so a failing test blocks a bad merge instead of getting discovered after a release."
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
              href="#capabilities"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See what we build
            </Link>
          </>
        }
      >
        Playwright automation services that live in{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          your codebase
        </span>
      </PageHero>

      <section
        id="capabilities"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Why Playwright is the default now
          </h2>
          <p className="text-muted-foreground mt-4">
            Most new end-to-end suites start on Playwright instead of Selenium
            or Cypress. These are the reasons why.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <ServiceCard
              key={advantage.title}
              {...advantage}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What we build with Playwright
          </h2>
          <p className="text-muted-foreground mt-4">
            A suite that holds up as your app grows, not a pile of scripts that
            gets slower and flakier every sprint.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeBuild.map(
            ({ icon: Icon, title: itemTitle, description }, index) => (
              <Reveal
                key={itemTitle}
                className="border-border/60 rounded-lg border p-5"
                delay={index * 80}
              >
                <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-3 font-semibold">{itemTitle}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {description}
                </p>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Migrating from Selenium or Cypress
            </h2>
            <p className="text-foreground/80 mt-4">
              We do not recommend a rewrite. A phased migration keeps your
              existing coverage in place while Playwright takes over one area at
              a time.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {migration.map(
              ({ icon: Icon, title: itemTitle, description }, index) => (
                <Reveal
                  key={itemTitle}
                  className="flex flex-col items-center gap-3 text-center"
                  delay={index * 80}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#ee9e58] text-[#354639]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-foreground font-semibold">{itemTitle}</h3>
                  <p className="text-foreground/80 text-sm">{description}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Playwright in your CI/CD pipeline
          </h2>
          <p className="text-muted-foreground mt-4">
            A suite that only runs locally does not protect a release. This is
            where it earns its keep.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <CtaSection
        title="Ready for a Playwright suite that lives in your repo?"
        description="Tell us about your app and whatever automation you already have, or don't. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
