import type { LucideIcon } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { Reveal } from "@/components/marketing/reveal";
import { SectionIntro } from "@/components/marketing/section-intro";
import { cn } from "@/lib/utils";

/**
 * A Dark Slate Grey band with the aurora and a row of cream cards, the
 * rhythm break between lighter sections on a family page. The cards sit on
 * an ink shadow (a deep one would vanish on the deep ground). Three items
 * make three columns, four make four, anything else wraps in two.
 */
export function DeepBand({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly { icon: LucideIcon; title: string; description: string }[];
}) {
  const columns =
    items.length === 3
      ? "md:grid-cols-3"
      : items.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2";

  return (
    <section className="on-dark bg-deep text-navajo relative overflow-hidden">
      <div className="opacity-50">
        <AuroraBackground />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionIntro
          tone="dark"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className={cn("mt-12 grid gap-6", columns)}>
          {items.map(
            ({ icon: Icon, title: itemTitle, description: text }, i) => (
              <Reveal key={itemTitle} className="h-full" delay={i * 80}>
                <StickerCard
                  tone="navajo"
                  interactive={false}
                  className="h-full p-7 shadow-[6px_6px_0_var(--ink)]"
                >
                  <div className="border-ink bg-sandy flex size-11 items-center justify-center rounded-xl border-[1.5px]">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">
                    {itemTitle}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
                </StickerCard>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
