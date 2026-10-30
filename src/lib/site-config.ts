export interface NavItem {
  label: string;
  href: string;
  /** Subpages rendered as a dropdown under this item, see SiteHeader. */
  items?: readonly { label: string; href: string; description?: string }[];
  /** Label for the dropdown's link back to `href` itself. Defaults to "All {label}" in SiteHeader if omitted. */
  overviewLabel?: string;
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
        description: "Exploratory sessions that find what scripts miss",
      },
      {
        label: "Playwright Automation",
        href: "/software-testing-services/playwright-automation",
        description: "Stable end-to-end suites that run in your CI",
      },
      {
        label: "Selenium Testing",
        href: "/software-testing-services/selenium-testing",
        description: "Proven coverage for established stacks",
      },
      {
        label: "API Testing",
        href: "/software-testing-services/api-data-testing",
        description: "Contracts and data checked below the interface",
      },
      {
        label: "Regression Testing",
        href: "/software-testing-services/regression-testing",
        description: "Prove yesterday still works so today can ship",
      },
      {
        label: "Mobile Testing",
        href: "/software-testing-services/mobile-app-testing",
        description: "Real devices, real networks, real users",
      },
    ],
  },
  {
    label: "QA Consulting",
    href: "/qa-consulting",
    overviewLabel: "QA consulting overview",
    items: [
      {
        label: "Embedded QA Team",
        href: "/qa-consulting/embedded-qa-team",
        description: "Senior testers inside your sprints",
      },
      {
        label: "Test Strategy",
        href: "/qa-consulting/test-strategy-consulting",
        description: "Decide what to test, and what to skip",
      },
      {
        label: "QA Process Design",
        href: "/qa-consulting/qa-process-design",
        description: "Roles, handoffs and triage that work",
      },
      {
        label: "CI/CD Quality Gates",
        href: "/qa-consulting/cicd-quality-gates",
        description: "Automated checks that stop bad builds",
      },
      {
        label: "QA Audit",
        href: "/qa-consulting/qa-audit-assessment",
        description: "An honest read of where you stand",
      },
      {
        label: "Release Readiness",
        href: "/qa-consulting/release-readiness",
        description: "A clear go or no-go before you ship",
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
    "Embedded QA agency and consulting for startups: manual testing, Playwright automation, API testing, and CI/CD quality gates. No long-term contracts.",
  /** Longer, on-page copy for the hero paragraph. Room to breathe since it is read, not indexed as a snippet. */
  description:
    "Most startups do not find out they have a QA problem until a bug hits production. GoGreenlit is a QA agency that embeds manual and automation QA engineers directly into your sprint cycle, so you catch problems before your users do.",
  footerDescription:
    "Embedded QA for startups and growing companies. Chicago-based and remote-ready.",
  founders: "Muhammad and Mohammad",
  location: {
    locality: "Chicago",
    region: "IL",
    country: "US",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gogreenlit.com",
  email: "gogreenlit@gmail.com",
  links: {
    calendar: "https://calendly.com/gogreenlit/30min",
  },
  /** Real, actively-maintained external profile URLs for the Organization schema's `sameAs` field. Only add a profile here once it actually exists and is maintained. */
  sameAs: ["https://www.linkedin.com/company/gogreenlit/"],
  nav: navItems,
} as const;
