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

import { CompareColumns } from "@/components/marketing/compare-columns";
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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
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
      "What's in scope for testing, what's explicitly out, and what quality actually means for this product.",
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
      "Which frameworks and platforms are the standard, so every new hire and every new project doesn't restart that debate.",
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
      "A working session with engineering and product to surface what's actually being tested today, and where the gaps are.",
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
      "What's the actual difference between a test strategy and a test plan?",
    answer:
      "A test plan is scoped to a single release or feature and gets rewritten every cycle. A test strategy is set once at the organizational level and answers what gets tested and why, as a standing rule every test plan then follows.",
  },
  {
    question: "How long does a strategy engagement take?",
    answer:
      "Three to four weeks from discovery workshop to a finalized document, most teams run it alongside their normal sprint cadence.",
  },
  {
    question: "What's actually in the strategy document?",
    answer:
      "Scope and objectives, a risk model, testing level ownership, tooling decisions, environment strategy, and the metrics you'll track, typically two to four pages.",
  },
  {
    question: "Does this fit an agile team, or is it a waterfall artifact?",
    answer:
      "It's written for agile teams specifically: a strategy set at the organizational level that every sprint's test plan draws from, not a fixed document that assumes a fixed release.",
  },
  {
    question: "Do you help implement the strategy, or just write it?",
    answer:
      "Both, if you want it. Some teams take the document and roadmap and run with it internally. Others bring us in for QA process design or an embedded engineer to implement it directly.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/test-strategy-consulting" },
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

      <PageHero
        badge="A strategy your team will actually follow, not a binder"
        description="Most teams don't have a test strategy so much as a set of habits nobody wrote down. GoGreenlit runs a focused engagement to document what gets tested, why, and by whom, sized to actually get used instead of shelved."
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
              href="#components"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See what&rsquo;s in it
            </Link>
          </>
        }
      >
        Test strategy consulting that aligns QA with{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          the business
        </span>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A test strategy is not a test plan
          </h2>
          <p className="text-muted-foreground mt-4">
            Teams that confuse the two end up rewriting the same decisions every
            single release.
          </p>
        </div>

        <CompareColumns
          leftTitle="A test plan"
          leftItems={testPlanItems}
          rightTitle="A test strategy"
          rightItems={testStrategyItems}
        />
      </section>

      <section
        id="components"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What a strategy that actually gets used includes
          </h2>
          <p className="text-muted-foreground mt-4">
            Six components, kept short enough to fit in two to four pages, not a
            document that gets written once and never opened again.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {components.map((component, index) => (
            <ServiceCard key={component.title} {...component} index={index} />
          ))}
        </div>
      </section>

      <section className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How a strategy engagement runs
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What you get from the engagement
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {deliverables.map(({ icon: Icon, label, description }, index) => (
            <Reveal
              key={label}
              className="border-border/60 rounded-lg border p-5"
              delay={index * 80}
            >
              <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-3 font-semibold">{label}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {description}
              </p>
            </Reveal>
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

      <RelatedLinks
        groups={getRelatedLinkGroups("/qa-consulting/test-strategy-consulting")}
      />

      <CtaSection
        title="Ready to stop making the same testing decisions twice?"
        description="Tell us about your current QA situation and where decisions keep getting made ad hoc. We'll scope a strategy engagement in one call."
      />
    </>
  );
}
