import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  FileText,
  Layers,
  Radar,
  Server,
  Target,
  Wrench,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CompareColumns } from "@/components/marketing/compare-columns";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { RiskMap } from "@/components/marketing/risk-map";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "Test Strategy Consulting";
const description =
  "Test strategy consulting that turns ad hoc testing decisions into a documented, risk-based strategy your whole team can actually follow.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/test-strategy-consulting",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/test-strategy-consulting`,
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

const testPlanItems = [
  "Scoped to a single release or feature",
  "Rewritten from scratch every cycle",
  'Answers "what are we testing this sprint"',
];

const testStrategyItems = [
  "Set once at the organizational level, revisited quarterly",
  "Reused as the basis for every test plan that follows",
  'Answers "what do we test, and why, as a rule"',
];

const components = [
  {
    icon: Target,
    title: "Scope and objectives",
    description:
      "What is in scope for testing, what is explicitly out, and what quality actually means for this product.",
  },
  {
    icon: Radar,
    title: "Risk model",
    description:
      "Which areas carry the most business risk if they break, so effort goes where the exposure actually is.",
  },
  {
    icon: Layers,
    title: "Testing levels and ownership",
    description:
      "Who owns unit, integration, and end-to-end coverage, so nothing quietly falls between roles.",
  },
  {
    icon: Wrench,
    title: "Tooling decisions",
    description:
      "Which frameworks and platforms are the standard, so every new hire and every new project does not restart that debate.",
  },
  {
    icon: Server,
    title: "Environment strategy",
    description:
      "What staging, QA, and production parity actually looks like, and where testing happens in that chain.",
  },
  {
    icon: BarChart3,
    title: "Metrics and reporting",
    description:
      "The handful of numbers that actually predict release risk, tracked somewhere the whole team sees them.",
  },
];

const phases = [
  {
    title: "Discovery workshop",
    description:
      "A working session with engineering and product to surface what is actually being tested today, and where the gaps are.",
  },
  {
    title: "Current-state audit",
    description:
      "A review of existing test cases, defect history, and release process against the risk areas surfaced in discovery.",
  },
  {
    title: "Strategy draft",
    description:
      "A two to four page strategy document. Short enough that your team will actually read and follow it.",
  },
  {
    title: "Review and handoff",
    description:
      "A working session to pressure-test the draft with your team, then finalize it alongside a 90-day implementation roadmap.",
  },
];

const deliverables = [
  {
    icon: FileText,
    label: "Strategy document",
    description:
      "Two to four pages: scope, risk model, ownership, and tooling decisions, sized to actually get read.",
  },
  {
    icon: ClipboardList,
    label: "90-day roadmap",
    description:
      "A prioritized, sequenced plan for closing the gaps the audit surfaced.",
  },
  {
    icon: Layers,
    label: "Templates",
    description:
      "Reusable templates for test cases, test plans, defect reports, and coverage reporting.",
  },
];

const faqs = [
  {
    question:
      "What is the actual difference between a test strategy and a test plan?",
    answer:
      "A test plan is scoped to a single release or feature and gets rewritten every cycle. A test strategy is set once at the organizational level and answers what gets tested and why, as a standing rule every test plan then follows.",
  },
  {
    question: "How long does a strategy engagement take?",
    answer:
      "Three to four weeks from discovery workshop to a finalized document, most teams run it alongside their normal sprint cadence.",
  },
  {
    question: "What is actually in the strategy document?",
    answer:
      "Scope and objectives, a risk model, testing level ownership, tooling decisions, environment strategy, and the metrics you will track, typically two to four pages.",
  },
  {
    question: "Does this fit an agile team, or is it a waterfall artifact?",
    answer:
      "It is written for agile teams specifically: a strategy set at the organizational level that every sprint's test plan draws from, not a fixed document that assumes a fixed release.",
  },
  {
    question: "Do you help implement the strategy, or just write it?",
    answer:
      "Both, if you want it. Some teams take the document and roadmap and run with it internally. Others bring us in for QA process design or an embedded engineer to implement it directly.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/test-strategy-consulting" },
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

export default function TestStrategyConsultingPage() {
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
        badge="A strategy, not a binder"
        description="Most teams do not have a test strategy so much as a set of habits nobody wrote down. GoGreenlit runs a focused engagement to document what gets tested, why, and by whom, sized to actually get used instead of shelved."
        aside={<RiskMap className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#components"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what is in it
            </Link>
          </>
        }
      >
        Test strategy consulting that aligns QA with <em>the business</em>
      </PageHero>

      <section className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          align="center"
          eyebrow="Strategy versus plan"
          title="A test strategy is not a *test plan*"
          description="Teams that confuse the two end up rewriting the same decisions every single release."
        />

        <CompareColumns
          leftTitle="A test plan"
          leftItems={testPlanItems}
          rightTitle="A test strategy"
          rightItems={testStrategyItems}
        />
      </section>

      <section
        id="components"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="What is in it"
          title="What a strategy that actually gets used *includes*"
          description="Six components, kept short enough to fit in two to four pages, not a document that gets written once and never opened again."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              How it runs
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              How a strategy engagement <em>runs</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <DeepBand
        eyebrow="Deliverables"
        title="What you get from the *engagement*"
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
        groups={getRelatedLinkGroups("/qa-consulting/test-strategy-consulting")}
      />

      <CtaSection
        tone="olive"
        title="Ready to stop making the same testing decisions *twice?*"
        description="Tell us about your current QA situation and where decisions keep getting made ad hoc. We will scope a strategy engagement in one call."
      />
    </>
  );
}
