import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * The Live Build card: a 1.5px ink outline, a generous radius and a hard
 * offset shadow, so it reads as a sticker lifted off the page. Interactive
 * cards move up and left on hover while the shadow grows, which is what
 * makes them feel pressable. Use tone to match the page family's color
 * (leaf for Services, olive for QA Consulting).
 *
 * Distinct from the generated ui/card.tsx, which stays the quiet default
 * for anything that should not shout.
 */
export const stickerCardVariants = cva(
  "text-ink rounded-[22px] border-[1.5px] border-ink transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
  {
    variants: {
      tone: {
        surface: "bg-surface shadow-[6px_6px_0_var(--deep)]",
        leaf: "bg-leaf shadow-[6px_6px_0_var(--deep)]",
        olive: "bg-olive shadow-[6px_6px_0_var(--deep)]",
        navajo: "bg-navajo shadow-[6px_6px_0_var(--deep)]",
        sandy: "bg-sandy shadow-[6px_6px_0_var(--deep)]",
        /** Dark Slate Grey with cream text. The shadow turns ink, a slate
         *  shadow would vanish against the card itself. */
        deep: "bg-deep text-navajo shadow-[6px_6px_0_var(--ink)]",
      },
      interactive: {
        true: "hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_var(--deep)]",
        false: "",
      },
    },
    compoundVariants: [
      {
        tone: "deep",
        interactive: true,
        className: "hover:shadow-[9px_9px_0_var(--ink)]",
      },
    ],
    defaultVariants: {
      tone: "surface",
      interactive: true,
    },
  },
);

export function StickerCard({
  className,
  tone,
  interactive,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof stickerCardVariants>) {
  return (
    <div
      data-slot="sticker-card"
      className={cn(stickerCardVariants({ tone, interactive }), className)}
      {...props}
    />
  );
}
