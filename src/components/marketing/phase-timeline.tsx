import { Reveal } from "@/components/marketing/reveal";

/**
 * Numbered vertical timeline with a connecting line, used inside a
 * Muted Olive (#b1c680) bold band. Signature pattern for the QA
 * Consulting page family (the overview page and its subpages), the
 * equivalent of the Software Testing Services family's icon-grid
 * "approach" band, but sequential rather than parallel since a
 * consulting engagement runs in phases.
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
        className="absolute top-5 bottom-5 left-5 w-px bg-[#354639]/25"
      />
      <ol className="space-y-10">
        {phases.map((phase, index) => (
          <Reveal
            as="li"
            key={phase.title}
            delay={index * 80}
            className="relative flex gap-6"
          >
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#354639] font-semibold text-[#f9f4eb]">
              {index + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-foreground font-semibold">{phase.title}</h3>
              <p className="text-foreground/80 mt-1 text-sm">
                {phase.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
