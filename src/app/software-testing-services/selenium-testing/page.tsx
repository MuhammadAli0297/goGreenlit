import type { Metadata } from "next";
import Link from "next/link";
import {
  ActivitySquare,
  ArrowRightLeft,
  Archive,
  BarChart3,
  Boxes,
  CheckCircle2,
  Clock,
  Crosshair,
  Database,
  FlaskConical,
  Grid3x3,
  Hourglass,
  Percent,
  Wallet,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "Selenium Testing Services";
const description =
  "Selenium test automation services from GoGreenlit: Page Object Model frameworks, wait strategy fixes, Selenium Grid, and CI integration that lasts.";

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
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [siteConfig.ogImage],
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
      "Test logic separated from test data, so covering a new input case doesn't mean writing a new test.",
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
      "Parallel execution across browsers and environments, so a full suite doesn't cost you thirty minutes of pipeline time.",
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
      "A real number, not a guess, for how often tests fail for reasons that aren't bugs.",
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
      "It depends on what you have today. A well-maintained Selenium suite in Java or Python, run by a team that knows it, often isn't worth switching. A brittle suite that's slowing your team down, or a brand new project, usually favors Playwright.",
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
      "Yes. Headless execution in GitHub Actions, Jenkins, or GitLab CI, with Selenium Grid for parallelization and artifact capture on failure, the same rigor we'd wire up for a Playwright suite.",
  },
  {
    question:
      "How long does it take to build a Selenium framework from scratch?",
    answer:
      "A solid foundation, Page Object Model, wait strategy, CI wiring, takes two to three weeks. Meaningful coverage across your app takes two to three months, depending on how much surface area there is to test.",
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

export default function SeleniumTestingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <PageHero
        badge="Page Object Model frameworks, wait strategy fixes, and Selenium Grid at scale"
        description="Selenium WebDriver has been part of web automation for over a decade, and for teams with an established Java or Python suite, real enterprise infrastructure constraints, or Selenium expertise already on staff, it is still the right tool. GoGreenlit builds and maintains Selenium frameworks that hold up, extending what you already have instead of forcing a rewrite for its own sake."
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
              href="#framework"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
              )}
            >
              See a well-built framework
            </Link>
          </>
        }
      >
        Selenium automation services that extend{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          what you already built
        </span>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            When Selenium is the right choice
          </h2>
          <p className="text-muted-foreground mt-4">
            Selenium is not the default for new projects anymore, but it is
            still the right call in specific situations.
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

      <section
        id="framework"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What a well-built Selenium framework looks like
          </h2>
          <p className="text-muted-foreground mt-4">
            Most inherited Selenium suites are missing one or more of these,
            which is exactly why they get flaky within six months.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frameworkComponents.map((component, index) => (
            <ServiceCard
              key={component.title}
              {...component}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Maintaining Selenium suites without the firefighting
            </h2>
            <p className="text-foreground/80 mt-4">
              Once a team stops trusting a red build, the suite has already
              failed at its job. This is how we keep that from happening.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {maintenance.map(
              ({ icon: Icon, title: itemTitle, description }, index) => (
                <Reveal
                  key={itemTitle}
                  className="flex flex-col items-center gap-3 text-center"
                  delay={index * 80}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#ee9e58] text-[#354639]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-foreground font-semibold">{itemTitle}</h3>
                  <p className="text-foreground/80 text-sm">{description}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Wondering if it is time to move to Playwright?
          </h2>
          <p className="text-muted-foreground mt-4">
            We run every migration conversation through the same four-part
            assessment before recommending anything.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {assessment.map(({ icon: Icon, label, description }, index) => (
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

        <p className="mt-10 text-center text-sm">
          <Link
            href="/software-testing-services/playwright-automation"
            className="text-primary font-medium hover:underline"
          >
            See our Playwright migration approach
          </Link>
        </p>
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
        title="Ready for a Selenium suite that doesn't fight back?"
        description="Tell us what you're running today and where it's slowing you down. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
