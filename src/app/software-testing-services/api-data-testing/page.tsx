import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  CheckSquare,
  FileJson2,
  FileSignature,
  Gauge,
  Handshake,
  KeyRound,
  Repeat2,
  Ruler,
  Scale,
  Send,
  ShieldAlert,
  Terminal,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { buttonVariants } from "@/components/ui/button";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "API and Data Testing Services";
const description =
  "API and data testing services from GoGreenlit: functional, contract, schema, and security testing for REST and GraphQL, plus data integrity checks.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/api-data-testing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/api-data-testing`,
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

const layers = [
  {
    icon: CheckSquare,
    title: "Functional testing",
    description:
      "Every endpoint checked against its own documentation, response structure included, not just a passing status code.",
  },
  {
    icon: FileSignature,
    title: "Contract testing",
    description:
      "Schema adherence between consumer and provider, so a change on one side of an integration gets flagged before it breaks the other.",
  },
  {
    icon: ShieldAlert,
    title: "Negative testing",
    description:
      "Invalid input, malformed requests, and edge cases, checked for consistent, non-leaky error responses.",
  },
  {
    icon: KeyRound,
    title: "Security testing",
    description:
      "Authentication, data access controls, and error messages checked for what they accidentally expose.",
  },
  {
    icon: FileJson2,
    title: "Schema validation",
    description:
      "Responses checked against their schema on every run, so a breaking change gets caught in CI, not in a client integration.",
  },
  {
    icon: Gauge,
    title: "Performance basics",
    description:
      "Baseline response time validation under normal load, enough to catch a regression before it reaches a real performance test.",
  },
];

const tools = [
  {
    icon: Send,
    label: "Postman",
    description:
      "Exploratory testing and collection-based regression suites, run through Newman in CI.",
  },
  {
    icon: Terminal,
    label: "REST Assured",
    description:
      "A fluent Java library wired into TestNG or JUnit for teams already running a Java API suite.",
  },
  {
    icon: FileJson2,
    label: "PyTest with requests",
    description:
      "Python API testing following the same Page Object Model discipline as our UI suites.",
  },
  {
    icon: Handshake,
    label: "Pact",
    description:
      "Contract testing across services, with broker integration so a breaking change is caught before it ships.",
  },
];

const dataIntegrity = [
  {
    icon: Scale,
    title: "Business rule enforcement",
    description:
      "Rules checked at the API layer and the database layer, so a bug that only shows up in the data gets caught too.",
  },
  {
    icon: Ruler,
    title: "Boundary condition testing",
    description:
      "The edge cases around a limit, not just the limit itself, where most data bugs actually live.",
  },
  {
    icon: FileSignature,
    title: "Database state verification",
    description:
      "What actually landed in the database after an operation, checked directly, not inferred from the API response.",
  },
  {
    icon: Repeat2,
    title: "Idempotency verification",
    description:
      "A duplicate request should not double-charge a customer or double-create a record. We test for that directly.",
  },
];

const pipelineStages = [
  "Pre-merge gates run a focused set of critical-path tests in under two minutes.",
  "Staging suites hit real services, CI suites hit mocked dependencies, each for what it is actually good at.",
  "Contract registries catch a breaking change between services before it ever reaches production.",
];

const faqs = [
  {
    question:
      "What's the difference between API testing and integration testing?",
    answer:
      "API testing validates the behavior of a single endpoint. Integration testing validates how multiple services behave together. Most real API testing engagements include some of both, since the two overlap more than the labels suggest.",
  },
  {
    question: "What tools do you use for API testing?",
    answer:
      "Postman for exploratory work, REST Assured for Java stacks, PyTest with requests for Python, and Pact for contract testing. Which one depends on what your team already runs, not a fixed toolkit we apply everywhere.",
  },
  {
    question: "Can you test GraphQL APIs?",
    answer:
      "Yes, query and mutation validation, schema validation, error handling, and authorization checks, the same rigor we apply to REST, adapted to how GraphQL actually behaves.",
  },
  {
    question: "What is contract testing?",
    answer:
      "Verification that a consumer and a provider service agree on the shape of their interaction. It catches a breaking change on either side before it reaches production, instead of after a client integration fails.",
  },
  {
    question: "How do you test authenticated APIs?",
    answer:
      "OAuth 2.0, JWT, API keys, and session-based authentication are all supported, with secrets handled through your CI/CD provider's own secret management, not hardcoded into a test file.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  { name: title, href: "/software-testing-services/api-data-testing" },
]);

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

export default function ApiDataTestingPage() {
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
        badge="Functional, contract, schema, and security testing for REST and GraphQL"
        description="A bug caught at the API layer is cheap to fix. The same bug caught in a UI test, or by a user, is not. GoGreenlit tests the layer underneath your interface: endpoints, contracts, schemas, and the data integrity checks that never show up on a screen but break production just as often."
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
              href="#layers"
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
        API and data testing services built to catch problems{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          at the source
        </span>
      </PageHero>

      <section
        id="layers"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What API testing actually covers
          </h2>
          <p className="text-muted-foreground mt-4">
            Real API testing goes well past checking for a 200 status code.
            These are the layers we actually test.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, index) => (
            <ServiceCard
              key={layer.title}
              {...layer}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Tools we use, matched to your stack
          </h2>
          <p className="text-muted-foreground mt-4">
            Which tool we reach for depends on what your team already runs, not
            a fixed toolkit applied everywhere.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ icon: Icon, label, description }, index) => (
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

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Data integrity testing
            </h2>
            <p className="text-foreground/80 mt-4">
              The checks that never show up in an API response but break
              production just as often.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dataIntegrity.map(
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
            API tests in your CI/CD pipeline
          </h2>
          <p className="text-muted-foreground mt-4">
            A suite that only runs on demand catches problems too late. This is
            how it stays continuous.
          </p>
        </div>

        <Reveal as="div" className="mx-auto mt-12 max-w-2xl">
          <ul className="grid gap-4">
            {pipelineStages.map((stage) => (
              <li key={stage} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{stage}</span>
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

      <RelatedLinks
        groups={getRelatedLinkGroups(
          "/software-testing-services/api-data-testing",
        )}
      />

      <CtaSection
        title="Ready to test the layer underneath your UI?"
        description="Tell us what your API and data layer looks like today. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
