import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, CheckCircle2, Clock, Milestone } from "lucide-react";

import { CompareColumns } from "@/components/marketing/compare-columns";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
  },
};

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
  "Exercises judgment on what's actually worth testing and why",
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
      "Yes. Jira, Linear, Slack, GitHub, whatever your team already uses. We don't introduce a separate system you have to check.",
  },
  {
    question: "What happens if we need to pause or end the engagement?",
    answer:
      "Engagements run month to month with 30 days notice, no long-term contract required.",
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

export default function EmbeddedQaTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="A QA engineer who joins your team, not a vendor queue"
        description="Most outsourced QA sits outside your sprint and hands defects back on its own schedule. GoGreenlit embeds a QA engineer directly into your ceremonies, standups, planning, and retros, so testing runs on your team's clock, not a vendor's."
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
              href="#in-practice"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See how it works
            </Link>
          </>
        }
      >
        Embedded QA teams that work{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          inside your sprint
        </span>
      </PageHero>

      <section
        id="in-practice"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What embedded QA looks like in practice
          </h2>
          <p className="text-muted-foreground mt-4">
            Not a vendor waiting on a status update, a member of the team who
            happens to specialize in testing.
          </p>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {inPractice.map((item) => (
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
            Embedded QA vs a testing factory
          </h2>
          <p className="text-muted-foreground mt-4">
            The difference isn&rsquo;t effort, it&rsquo;s whether the person
            testing your product understands why it was built that way.
          </p>
        </div>

        <CompareColumns
          leftTitle="A testing factory"
          leftItems={testingFactory}
          rightTitle="An embedded QA engineer"
          rightItems={embeddedEngineer}
        />
      </section>

      <section
        id="how-it-works"
        className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]"
      >
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How an embedded engagement starts
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Engagement models
          </h2>
          <p className="text-muted-foreground mt-4">
            Determined on the discovery call, based on your team size and
            release cadence, not a fixed package.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {engagementModels.map((model, index) => (
            <ServiceCard key={model.title} {...model} index={index} />
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
        title="Ready to add a QA engineer to your actual sprint?"
        description="Tell us about your team size and release cadence. We'll scope an embedded engagement in one call."
      />
    </>
  );
}
