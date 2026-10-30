import type { Metadata } from "next";
import Link from "next/link";
import {
  ActivitySquare,
  ArrowRightLeft,
  Archive,
  BarChart3,
  Boxes,
  Clock,
  Crosshair,
  Database,
  FlaskConical,
  Grid3x3,
  Hourglass,
  Percent,
  Wallet,
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

const title = "Selenium Automation Testing Services";
// Short label for the visible and JSON-LD breadcrumb, kept apart from the
// longer SEO title above.
const breadcrumbLabel = "Selenium Testing Services";
const description =
  "Selenium automation testing services: Page Object Model frameworks, wait strategy fixes, Selenium Grid, and CI integration that lasts past the first sprint.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/selenium-testing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/selenium-testing`,
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

const whenItFits = [
  "Your stack is already Java or Python, where Selenium is a natural fit.",
  "You have an existing Selenium suite worth extending, not replacing.",
  "Enterprise infrastructure constraints rule out newer tooling.",
  "Your team already knows Selenium well enough to maintain it.",
];

const frameworkComponents = [
  {
    icon: Boxes,
    title: "Page Object Model",
    description:
      "Each page gets its own class encapsulating selectors and interactions, so a UI change means updating one file, not every test that touches it.",
  },
  {
    icon: FlaskConical,
    title: "TestNG or JUnit, organized",
    description:
      "Tests grouped by suite and priority, not a flat folder of scripts nobody can navigate six months in.",
  },
  {
    icon: Database,
    title: "Data-driven testing",
    description:
      "Test logic separated from test data, so covering a new input case does not mean writing a new test.",
  },
  {
    icon: Hourglass,
    title: "Explicit wait strategy",
    description:
      "The single biggest predictor of a suite's long-term health. Explicit waits instead of hardcoded sleeps remove most of the flakiness we inherit.",
  },
  {
    icon: Grid3x3,
    title: "Selenium Grid at scale",
    description:
      "Parallel execution across browsers and environments, so a full suite does not cost you thirty minutes of pipeline time.",
  },
];

const maintenance = [
  {
    icon: ActivitySquare,
    title: "Track flakiness per test",
    description:
      "Any test failing intermittently above a 5% threshold gets flagged and fixed, not silently rerun until it passes.",
  },
  {
    icon: Crosshair,
    title: "Locator strategy audits",
    description:
      "Brittle selectors get replaced before they break, not after a UI update takes down half the suite.",
  },
  {
    icon: Clock,
    title: "Execution time reviews",
    description:
      "A suite that gets slower every sprint eventually stops running. We review timing regularly, not after someone complains.",
  },
  {
    icon: Archive,
    title: "Deprecate obsolete tests",
    description:
      "Coverage for a feature that no longer exists gets removed, not left in to fail quietly forever.",
  },
];

const assessment = [
  {
    icon: BarChart3,
    label: "Coverage value analysis",
    description:
      "What each test actually protects against, not just what it runs.",
  },
  {
    icon: Wallet,
    label: "Maintenance cost evaluation",
    description:
      "How many engineering hours your suite costs you per month right now.",
  },
  {
    icon: Percent,
    label: "Flakiness rate measurement",
    description:
      "A real number, not a guess, for how often tests fail for reasons that are not bugs.",
  },
  {
    icon: ArrowRightLeft,
    label: "Migration feasibility",
    description:
      "Whether a phased move to Playwright is worth it for your specific suite.",
  },
];

const faqs = [
  {
    question: "Should we switch from Selenium to Playwright?",
    answer:
      "It depends on what you have today. A well-maintained Selenium suite in Java or Python, run by a team that knows it, often is not worth switching. A brittle suite that is slowing your team down, or a brand new project, usually favors Playwright.",
  },
  {
    question: "How do you handle flaky Selenium tests?",
    answer:
      "Flakiness almost always comes from one of three places: timing issues, environment inconsistency, or fragile selectors. We diagnose which one is actually responsible before fixing it, rather than adding a retry and calling it solved.",
  },
  {
    question: "What is the Page Object Model and why does it matter?",
    answer:
      "A design pattern where each page in your app gets a class that owns its own selectors and interactions. When the UI changes, you update one class instead of every test that touches that page.",
  },
  {
    question: "Can Selenium run in our CI/CD pipeline?",
    answer:
      "Yes. Headless execution in GitHub Actions, Jenkins, or GitLab CI, with Selenium Grid for parallelization and artifact capture on failure, the same rigor we would wire up for a Playwright suite.",
  },
  {
    question:
      "How long does it take to build a Selenium framework from scratch?",
    answer:
      "A solid foundation, Page Object Model, wait strategy, CI wiring, takes two to three weeks. Meaningful coverage across your app takes two to three months, depending on how much surface area there is to test.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  {
    name: breadcrumbLabel,
    href: "/software-testing-services/selenium-testing",
  },
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

export default function SeleniumTestingPage() {
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
        badge="Page Object Model, Grid, stable waits"
        description="Selenium WebDriver has been part of web automation for over a decade, and for teams with an established Java or Python suite, real enterprise infrastructure constraints, or Selenium expertise already on staff, it is still the right tool. GoGreenlit builds and maintains Selenium frameworks that hold up, extending what you already have instead of forcing a rewrite for its own sake."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#framework"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See a well-built framework
            </Link>
          </>
        }
      >
        Selenium automation services that extend <em>what you already built</em>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="When it fits"
          title="When Selenium is the *right choice*"
          description="Selenium is not the default for new projects anymore, but it is still the right call in specific situations."
        />
        <CheckGrid items={whenItFits} className="mt-12" />
      </section>

      <section
        id="framework"
        className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="The framework"
          title="What a well-built Selenium framework *looks like*"
          description="Most inherited Selenium suites are missing one or more of these, which is exactly why they get flaky within six months."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frameworkComponents.map((item, index) => (
            <ServiceCard
              key={item.title}
              {...item}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <DeepBand
        eyebrow="Maintenance"
        title="Maintaining Selenium suites *without the firefighting*"
        description="Once a team stops trusting a red build, the suite has already failed at its job. This is how we keep that from happening."
        items={maintenance}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Migration"
          title="Wondering if it is time to move to *Playwright?*"
          description="We run every migration conversation through the same four-part assessment before recommending anything."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {assessment.map(({ icon, label, description }, index) => (
            <ServiceCard
              key={label}
              icon={icon}
              title={label}
              description={description}
              index={index}
            />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/software-testing-services/playwright-automation"
            className={ctaVariants({ variant: "outline", size: "md" })}
          >
            See our Playwright migration approach{" "}
            <span aria-hidden="true">&rarr;</span>
          </Link>
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
          "/software-testing-services/selenium-testing",
        )}
      />

      <CtaSection
        tone="leaf"
        title="Ready for a Selenium suite that does not *fight back?*"
        description="Tell us what you are running today and where it is slowing you down. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
