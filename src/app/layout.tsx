import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

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
// uppercase labels, statuses and numbers (the `font-label` utility).
// next/font self-hosts it at build time, so there is no request to Google
// and the CSP needs no change. Preloaded on purpose: the breadcrumb row is
// mono and wraps differently in the fallback font, so a late swap shifted
// every page below it (CLS 0.19 on the QA Consulting subpages, gotcha #65).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
