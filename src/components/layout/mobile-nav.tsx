"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Logo } from "@/components/layout/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Dot color per group, matching each page family's own color. */
const dotByHref: Record<string, string> = {
  "/software-testing-services": "bg-leaf",
  "/qa-consulting": "bg-olive",
  "/blog": "bg-sandy",
};

/** Stagger offset between top-level rows as the drawer opens. */
const STAGGER_MS = 60;

/**
 * Mobile-only nav drawer, shown below `md` in place of the desktop mega
 * menus (see HeaderBar, and CLAUDE.md gotcha #8). A full-screen Ink sheet
 * with large type, the rows rise in one after another each time it opens.
 * Subpages reuse the existing Accordion primitive rather than a bespoke
 * collapsible. AccordionContent's default styling underlines every
 * descendant `<a>` (built for FAQ prose), so nav links carry an explicit
 * `no-underline!` to opt back out of that. The sheet's own close button is
 * turned off in favor of a SheetClose in the header row, the generated
 * one is a light ghost button that would sit wrong on the dark ground.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="border-ink text-ink hover:bg-leaf/35 inline-flex size-11 items-center justify-center rounded-full border-[1.5px] transition-colors"
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="on-dark bg-ink text-navajo w-full max-w-none gap-0 overflow-y-auto p-0 data-[side=right]:w-full data-[side=right]:border-l-0 data-[side=right]:sm:max-w-none"
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <Logo variant="onDark" onClick={close} />
          <SheetClose
            aria-label="Close menu"
            className="border-navajo text-navajo hover:bg-navajo hover:text-ink inline-flex size-11 items-center justify-center rounded-full border-[1.5px] transition-colors"
          >
            <X aria-hidden="true" className="size-5" />
          </SheetClose>
        </div>

        <SheetTitle className="font-label text-olive px-5 pt-10 text-xs font-medium tracking-widest uppercase">
          Menu
        </SheetTitle>

        <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pt-2">
          {siteConfig.nav.map((item, index) => (
            <div
              key={item.href}
              style={{ animationDelay: `${index * STAGGER_MS}ms` }}
              className="animate-in fade-in slide-in-from-right-8 border-navajo/25 fill-mode-both border-t duration-500 last:border-b"
            >
              {item.items ? (
                <Accordion>
                  <AccordionItem value={item.href} className="border-none">
                    <AccordionTrigger className="text-navajo hover:text-sandy **:data-[slot=accordion-trigger-icon]:text-navajo items-center rounded-none py-4 text-[2rem] leading-none font-medium tracking-tight hover:no-underline **:data-[slot=accordion-trigger-icon]:size-6">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 pl-1">
                      <div className="flex flex-col">
                        <Link
                          href={item.href}
                          onClick={close}
                          className="text-sandy hover:text-navajo py-2 text-lg font-semibold no-underline!"
                        >
                          {item.overviewLabel ?? `All ${item.label}`} &rarr;
                        </Link>
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={close}
                            className="text-navajo hover:text-sandy flex items-center gap-3 py-2 text-xl no-underline!"
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "border-navajo size-2.5 shrink-0 rounded-full border",
                                dotByHref[item.href] ?? "bg-navajo",
                              )}
                            />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={item.href}
                  onClick={close}
                  className="text-navajo hover:text-sandy flex items-center justify-between py-4 text-[2rem] leading-none font-medium tracking-tight"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-2xl">
                    &rarr;
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div
          style={{ animationDelay: `${siteConfig.nav.length * STAGGER_MS}ms` }}
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both px-5 pt-8 pb-8 duration-500"
        >
          <Link
            href={siteConfig.links.calendar}
            onClick={close}
            className={cn(
              ctaVariants({ variant: "cta", size: "xl" }),
              "w-full",
            )}
          >
            Book a call
          </Link>
          <p className="font-label text-navajo/80 mt-4 text-center text-xs tracking-widest uppercase">
            Embedded QA for startups
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
