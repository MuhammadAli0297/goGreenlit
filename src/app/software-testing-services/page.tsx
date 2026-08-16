import type { Metadata } from "next";
import Link from "next/link";
import {
  Bug,
  CheckCircle2,
  GaugeCircle,
  Globe,
  Radar,
  RefreshCw,
  Smartphone,
  Target,
  TestTubeDiagonal,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

const title = "Software Testing Services";
const description =
  "Embedded software testing services: manual QA, Playwright and Selenium automation, API and regression testing, all run inside your sprint, not after it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services`,
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

const sprintSteps = [
  "Test cases get written in sprint planning, not after the code is done.",
  "Execution happens alongside development, sprint by sprint.",
  "Coverage and findings get reported in your own standups.",
  "Defects are filed and triaged before a release ships, not discovered after.",
];

const offerings = [
  {
    icon: TestTubeDiagonal,
    title: "Manual testing",
    description:
      "Hands-on exploratory sessions, user acceptance testing, and usability review, testing the product the way your actual customers will use it, not a scripted checklist.",
  },
  {
    icon: Workflow,
    title: "Playwright automation",
    description:
      "TypeScript end-to-end suites checked into your repository, covering multiple browsers, and wired into your CI so a failing test blocks a bad merge instead of a bad release.",
  },
  {
    icon: Bug,
    title: "Selenium testing",
    description:
      "Enterprise automation frameworks built on the Page Object Model, with parallel execution, for teams that already depend on a Selenium suite and need it extended, not rebuilt.",
  },
  {
    icon: Webhook,
    title: "API and data testing",
    description:
      "Contract testing for REST and GraphQL endpoints, plus validation of the ETL jobs and data pipelines that never show up in a UI test but break production just as often.",
  },
  {
    icon: Target,
    title: "QA strategy and process",
    description:
      "Risk-based test planning, a testing pyramid sized to your stack, and sprint-level coverage metrics that show where your actual exposure is, not a generic audit.",
  },
  {
    icon: Globe,
    title: "Website testing",
    description:
      "Functional QA across your marketing site or web app, cross-browser and cross-device compatibility checks, and an accessibility pass so the experience holds up for every visitor.",
  },
  {
    icon: RefreshCw,
    title: "Regression testing",
    description:
      "Automated regression triggered on every pull request and every deployment, risk-prioritized so the checks that matter most run first.",
  },
  {
    icon: Smartphone,
    title: "Mobile testing",
    description:
      "iOS and Android testing across real device and OS combinations, covering functionality, compatibility, and performance before a build reaches the app store.",
  },
];

const approach = [
  {
    icon: Radar,
    title: "Shift-left by default",
    description:
      "Test cases get written in sprint planning and smoke tests run pre-merge, so a defect gets caught before it's merged, not after it's shipped.",
  },
  {
    icon: Users,
    title: "Embedded in your ceremonies",
    description:
      "Your QA engineer sits in standups and retros like any other engineer on the team, not a vendor waiting on a status update.",
  },
  {
    icon: GaugeCircle,
    title: "Coverage you can actually see",
    description:
      "We track functional test execution, pass rates, and production escapes, the metrics that predict a bad release, not a code coverage percentage that doesn't.",
  },
];

const stack = [
  {
    label: "Frontend",
    tools: "React, Next.js, Vue, Angular, and server-rendered apps",
  },
  {
    label: "Backend",
    tools: "Node.js, Python, Java, and Go APIs",
  },
  {
    label: "Databases",
    tools: "PostgreSQL, MySQL, MongoDB, and Redis",
  },
  {
    label: "Infrastructure",
    tools: "AWS, GCP, and Azure",
  },
  {
    label: "Testing tools",
    tools: "Playwright, Selenium, Postman, REST Assured, PyTest, and Appium",
  },
  {
    label: "CI/CD",
    tools: "GitHub Actions, Jenkins, GitLab CI, and CircleCI",
  },
];

const faqs = [
  {
    question: "What's included in outsourced software testing services?",
    answer:
      "Manual testing, automated regression, API and data testing, and full test automation builds, all delivered by an engineer embedded in your sprint rather than a separate testing queue.",
  },
  {
    question: "How long does it take a QA engineer to ramp up on our product?",
    answer:
      "Most engagements reach active contribution within 5 to 7 business days: enough time to review your codebase and existing test documentation and get tool access set up, then join sprint ceremonies from day seven onward.",
  },
  {
    question: "Should we use manual or automated testing?",
    answer:
      "Both, for different reasons. Manual testing is where judgment matters, exploratory sessions and usability review a script can't replace. Automated testing is where scale matters, regression coverage that needs to run on every build. Most engagements run them in parallel rather than picking one.",
  },
  {
    question: "Which automation framework do you use?",
    answer:
      "Playwright by default for new automation work. If your team already has a Selenium suite, we maintain and extend it rather than forcing a rewrite for its own sake.",
  },
  {
    question: "Can you test APIs and microservices, not just the UI?",
    answer:
      "Yes. REST and GraphQL contract testing, and coverage at the service boundary, so a change in one microservice gets caught before it breaks another.",
  },
  {
    question: "How often should regression testing run?",
    answer:
      "Automated regression runs on every pull request. A fuller manual pass before a production release is worth scheduling weekly or biweekly, depending on how often you actually ship.",
  },
  {
    question: "What kind of defect reduction should we expect?",
    answer:
      "Teams that embed a QA engineer into their sprint from day one have seen a 45% reduction in escaped defects within the first 90 days. The mechanism is simple: catching a bug during the sprint that wrote it, instead of after a release ships.",
  },
  {
    question: "What happens during onboarding?",
    answer:
      "A 30 minute kickoff call, a review of your existing documentation, and access set up for your test tools and repositories. From there, your QA engineer joins sprint ceremonies alongside the rest of your team.",
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

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: title, href: "/software-testing-services" },
]);

export default function SoftwareTestingServicesPage() {
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

      <PageHero
        badge="Manual and automated testing, embedded in your sprint"
        description="Most QA vendors test after your team ships and hand defects back on their own schedule. GoGreenlit’s QA engineers join your sprint itself: writing test cases in planning, executing them alongside development, and filing defects before a release goes out, not after."
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
              href="#offerings"
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
        Software testing services that plug into{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          your sprint
        </span>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Testing across every layer, not just the UI
          </h2>
          <p className="text-muted-foreground mt-4">
            We test the interface your users touch, the APIs and data pipelines
            behind it, and the cross-browser and regression coverage that keeps
            a release from breaking something that used to work. None of it
            happens in a separate cycle bolted onto the end of a sprint.
          </p>
        </div>

        <Reveal
          as="div"
          className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2"
        >
          <ul className="col-span-full grid gap-4 sm:grid-cols-2">
            {sprintSteps.map((step) => (
              <li key={step} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{step}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section
        id="offerings"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Every service your product&rsquo;s testing pyramid needs
          </h2>
          <p className="text-muted-foreground mt-4">
            From hands-on manual sessions to automated suites running in your
            CI, each engagement is scoped around your stack and your release
            cadence, not a fixed package.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((offering, index) => (
            <ServiceCard
              key={offering.title}
              {...offering}
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
              How we work inside your sprint
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {approach.map(
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
            Built to test the stack you already run
          </h2>
          <p className="text-muted-foreground mt-4">
            Your QA engineer adapts to the stack you already have, not the other
            way around. A sample of what we test against regularly:
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map(({ label, tools }, index) => (
            <Reveal
              key={label}
              className="border-border/60 rounded-lg border p-5"
              delay={index * 80}
            >
              <h3 className="font-semibold">{label}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{tools}</p>
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
        title="Ready to see it inside your own sprint?"
        description="Tell us what you're building, how often you ship, and where testing is falling through the cracks. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
