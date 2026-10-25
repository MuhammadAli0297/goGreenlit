/**
 * The site's verified track-record numbers. These four and no others, see
 * BRAND_GUIDELINES.md section 2 and CLAUDE.md gotcha #16: a new number needs
 * a real source before it goes here. Shared by the stat band and by the blog's
 * stat callout block, which can only point at one of these keys, so an
 * invented figure cannot be typed into a post as a callout.
 */
export type VerifiedStatKey =
  "experience" | "escapedDefects" | "coverage" | "revenue";

export interface VerifiedStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  tone: "surface" | "sandy" | "olive" | "deep";
}

export const verifiedStats: Record<VerifiedStatKey, VerifiedStat> = {
  experience: {
    value: 18,
    suffix: "+",
    label: "Years combined QA experience",
    tone: "surface",
  },
  escapedDefects: {
    value: 45,
    suffix: "%",
    label: "Reduction in escaped defects",
    tone: "sandy",
  },
  coverage: {
    value: 95,
    suffix: "%",
    label: "Release coverage achieved",
    tone: "olive",
  },
  revenue: {
    value: 1,
    prefix: "$",
    suffix: "B+",
    label: "In revenue supported",
    tone: "deep",
  },
};

/** The stat as display text, "45%", "18+", "$1B+". */
export function formatVerifiedStat(stat: VerifiedStat): string {
  return `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;
}
