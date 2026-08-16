import { siteConfig } from "@/lib/site-config";

interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Builds a schema.org BreadcrumbList JSON-LD object, "Home" first, current
 * page last. Every non-home page renders one via its own inline <script>,
 * matching the FAQPage/BlogPosting JSON-LD already done that way per page.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item:
        item.href === "/" ? siteConfig.url : `${siteConfig.url}${item.href}`,
    })),
  };
}
