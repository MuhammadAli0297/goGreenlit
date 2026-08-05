import {
  Bug,
  CalendarClock,
  ClipboardCheck,
  Compass,
  Eye,
  Handshake,
  RefreshCw,
  Rocket,
  Target,
  TestTubeDiagonal,
  UserCheck,
  Users,
  Webhook,
  Workflow,
} from "lucide-react";

import { CtaSection } from "@/components/marketing/cta-section";
import { Hero } from "@/components/marketing/hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatBand } from "@/components/marketing/stat-band";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    icon: TestTubeDiagonal,
    title: "Manual testing",
    description:
      "Exploratory testing, user acceptance testing, and smoke testing from engineers who read your product the way a real user would, not just a script.",
  },
  {
    icon: Workflow,
    title: "Playwright automation",
    description:
      "End-to-end suites written in TypeScript, checked into your repository, and run in your CI on every pull request, not handed back as a black box.",
  },
  {
    icon: Bug,
    title: "Selenium testing",
    description:
      "Enterprise-grade automation frameworks for teams with an existing Selenium suite that needs its coverage extended, not replaced from scratch.",
  },
  {
    icon: Webhook,
    title: "API and data testing",
    description:
      "REST and GraphQL contract testing, schema validation, and data integrity checks that catch backend regressions before they reach your frontend.",
  },
  {
    icon: RefreshCw,
    title: "Regression testing",
    description:
      "Risk-prioritized automated regression that runs against every release, so the features your users already depend on keep working.",
  },
  {
    icon: Target,
    title: "QA strategy",
    description:
      "Testing pyramid design, coverage metrics, and a QA roadmap built around your actual release cadence, not a generic template.",
  },
];

const differentiators = [
  {
    icon: CalendarClock,
    title: "No long-term contracts",
    description:
      "Month-to-month engagements. If we are not earning our seat in your sprint, you should be free to walk away.",
  },
  {
    icon: UserCheck,
    title: "Founder-led engagements",
    description: `${siteConfig.founders} are hands-on in every engagement, not just the sales call.`,
  },
  {
    icon: Handshake,
    title: "Embedded in your sprint",
    description:
      "Your QA engineer joins your standups, your backlog, and your team chat, working alongside your developers instead of behind a ticket queue.",
  },
  {
    icon: Eye,
    title: "Transparent reporting",
    description:
      "You see the same defect tracking and coverage dashboards we do, updated as we test, not summarized after the fact.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery call",
    description:
      "A founder walks through your product, your stack, and where your test coverage is thinnest right now.",
  },
  {
    step: "02",
    title: "Sprint onboarding",
    description:
      "Your embedded QA engineer joins your sprint, your tools, and your standups, typically within days.",
  },
  {
    step: "03",
    title: "Embedded testing",
    description:
      "Manual coverage where it matters most, automation where it compounds, and defect tracking that keeps escaped bugs out of production.",
  },
  {
    step: "04",
    title: "Continuous improvement",
    description:
      "We tighten your CI/CD quality gates and testing pyramid release over release, so your release coverage keeps climbing.",
    icon: Rocket,
  },
];

const consultingOfferings = [
  {
    icon: Compass,
    title: "Test strategy consulting",
    description:
      "We design your testing pyramid, define coverage metrics, and set the quality gates that match how fast your team actually ships.",
  },
  {
    icon: Users,
    title: "Embedded QA team",
    description:
      "A dedicated QA engineer who ramps into your sprint cycle fast and stays for as long as you need embedded coverage.",
  },
  {
    icon: ClipboardCheck,
    title: "CI/CD quality gates",
    description:
      "Automated checks wired into your pipeline that block what matters and stay out of the way of everything else.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <StatBand />

      <section
        id="services"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Software testing services built for shipping teams
          </h2>
          <p className="text-muted-foreground mt-4">
            Our QA engineers cover the full testing pyramid, from hands-on
            manual sessions to automated regression suites, so nothing slips
            through before a release.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Built different from other QA shops
            </h2>
            <p className="text-foreground mt-4">
              We embed inside your sprints instead of testing from the outside.
              Same standups, same tickets, same release date.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {differentiators.map(
              ({ icon: Icon, title, description }, index) => (
                <Reveal key={title} className="flex gap-4" delay={index * 80}>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ee9e58] text-[#354639]">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">{title}</h3>
                    <p className="text-foreground/80 mt-1 text-sm">
                      {description}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="qa-consulting"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Not just testing. Strategy and process too.
          </h2>
          <p className="text-muted-foreground mt-4">
            Some engagements need hands-on testing today. Others need a QA
            strategy that outlasts any single sprint. We do both.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {consultingOfferings.map((offering, index) => (
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
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              From kickoff call to shipped release
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 sm:grid-rows-[auto_auto_1fr] lg:grid-cols-4">
            {processSteps.map(
              ({ step, title, description, icon: Icon }, index) => (
                <Reveal
                  key={step}
                  as="li"
                  delay={index * 80}
                  className="row-span-3 grid grid-rows-subgrid gap-3"
                >
                  <span className="text-foreground font-mono text-sm">
                    {step}
                  </span>
                  <h3 className="text-foreground font-semibold">
                    {Icon ? (
                      <Icon className="text-foreground mb-1 inline size-4" />
                    ) : null}{" "}
                    {title}
                  </h3>
                  <p className="text-foreground/80 text-sm">{description}</p>
                </Reveal>
              ),
            )}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
