import Link from "next/link";

import { ctaVariants } from "@/components/brand/cta-variants";
import { AuroraBackground } from "@/components/marketing/aurora-background";
import { renderWithEmphasis } from "@/components/marketing/emphasis";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type CtaTone = "navajo" | "leaf" | "olive";

const tones: Record<CtaTone, string> = {
  navajo: "bg-navajo",
  leaf: "bg-leaf",
  olive: "bg-olive",
};

/**
 * Closing call to action, a full-bleed band with the aurora behind a big
 * headline. It is always the last section before the footer, and the
 * footer is Dark Slate Grey, so there is deliberately no deep tone here:
 * it would merge into the footer. Navajo White is the default, leaf and
 * olive match the Services and QA Consulting families. All three take ink
 * text (12.0, 5.48 and 8.20 to 1).
 *
 * Wrap one word of `title` in asterisks for the italic accent, for
 * example "Ready to ship with *confidence?*".
 */
export function CtaSection({
  title = "Ready to ship with *confidence?*",
  description = "Tell us what you are building and where quality is slipping. We will scope an engagement in one call, with no long-term contract required.",
  tone = "navajo",
}: {
  title?: string;
  description?: string;
  tone?: CtaTone;
}) {
  return (
    <section className={cn("text-ink relative overflow-hidden", tones[tone])}>
      <div className="opacity-60">
        <AuroraBackground />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-32">
        <Reveal>
          <h2 className="text-4xl leading-[1.04] font-medium tracking-[-0.035em] text-balance sm:text-6xl [&_em]:font-normal [&_em]:italic">
            {renderWithEmphasis(title)}
          </h2>
          <p className="text-ink/85 mx-auto mt-6 max-w-xl text-lg text-balance">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Link
              href={siteConfig.links.calendar}
              className={ctaVariants({ variant: "cta", size: "xl" })}
            >
              Book a call <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-ink hover:decoration-sandy text-[15px] underline decoration-2 underline-offset-4"
            >
              or email {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
