import { CheckCircle2, X } from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";

/**
 * Two-column contrast block: a muted "the wrong way" column against an
 * accented "the goGreenlit way" column. Signature pattern for the QA
 * Consulting page family (the overview page and its subpages), used
 * wherever a service is easiest to explain by what it isn't.
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
      <Reveal className="border-border/60 rounded-2xl border p-8">
        <h3 className="text-muted-foreground font-semibold">{leftTitle}</h3>
        <ul className="mt-4 space-y-3">
          {leftItems.map((item) => (
            <li key={item} className="flex gap-3">
              <X className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <span className="text-muted-foreground text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={80} className="rounded-2xl border-2 border-[#ee9e58] p-8">
        <h3 className="font-semibold">{rightTitle}</h3>
        <ul className="mt-4 space-y-3">
          {rightItems.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#ee9e58]" />
              <span className="text-foreground/90 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
