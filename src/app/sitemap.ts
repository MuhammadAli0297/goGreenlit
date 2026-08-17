import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

/**
 * Real last-changed date per static route, not a build-time `new Date()`.
 * Bump a route's date here when its content meaningfully changes, the same
 * upkeep blog posts already require via their own `date` field.
 */
const staticRouteLastModified: Record<string, string> = {
  "": "2026-08-05",
  "/software-testing-services": "2026-08-16",
  "/software-testing-services/manual-testing": "2026-08-16",
  "/software-testing-services/playwright-automation": "2026-08-16",
  "/software-testing-services/selenium-testing": "2026-08-16",
  "/software-testing-services/api-data-testing": "2026-08-16",
  "/software-testing-services/regression-testing": "2026-08-16",
  "/software-testing-services/mobile-app-testing": "2026-08-16",
  "/qa-consulting": "2026-08-16",
  "/qa-consulting/embedded-qa-team": "2026-08-16",
  "/qa-consulting/test-strategy-consulting": "2026-08-16",
  "/qa-consulting/qa-process-design": "2026-08-16",
  "/qa-consulting/cicd-quality-gates": "2026-08-16",
  "/qa-consulting/qa-audit-assessment": "2026-08-16",
  "/qa-consulting/release-readiness": "2026-08-16",
  "/about": "2026-08-16",
  "/blog": "2026-08-16",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(staticRouteLastModified).map(([path, date]) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(date),
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
