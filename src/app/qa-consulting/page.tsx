import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Radar,
  ShieldCheck,
  Target,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { CompareColumns } from "@/components/marketing/compare-columns";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatBand } from "@/components/marketing/stat-band";
import { buttonVariants } from "@/components/ui/button";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
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
      "A structured audit of your current QA maturity: where defects escape, what's tested versus assumed, and how release decisions actually get made today.",
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
  "Teams that have hired QA engineers but still don't have a repeatable strategy",
  "Leadership that wants an outside audit of QA maturity before deciding what to build in-house",
];

const services = [
  {
    icon: Radar,
    title: "QA Audit and Assessment",
    description:
      "An outside look at your current QA maturity: what's tested, what's assumed, and where the actual risk is hiding.",
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
      "Most engagements start after a production incident that shouldn't have shipped, ahead of a fundraise or enterprise deal that requires real QA process, or once engineering has scaled past the point where tribal knowledge is enough.",
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

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: title, href: "/qa-consulting" },
]);

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

      <PageHero
        badge="Strategy and process, not just extra hands"
        description="Bringing in another tester treats the symptom. GoGreenlit's QA consulting starts with an assessment of how defects are actually reaching production, then designs and embeds the fix directly into your sprint, with your team owning it long after the engagement ends."
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
              href="#model"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See the consulting model
            </Link>
          </>
        }
      >
        QA consulting built around how your team actually{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          ships software
        </span>
      </PageHero>

      <StatBand />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Consulting is not extra headcount
          </h2>
          <p className="text-muted-foreground mt-4">
            Staff augmentation adds a person to your existing process.
            Consulting changes the process itself, then hands you the ability to
            run it without us.
          </p>
        </div>

        <CompareColumns
          leftTitle="Staff augmentation"
          leftItems={staffAugmentation}
          rightTitle="GoGreenlit QA consulting"
          rightItems={consultingModel}
        />
      </section>

      <section
        id="model"
        className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]"
      >
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              The GoGreenlit consulting model
            </h2>
            <p className="text-foreground/80 mt-4">
              Three phases, each one handed off deliberately so the next phase
              has something real to build on.
            </p>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="bg-[#354639]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-[#f9f4eb] sm:text-4xl">
              Who typically brings in a QA consultant
            </h2>
          </div>

          <Reveal as="div" className="mx-auto mt-12 max-w-2xl">
            <ul className="space-y-4">
              {whoNeedsIt.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#ffe0ad]" />
                  <span className="text-sm text-[#f9f4eb]/85">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            QA consulting services
          </h2>
          <p className="text-muted-foreground mt-4">
            Each engagement starts with the audit and scopes down from there,
            not a fixed package.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
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
        title="Ready for an outside look at your QA process?"
        description="Tell us where a defect last slipped through, and what your release process actually looks like today. We'll scope an assessment in one call."
      />
    </>
  );
}
