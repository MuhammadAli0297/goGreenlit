import type { Metadata } from "next";
import Link from "next/link";
import {
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  ShieldAlert,
  Users,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { TriageSorter } from "@/components/marketing/triage-sorter";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "QA Process Design";
const description =
  "QA process design that builds testing into sprint planning, defect triage, and release sign-off, instead of bolting it onto the end of a sprint.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/qa-process-design",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/qa-process-design`,
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

const signals = [
  "Testing starts after development is “done,” so every defect found is already expensive to fix",
  "Defects get triaged inconsistently, so release decisions depend on who is in the room",
  "Nobody can point to written entry or exit criteria for a sprint or a release",
  "QA finds out about a feature in the same standup as everyone else, not during planning",
  "Test documentation describes a version of the product that shipped two quarters ago",
];

const shapingFactors = [
  {
    icon: Clock,
    title: "Sprint length",
    description:
      "A one-week sprint needs a tighter testing loop than a three-week one, the process has to fit the cadence, not fight it.",
  },
  {
    icon: Users,
    title: "Team composition",
    description:
      "How many developers, how many dedicated testers, and how much testing responsibility developers already carry.",
  },
  {
    icon: Boxes,
    title: "Application architecture",
    description:
      "A monolith and a microservices architecture fail in different places, and the process should watch the places yours actually fails.",
  },
  {
    icon: ShieldAlert,
    title: "Organizational risk profile",
    description:
      "A fintech release and an internal tool have very different tolerances for what “good enough” means.",
  },
];

const phases = [
  {
    title: "Team walkthrough",
    description:
      "A working session presenting the new process to engineering, not a document dropped in Slack.",
  },
  {
    title: "One-sprint pilot",
    description:
      "The process runs for a single sprint before it is treated as final, so friction points surface while they are still cheap to fix.",
  },
  {
    title: "Retrospective review",
    description:
      "A dedicated retro on the process itself, adjustments get made based on what the pilot sprint actually surfaced.",
  },
];

const deliverables = [
  {
    icon: FileText,
    label: "Sprint QA runbook",
    description:
      "What gets tested, when, and by whom, for a single sprint cycle.",
  },
  {
    icon: ClipboardCheck,
    label: "Defect report template",
    description:
      "A consistent format for severity, reproduction steps, and triage ownership.",
  },
  {
    icon: CheckCircle2,
    label: "Release checklist",
    description:
      "Explicit entry and exit criteria, so a go or no-go decision does not depend on who is in the room.",
  },
  {
    icon: ClipboardList,
    label: "Coverage report template",
    description:
      "A running record of what got tested each sprint, and what did not.",
  },
];

const faqs = [
  {
    question: "How do we know if we actually need to redesign our process?",
    answer:
      "If release decisions depend on who is in the room, defects get triaged inconsistently, or QA hears about a feature the same day as everyone else, the process is the problem, not the people running it.",
  },
  {
    question: "How long does this take?",
    answer:
      "Two to four weeks to design the process, then one to three months to fully embed it through the pilot sprint and retro cycle.",
  },
  {
    question: "What does the documentation actually look like?",
    answer:
      "Short, specific, and actionable: a sprint QA runbook, a defect report template, a release checklist, and a coverage report template. Not a wiki page nobody opens.",
  },
  {
    question: "How do you get developers to actually follow a new process?",
    answer:
      "By involving them in designing it, and piloting it for one sprint before calling it final. A process handed down top-down gets ignored, one built with the team's own input does not.",
  },
  {
    question: "What does “shift-left testing” actually mean in this context?",
    answer:
      "Moving testing earlier: writing test cases in sprint planning and running smoke tests before merge, so a defect gets caught while it is still cheap to fix, not after it ships.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/qa-process-design" },
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

export default function QaProcessDesignPage() {
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
        badge="A process your team actually follows"
        description="A missing QA process does not look like chaos, it looks like the same argument about whether something is ready to ship, every single release. GoGreenlit designs sprint-level testing process, defect triage, and release criteria around how your team actually works."
        aside={<TriageSorter className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#signals"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See the warning signs
            </Link>
          </>
        }
      >
        QA process design that builds quality into <em>every sprint</em>
      </PageHero>

      <section
        id="signals"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Warning signs"
          title="Signals your QA process needs a *redesign*"
          description="None of these look like a crisis day to day. Together, they are usually the reason quality feels inconsistent release to release."
        />
        <CheckGrid items={signals} className="mt-12" />
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="What shapes it"
          title="What shapes the process we *design*"
          description="A process copied from another company fits that company. Yours gets designed around these four factors instead."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shapingFactors.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              Rollout
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              Getting the whole team aligned on the <em>new process</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <DeepBand
        eyebrow="Documentation"
        title="What good process documentation *looks like*"
        description="Short, specific, and actionable, four documents instead of one binder nobody opens."
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
        groups={getRelatedLinkGroups("/qa-consulting/qa-process-design")}
      />

      <CtaSection
        tone="olive"
        title="Ready for a QA process your team will *actually follow?*"
        description="Tell us what breaks down most often: missed defects, inconsistent releases, unclear ownership. We will scope a process design engagement in one call."
      />
    </>
  );
}
