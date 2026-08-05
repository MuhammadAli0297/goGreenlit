import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3,
  ClipboardList,
  FileText,
  Milestone,
  Settings2,
  Target,
  Users,
  Workflow,
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

const title = "QA Audit and Assessment";
const description =
  "A two-week QA audit covering process, tooling, coverage, and documentation, ending in a prioritized 90-day improvement roadmap.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/qa-audit-assessment",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/qa-audit-assessment`,
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

const domains = [
  {
    icon: Workflow,
    title: "Process",
    description:
      "How testing actually happens today: when it starts, who owns it, and what triggers a release decision.",
  },
  {
    icon: Settings2,
    title: "Tooling",
    description:
      "Whether your test management, automation, and CI tools fit your stack, or are being worked around.",
  },
  {
    icon: Target,
    title: "Coverage",
    description:
      "What's actually tested versus assumed to be fine, mapped against where your real risk sits.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description:
      "Whether test cases and process docs describe the product you ship today, or one from two quarters ago.",
  },
  {
    icon: Users,
    title: "Team skills",
    description:
      "Where the team's QA capability is strong, and where a skills gap is quietly shaping what gets tested.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    description:
      "Whether the metrics you track actually predict release risk, or just look good in a dashboard.",
  },
];

const phases = [
  {
    title: "Kickoff and discovery (days 1-4)",
    description:
      "Interviews with engineering and product, plus a first pass through your existing test documentation and tooling.",
  },
  {
    title: "Independent analysis (days 5-8)",
    description:
      "A structured review against all six audit domains, without sitting in on your day-to-day so findings stay objective.",
  },
  {
    title: "Report writing (days 9-12)",
    description:
      "Findings get written up with severity ratings and turned into a prioritized, sequenced roadmap.",
  },
  {
    title: "Findings presentation (days 13-14)",
    description:
      "A walkthrough of the report with your team, and a working session on what to tackle first.",
  },
];

const deliverables = [
  {
    icon: FileText,
    label: "Executive summary",
    description:
      "The headline findings, written for whoever's making the budget and headcount calls.",
  },
  {
    icon: ClipboardList,
    label: "Detailed findings by domain",
    description:
      "Every finding rated by severity, with a recommended action attached.",
  },
  {
    icon: Target,
    label: "Coverage gap analysis",
    description:
      "Exactly where testing isn't happening, mapped against actual product risk.",
  },
  {
    icon: Milestone,
    label: "90-day roadmap",
    description:
      "Ten to fifteen sequenced initiatives, ranked by impact against effort, so quick wins and structural fixes are both visible.",
  },
];

const faqs = [
  {
    question: "How long does a QA audit actually take?",
    answer:
      "Two weeks total: kickoff and discovery, independent analysis, report writing, and a findings presentation.",
  },
  {
    question: "What's actually in the audit report?",
    answer:
      "An executive summary, detailed findings by domain with severity ratings, a coverage gap analysis, and a prioritized 90-day roadmap.",
  },
  {
    question: "What's the difference between an audit and an assessment?",
    answer:
      "Mostly terminology. An audit typically implies more formal, documented findings; an assessment can be lighter-weight. We run audit-depth engagements regardless of which word you use.",
  },
  {
    question: "What happens after we get the report?",
    answer:
      "Some teams take the roadmap and implement it internally. Others bring us in for QA process design or an embedded engineer to run point on implementation.",
  },
  {
    question: "How much does a QA audit cost?",
    answer:
      "It depends on team size, codebase complexity, and how much of the roadmap you want scoped. A discovery call gets you an accurate number.",
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

export default function QaAuditAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="A two-week audit, not a vague vibe check"
        description="Most teams know quality is a problem somewhere. Fewer can point to exactly where. GoGreenlit runs a structured two-week audit across your process, tooling, and coverage, and hands back a prioritized roadmap instead of a list of complaints."
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
              href="#domains"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See what gets audited
            </Link>
          </>
        }
      >
        QA audits that show you exactly{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          where quality breaks down
        </span>
      </PageHero>

      <section
        id="domains"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What a QA audit covers
          </h2>
          <p className="text-muted-foreground mt-4">
            Six domains, each reviewed independently so a weakness in one
            doesn&rsquo;t hide behind strength in another.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => (
            <ServiceCard key={domain.title} {...domain} index={index} />
          ))}
        </div>
      </section>

      <section className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How the audit runs, day by day
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What you get from the audit
          </h2>
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
        title="Ready to find out exactly where quality is breaking down?"
        description="Tell us about your team and your current release process. We'll scope a two-week audit in one call."
      />
    </>
  );
}
