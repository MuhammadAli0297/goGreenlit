import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Rocket,
  Server,
  ShieldAlert,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { MergeGateDemo } from "@/components/marketing/merge-gate-demo";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "CI/CD Quality Gates Consulting";
// Short label for the visible and JSON-LD breadcrumb, kept apart from the
// longer SEO title above.
const breadcrumbLabel = "CI/CD Quality Gates";
const description =
  "CI/CD quality gates consulting: we wire checks into GitHub Actions, Jenkins, or GitLab CI so a build that fails your quality bar is blocked before it ships.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/cicd-quality-gates",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/cicd-quality-gates`,
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

const gateTypes = [
  {
    icon: GitPullRequest,
    title: "Pre-merge gates",
    description:
      "Unit tests, linting, and focused API tests, fast enough to run in under ten minutes so they do not block a developer's flow.",
  },
  {
    icon: GitBranch,
    title: "Post-merge gates",
    description:
      "Integration tests, end-to-end smoke tests, and performance checks, once code is in the main branch.",
  },
  {
    icon: Server,
    title: "Pre-deploy gates",
    description:
      "A fuller regression run, security scans, and a smoke test pass against staging, before anything reaches production.",
  },
  {
    icon: Rocket,
    title: "Pre-release gates",
    description:
      "Versioned build validation for products that ship discrete releases rather than continuous deployment.",
  },
];

const platforms = [
  {
    label: "GitHub Actions",
    detail:
      "Branch protection rules tied to required status checks, so a pull request cannot merge until every gate passes.",
  },
  {
    label: "Jenkins",
    detail:
      "Shared pipeline libraries with gate logic defined once in a Jenkinsfile and reused across every job.",
  },
  {
    label: "GitLab CI",
    detail:
      "Protected branches paired with merge request approval rules enforcing the same gates before a merge is allowed.",
  },
];

const phases = [
  {
    title: "Define pass criteria",
    description:
      "What a gate actually checks, and what counts as a pass, agreed on before it is wired into the pipeline.",
  },
  {
    title: "Set thresholds and override authority",
    description:
      "Coverage percentages, severity thresholds, and exactly who can override a failed gate, and when.",
  },
  {
    title: "Wire in and monitor",
    description:
      "Gates go live in the pipeline, with a review point to tune thresholds once real data comes in.",
  },
];

const deliverables = [
  {
    icon: FileCode2,
    label: "Gate definitions in your repo",
    description:
      "Configuration lives in your actual CI config, GitHub Actions YAML, a Jenkinsfile, or GitLab CI rules, version-controlled and reviewable like any other code change, not a slide deck nobody opens again.",
  },
  {
    icon: ShieldAlert,
    label: "A documented override policy",
    description:
      "A written escalation path for the rare release that needs a gate bypassed: who can authorize it, and what has to happen before the next one ships.",
  },
  {
    icon: BarChart3,
    label: "Pass and fail trend visibility",
    description:
      "A dashboard showing which gates fail most often and why, so a chronically flaky check gets fixed instead of quietly muted.",
  },
  {
    icon: ClipboardList,
    label: "A runbook for a blocked release",
    description:
      "A written procedure for what happens when a gate actually blocks a merge or a deploy: who gets paged, what gets checked first, how a false positive gets cleared.",
  },
];

const faqs = [
  {
    question: "What is a quality gate in a CI/CD pipeline?",
    answer:
      "An automated check that blocks a build or a merge from progressing until it passes, a test suite, a security scan, a coverage threshold, or a lint rule.",
  },
  {
    question: "How do quality gates work in GitHub Actions specifically?",
    answer:
      "Through branch protection rules that require specific status checks to pass before a pull request can merge, wired to whatever your CI job reports back.",
  },
  {
    question: "What tests should actually run before a merge?",
    answer:
      "Fast, focused checks: unit tests, linting, and API tests scoped to under ten minutes. Full regression and end-to-end suites run post-merge so they do not block a developer's flow.",
  },
  {
    question: "How do you stop flaky tests from blocking every merge?",
    answer:
      "Fix the root cause where possible, otherwise a limited retry with alerting, or quarantine the test until it is fixed, rather than letting it erode trust in the whole gate.",
  },
  {
    question:
      "What is the difference between a quality gate and a deployment gate?",
    answer:
      "A quality gate runs before code merges. A deployment gate runs before that code reaches an environment, staging or production. Most pipelines need both.",
  },
  {
    question:
      "Can you wire gates into a pipeline we already have, or does it need to be rebuilt?",
    answer:
      "Wired into what you already have. Most engagements add gates to an existing GitHub Actions, Jenkins, or GitLab CI pipeline rather than replacing it.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: breadcrumbLabel, href: "/qa-consulting/cicd-quality-gates" },
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

export default function CicdQualityGatesPage() {
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
        tone="olive"
        badge="Checks that actually block a bad merge"
        description="Most pipelines run tests. Fewer of them actually stop a bad build from shipping. GoGreenlit designs and wires up quality gates covering test results, security scans, coverage thresholds, and code standards, directly into the CI/CD platform you already run."
        aside={<MergeGateDemo className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#gate-types"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See gate types
            </Link>
          </>
        }
      >
        CI/CD quality gates that stop bugs <em>before they ship</em>
      </PageHero>

      <section
        id="gate-types"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Gate types"
          title="Gate types and where they belong in the *pipeline*"
          description="Not every check belongs at the same stage. Fast checks block a merge, slower ones block a deploy."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gateTypes.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Your platform"
          title="Implementing gates on the platform you *already run*"
          description="No pipeline migration required, gates get wired into what your team already uses."
        />

        <dl className="mt-12 grid gap-x-8 gap-y-2 sm:grid-cols-3">
          {platforms.map(({ label, detail }, index) => (
            <Reveal
              key={label}
              className="border-ink border-t-[1.5px] py-5"
              delay={index * 80}
            >
              <dt className="font-label text-deep text-xs tracking-widest uppercase">
                {label}
              </dt>
              <dd className="mt-2 text-[17px] leading-snug">{detail}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section
        id="policy"
        className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]"
      >
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              Policy
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              Defining go or no-go policies the whole team <em>agrees with</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <DeepBand
        eyebrow="Deliverables"
        title="What you actually *get*"
        items={deliverables.map(({ icon, label, description }) => ({
          icon,
          title: label,
          description,
        }))}
      />

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
        groups={getRelatedLinkGroups("/qa-consulting/cicd-quality-gates")}
      />

      <CtaSection
        tone="olive"
        title="Ready for gates that actually *stop a bad release?*"
        description="Tell us which platform you are on and what is slipping through today. We will scope a quality gates engagement in one call."
      />
    </>
  );
}
