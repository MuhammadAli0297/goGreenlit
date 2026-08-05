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
 * (`not-last:border-b`, so it needs to sit on the actual last DOM sibling),
 * since the wrapper is now that sibling.
 */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion className="gap-0">
      {faqs.map(({ question, answer }, index) => (
        <Reveal
          key={question}
          delay={index * 80}
          className="border-border/60 not-last:border-b"
        >
          <AccordionItem value={question} className="border-none">
            <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
              {question}
            </AccordionTrigger>
            <AccordionContent className="faq-panel text-muted-foreground px-0 pb-6 text-sm">
              {answer}
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
