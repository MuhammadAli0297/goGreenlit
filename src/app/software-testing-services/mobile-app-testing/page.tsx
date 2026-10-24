import type { Metadata } from "next";
import Link from "next/link";
import {
  BatteryWarning,
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

import { ctaVariants } from "@/components/brand/cta-variants";
import { StickerCard } from "@/components/brand/sticker-card";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { CheckGrid } from "@/components/marketing/check-grid";
import { CtaSection } from "@/components/marketing/cta-section";
import { DeepBand } from "@/components/marketing/deep-band";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { PageHero } from "@/components/marketing/page-hero";
import { RelatedLinks } from "@/components/marketing/related-links";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { ServiceCard } from "@/components/marketing/service-card";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { getRelatedLinkGroups } from "@/lib/related-pages";
import { siteConfig } from "@/lib/site-config";

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
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
  "Testing only on the latest iOS or Android version, ignoring the users who have not updated.",
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

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Software Testing Services", href: "/software-testing-services" },
  { name: title, href: "/software-testing-services/mobile-app-testing" },
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

      <Breadcrumbs items={breadcrumbItems} />

      <PageHero
        tone="leaf"
        badge="iOS, Android, and real devices"
        description="Mobile testing often gets reduced to tapping through the app on a simulator, checking that buttons do what they are supposed to. That is necessary, but it is not enough. Mobile apps fail in production for reasons that have nothing to do with button behavior: device fragmentation, permission handling, offline behavior, and battery conditions a simulator cannot fully replicate."
        ctas={
          <>
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="#coverage"
              className={ctaVariants({ variant: "outline", size: "xl" })}
            >
              See what we test
            </Link>
          </>
        }
      >
        Mobile testing services built for real devices,{" "}
        <em>not just simulators</em>
      </PageHero>

      <section
        id="coverage"
        className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <SectionIntro
          eyebrow="Coverage"
          title="What mobile testing covers *beyond tapping* through the app"
          description="Functional testing on a simulator is necessary. It is not sufficient."
        />
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

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Platforms"
          title="iOS and Android are *different platforms*"
          description="A team that tests only on one and assumes the other will be fine routinely ships platform-specific bugs a dedicated pass would have caught."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Reveal className="h-full">
            <StickerCard
              tone="surface"
              interactive={false}
              className="h-full p-7"
            >
              <h3 className="text-2xl font-semibold tracking-tight">Android</h3>
              <p className="mt-3 text-[15px] leading-relaxed">
                Fragmentation across thousands of device configurations and
                manufacturers. Custom OS layers like One UI and MIUI handle
                permissions, notifications, and background processing
                differently from stock Android. We prioritize the device and OS
                combinations your actual analytics show people using. Automated
                through Espresso natively or Appium cross-platform.
              </p>
            </StickerCard>
          </Reveal>
          <Reveal className="h-full" delay={80}>
            <StickerCard
              tone="surface"
              interactive={false}
              className="h-full p-7"
            >
              <h3 className="text-2xl font-semibold tracking-tight">iOS</h3>
              <p className="mt-3 text-[15px] leading-relaxed">
                More consistent across devices since Apple controls the
                hardware, but App Store review requirements are stricter.
                Privacy policies, permission descriptions, and App Tracking
                Transparency need testing against Apple&rsquo;s policies with
                every major iOS version. Automated through XCUITest natively or
                Detox for React Native.
              </p>
            </StickerCard>
          </Reveal>
        </div>
        <CheckGrid items={gaps} tone="bug" className="mt-8" />
      </section>

      <DeepBand
        eyebrow="Cross-platform"
        title="Testing *cross-platform* apps"
        description="React Native and Flutter each need their own testing approach, plus coverage of the integration points shared across both: deep links, push notifications, payment flows, and share sheets."
        items={crossPlatform}
      />

      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Real devices"
          title="Real devices *vs. emulators*"
          description="Emulators are faster to set up and cover more configurations, but they cannot fully replicate real device behavior for everything."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {devices.map((item, index) => (
            <ServiceCard key={item.title} {...item} index={index} />
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[15px]">
          For the middle ground, BrowserStack&rsquo;s real device cloud gives
          access to hundreds of physical devices without a lab to maintain, with
          reserved physical devices on hand for the scenarios cloud testing
          still cannot cover.
        </p>
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
          "/software-testing-services/mobile-app-testing",
        )}
      />

      <CtaSection
        tone="leaf"
        title="Ready to test your app on more than *a simulator?*"
        description="Tell us about your app, your platforms, and where you have been burned before. We will scope an engagement in one call, no long-term contract required."
      />
    </>
  );
}
