import type { Metadata } from "next";
import localFont from "next/font/local";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { buildFounderPersonSchema, founders } from "@/lib/founders";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const bespokeSerif = localFont({
  src: [
    {
      path: "./fonts/BespokeSerif-Variable.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "./fonts/BespokeSerif-VariableItalic.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

// The one new typeface of the Live Build redesign, used only for small
// uppercase labels, statuses and numbers (the `font-label` utility). It is
// a 12KB subset of JetBrains Mono (basic and Latin-1 characters, arrows,
// the weight axis cut to 400 to 500, no code ligatures, OFL licence) self-hosted next to Bespoke Serif instead of loaded through
// `next/font/google`: the Google loader emitted a face for every script
// (cyrillic, greek and more, about 3KB of CSS for files that never load) and
// put the font CSS in a second stylesheet, an extra render-blocking request.
// Preloaded on purpose: the breadcrumb row is mono and wraps differently in
// the fallback font, so a late swap shifted every page below it (gotcha #65).
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Latin-Variable.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.metaDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.metaDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description: siteConfig.metaDescription,
  logo: `${siteConfig.url}/apple-icon`,
  sameAs: siteConfig.sameAs,
  founder: founders.map(buildFounderPersonSchema),
  areaServed: "Remote",
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.locality,
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.country,
  },
  makesOffer: [
    "Manual QA testing",
    "Playwright test automation",
    "Selenium test automation",
    "API and data testing",
    "QA strategy consulting",
    "Regression testing",
    "Mobile app testing",
    "QA audit and assessment",
    "QA process design",
    "CI/CD quality gates",
    "Release readiness review",
    "Embedded QA team",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bespokeSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="border-ink bg-navajo text-ink font-label sr-only rounded-full border-[1.5px] text-xs tracking-widest uppercase shadow-[3px_3px_0_var(--ink)] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-5 focus:py-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
