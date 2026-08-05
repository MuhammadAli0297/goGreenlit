import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CloudUpload,
  GitCommit,
  GitPullRequest,
  Layers,
  Scissors,
  ShieldCheck,
  Target,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "Regression Testing Services";
const description =
  "Automated regression testing services that stay fast and trustworthy: risk-prioritized suites, CI/CD gates, and quarterly pruning, not endless bloat.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/regression-testing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/regression-testing`,
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

const rootCauses = [
  "Fragile tests built on unstable selectors or tight UI dependencies.",
  "No ownership, so a failing test becomes an orphaned test.",
  "Growth without pruning, adding noise faster than it adds signal.",
  "No execution time target, so the suite quietly gets slower every sprint.",
];

const principles = [
  {
    icon: Layers,
    title: "The right level of abstraction",
    description:
      "Page objects and reusable helpers, so a UI change means updating one place, not every test that touches it.",
  },
  {
    icon: Target,
    title: "Prioritized by risk",
    description:
      "Critical flows and historically buggy areas get covered first, not whatever happens to be easiest to automate.",
  },
  {
    icon: GitCommit,
    title: "Maintained alongside code",
    description:
      "Test updates are part of the pull request that changes the behavior, not a backlog item for later.",
  },
  {
    icon: Scissors,
    title: "Pruned on a schedule",
    description:
      "A quarterly pass removes coverage for features that no longer exist, so the suite stays something people trust.",
  },
];

const pipelineStages = [
  {
    icon: GitPullRequest,
    title: "Pre-merge",
    description:
      "20 to 40 focused tests on the paths most likely to break, running in under 10 minutes.",
  },
  {
    icon: CloudUpload,
    title: "Staging",
    description:
      "The full regression suite runs after every deploy, catching what a focused pre-merge pass isn't scoped to find.",
  },
  {
    icon: ShieldCheck,
    title: "Release",
    description:
      "The complete suite plus feature-specific smoke tests, the last check before anything ships.",
  },
];

const faqs = [
  {
    question: "How often should regression tests run?",
    answer:
      "A focused subset runs on every pull request. The full suite runs on staging deployments and before a production release. Smoke tests against production can run on a schedule independent of any of that.",
  },
  {
    question: "What percentage of our tests should be automated?",
    answer:
      "There's no universal target, but for a mature product, 60 to 70% automated regression paired with 30 to 40% structured manual testing is a reasonable range. The right split depends on how much of your product needs human judgment, not a fixed rule.",
  },
  {
    question: "How long should a regression suite take to run?",
    answer:
      "Under 15 minutes for a pull request gate, under 30 minutes for a full staging suite. Past that, teams stop running it as often as they should, which defeats the point.",
  },
  {
    question: "What happens when a regression test breaks?",
    answer:
      "It gets looked at, whether it turns out to be a real regression or a false positive. A broken test in CI blocks the merge either way, and it shouldn't get ignored or skipped to unblock a release.",
  },
  {
    question: "How do you decide what goes into the regression suite?",
    answer:
      "Critical user flows, historically buggy areas, external service integrations, and high-churn code. We don't aim for complete application coverage, that's what makes a suite unmaintainable within a year.",
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

export default function RegressionTestingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="Risk-prioritized suites, CI/CD gates, and pruning on a schedule"
        description="Most regression suites work well at first and slowly stop working. Not from one bad decision, but from fragile tests, no ownership, and growth without pruning, until nobody trusts a red build anymore. GoGreenlit builds regression suites that stay fast and stay trusted, as your codebase and your release cycle keep growing."
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
              href="#principles"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See how we build suites
            </Link>
          </>
        }
      >
        Regression testing services that scale with{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          your release cycle
        </span>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Why most regression suites stop working over time
          </h2>
          <p className="text-muted-foreground mt-4">
            The suite that protected you last year is often the same one slowing
            you down today. These are the reasons why.
          </p>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {rootCauses.map((cause) => (
              <li key={cause} className="flex gap-3">
                <AlertTriangle className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{cause}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section
        id="principles"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Building a suite that survives codebase growth
          </h2>
          <p className="text-muted-foreground mt-4">
            A suite of 50 well-maintained tests that runs in 8 minutes with a 0%
            false-positive rate is worth more than a suite of 500 tests nobody
            trusts. These are the structural decisions that get you there.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <ServiceCard
              key={principle.title}
              {...principle}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Running regression in your CI/CD pipeline
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {pipelineStages.map(
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

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          The GoGreenlit 95% coverage standard
        </h2>
        <div className="border-border/60 mt-8 rounded-2xl border p-8">
          <p className="font-serif text-5xl font-semibold text-[#354639] dark:text-[#f9f4eb]">
            95%
          </p>
          <p className="text-muted-foreground mt-4">
            95% of the defined test cases for a given release have been executed
            and have either passed or have a known, documented outcome. The
            remaining 5% is not a gap we hide, it comes with a documented
            reason: a deferred issue, an unstable environment, or an edge case
            that genuinely does not matter for that release.
          </p>
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
        title="Ready for a regression suite you can actually trust?"
        description="Tell us what's slowing your suite down, or where you're starting from scratch. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
