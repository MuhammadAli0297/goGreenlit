import type { Metadata } from "next";
import Link from "next/link";
import {
  Radar,
  ShieldCheck,
  Target,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { CompareSwitch } from "@/components/marketing/compare-switch";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCarousel } from "@/components/marketing/service-carousel";
import { CheckGrid } from "@/components/marketing/check-grid";
import { MaturityCheck } from "@/components/marketing/maturity-check";
import { StatBand } from "@/components/marketing/stat-band";
import { QualityGateDemo } from "@/components/marketing/quality-gate-demo";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

const title = "QA Consulting";
const description =
  "Software QA consulting from two Chicago QA engineers: audits, test strategy, release readiness, and embedded QA your team keeps owning after we leave.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting`,
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

const usualWay = {
  label: "The usual way",
  summary:
    "Staff augmentation adds a person to your existing testing queue and inherits whatever process is already there, gaps included. The value ends when the contract does.",
  status: "Defects escape",
  tone: "bug",
  rows: [
    { label: "Testing happens", value: "The night before release" },
    { label: "Who owns quality", value: "Whoever has time" },
    { label: "A bug is found", value: "By a customer, then a scramble" },
    { label: "Release decision", value: "A gut feeling" },
  ],
} as const;

const ourWay = {
  label: "The GoGreenlit way",
  summary:
    "Consulting assesses where defects are actually escaping to production, redesigns the process, then embeds it inside your sprint. Your team owns the process after the engagement ends.",
  status: "Defects caught",
  tone: "pass",
  rows: [
    { label: "Testing happens", value: "Inside every sprint" },
    { label: "Who owns quality", value: "A named, embedded QA lead" },
    { label: "A bug is found", value: "Before launch, with repro steps" },
    { label: "Release decision", value: "A gate with evidence" },
  ],
} as const;

const auditAreas = [
  { name: "Test strategy" },
  { name: "Automation in CI" },
  { name: "Release sign-off", gap: true },
  { name: "Bug triage" },
  { name: "Coverage visibility", gap: true },
];

const checkQuestions = [
  {
    text: "We have a written test strategy",
    advice: {
      title: "Start with a strategy.",
      body: "A short test strategy decides what matters, so every later choice is easier.",
      cta: "Test strategy consulting",
      href: "/qa-consulting/test-strategy-consulting",
    },
  },
  {
    text: "Automated tests run on every merge",
    advice: {
      title: "Put tests in the pipeline.",
      body: "Automated checks on every merge catch problems while they are cheap to fix.",
      cta: "CI/CD quality gates",
      href: "/qa-consulting/cicd-quality-gates",
    },
  },
  {
    text: "Every release has a clear go or no-go",
    advice: {
      title: "Define the release call.",
      body: "A clear go or no-go replaces the gut feeling at the finish line.",
      cta: "Release readiness",
      href: "/qa-consulting/release-readiness",
    },
  },
  {
    text: "Bugs are triaged by severity, not volume",
    advice: {
      title: "Fix the bug process.",
      body: "Severity-based triage keeps the team on what actually hurts users.",
      cta: "QA process design",
      href: "/qa-consulting/qa-process-design",
    },
  },
  {
    text: "QA joins planning, not just testing",
    advice: {
      title: "Bring QA to planning.",
      body: "Earlier involvement prevents the bugs that testing can only catch late.",
      cta: "Embedded QA team",
      href: "/qa-consulting/embedded-qa-team",
    },
  },
];

const checkAllGood = {
  title: "You are in strong shape.",
  body: "A QA audit can confirm it and point at the last few gaps.",
  cta: "QA audit and assessment",
  href: "/qa-consulting/qa-audit-assessment",
};

const phases = [
  {
    title: "Assess",
    description:
      "A structured audit of your current QA maturity: where defects escape, what is tested versus assumed, and how release decisions actually get made today.",
  },
  {
    title: "Design",
    description:
      "A test strategy and process built for your stack and release cadence, not a generic maturity model pulled off a shelf.",
  },
  {
    title: "Embed",
    description:
      "The new process runs inside your actual sprint alongside your team, with knowledge transfer built in so it survives after the engagement ends.",
  },
];

const whoNeedsIt = [
  "Engineering teams scaling past 10 to 15 engineers, where tribal QA knowledge stops working",
  "Teams recovering from a production incident that never should have shipped",
  "Startups preparing for a fundraise or enterprise deal that requires real QA process, not just tests",
  "Teams that have hired QA engineers but still do not have a repeatable strategy",
  "Leadership that wants an outside audit of QA maturity before deciding what to build in-house",
];

const services = [
  {
    icon: Radar,
    title: "QA Audit and Assessment",
    description:
      "An outside look at your current QA maturity: what is tested, what is assumed, and where the actual risk is hiding.",
    href: "/qa-consulting/qa-audit-assessment",
  },
  {
    icon: Target,
    title: "Test Strategy Consulting",
    description:
      "A risk-based test strategy sized to your actual stack and release cadence, replacing whatever ad hoc testing decisions are happening today.",
    href: "/qa-consulting/test-strategy-consulting",
  },
  {
    icon: Workflow,
    title: "QA Process Design",
    description:
      "Defect triage, sprint-level test planning, and release sign-off criteria, designed around how your team already works instead of a generic template.",
    href: "/qa-consulting/qa-process-design",
  },
  {
    icon: Webhook,
    title: "CI/CD Quality Gates",
    description:
      "Automated checks wired into your pipeline so a build that fails quality standards gets blocked before it reaches a release branch.",
    href: "/qa-consulting/cicd-quality-gates",
  },
  {
    icon: ShieldCheck,
    title: "Release Readiness",
    description:
      "A structured go or no-go review before a release ships, so sign-off reflects real coverage instead of a gut check.",
    href: "/qa-consulting/release-readiness",
  },
  {
    icon: Users,
    title: "Embedded QA Team",
    description:
      "A QA engineer embedded directly in your sprint to run the new process day to day, not just hand you a document and leave.",
    href: "/qa-consulting/embedded-qa-team",
  },
];

const faqs = [
  {
    question: "What does a QA consultant actually do?",
    answer:
      "A QA consultant looks at how defects are reaching production today, then designs and helps implement the process that stops it: sprint-level test planning, a test strategy, CI/CD quality gates, and release sign-off criteria.",
  },
  {
    question: "How is this different from hiring a QA engineer?",
    answer:
      "A QA engineer executes tests. A QA consultant fixes the process those tests run inside of, so the engineer you already have, or hire next, has something repeatable to work from instead of building it themselves from scratch.",
  },
  {
    question: "When should a startup bring in a QA consultant?",
    answer:
      "Most engagements start after a production incident that should not have shipped, ahead of a fundraise or enterprise deal that requires real QA process, or once engineering has scaled past the point where tribal knowledge is enough.",
  },
  {
    question: "What happens during the assessment phase?",
    answer:
      "A structured review of your current testing coverage, defect history, and release process, benchmarked against your actual stack and release cadence, not a generic maturity checklist.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. Engagements scale down to a single audit and strategy document for an early-stage team, or up to a fully embedded QA engineer for a team further along.",
  },
  {
    question: "How long does an engagement typically run?",
    answer:
      "The assessment and design phases usually take two to four weeks. The embedded phase runs as long as it takes your team to own the new process, most engagements wrap within a quarter.",
  },
  {
    question: "Can this help us introduce test automation for the first time?",
    answer:
      "Yes, automation strategy is part of the process design phase: which layer of the testing pyramid to automate first, and which framework fits the stack you already run.",
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
  { name: title, href: "/qa-consulting" },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default function QaConsultingPage() {
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
        badge="Strategy and process, not extra hands"
        description="Bringing in another tester treats the symptom. GoGreenlit’s QA consulting starts with an assessment of how defects are actually reaching production, then designs and embeds the fix directly into your sprint, with your team owning it long after the engagement ends."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#model"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See the consulting model
            </Link>
          </>
        }
      >
        QA consulting built around how your team actually{" "}
        <em>ships software</em>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="How a quality gate works"
          title="The audit finds the gaps, the gate *holds the release*"
          description="An example engagement in miniature. The audit reads each area of a QA setup, and what it finds decides whether a release is allowed to ship."
        />
        <Reveal className="mt-12">
          <StickerCard
            tone="surface"
            interactive={false}
            className="p-6 sm:p-10"
          >
            <QualityGateDemo areas={auditAreas} />
          </StickerCard>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          align="center"
          eyebrow="Two ways to run QA"
          title="Consulting is not *extra headcount*"
          description="Staff augmentation adds a person to your existing process. Consulting changes the process itself, then hands you the ability to run it without us."
        />

        <CompareSwitch usual={usualWay} ours={ourWay} />
      </section>

      <section id="check" className="on-dark bg-deep text-navajo">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionIntro
            tone="dark"
            eyebrow="The one-minute check"
            title="Where does your QA *really* stand?"
            description="Tick what is true today. No email required. The check points to the best place to start."
          />
          <div className="mt-12">
            <MaturityCheck questions={checkQuestions} allGood={checkAllGood} />
          </div>
        </div>
      </section>

      <section id="model" className="bg-olive border-ink border-y-[1.5px]">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              Assess, design, embed
            </p>
            <SectionHeading className="mt-4">
              The GoGreenlit *consulting model*
            </SectionHeading>
            <p className="mx-auto mt-5 max-w-2xl text-lg">
              Three phases, each one handed off deliberately so the next phase
              has something real to build on.
            </p>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="bg-navajo border-ink border-y-[1.5px]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Signs you need this"
              title="Who typically brings in a *QA consultant*"
            />
            <CheckGrid items={whoNeedsIt} columns={1} className="mt-10" />
          </div>
          <StatBand compact />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Six ways in"
          title="QA consulting *services*"
          description="Each engagement starts with the audit and scopes down from there, not a fixed package."
        />

        <Reveal className="mt-12">
          <ServiceCarousel services={services} label="QA consulting services" />
        </Reveal>
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
        tone="olive"
        title="Ready for an outside *look at your QA process?*"
        description="Tell us where a defect last slipped through, and what your release process actually looks like today. We will scope an assessment in one call."
      />
    </>
  );
}
