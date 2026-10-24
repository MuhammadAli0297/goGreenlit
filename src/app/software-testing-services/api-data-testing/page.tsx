import type { Metadata } from "next";
import Link from "next/link";
import {
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
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
      "What is the difference between API testing and integration testing?",
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

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  { name: title, href: "/software-testing-services/api-data-testing" },
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

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        tone="leaf"
        badge="REST, GraphQL, contract and security"
        description="A bug caught at the API layer is cheap to fix. The same bug caught in a UI test, or by a user, is not. GoGreenlit tests the layer underneath your interface: endpoints, contracts, schemas, and the data integrity checks that never show up on a screen but break production just as often."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#layers"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what we test
            </Link>
          </>
        }
      >
        API and data testing services built to catch problems{" "}
        <em>at the source</em>
      </PageHero>

      <section
        id="layers"
        className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Layers"
          title="What API testing *actually* covers"
          description="Real API testing goes well past checking for a 200 status code. These are the layers we actually test."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((item, index) => (
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
          eyebrow="Tools"
          title="Tools we use, matched to your *stack*"
          description="Which tool we reach for depends on what your team already runs, not a fixed toolkit applied everywhere."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(({ icon, label, description }, index) => (
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

      <DeepBand
        eyebrow="Data"
        title="Data *integrity* testing"
        description="The checks that never show up in an API response but break production just as often."
        items={dataIntegrity}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="CI/CD"
          title="API tests in your *CI/CD* pipeline"
          description="A suite that only runs on demand catches problems too late. This is how it stays continuous."
        />
        <CheckGrid items={pipelineStages} className="mt-12" />
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
          "/software-testing-services/api-data-testing",
        )}
      />

      <CtaSection
        tone="leaf"
        title="Ready to test the layer underneath *your UI?*"
        description="Tell us what your API and data layer looks like today. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
