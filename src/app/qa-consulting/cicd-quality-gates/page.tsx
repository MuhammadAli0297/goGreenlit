import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch, GitPullRequest, Rocket, Server } from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "CI/CD Quality Gates";
const description =
  "CI/CD quality gates wired into GitHub Actions, Jenkins, or GitLab CI so a build that fails quality standards gets blocked before it ships.";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
  },
};

const gateTypes = [
  {
    icon: GitPullRequest,
    title: "Pre-merge gates",
    description:
      "Unit tests, linting, and focused API tests, fast enough to run in under ten minutes so they don't block a developer's flow.",
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
      "Branch protection rules tied to required status checks, so a pull request can't merge until every gate passes.",
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
      "What a gate actually checks, and what counts as a pass, agreed on before it's wired into the pipeline.",
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
      "Fast, focused checks: unit tests, linting, and API tests scoped to under ten minutes. Full regression and end-to-end suites run post-merge so they don't block a developer's flow.",
  },
  {
    question: "How do you stop flaky tests from blocking every merge?",
    answer:
      "Fix the root cause where possible, otherwise a limited retry with alerting, or quarantine the test until it's fixed, rather than letting it erode trust in the whole gate.",
  },
  {
    question:
      "What's the difference between a quality gate and a deployment gate?",
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

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/cicd-quality-gates" },
]);

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

      <PageHero
        badge="Automated checks that actually block a bad merge"
        description="Most pipelines run tests. Fewer of them actually stop a bad build from shipping. GoGreenlit designs and wires up quality gates covering test results, security scans, coverage thresholds, and code standards, directly into the CI/CD platform you already run."
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
              href="#gate-types"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See gate types
            </Link>
          </>
        }
      >
        CI/CD quality gates that stop bugs{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          before they ship
        </span>
      </PageHero>

      <section
        id="gate-types"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Gate types and where they belong in the pipeline
          </h2>
          <p className="text-muted-foreground mt-4">
            Not every check belongs at the same stage. Fast checks block a
            merge, slower ones block a deploy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gateTypes.map((gate, index) => (
            <ServiceCard key={gate.title} {...gate} index={index} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Implementing gates on the platform you already run
          </h2>
          <p className="text-muted-foreground mt-4">
            No pipeline migration required, gates get wired into what your team
            already uses.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {platforms.map(({ label, detail }, index) => (
            <Reveal
              key={label}
              className="border-border/60 rounded-lg border p-5"
              delay={index * 80}
            >
              <h3 className="font-semibold">{label}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        id="policy"
        className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]"
      >
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Defining go or no-go policies the whole team agrees with
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
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

      <RelatedLinks
        groups={getRelatedLinkGroups("/qa-consulting/cicd-quality-gates")}
      />

      <CtaSection
        title="Ready for gates that actually stop a bad release?"
        description="Tell us which platform you're on and what's slipping through today. We'll scope a quality gates engagement in one call."
      />
    </>
  );
}
