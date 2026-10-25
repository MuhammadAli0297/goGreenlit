import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Copy,
  FileCheck2,
  GaugeCircle,
  MessagesSquare,
  RefreshCw,
  Route,
  Target,
  UserCheck,
} from "lucide-react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { KnownIssuesDemo } from "@/components/marketing/known-issues-demo";
import { PageHero } from "@/components/marketing/page-hero";
import { PhaseTimeline } from "@/components/marketing/phase-timeline";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
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
      "Every deferred bug, documented explicitly with the reasoning for why it is acceptable to ship with it.",
  },
  {
    icon: RefreshCw,
    title: "Rollback plan",
    description:
      "A recovery procedure that is actually been tested, not just written down and hoped for.",
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

const deliverables = [
  {
    icon: FileCheck2,
    label: "A written go or no-go record",
    description:
      "The actual decision, who made it, and the reasoning behind it, documented so it is not just a Slack message people forget by the next release.",
  },
  {
    icon: UserCheck,
    label: "A named owner for the observation window",
    description:
      "Someone specific watching the metrics that matter after release, with a defined window and a clear trigger for when to roll back.",
  },
  {
    icon: Copy,
    label: "A reusable readiness template",
    description:
      "The checklist carries forward and gets refined release to release, instead of being rebuilt from memory every time.",
  },
  {
    icon: ClipboardList,
    label: "A one-page release summary",
    description:
      "What shipped, what is known and accepted, and what is being watched, written for people outside engineering to actually read.",
  },
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
      "By checking each component independently rather than treating a green regression suite as sufficient on its own. A rollback plan that is never been tested is not a rollback plan yet.",
  },
  {
    question: "What is a smoke test suite, in this context?",
    answer:
      "A fast, narrow pass over the critical paths identified in the readiness review, run right after deployment to catch a broken release before users do.",
  },
  {
    question: "How does this work for a hotfix or an emergency release?",
    answer:
      "A compressed version of the same framework: critical path validation and a tested rollback plan are non-negotiable, even when there is not time for a full regression pass.",
  },
  {
    question: "Do you run the readiness review, or just define the framework?",
    answer:
      "Both, depending on what you need. Some teams take the framework and run it themselves. Others have us run the pre-release audit and go or no-go review directly.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "QA Consulting", href: "/qa-consulting" },
  { name: title, href: "/qa-consulting/release-readiness" },
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

export default function ReleaseReadinessPage() {
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
        badge="A go or no-go you can defend"
        description="A regression suite that is green tells you less than it feels like it does. GoGreenlit's release readiness reviews check coverage, critical user paths, rollback plans, and monitoring together, so a sign-off actually reflects whether you are ready to ship."
        aside={<KnownIssuesDemo className="lg:rotate-[1.5deg]" />}
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#coverage-areas"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what gets checked
            </Link>
          </>
        }
      >
        Release readiness reviews that mean more than{" "}
        <em>a passing test run</em>
      </PageHero>

      <section
        id="coverage-areas"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="What is checked"
          title="What a real release readiness check *covers*"
          description="Six components checked independently, so a strong regression run cannot paper over a rollback plan nobody has tested."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverageAreas.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </section>

      <section
        id="framework"
        className="bg-olive border-ink scroll-mt-16 border-y-[1.5px]"
      >
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="font-label text-xs tracking-widest uppercase">
              The review
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic">
              How a readiness review <em>runs</em>
            </h2>
          </Reveal>

          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="The checklist"
          title="Building a release checklist the whole team *actually trusts*"
        />
        <CheckGrid items={checklistTraits} className="mt-12" />
      </section>

      <DeepBand
        eyebrow="Deliverables"
        title="What a completed review *leaves you with*"
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
        groups={getRelatedLinkGroups("/qa-consulting/release-readiness")}
      />

      <CtaSection
        tone="olive"
        title="Ready to know your next release is *actually ready?*"
        description="Tell us about your release cadence and what has slipped through before. We will scope a readiness review in one call."
      />
    </>
  );
}
