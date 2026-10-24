import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Radar,
  ShieldCheck,
  Target,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { CompareColumns } from "@/components/marketing/compare-columns";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatBand } from "@/components/marketing/stat-band";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

const title = "QA Consulting";
const description =
  "QA consulting for scaling engineering teams: process audits, test strategy, CI/CD quality gates, and embedded QA leadership, not just extra headcount.";

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

const staffAugmentation = [
  "Adds a person to your existing testing queue",
  "Inherits whatever process already exists, gaps included",
  "Value ends when the contract does",
];

const consultingModel = [
  "Assesses where defects are actually escaping to production",
  "Redesigns the process, then embeds it inside your sprint",
  "Your team owns the process after the engagement ends",
];

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
  },
  {
    icon: Target,
    title: "Test Strategy Consulting",
    description:
      "A risk-based test strategy sized to your actual stack and release cadence, replacing whatever ad hoc testing decisions are happening today.",
  },
  {
    icon: Workflow,
    title: "QA Process Design",
    description:
      "Defect triage, sprint-level test planning, and release sign-off criteria, designed around how your team already works instead of a generic template.",
  },
  {
    icon: Webhook,
    title: "CI/CD Quality Gates",
    description:
      "Automated checks wired into your pipeline so a build that fails quality standards gets blocked before it reaches a release branch.",
  },
  {
    icon: ShieldCheck,
    title: "Release Readiness",
    description:
      "A structured go or no-go review before a release ships, so sign-off reflects real coverage instead of a gut check.",
  },
  {
    icon: Users,
    title: "Embedded QA Team",
    description:
      "A QA engineer embedded directly in your sprint to run the new process day to day, not just hand you a document and leave.",
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

      <StatBand />

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          align="center"
          eyebrow="Two ways to run QA"
          title="Consulting is not *extra headcount*"
          description="Staff augmentation adds a person to your existing process. Consulting changes the process itself, then hands you the ability to run it without us."
        />

        <CompareColumns
          leftTitle="Staff augmentation"
          leftItems={staffAugmentation}
          rightTitle="GoGreenlit QA consulting"
          rightItems={consultingModel}
        />
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

      <section className="on-dark bg-deep text-navajo">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <SectionIntro
            tone="dark"
            eyebrow="Signs you need this"
            title="Who typically brings in a *QA consultant*"
          />

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {whoNeedsIt.map((item, index) => (
              <Reveal as="li" key={item} delay={index * 80}>
                <StickerCard
                  tone="navajo"
                  interactive={false}
                  className="flex h-full items-start gap-4 p-5 shadow-[6px_6px_0_var(--ink)]"
                >
                  <span
                    aria-hidden="true"
                    className="border-ink bg-olive mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px]"
                  >
                    <Check className="size-4" />
                  </span>
                  <span className="text-[17px] leading-snug">{item}</span>
                </StickerCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Services"
          title="QA consulting *services*"
          description="Each engagement starts with the audit and scopes down from there, not a fixed package."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
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
