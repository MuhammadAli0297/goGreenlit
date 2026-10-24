import { Flag } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { StatusPill } from "@/components/brand/status-pill";
import { renderWithInlineLinks } from "@/components/marketing/inline-links";
import {
  formatVerifiedStat,
  verifiedStats,
  type VerifiedStatKey,
} from "@/lib/verified-stats";
import { cn } from "@/lib/utils";

/**
 * The three article callouts, each a data block in a post's `body` (no MDX,
 * see CLAUDE.md gotcha #9) rendered by `ArticleBody`. All three are Server
 * Components and none carry motion, an article is for reading.
 */

/**
 * The post's direct answer, lifted out in a Navajo White sticker with a mono
 * "The short answer" label. The text is the same words that would otherwise
 * be a plain paragraph under the question heading, so the snippet-shaped
 * answer (gotcha #15) stays right there in the markup.
 */
export function AnswerBox({ text }: { text: string }) {
  return (
    <StickerCard tone="navajo" interactive={false} className="p-5 sm:p-6">
      <p className="font-label text-xs tracking-widest uppercase">
        The short answer
      </p>
      <p className="mt-3 text-lg leading-relaxed sm:text-xl">
        {renderWithInlineLinks(text)}
      </p>
    </StickerCard>
  );
}

/**
 * One of the four verified stats (`VerifiedStatKey`, never a free-typed
 * number) as a big figure beside a short note on where it comes from. The
 * card uses the same color the stat has on the stat band.
 */
export function StatCallout({
  stat,
  note,
}: {
  stat: VerifiedStatKey;
  note: string;
}) {
  const data = verifiedStats[stat];
  const dark = data.tone === "deep";
  return (
    <StickerCard
      tone={data.tone}
      interactive={false}
      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-7"
    >
      <div className="shrink-0">
        <p
          className={cn(
            "text-6xl leading-none font-medium tracking-[-0.04em] tabular-nums sm:text-7xl",
            dark && "text-sandy",
          )}
        >
          {formatVerifiedStat(data)}
        </p>
        <p className="font-label mt-3 text-xs tracking-widest uppercase">
          {data.label}
        </p>
      </div>
      <p
        className={cn(
          "text-base leading-relaxed sm:border-l-[1.5px] sm:pl-8",
          dark ? "sm:border-navajo/40" : "sm:border-ink/30",
        )}
      >
        {renderWithInlineLinks(note)}
      </p>
    </StickerCard>
  );
}

/**
 * A flagged list of warning signs: a Sandy Brown tinted card with a "Red
 * flags" pill (the bug status, so it carries an icon and a word, never color
 * alone) and a flag marker on each item. Still a real `ul`.
 */
export function RedFlags({
  items,
  title,
}: {
  items: string[];
  title?: string;
}) {
  return (
    <div className="border-ink bg-sandy/15 rounded-[22px] border-[1.5px] p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status="bug">Red flags</StatusPill>
        {title ? <p className="font-semibold">{title}</p> : null}
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3.5 text-base leading-relaxed">
            <span
              aria-hidden="true"
              className="border-ink bg-sandy mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px]"
            >
              <Flag className="size-3" strokeWidth={2.2} />
            </span>
            <span>{renderWithInlineLinks(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
