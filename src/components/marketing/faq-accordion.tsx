import { renderWithInlineLinks } from "@/components/marketing/inline-links";
import { Reveal } from "@/components/marketing/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  question: string;
  answer: string;
};

/**
 * FAQ list, closed by default. The accordion is left uncontrolled (no
 * `value`/`onValueChange`), so each question opens and closes on its own
 * click, nothing auto-expands. Each row fades up into view via the shared
 * `Reveal` component as the user scrolls, staggered by `index * 80`ms like
 * every other scroll-triggered entrance on the site. The border between
 * rows lives on the `Reveal` wrapper rather than `AccordionItem` itself
 * (the generated item's `not-last:border-b` relies on DOM adjacency to its
 * siblings, which the wrapper breaks), and the list's top edge on the
 * Accordion root.
 *
 * Live Build look: large questions, 1.5px ink rules, and a plus icon in
 * a ring that rotates and fills Sandy Brown when its row opens. The
 * generated trigger draws its own chevrons, which are hidden here with
 * `hidden!` (a plain `hidden` loses to the primitive's own expanded-state
 * rule) in favor of the plus, drawn with the span's pseudo-elements and
 * driven by the trigger's `group-aria-expanded` state.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion className="border-ink gap-0 border-t-[1.5px]">
      {faqs.map(({ question, answer }, index) => (
        <Reveal
          key={question}
          delay={index * 80}
          className="border-ink border-b-[1.5px]"
        >
          <AccordionItem value={question} className="border-none">
            <AccordionTrigger className="text-ink items-center gap-6 rounded-none py-6 text-left text-xl font-medium tracking-[-0.02em] hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden! sm:text-2xl">
              {question}
              <span
                aria-hidden="true"
                className="border-ink group-aria-expanded/accordion-trigger:bg-sandy before:bg-ink after:bg-ink relative size-9 shrink-0 rounded-full border-[1.5px] transition-[transform,background-color] duration-300 group-aria-expanded/accordion-trigger:rotate-180 before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-3.5 before:-translate-x-1/2 before:-translate-y-1/2 after:absolute after:top-1/2 after:left-1/2 after:h-3.5 after:w-0.5 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-transform after:duration-300 group-aria-expanded/accordion-trigger:after:scale-y-0"
              />
            </AccordionTrigger>
            <AccordionContent className="faq-panel text-deep px-0 pr-14 pb-6 text-[17px] leading-relaxed">
              {renderWithInlineLinks(answer)}
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
