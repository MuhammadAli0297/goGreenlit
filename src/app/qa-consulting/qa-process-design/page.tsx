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

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
  },
};

const signals = [
  "Testing starts after development is “done,” so every defect found is already expensive to fix",
  "Defects get triaged inconsistently, so release decisions depend on who's in the room",
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
      "The process runs for a single sprint before it's treated as final, so friction points surface while they're still cheap to fix.",
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
      "Explicit entry and exit criteria, so a go or no-go decision doesn't depend on who's in the room.",
  },
  {
    icon: ClipboardList,
    label: "Coverage report template",
    description:
      "A running record of what got tested each sprint, and what didn't.",
  },
];

const faqs = [
  {
    question: "How do we know if we actually need to redesign our process?",
    answer:
      "If release decisions depend on who's in the room, defects get triaged inconsistently, or QA hears about a feature the same day as everyone else, the process is the problem, not the people running it.",
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
      "By involving them in designing it, and piloting it for one sprint before calling it final. A process handed down top-down gets ignored, one built with the team's own input doesn't.",
  },
  {
    question: "What does “shift-left testing” actually mean in this context?",
    answer:
      "Moving testing earlier: writing test cases in sprint planning and running smoke tests before merge, so a defect gets caught while it's still cheap to fix, not after it ships.",
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

export default function QaProcessDesignPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="A process your team follows without being told to"
        description="A missing QA process doesn't look like chaos, it looks like the same argument about whether something's ready to ship, every single release. GoGreenlit designs sprint-level testing process, defect triage, and release criteria around how your team actually works."
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
              href="#signals"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See the warning signs
            </Link>
          </>
        }
      >
        QA process design that builds quality into{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          every sprint
        </span>
      </PageHero>

      <section
        id="signals"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Signals your QA process needs a redesign
          </h2>
          <p className="text-muted-foreground mt-4">
            None of these look like a crisis day to day. Together, they&rsquo;re
            usually the reason quality feels inconsistent release to release.
          </p>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {signals.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What shapes the process we design
          </h2>
          <p className="text-muted-foreground mt-4">
            A process copied from another company fits that company. Yours gets
            designed around these four factors instead.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shapingFactors.map((factor, index) => (
            <ServiceCard key={factor.title} {...factor} index={index} />
          ))}
        </div>
      </section>

      <section className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Getting the whole team aligned on the new process
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What good process documentation looks like
          </h2>
          <p className="text-muted-foreground mt-4">
            Short, specific, and actionable, four documents instead of one
            binder nobody opens.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      <CtaSection
        title="Ready for a QA process your team will actually follow?"
        description="Tell us what breaks down most often: missed defects, inconsistent releases, unclear ownership. We'll scope a process design engagement in one call."
      />
    </>
  );
}
