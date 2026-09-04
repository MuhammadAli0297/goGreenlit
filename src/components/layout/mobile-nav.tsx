"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Mobile-only nav drawer, shown below `sm` in place of the desktop
 * NavigationMenu (see SiteHeader, and CLAUDE.md gotcha #8). Subpages reuse
 * the existing Accordion primitive rather than a bespoke collapsible,
 * consistent with "no new pattern below 3 call sites." AccordionContent's
 * default styling underlines every descendant `<a>` (built for FAQ prose),
 * so nav links carry an explicit `no-underline!` to opt back out of that.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
          {siteConfig.nav.map((item) =>
            item.items ? (
              <Accordion key={item.href}>
                <AccordionItem value={item.href} className="border-none">
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-0.5 pl-3">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="text-foreground/80 hover:text-foreground py-1.5 text-sm font-medium no-underline!"
                    >
                      {item.overviewLabel ?? `All ${item.label}`}
                    </Link>
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={close}
                        className="text-muted-foreground hover:text-foreground py-1.5 text-sm no-underline!"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="text-foreground py-2.5 text-base font-medium"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <SheetFooter>
          <Link
            href={siteConfig.links.calendar}
            onClick={close}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Book a call
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
