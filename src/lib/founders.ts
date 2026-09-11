import { siteConfig } from "@/lib/site-config";

/**
 * Single source of truth for founder identity data, consumed by the About
 * page's profile cards, the sitewide Organization schema's `founder` array,
 * and every BlogPosting's `author` field (both founders write posts, see
 * blog-data.ts). Keeping this in one place means a real Person entity, not
 * just a name string, follows the founder everywhere they're credited.
 */
export interface Founder {
  /** Used as the About page anchor id (`/about#${slug}`) that Person.url points at. */
  slug: string;
  name: string;
  jobTitle: string;
  bio: string;
  initials: string;
  avatarClassName: string;
  /** Real, individually-owned profile URL, never a fabricated placeholder. */
  linkedin: string;
}

export const founders: Founder[] = [
  {
    slug: "muhammad-ali",
    name: "Muhammad Ali",
    jobTitle: "Co-Founder and QA Manager",
    bio: "Nine years building and managing QA processes across fintech, SaaS, and e-commerce teams. The one who designs the process before anyone touches a test case, and joins your planning meetings to make sure it stays that way.",
    initials: "MA",
    avatarClassName: "bg-[#ffe0ad] text-[#354639]",
    linkedin: "https://www.linkedin.com/in/muhammad-ali01",
  },
  {
    slug: "mohammad-khan",
    name: "Mohammad Khan",
    jobTitle: "Co-Founder and Lead Automation QA Engineer",
    bio: "Builds automation suites in Playwright and Selenium that live inside your CI pipeline, not next to it. If a bad build gets blocked before it merges, this is usually why.",
    initials: "MK",
    avatarClassName: "bg-[#ee9e58] text-[#354639]",
    linkedin: "https://www.linkedin.com/in/mohammad-khan-qa",
  },
];

export function getFounderByName(name: string): Founder {
  const founder = founders.find((f) => f.name === name);
  if (!founder) {
    throw new Error(`No founder entry found for author "${name}"`);
  }
  return founder;
}

export function buildFounderPersonSchema(founder: Founder) {
  return {
    "@type": "Person" as const,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: `${siteConfig.url}/about#${founder.slug}`,
    sameAs: [founder.linkedin],
    worksFor: {
      "@type": "Organization" as const,
      name: siteConfig.name,
    },
  };
}
