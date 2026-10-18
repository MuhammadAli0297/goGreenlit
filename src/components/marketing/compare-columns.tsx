import { Check, X } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";

/**
 * Two-column contrast block: a muted "the wrong way" column against an
 * accented "the goGreenlit way" column. Signature pattern for the QA
 * Consulting page family (the overview page and its subpages), used
 * wherever a service is easiest to explain by what it isn't.
 *
 * The left column is a flat, tinted card with a quiet shadow that does not
 * lift. The right is the full sticker with a Sandy Brown border, the
 * accent that says this is the one to pick. Items carry an icon (an X, a
 * tick) as well as the column's color, so the contrast never rests on
 * color alone.
 */
export function CompareColumns({
  leftTitle,
  leftItems,
  rightTitle,
  rightItems,
}: {
  leftTitle: string;
  leftItems: readonly string[];
  rightTitle: string;
  rightItems: readonly string[];
}) {
  return (
    <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
      <Reveal className="h-full">
        <StickerCard
          interactive={false}
          className="bg-navajo/40 h-full p-8 shadow-[6px_6px_0_rgba(53,70,57,0.35)]"
        >
          <h3 className="text-deep text-xl font-semibold tracking-tight">
            {leftTitle}
          </h3>
          <ul className="mt-5 space-y-3.5">
            {leftItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="border-deep/50 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border">
                  <X aria-hidden="true" className="text-deep size-3" />
                </span>
                <span className="text-deep text-[15px] leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </StickerCard>
      </Reveal>

      <Reveal delay={80} className="h-full">
        <StickerCard
          interactive={false}
          className="border-sandy h-full border-[3px] p-8"
        >
          <h3 className="text-xl font-semibold tracking-tight">{rightTitle}</h3>
          <ul className="mt-5 space-y-3.5">
            {rightItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="border-ink bg-olive mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px]">
                  <Check
                    aria-hidden="true"
                    className="size-3"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-[15px] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </StickerCard>
      </Reveal>
    </div>
  );
}
