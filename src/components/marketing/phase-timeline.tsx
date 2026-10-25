import { Reveal } from "@/components/marketing/reveal";

/**
 * Numbered vertical timeline with a connecting line, used inside a
 * Muted Olive (olive) bold band. Signature pattern for the QA
 * Consulting page family (the overview page and its subpages), the
 * equivalent of the Software Testing Services family's icon-grid
 * "approach" band, but sequential rather than parallel since a
 * consulting engagement runs in phases.
 *
 * The line draws downward as the list scrolls through the viewport (the
 * lb-draw utility, pure CSS), over a faint full-length track, so progress
 * through the engagement reads as progress down the page. Without
 * scroll-driven animation support, or with reduced motion, the line is
 * simply drawn in full.
 */
export function PhaseTimeline({
  phases,
}: {
  phases: readonly { title: string; description: string }[];
}) {
  return (
    <div className="relative mt-12">
      <div
        aria-hidden
        className="bg-deep/20 absolute top-5 bottom-5 left-5 w-[3px] -translate-x-1/2 rounded-full"
      />
      <div
        aria-hidden
        className="lb-draw bg-deep absolute top-5 bottom-5 left-5 w-[3px] -translate-x-1/2 rounded-full"
      />
      <ol className="space-y-10">
        {phases.map((phase, index) => (
          <Reveal
            as="li"
            key={phase.title}
            delay={index * 80}
            className="relative flex gap-6"
          >
            <span className="border-ink bg-navajo text-ink relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] font-semibold tabular-nums">
              {index + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-ink text-lg font-semibold tracking-tight">
                {phase.title}
              </h3>
              <p className="text-ink mt-1 text-[15px] leading-relaxed">
                {phase.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
