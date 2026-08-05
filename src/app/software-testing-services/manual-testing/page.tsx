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

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
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
  "Complex, multi-step workflows a single scripted test can't cover end to end.",
  "Edge cases that need business context to recognize as a problem at all.",
  "Situations where judgment matters more than repetition.",
  "A second pass after automation runs, to catch what a script isn't built to see.",
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
      "Sessions run alongside development, not queued up for the end of the sprint, so a defect surfaces while it's still cheap to fix.",
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
    description: "A sprint-by-sprint view of what got tested and what didn't.",
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
      "What kinds of bugs does manual testing catch that automation won't?",
    answer:
      "Visual inconsistencies, confusing copy or error messaging, workflows that technically work but don't make sense, and business logic edge cases that need human context to recognize as wrong.",
  },
  {
    question: "How do you document test cases?",
    answer:
      "In structured templates inside whatever project management tool your team already uses. We don't introduce a separate system you have to check.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="Exploratory testing, UAT, and usability review, done by engineers"
        description="Automated suites are good at repeating the same steps. They are bad at noticing a confirmation message that doesn't make sense, or a workflow that technically works but feels wrong. GoGreenlit's manual testing engineers run exploratory sessions, user acceptance testing, and usability review directly inside your sprint, the judgment automation can't replicate."
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
              href="#techniques"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See what we test
            </Link>
          </>
        }
      >
        Manual testing services that catch what{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          automation can&rsquo;t
        </span>
      </PageHero>

      <section
        id="techniques"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What manual testing actually covers
          </h2>
          <p className="text-muted-foreground mt-4">
            Five techniques, each suited to a different kind of risk, run by an
            engineer who reads your product the way a real user would.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techniques.map((technique, index) => (
            <ServiceCard
              key={technique.title}
              {...technique}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            When manual testing is the right tool
          </h2>
          <p className="text-muted-foreground mt-4">
            Automation earns its keep on repetition. These are the situations
            where a person still has the advantage.
          </p>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {whenItFits.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How we run manual testing inside your sprint
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sprintPhases.map(
              (
                { icon: Icon, title: itemTitle, description: itemDescription },
                index,
              ) => (
                <Reveal
                  key={itemTitle}
                  className="flex flex-col items-center gap-3 text-center"
                  delay={index * 80}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#ee9e58] text-[#354639]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-foreground font-semibold">{itemTitle}</h3>
                  <p className="text-foreground/80 text-sm">
                    {itemDescription}
                  </p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What you get from a manual testing engagement
          </h2>
          <p className="text-muted-foreground mt-4">
            Every session leaves something behind, not just a pass or fail on a
            ticket.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        title="Ready to bring in a manual tester who thinks like a user?"
        description="Tell us what you're building and where judgment calls are slipping through. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
