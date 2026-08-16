import { siteConfig } from "@/lib/site-config";

/**
 * Curated 1:1 topical pairing between a Software Testing Services subpage
 * and the QA Consulting subpage most related to it. Manual by design, the
 * relationship isn't derivable from nav structure alone. See CLAUDE.md's
 * cross-link gotcha for the reasoning behind each pair.
 */
const crossFamilyPairs: Record<string, string> = {
  "/software-testing-services/manual-testing":
    "/qa-consulting/embedded-qa-team",
  "/software-testing-services/playwright-automation":
    "/qa-consulting/cicd-quality-gates",
  "/software-testing-services/selenium-testing":
    "/qa-consulting/test-strategy-consulting",
  "/software-testing-services/api-data-testing":
    "/qa-consulting/qa-audit-assessment",
  "/software-testing-services/regression-testing":
    "/qa-consulting/release-readiness",
  "/software-testing-services/mobile-app-testing":
    "/qa-consulting/qa-process-design",
};

const reverseCrossFamilyPairs = Object.fromEntries(
  Object.entries(crossFamilyPairs).map(([serviceHref, qaHref]) => [
    qaHref,
    serviceHref,
  ]),
);

export interface RelatedLinksGroup {
  heading: string;
  links: { label: string; href: string }[];
}

function findLabel(href: string): string | undefined {
  for (const item of siteConfig.nav) {
    if (item.href === href) return item.label;
    const sub = item.items?.find((navSub) => navSub.href === href);
    if (sub) return sub.label;
  }
  return undefined;
}

/**
 * Sibling links within the same subpage family, plus one curated
 * cross-family link, for the "related pages" block on every Services and
 * QA Consulting subpage.
 */
export function getRelatedLinkGroups(currentHref: string): RelatedLinksGroup[] {
  const family = siteConfig.nav.find((item) =>
    item.items?.some((sub) => sub.href === currentHref),
  );
  if (!family?.items) return [];

  const siblings = family.items
    .filter((sub) => sub.href !== currentHref)
    .map((sub) => ({ label: sub.label, href: sub.href }));

  const groups: RelatedLinksGroup[] = [
    { heading: `More in ${family.label}`, links: siblings },
  ];

  const crossHref =
    crossFamilyPairs[currentHref] ?? reverseCrossFamilyPairs[currentHref];
  const crossLabel = crossHref ? findLabel(crossHref) : undefined;
  const crossFamily = crossHref
    ? siteConfig.nav.find((item) =>
        item.items?.some((sub) => sub.href === crossHref),
      )
    : undefined;

  if (crossHref && crossLabel && crossFamily) {
    groups.push({
      heading: `Related from ${crossFamily.label}`,
      links: [{ label: crossLabel, href: crossHref }],
    });
  }

  return groups;
}
