import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import type { RelatedLinksGroup } from "@/lib/related-pages";

export function RelatedLinks({ groups }: { groups: RelatedLinksGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="border-border/60 grid gap-10 border-t pt-12 sm:grid-cols-2">
        {groups.map((group, index) => (
          <Reveal key={group.heading} delay={index * 80}>
            <h2 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-foreground/90 hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 -translate-y-px opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
