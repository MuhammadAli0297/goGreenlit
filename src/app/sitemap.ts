import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/manual-testing`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/playwright-automation`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/selenium-testing`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/api-data-testing`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/regression-testing`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/software-testing-services/mobile-app-testing`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/embedded-qa-team`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/test-strategy-consulting`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/qa-process-design`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/cicd-quality-gates`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/qa-audit-assessment`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/qa-consulting/release-readiness`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
    },
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
