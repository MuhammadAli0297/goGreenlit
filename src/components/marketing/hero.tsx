import Link from "next/link";

import { AuroraBackground } from "@/components/marketing/aurora-background";
import { HeroScrollShrink } from "@/components/marketing/hero-scroll-shrink";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <HeroScrollShrink className="relative overflow-hidden bg-[#354639]">
      <AuroraBackground />

      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <Badge
          variant="secondary"
          className="mb-6 gap-1.5 border border-[#ffe0ad]/15 bg-[#ffe0ad]/10 text-[#ffe0ad]"
        >
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-[#ee9e58]" />
          No long-term contracts, founder-embedded from day one
        </Badge>

        <h1 className="mx-auto max-w-4xl text-5xl leading-[1.45] font-semibold tracking-tight text-balance text-[#f9f4eb] sm:text-7xl">
          Embedded QA teams for startups that{" "}
          <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
            ship fast
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-[#f9f4eb]/75">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={siteConfig.links.calendar}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#ee9e58] text-[#354639] hover:bg-[#ee9e58]/85",
            )}
          >
            Book a call
          </Link>
          <Link
            href="#services"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-[#ffe0ad]/30 bg-transparent text-[#ffe0ad] hover:bg-[#ffe0ad]/10 hover:text-[#ffe0ad]",
            )}
          >
            Explore services
          </Link>
        </div>
      </div>
    </HeroScrollShrink>
  );
}
