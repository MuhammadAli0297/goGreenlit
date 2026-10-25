import { renderWithEmphasis } from "@/components/marketing/emphasis";
import { cn } from "@/lib/utils";

/**
 * A section's `<h2>` in the Live Build headline style: large, tight, with
 * one italic accent word marked `*like this*` (see renderWithEmphasis). The
 * text color comes from the caller (default ink via the page), and the
 * accent can be recolored with a `[&_em]:text-...` class, for example
 * Sandy Brown on a dark section.
 */
export function SectionHeading({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance sm:text-5xl [&_em]:font-normal [&_em]:italic",
        className,
      )}
    >
      {renderWithEmphasis(children)}
    </h2>
  );
}
