import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Clock, Milestone } from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CompareColumns } from "@/components/marketing/compare-columns";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { WeekPicker } from "@/components/marketing/week-picker";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "Embedded QA Team";
const description =
  "Embedded QA engineers who join your sprint like any other teammate: same ceremonies, same tools, same standups, not a vendor queue waiting on a status update.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/embedded-qa-team",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/embedded-qa-team`,
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

const week = [
  {
    label: "Mon",
    name: "Monday",
    kicker: "Plan",
    title: "Sprint planning",
    body: "QA reads every ticket before work starts and flags what could go wrong.",
    items: [
      "Acceptance rules clarified",
      "Risks flagged early",
      "Test approach agreed",
    ],
  },
  {
    label: "Tue",
    name: "Tuesday",
    kicker: "Test",
    title: "Testing as features land",
    body: "Features are tested the day they are ready, not the night before release.",
    items: [
      "Exploratory sessions",
      "Bugs with repro steps",
      "Fast feedback to developers",
    ],
  },
  {
    label: "Wed",
    name: "Wednesday",
    kicker: "Automate",
    title: "Protect what matters",
    body: "Stable flows become automated checks that run in your pipeline.",
    items: [
      "New regression checks",
      "Flaky tests repaired",
      "CI results reviewed",
    ],
  },
  {
    label: "Thu",
    name: "Thursday",
    kicker: "Triage",
    title: "Bug triage",
    body: "Together we decide what blocks, what waits, and what to ignore.",
    items: [
      "Severity set with evidence",
      "Blockers named",
      "Backlog kept honest",
    ],
  },
  {
    label: "Fri",
    name: "Friday",
    kicker: "Release",
    title: "Go or no-go",
    body: "A short, plain report tells you whether the release is ready.",
    items: ["Coverage summary", "Open risks listed", "Clear recommendation"],
  },
] as const;

const inPractice = [
  "Joins sprint planning, standup, review, and retro like any other engineer on the team",
  "Gets the same tool access as your developers: repo, CI, and issue tracker, from day one",
  "Builds real product knowledge sprint over sprint, instead of relearning context every engagement",
  "Reports coverage and findings in your own standups, not a separate status deck",
  "Scales up or down with your release cadence, not a fixed headcount line item",
];

const testingFactory = [
  "Executes a checklist handed to them, nothing more",
  "Has no visibility into why a feature was built the way it was",
  "Reports pass and fail counts, not risk",
];

const embeddedEngineer = [
  "Exercises judgment on what is actually worth testing and why",
  "Sits in planning, so testing reflects real product context",
  "Flags process gaps, not just failed test cases",
];

const phases = [
  {
    title: "Discovery call",
    description:
      "A 30 minute conversation about your stack, release cadence, and where testing is falling through the cracks today.",
  },
  {
    title: "Week one ramp",
    description:
      "Your engineer gets tool access, reviews the codebase and existing test documentation, and joins their first sprint ceremonies.",
  },
  {
    title: "Full sprint participation",
    description:
      "By week two, your engineer is writing test cases in planning and executing them alongside development, a full member of the team.",
  },
];

const engagementModels = [
  {
    icon: Clock,
    title: "Weekly sprint retainer",
    description:
      "A QA engineer embedded in a single team's sprint, billed weekly, scaled to how much of the sprint actually needs coverage.",
  },
  {
    icon: CalendarCheck,
    title: "Monthly retainer",
    description:
      "A steady embedded presence across multiple sprints, for teams that want predictable QA capacity without a fixed headcount.",
  },
  {
    icon: Milestone,
    title: "Project-based",
    description:
      "A defined engagement scoped to a launch, migration, or specific release, with a clear start and end date.",
  },
];

const faqs = [
  {
    question: "How quickly can an embedded engineer start?",
    answer:
      "Most engagements are ready to start within one to two weeks of the discovery call: enough time to review your codebase and existing test documentation and get tool access configured.",
  },
  {
    question: "Is embedded QA enough, or do we need a full-time hire?",
    answer:
      "For most teams under about 30 engineers, an embedded QA engineer covers the workload without the overhead of a full-time hire. Past that scale, we usually recommend a hybrid: an embedded engineer plus in-house hires we help you ramp.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Retainer-based, scoped to your sprint cadence and team size. A discovery call is the fastest way to get an accurate number for your situation.",
  },
  {
    question: "Will an embedded engineer work inside our existing tools?",
    answer:
      "Yes. Jira, Linear, Slack, GitHub, whatever your team already uses. We do not introduce a separate system you have to check.",
  },
  {
    question: "What happens if we need to pause or end the engagement?",
    answer:
      "Engagements run month to month with 30 days notice, no long-term contract required.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/embedded-qa-team" },
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

export default function EmbeddedQaTeamPage() {
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
        badge="A QA engineer who joins your team"
        description="Most outsourced QA sits outside your sprint and hands defects back on its own schedule. GoGreenlit embeds a QA engineer directly into your ceremonies, standups, planning, and retros, so testing runs on your team’s clock, not a vendor’s."
        aside={<WeekPicker days={week} className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#in-practice"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See how it works
            </Link>
          </>
        }
      >
        Embedded QA teams that work <em>inside your sprint</em>
      </PageHero>

      <section
        id="in-practice"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="In practice"
          title="What embedded QA looks like in *practice*"
          description="Not a vendor waiting on a status update, a member of the team who happens to specialize in testing."
        />
        <CheckGrid items={inPractice} className="mt-12" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          align="center"
          eyebrow="The difference"
          title="Embedded QA vs a *testing factory*"
          description="The difference is not effort, it is whether the person testing your product understands why it was built that way."
        />
        <CompareColumns
          leftTitle="A testing factory"
          leftItems={testingFactory}
          rightTitle="An embedded QA engineer"
          rightItems={embeddedEngineer}
        />
      </section>

      <section
        id="how-it-works"
        className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]"
      >
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              How it starts
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              How an embedded engagement <em>starts</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <DeepBand
        eyebrow="Engagement models"
        title="Engagement *models*"
        description="Determined on the discovery call, based on your team size and release cadence, not a fixed package."
        items={engagementModels}
      />

      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
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
        groups={getRelatedLinkGroups("/qa-consulting/embedded-qa-team")}
      />

      <CtaSection
        tone="olive"
        title="Ready to add a QA engineer to *your actual sprint?*"
        description="Tell us about your team size and release cadence. We will scope an embedded engagement in one call."
      />
    </>
  );
}
