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

import { ctaVariants } from "@/components/brand/cta-variants";
import { stripInlineLinks } from "@/components/marketing/inline-links";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { AuditReportPreview } from "@/components/marketing/audit-report-preview";
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
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "QA Audit Services for Software Teams";
// Short label for the visible and JSON-LD breadcrumb, kept apart from the
// longer SEO title above.
const breadcrumbLabel = "QA Audit and Assessment";
const description =
  "QA audit services for software teams: a two-week review of process, tooling, coverage, and documentation, ending in a prioritized 90-day roadmap.";

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
  },
};

const auditSignals = [
  "Nobody can say with confidence what percentage of the product is actually covered by tests",
  "The same category of defect keeps escaping to production, and no one has traced why",
  "The team or stack has changed significantly since anyone last reviewed the QA process end to end",
  "Coverage and quality metrics get reported every sprint, but nobody has checked whether they predict anything real",
  "Leadership is asking for a quality plan, and the honest answer is that one does not exist in writing",
];

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
      "What is actually tested versus assumed to be fine, mapped against where your real risk sits.",
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
      "The headline findings, written for whoever is making the budget and headcount calls.",
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
      "Exactly where testing is not happening, mapped against actual product risk.",
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
    question: "What is actually in the audit report?",
    answer:
      "An executive summary, detailed findings by domain with severity ratings, a coverage gap analysis, and a prioritized 90-day roadmap. For a preview of the patterns an audit tends to surface, read [what a QA audit usually finds](/blog/what-a-qa-audit-usually-finds).",
  },
  {
    question: "What is the difference between an audit and an assessment?",
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

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: breadcrumbLabel, href: "/qa-consulting/qa-audit-assessment" },
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
      text: stripInlineLinks(answer),
    },
  })),
};

export default function QaAuditAssessmentPage() {
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
        badge="A two-week audit, not a vibe check"
        description="Most teams know quality is a problem somewhere. Fewer can point to exactly where. GoGreenlit runs a structured two-week audit across your process, tooling, and coverage, and hands back a prioritized roadmap instead of a list of complaints."
        aside={<AuditReportPreview className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#domains"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what gets audited
            </Link>
          </>
        }
      >
        QA audits that show you exactly <em>where quality breaks down</em>
      </PageHero>

      <section className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Signs"
          title="Signs you are overdue for a *QA audit*"
          description="None of these feel urgent on their own. Together, they usually mean nobody has an accurate picture of your actual risk anymore."
        />
        <CheckGrid items={auditSignals} className="mt-12" />
      </section>

      <section
        id="domains"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 pb-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Six domains"
          title="What a QA audit *covers*"
          description="Six domains, each reviewed independently so a weakness in one does not hide behind strength in another."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              Day by day
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              How the audit runs, <em>day by day</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <DeepBand
        eyebrow="Deliverables"
        title="What you get from the *audit*"
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
        groups={getRelatedLinkGroups("/qa-consulting/qa-audit-assessment")}
      />

      <CtaSection
        tone="olive"
        title="Ready to find out exactly where *quality is breaking down?*"
        description="Tell us about your team and your current release process. We will scope a two-week audit in one call."
      />
    </>
  );
}
