import type { Metadata } from "next";
import Link from "next/link";
import {
  BatteryWarning,
  CheckCircle2,
  Component,
  Fingerprint,
  Layers,
  Lock,
  MonitorSmartphone,
  PackageCheck,
  PaintBucket,
  Smartphone,
  WifiOff,
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

const title = "Mobile App Testing Services";
const description =
  "Mobile app testing services for iOS and Android: device compatibility, offline behavior, React Native and Flutter, on real devices when it matters.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/software-testing-services/mobile-app-testing",
  },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/software-testing-services/mobile-app-testing`,
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

const coverage = [
  {
    icon: Smartphone,
    title: "Device compatibility",
    description:
      "Screen sizes, notched displays, foldables, and the manufacturer customizations that change how a layout actually renders.",
  },
  {
    icon: PackageCheck,
    title: "Installation and upgrade paths",
    description:
      "Fresh installs, version upgrades, data preservation, and the downgrade scenarios most teams never think to check.",
  },
  {
    icon: Lock,
    title: "Permission handling",
    description:
      "Denied permissions, runtime revocation, and whether the app degrades gracefully or just breaks.",
  },
  {
    icon: WifiOff,
    title: "Offline and poor network behavior",
    description:
      "What happens when a network drops mid-operation, and whether the app's data stays consistent when it comes back.",
  },
  {
    icon: BatteryWarning,
    title: "Battery and memory conditions",
    description:
      "Low battery, battery saver mode, and the memory leaks that only surface after extended real-world use.",
  },
  {
    icon: Layers,
    title: "Background and foreground transitions",
    description:
      "Whether state actually survives a backgrounding, and whether an in-progress operation resumes or just quietly fails.",
  },
];

const gaps = [
  "Testing only on the latest iOS or Android version, ignoring the users who haven't updated.",
  "Testing solely on the developer's own device, missing device-specific issues entirely.",
];

const crossPlatform = [
  {
    icon: Component,
    title: "React Native",
    description:
      "The shared JavaScript layer handles business logic, tested with Jest, but platform-specific bridges handle camera access, push notifications, deep linking, and native UI components. Those get tested separately: Detox on iOS, Appium on Android, since bridge implementations differ enough to need it.",
  },
  {
    icon: PaintBucket,
    title: "Flutter",
    description:
      "Flutter renders its own UI with its own graphics engine, which makes rendering more consistent across platforms than React Native, but it also means Flutter apps skip native UI components entirely, which raises its own accessibility testing considerations.",
  },
];

const devices = [
  {
    icon: MonitorSmartphone,
    title: "When an emulator is enough",
    description:
      "Most functional testing, UI layout verification, network throttling, basic performance profiling, and compatibility checks across standard screen sizes.",
  },
  {
    icon: Fingerprint,
    title: "When a real device is required",
    description:
      "Biometric authentication, camera and microphone behavior, Bluetooth and NFC, gyroscope and accelerometer response, real battery and thermal behavior, and push notifications on specific device and OS combinations.",
  },
];

const faqs = [
  {
    question: "Do you test on real devices?",
    answer:
      "Yes. BrowserStack's device cloud gives us broad coverage without a physical lab, and we maintain physical devices for what emulators handle poorly: biometric authentication, camera functionality, push notifications, and Bluetooth interactions.",
  },
  {
    question: "How do you handle Android fragmentation?",
    answer:
      "We prioritize device and OS combinations using your actual analytics, typically the last three major Android versions across the screen sizes and manufacturers your users are really on, not a theoretical full matrix.",
  },
  {
    question: "Can you test React Native apps?",
    answer:
      "Yes. Shared JavaScript business logic gets tested with Jest, and platform-specific UI and behavior gets dedicated test cases through Detox on iOS and Appium on Android.",
  },
  {
    question: "What is mobile performance testing?",
    answer:
      "Checking app behavior under real resource constraints: startup time, memory usage during extended use, CPU behavior during background tasks, and battery consumption for long-running operations, especially on mid-range Android devices where the margin for error is smaller.",
  },
  {
    question: "Do you test app store submission requirements?",
    answer:
      "Yes. We review against common App Store and Play Store rejection reasons, privacy policy completeness, permission justifications, content rating accuracy, and metadata, before you submit, not after a rejection costs you a release cycle.",
  },
];

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  { name: title, href: "/software-testing-services/mobile-app-testing" },
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

export default function MobileAppTestingPage() {
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
        badge="iOS, Android, React Native, and Flutter, tested on real devices when it matters"
        description="Mobile testing often gets reduced to tapping through the app on a simulator, checking that buttons do what they're supposed to. That's necessary, but it's not enough. Mobile apps fail in production for reasons that have nothing to do with button behavior: device fragmentation, permission handling, offline behavior, and battery conditions a simulator can't fully replicate."
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
              href="#coverage"
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
        Mobile testing services built for real devices,{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          not just simulators
        </span>
      </PageHero>

      <section
        id="coverage"
        className="mx-auto max-w-6xl scroll-mt-16 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            What mobile testing covers beyond tapping through the app
          </h2>
          <p className="text-muted-foreground mt-4">
            Functional testing on a simulator is necessary. It is not
            sufficient.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverage.map((item, index) => (
            <ServiceCard
              key={item.title}
              {...item}
              variant="bold"
              index={index}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            iOS and Android are different platforms
          </h2>
          <p className="text-muted-foreground mt-4">
            A team that tests only on one and assumes the other will be fine
            routinely ships platform-specific bugs a dedicated pass would have
            caught.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal className="border-border/60 rounded-lg border p-6">
            <h3 className="font-semibold">Android</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Fragmentation across thousands of device configurations and
              manufacturers. Custom OS layers like One UI and MIUI handle
              permissions, notifications, and background processing differently
              from stock Android. We prioritize the device and OS combinations
              your actual analytics show people using. Automated through
              Espresso natively or Appium cross-platform.
            </p>
          </Reveal>
          <Reveal className="border-border/60 rounded-lg border p-6" delay={80}>
            <h3 className="font-semibold">iOS</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              More consistent across devices since Apple controls the hardware,
              but App Store review requirements are stricter. Privacy policies,
              permission descriptions, and App Tracking Transparency need
              testing against Apple&rsquo;s policies with every major iOS
              version. Automated through XCUITest natively or Detox for React
              Native.
            </p>
          </Reveal>
        </div>

        <Reveal as="div" className="mx-auto mt-8 max-w-2xl">
          <ul className="grid gap-3">
            {gaps.map((gap) => (
              <li key={gap} className="flex gap-3">
                <CheckCircle2 className="text-primary mt-0.5 size-5 shrink-0" />
                <span className="text-foreground/90 text-sm">{gap}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-border/60 border-t bg-[#8fa175]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Testing cross-platform apps
            </h2>
            <p className="text-foreground/80 mt-4">
              React Native and Flutter each need their own testing approach,
              plus coverage of the integration points shared across both: deep
              links, push notifications, payment flows, and share sheets.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {crossPlatform.map(
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
            Real devices vs. emulators
          </h2>
          <p className="text-muted-foreground mt-4">
            Emulators are faster to set up and cover more configurations, but
            they can&rsquo;t fully replicate real device behavior for
            everything.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {devices.map(
            ({ icon: Icon, title: itemTitle, description }, index) => (
              <Reveal
                key={itemTitle}
                className="border-border/60 rounded-lg border p-5"
                delay={index * 80}
              >
                <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-3 font-semibold">{itemTitle}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {description}
                </p>
              </Reveal>
            ),
          )}
        </div>

        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center text-sm">
          For the middle ground, BrowserStack&rsquo;s real device cloud gives
          access to hundreds of physical devices without a lab to maintain, with
          reserved physical devices on hand for the scenarios cloud testing
          still can&rsquo;t cover.
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

      <RelatedLinks
        groups={getRelatedLinkGroups(
          "/software-testing-services/mobile-app-testing",
        )}
      />

      <CtaSection
        title="Ready to test your app on more than a simulator?"
        description="Tell us about your app, your platforms, and where you've been burned before. We'll scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
