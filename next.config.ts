import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonce here deliberately: a strict nonce-based CSP requires every page
// to opt into dynamic rendering (Next can only inject a nonce per-request),
// which would drop static generation, CDN edge caching, and ISR sitewide,
// the exact things this site's fast TTFB and edge-cached HTML depend on.
// The site has no user-generated content, forms, or dynamic user input
// rendered anywhere, so the realistic XSS surface 'unsafe-inline' gives up
// is low, and this is Next's own documented path for sites that don't need
// nonces (see node_modules/next/dist/docs/.../content-security-policy.md,
// "Without Nonces" section).
// GA4 (added when NEXT_PUBLIC_GA_MEASUREMENT_ID is set at build time). The
// extra origins are only added when analytics is on, so the policy stays
// tight otherwise. Origins follow Google's own CSP guidance for gtag.js:
// the script itself, the collection endpoints, and the tracking pixel.
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const gaScript = gaEnabled ? " https://www.googletagmanager.com" : "";
const gaImg = gaEnabled
  ? " https://*.google-analytics.com https://*.googletagmanager.com"
  : "";
const gaConnect = gaEnabled
  ? " https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
  : "";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${gaScript};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:${gaImg};
  font-src 'self';
  connect-src 'self'${gaConnect};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/software-testing-services/qa-strategy-process",
        destination: "/qa-consulting/test-strategy-consulting",
        permanent: true,
      },
      {
        source: "/software-testing-services/website-testing",
        destination: "/software-testing-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
