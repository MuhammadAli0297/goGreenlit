import { StickerCard } from "@/components/brand/sticker-card";
import { CountUp } from "@/components/marketing/count-up";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  tone: "surface" | "sandy" | "olive" | "deep";
};

/**
 * The site's verified track-record numbers. These four and no others, see
 * BRAND_GUIDELINES.md section 2 and CLAUDE.md gotcha #16: a new number needs
 * a real source before it goes here.
 */
const stats: Stat[] = [
  {
    value: 18,
    suffix: "+",
    label: "Years combined QA experience",
    tone: "surface",
  },
  {
    value: 45,
    suffix: "%",
    label: "Reduction in escaped defects",
    tone: "sandy",
  },
  { value: 95, suffix: "%", label: "Release coverage achieved", tone: "olive" },
  {
    value: 1,
    prefix: "$",
    suffix: "B+",
    label: "In revenue supported",
    tone: "deep",
  },
];

/** Stagger between cards, the site's usual Reveal step. */
const STAGGER_MS = 80;

/**
 * Four stat cards that fade up one after another, each number counting
 * up from 0 as its card arrives (CountUp, started with the same delay as
 * the card's Reveal) and replaying each time the band scrolls back into
 * view. The final values are in the server-rendered HTML.
 *
 * `compact` drops the full-width section chrome and keeps a two-column grid
 * of the same cards, to sit inside another section (the QA Consulting
 * overview's "signs you need this").
 */
export function StatBand({ compact = false }: { compact?: boolean }) {
  const Wrapper = compact ? "div" : "section";
  return (
    <Wrapper
      {...(compact ? { role: "group" } : {})}
      aria-label="Track record"
      className={compact ? undefined : "py-14"}
    >
      <div
        className={cn(
          "grid grid-cols-2 gap-5",
          !compact &&
            "mx-auto max-w-6xl px-4 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8",
        )}
      >
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * STAGGER_MS}>
            <StickerCard
              tone={stat.tone}
              interactive={false}
              className="h-full p-5 sm:p-7"
            >
              <p
                className={cn(
                  "text-5xl leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-6xl",
                  !compact && "lg:text-7xl",
                  stat.tone === "deep" && "text-sandy",
                )}
              >
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  delay={index * STAGGER_MS}
                />
              </p>
              <p
                className={cn(
                  "font-label mt-4 text-xs tracking-widest uppercase",
                  stat.tone === "deep" && "text-navajo",
                )}
              >
                {stat.label}
              </p>
            </StickerCard>
          </Reveal>
        ))}
      </div>
    </Wrapper>
  );
}
