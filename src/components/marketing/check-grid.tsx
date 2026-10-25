import { AlertTriangle, Check } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";
import { cn } from "@/lib/utils";

/**
 * A grid of short statements, each in a small sticker card with a tick. Used
 * for "when it fits", "signs you need it" and "what goes wrong" lists on the
 * family pages. `tone="bug"` swaps the Muted Olive tick for a Sandy Brown
 * warning mark, for lists of problems rather than benefits (olive means a
 * check passed, sandy means a bug, the same status language as every widget).
 */
export function CheckGrid({
  items,
  tone = "pass",
  columns = 2,
  className,
}: {
  items: readonly string[];
  tone?: "pass" | "bug";
  columns?: 1 | 2;
  className?: string;
}) {
  const Icon = tone === "bug" ? AlertTriangle : Check;
  return (
    <ul
      className={cn("grid gap-5", columns === 2 && "sm:grid-cols-2", className)}
    >
      {items.map((item, index) => (
        <Reveal as="li" key={item} delay={index * 80}>
          <StickerCard
            tone="surface"
            interactive={false}
            className="flex h-full items-start gap-4 p-5"
          >
            <span
              aria-hidden="true"
              className={cn(
                "border-ink mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px]",
                tone === "bug" ? "bg-sandy" : "bg-olive",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="text-[17px] leading-snug">{item}</span>
          </StickerCard>
        </Reveal>
      ))}
    </ul>
  );
}
