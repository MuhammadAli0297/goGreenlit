import type { Metadata } from "next";
import Link from "next/link";
import {
  CloudUpload,
  GitCommit,
  GitPullRequest,
  Layers,
  Scissors,
  ShieldCheck,
  Target,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CoverageRing } from "@/components/marketing/coverage-ring";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "Automated Regression Testing Services";
// Short label for the visible and JSON-LD breadcrumb, kept apart from the
// longer SEO title above.
const breadcrumbLabel = "Regression Testing Services";
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
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
      "The full regression suite runs after every deploy, catching what a focused pre-merge pass is not scoped to find.",
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
      "There is no universal target, but for a mature product, 60 to 70% automated regression paired with 30 to 40% structured manual testing is a reasonable range. The right split depends on how much of your product needs human judgment, not a fixed rule.",
  },
  {
    question: "How long should a regression suite take to run?",
    answer:
      "Under 15 minutes for a pull request gate, under 30 minutes for a full staging suite. Past that, teams stop running it as often as they should, which defeats the point.",
  },
  {
    question: "What happens when a regression test breaks?",
    answer:
      "It gets looked at, whether it turns out to be a real regression or a false positive. A broken test in CI blocks the merge either way, and it should not get ignored or skipped to unblock a release.",
  },
  {
    question: "How do you decide what goes into the regression suite?",
    answer:
      "Critical user flows, historically buggy areas, external service integrations, and high-churn code. We do not aim for complete application coverage, that is what makes a suite unmaintainable within a year.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  {
    name: breadcrumbLabel,
    href: "/software-testing-services/regression-testing",
  },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        tone="leaf"
        badge="Risk-prioritized suites and CI gates"
        description="Most regression suites work well at first and slowly stop working. Not from one bad decision, but from fragile tests, no ownership, and growth without pruning, until nobody trusts a red build anymore. GoGreenlit builds regression suites that stay fast and stay trusted, as your codebase and your release cycle keep growing."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#principles"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See how we build suites
            </Link>
          </>
        }
      >
        Regression testing services that scale with <em>your release cycle</em>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Why suites decay"
          title="Why most regression suites *stop working* over time"
          description="The suite that protected you last year is often the same one slowing you down today. These are the reasons why."
        />
        <CheckGrid items={rootCauses} tone="bug" className="mt-12" />
      </section>

      <section
        id="principles"
        className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Principles"
          title="Building a suite that *survives* codebase growth"
          description="A suite of 50 well-maintained tests that runs in 8 minutes with a 0% false-positive rate is worth more than a suite of 500 tests nobody trusts. These are the structural decisions that get you there."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, index) => (
            <ServiceCard
              key={item.title}
              {...item}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <DeepBand
        eyebrow="CI/CD"
        title="Running regression in your *CI/CD* pipeline"
        items={pipelineStages}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <StickerCard
            tone="olive"
            interactive={false}
            className="grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14"
          >
            <CoverageRing value={95} />
            <div>
              <p className="font-label text-xs tracking-widest uppercase">
                Our standard
              </p>
              <h2 className="mt-3 text-3xl leading-[1.1] font-medium tracking-[-0.025em] text-balance sm:text-4xl">
                The GoGreenlit 95% coverage standard
              </h2>
              <p className="mt-4 max-w-xl text-lg">
                95% of the defined test cases for a given release have been
                executed and have either passed or have a known, documented
                outcome. The remaining 5% is not a gap we hide, it comes with a
                documented reason: a deferred issue, an unstable environment, or
                an edge case that genuinely does not matter for that release.
              </p>
            </div>
          </StickerCard>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          align="center"
          eyebrow="Questions"
          title="Frequently asked *questions*"
        />
        <div className="mt-12">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <RelatedLinks
        groups={getRelatedLinkGroups(
          "/software-testing-services/regression-testing",
        )}
      />

      <CtaSection
        tone="leaf"
        title="Ready for a regression suite you can actually *trust?*"
        description="Tell us what is slowing your suite down, or where you are starting from scratch. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
