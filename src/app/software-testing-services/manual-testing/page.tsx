import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Compass,
  FileText,
  Flame,
  Layers,
  MessagesSquare,
  MousePointerClick,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { RelatedLinks } from "@/components/marketing/related-links";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

const title = "Manual Testing Services";
const description =
  "Manual testing services from QA engineers embedded in your sprint: exploratory testing, UAT, smoke testing, and usability review, not a scripted checklist.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/manual-testing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/manual-testing`,
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

const techniques = [
  {
    icon: Compass,
    title: "Exploratory testing",
    description:
      "Investigative sessions run against a defined charter, not a rigid script, so a tester can follow a hunch about where the product might break.",
  },
  {
    icon: Flame,
    title: "Smoke testing",
    description:
      "A fast pass over critical paths after every build or deployment, so a broken login or checkout gets caught before anyone else touches the release.",
  },
  {
    icon: ClipboardCheck,
    title: "User acceptance testing",
    description:
      "Structured validation against your actual acceptance criteria, run by someone who reads the ticket the way a stakeholder will.",
  },
  {
    icon: MousePointerClick,
    title: "Usability testing",
    description:
      "A check for whether a feature works the way a real user expects it to, not just whether it technically functions.",
  },
  {
    icon: Accessibility,
    title: "Accessibility spot-checks",
    description:
      "Keyboard navigation and screen reader passes on new features, catching the accessibility gaps a purely visual review would miss.",
  },
];

const whenItFits = [
  "New features where the requirements are still evolving sprint to sprint.",
  "Complex, multi-step workflows a single scripted test cannot cover end to end.",
  "Edge cases that need business context to recognize as a problem at all.",
  "Situations where judgment matters more than repetition.",
  "A second pass after automation runs, to catch what a script is not built to see.",
];

const sprintPhases = [
  {
    icon: CalendarCheck,
    title: "Planning",
    description:
      "Test cases and exploratory charters get written against the sprint's actual scope, before a single line of code ships.",
  },
  {
    icon: PlayCircle,
    title: "During-sprint execution",
    description:
      "Sessions run alongside development, not queued up for the end of the sprint, so a defect surfaces while it is still cheap to fix.",
  },
  {
    icon: ShieldCheck,
    title: "Release sign-off",
    description:
      "A final pass against acceptance criteria before anything ships, so sign-off means something.",
  },
  {
    icon: MessagesSquare,
    title: "Retrospective participation",
    description:
      "Your tester joins the retro like any other engineer, feeding what they found back into the next sprint's planning.",
  },
];

const deliverables = [
  {
    icon: FileText,
    label: "Test case libraries",
    description: "Living documentation you keep, not a one-off deliverable.",
  },
  {
    icon: Layers,
    label: "Defect reports",
    description:
      "Reproducible, prioritized, and filed where your team already works.",
  },
  {
    icon: Compass,
    label: "Exploratory charters",
    description:
      "A record of what was investigated and why, not just what passed.",
  },
  {
    icon: ClipboardList,
    label: "Coverage summaries",
    description: "A sprint-by-sprint view of what got tested and what did not.",
  },
  {
    icon: CheckCircle2,
    label: "Escaped defect records",
    description:
      "A running account of what reached production, and why, so it stops repeating.",
  },
];

const faqs = [
  {
    question: "Do we still need manual testing if we already have automation?",
    answer:
      "Yes, for different reasons than automation covers. Exploratory sessions catch usability issues, confusing workflows, and edge cases that sit outside a script's scope, the kind of thing a test suite was never written to look for.",
  },
  {
    question:
      "What kinds of bugs does manual testing catch that automation will not?",
    answer:
      "Visual inconsistencies, confusing copy or error messaging, workflows that technically work but do not make sense, and business logic edge cases that need human context to recognize as wrong.",
  },
  {
    question: "How do you document test cases?",
    answer:
      "In structured templates inside whatever project management tool your team already uses. We do not introduce a separate system you have to check.",
  },
  {
    question: "What exactly is exploratory testing?",
    answer:
      "Directed investigation guided by a charter, a defined area and goal, rather than a fixed script. It leaves room for a tester to follow what they find, while still staying scoped to what matters for the release.",
  },
  {
    question: "How many manual testers do we actually need?",
    answer:
      "One experienced, embedded tester is enough for most startup-stage engagements. We scale that up as your surface area, or your release cadence, grows.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  { name: title, href: "/software-testing-services/manual-testing" },
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

export default function ManualTestingPage() {
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
        tone="leaf"
        badge="Exploratory, UAT, and usability review"
        description="Automated suites are good at repeating the same steps. They are bad at noticing a confirmation message that does not make sense, or a workflow that technically works but feels wrong. GoGreenlit's manual testing engineers run exploratory sessions, user acceptance testing, and usability review directly inside your sprint, the judgment automation cannot replicate."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#techniques"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what we test
            </Link>
          </>
        }
      >
        Manual testing services that catch what <em>automation cannot</em>
      </PageHero>

      <section
        id="techniques"
        className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Techniques"
          title="What manual testing *actually* covers"
          description="Five techniques, each suited to a different kind of risk, run by an engineer who reads your product the way a real user would."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((item, index) => (
            <ServiceCard
              key={item.title}
              {...item}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="When it fits"
          title="When manual testing is the *right tool*"
          description="Automation earns its keep on repetition. These are the situations where a person still has the advantage."
        />
        <CheckGrid items={whenItFits} className="mt-12" />
      </section>

      <DeepBand
        eyebrow="In your sprint"
        title="How we run manual testing *inside your sprint*"
        items={sprintPhases}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Deliverables"
          title="What you get from a manual testing *engagement*"
          description="Every session leaves something behind, not just a pass or fail on a ticket."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map(({ icon, label, description }, index) => (
            <ServiceCard
              key={label}
              icon={icon}
              title={label}
              description={description}
              index={index}
            />
          ))}
        </div>
      </section>

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
        groups={getRelatedLinkGroups(
          "/software-testing-services/manual-testing",
        )}
      />

      <CtaSection
        tone="leaf"
        title="Ready to bring in a manual tester who *thinks like a user?*"
        description="Tell us what you are building and where judgment calls are slipping through. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
