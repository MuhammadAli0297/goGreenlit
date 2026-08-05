import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ClipboardList,
  GaugeCircle,
  MessagesSquare,
  RefreshCw,
  Route,
  Target,
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

const title = "Release Readiness";
const description =
  "Release readiness reviews covering coverage, critical paths, rollback plans, and monitoring, so a go or no-go decision means more than a passing regression run.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/qa-consulting/release-readiness",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/qa-consulting/release-readiness`,
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

const coverageAreas = [
  {
    icon: Target,
    title: "Coverage check",
    description:
      "What percentage of the defined test scope actually ran, and a clear rationale for any gap.",
  },
  {
    icon: Route,
    title: "Critical path validation",
    description:
      "Direct verification of the handful of user flows that matter most if they break.",
  },
  {
    icon: ClipboardList,
    title: "Known issues list",
    description:
      "Every deferred bug, documented explicitly with the reasoning for why it's acceptable to ship with it.",
  },
  {
    icon: RefreshCw,
    title: "Rollback plan",
    description:
      "A recovery procedure that's actually been tested, not just written down and hoped for.",
  },
  {
    icon: GaugeCircle,
    title: "Monitoring and alerting",
    description:
      "Detection configured before deployment, not added after something breaks in production.",
  },
  {
    icon: MessagesSquare,
    title: "Communication plan",
    description:
      "Who gets notified, when, and where the release is documented, agreed before release day.",
  },
];

const phases = [
  {
    title: "Pre-release audit",
    description:
      "A pass through coverage, critical paths, known issues, rollback, monitoring, and communication, against the actual release scope.",
  },
  {
    title: "Go or no-go review",
    description:
      "A working session with engineering and product where the audit findings turn into an explicit ship or hold decision.",
  },
  {
    title: "Post-release monitoring",
    description:
      "A defined window after release where the team watches the metrics that matter, so “done” means observed as stable, not just deployed.",
  },
];

const checklistTraits = [
  "Every entry ties back to a specific, testable criterion, not a vague “looks good”",
  "Known issues are listed explicitly, with the reasoning for shipping anyway attached",
  "The checklist gets reviewed and updated after every release, not written once and frozen",
  "Sign-off requires an actual name attached to the decision, not a passive “no objections”",
];

const faqs = [
  {
    question: "What actually counts as a release readiness assessment?",
    answer:
      "More than a passing regression run: coverage against defined scope, validated critical paths, a documented known-issues list, a tested rollback plan, monitoring configured pre-deployment, and a communication plan.",
  },
  {
    question: "What belongs on a release checklist?",
    answer:
      "Specific, testable criteria: coverage thresholds, critical path sign-off, the known issues list, rollback verification, and monitoring configuration, not a generic “ready to ship” checkbox.",
  },
  {
    question:
      "How do you actually confirm a release is ready, versus just hoping it is?",
    answer:
      "By checking each component independently rather than treating a green regression suite as sufficient on its own. A rollback plan that's never been tested isn't a rollback plan yet.",
  },
  {
    question: "What is a smoke test suite, in this context?",
    answer:
      "A fast, narrow pass over the critical paths identified in the readiness review, run right after deployment to catch a broken release before users do.",
  },
  {
    question: "How does this work for a hotfix or an emergency release?",
    answer:
      "A compressed version of the same framework: critical path validation and a tested rollback plan are non-negotiable, even when there isn't time for a full regression pass.",
  },
  {
    question: "Do you run the readiness review, or just define the framework?",
    answer:
      "Both, depending on what you need. Some teams take the framework and run it themselves. Others have us run the pre-release audit and go or no-go review directly.",
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

export default function ReleaseReadinessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="A go or no-go decision backed by more than one number"
        description="A regression suite that's green tells you less than it feels like it does. GoGreenlit's release readiness reviews check coverage, critical user paths, rollback plans, and monitoring together, so a sign-off actually reflects whether you're ready to ship."
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
              href="#coverage-areas"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See what gets checked
            </Link>
          </>
        }
      >
        Release readiness reviews that mean more than{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          a passing test run
        </span>
      </PageHero>

      <section
        id="coverage-areas"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What a real release readiness check covers
          </h2>
          <p className="text-muted-foreground mt-4">
            Six components checked independently, so a strong regression run
            can&rsquo;t paper over a rollback plan nobody&rsquo;s tested.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverageAreas.map((area, index) => (
            <ServiceCard key={area.title} {...area} index={index} />
          ))}
        </div>
      </section>

      <section
        id="framework"
        className="border-border/60 scroll-mt-16 border-t bg-[#b1c680]"
      >
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              How a readiness review runs
            </h2>
          </div>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Building a release checklist the whole team actually trusts
          </h2>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {checklistTraits.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
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
        title="Ready to know your next release is actually ready?"
        description="Tell us about your release cadence and what's slipped through before. We'll scope a readiness review in one call."
      />
    </>
  );
}
