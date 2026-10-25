import type { LucideIcon } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

/**
 * One service tile. A StickerCard (ink outline, hard offset shadow that
 * lifts on hover) with an icon tile that tips and grows when the card is
 * hovered. "bold" is the Palm Leaf card with a Sandy Brown icon tile
 * (Software Testing Services family), "subtle" is the cream card with a
 * Muted Olive icon tile (QA Consulting family and the homepage).
 */
export function ServiceCard({
  id,
  icon: Icon,
  title,
  description,
  variant = "subtle",
  index = 0,
}: {
  id?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** "bold" swaps the card to the Palm Leaf band color used on the services grid. */
  variant?: "subtle" | "bold";
  /** Position within the grid, staggers this tile's scroll-reveal. */
  index?: number;
}) {
  return (
    <Reveal className="h-full" delay={index * 80}>
      <StickerCard
        id={id}
        tone={variant === "bold" ? "leaf" : "surface"}
        className="group/tile h-full scroll-mt-28 p-6"
      >
        <div
          className={cn(
            "border-ink flex size-11 items-center justify-center rounded-xl border-[1.5px] transition-transform duration-300 group-hover/tile:scale-110 group-hover/tile:-rotate-6",
            variant === "bold" ? "bg-sandy" : "bg-olive",
          )}
        >
          <Icon aria-hidden="true" className="size-5" />
        </div>
        {/* Real h3, not CardTitle's div, so services build a proper heading outline for SEO. */}
        <h3 className="mt-5 text-xl leading-snug font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed">{description}</p>
      </StickerCard>
    </Reveal>
  );
}
