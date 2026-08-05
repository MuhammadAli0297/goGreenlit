import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  /** "bold" swaps the card to the Palm Leaf / Sandy Brown / Dark Slate Grey pairing used on the services grid. */
  variant?: "subtle" | "bold";
  /** Position within the grid, staggers this tile's scroll-reveal. */
  index?: number;
}) {
  return (
    <Reveal className="group/tile relative h-full" delay={index * 80}>
      <div
        aria-hidden
        className="tile-glow-halo pointer-events-none absolute -inset-2 rounded-2xl bg-[linear-gradient(135deg,_#ee9e58,_#354639)] blur-2xl"
      />
      <Card
        id={id}
        className={cn(
          "relative h-full scroll-mt-24",
          variant === "bold" && "bg-[#8fa175]",
        )}
      >
        <CardHeader>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-lg",
              variant === "bold"
                ? "bg-[#ee9e58] text-[#354639]"
                : "bg-accent text-accent-foreground",
            )}
          >
            <Icon className="size-5" />
          </div>
          {/* Real h3, not CardTitle's div, so services build a proper heading outline for SEO. */}
          <h3 className="font-heading mt-3 text-base leading-snug font-medium">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-sm",
              variant === "bold" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </CardContent>
      </Card>
    </Reveal>
  );
}
