import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import type { RelatedLinksGroup } from "@/lib/related-pages";
import { cn } from "@/lib/utils";

/**
 * The contextual cross-link block at the foot of every Services and QA
 * Consulting subpage (see CLAUDE.md gotcha #11): sibling pages first, then
 * the one curated cross-family pairing. Each link is a full-width row
 * that nudges right and fills with color on hover. The first group fills
 * Muted Olive, later groups (the cross-family one) fill Navajo White, so
 * a link to the other family reads as a different kind of destination.
 */
export function RelatedLinks({ groups }: { groups: RelatedLinksGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="border-ink grid gap-10 border-t-[1.5px] pt-12 sm:grid-cols-2">
        {groups.map((group, index) => (
          <Reveal key={group.heading} delay={index * 80}>
            <h2 className="font-label text-deep text-xs font-medium tracking-widest uppercase">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group border-ink bg-surface flex items-center justify-between gap-3 rounded-2xl border-[1.5px] px-5 py-4 text-lg font-semibold transition-[transform,background-color] duration-200 hover:translate-x-1.5",
                      index === 0 ? "hover:bg-olive" : "hover:bg-navajo",
                    )}
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
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
