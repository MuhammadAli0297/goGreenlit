export interface NavItem {
  label: string;
  href: string;
  /** Subpages rendered as a dropdown under this item, see SiteHeader. */
  items?: readonly { label: string; href: string }[];
  /** Label for the dropdown's link back to `href` itself. Defaults to "All {label}" in SiteHeader if omitted. */
  overviewLabel?: string;
  /** Shorter label shown below the `sm` breakpoint, where the header has no room for every full label at once. Defaults to `label`. */
  shortLabel?: string;
}

/**
 * Top-level header nav links, in display order. Add a new page here
 * rather than hardcoding it in site-header.tsx. An item with `items`
 * renders as a dropdown (see SiteHeader): `href` is still the link for
 * the item's own label (the overview page), `items` are its subpages.
 */
export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/software-testing-services",
    overviewLabel: "All testing services",
    items: [
      {
        label: "Manual Testing",
        href: "/software-testing-services/manual-testing",
      },
      {
        label: "Playwright Automation",
        href: "/software-testing-services/playwright-automation",
      },
      {
        label: "Selenium Testing",
        href: "/software-testing-services/selenium-testing",
      },
      {
        label: "API Testing",
        href: "/software-testing-services/api-data-testing",
      },
      {
        label: "Regression Testing",
        href: "/software-testing-services/regression-testing",
      },
      {
        label: "Mobile Testing",
        href: "/software-testing-services/mobile-app-testing",
      },
    ],
  },
  {
    label: "QA Consulting",
    shortLabel: "QA",
    href: "/qa-consulting",
    overviewLabel: "QA consulting overview",
    items: [
      {
        label: "Embedded QA Team",
        href: "/qa-consulting/embedded-qa-team",
      },
      {
        label: "Test Strategy",
        href: "/qa-consulting/test-strategy-consulting",
      },
      {
        label: "QA Process Design",
        href: "/qa-consulting/qa-process-design",
      },
      {
        label: "CI/CD Quality Gates",
        href: "/qa-consulting/cicd-quality-gates",
      },
      {
        label: "QA Audit",
        href: "/qa-consulting/qa-audit-assessment",
      },
      {
        label: "Release Readiness",
        href: "/qa-consulting/release-readiness",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
    overviewLabel: "All articles",
    items: [
      { label: "QA Strategy", href: "/blog?category=qa-strategy" },
      { label: "Test Automation", href: "/blog?category=test-automation" },
      {
        label: "Outsourcing & Hiring",
        href: "/blog?category=outsourcing-hiring",
      },
      {
        label: "Testing Practices",
        href: "/blog?category=testing-practices",
      },
      { label: "Case Studies", href: "/blog?category=case-studies" },
    ],
  },
];

export const siteConfig = {
  name: "GoGreenlit",
  legalName: "GoGreenlit",
  tagline: "Embedded QA teams for startups that ship fast",
  /** Short, keyword-led copy for <meta name="description"> and social previews. Keep this near 155 characters so search engines don't truncate it. */
  metaDescription:
    "GoGreenlit embeds QA engineers into startup sprints. Manual testing, Playwright and Selenium automation, API testing, and CI/CD quality gates, with no long-term contracts.",
  /** Longer, on-page copy for the hero paragraph. Room to breathe since it is read, not indexed as a snippet. */
  description:
    "Most startups do not find out they have a QA problem until a bug hits production. GoGreenlit embeds manual and automation QA engineers directly into your sprint cycle, so you catch problems before your users do.",
  footerDescription:
    "Embedded QA for startups and growing companies. Chicago-based and remote-ready.",
  founders: "Muhammad and Mohammad",
  location: {
    locality: "Chicago",
    region: "IL",
    country: "US",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gogreenlit.com",
  ogImage: "/og-image.png",
  email: "gogreenlit@gmail.com",
  links: {
    calendar: "https://cal.com/muhammad-ali-wwvyks/15min",
  },
  nav: navItems,
} as const;
