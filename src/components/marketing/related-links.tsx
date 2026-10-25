import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import type { RelatedLinksGroup } from "@/lib/related-pages";

/**
 * The contextual cross-link block at the foot of every Services and QA
 * Consulting subpage (see CLAUDE.md gotcha #11): sibling pages first, then
 * the one curated cross-family pairing.
 *
 * Laid out as a deliberate asymmetry: the sibling pages are compact pills in
 * two columns, and the cross-family pairing is a dark feature card beside
 * them, so the link to the other family has real weight. The first group is
 * always the siblings, and a second group (when present) supplies the
 * feature. Without a second group the pills simply take the full width.
 * Both group headings stay real h2s for the outline.
 */
export function RelatedLinks({ groups }: { groups: RelatedLinksGroup[] }) {
  if (groups.length === 0) return null;

  const [siblings, ...others] = groups;
  const feature = others[0]?.links[0];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="border-ink border-t-[1.5px] pt-12">
        <div
          className={
            feature
              ? "grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6"
              : ""
          }
        >
          {feature && others[0] ? (
            <Reveal className="lg:order-1">
              <div className="border-ink bg-ink text-navajo relative flex h-full min-h-44 flex-col justify-between gap-8 rounded-[20px] border-[1.5px] p-6 shadow-[6px_6px_0_var(--sandy)] transition-transform duration-300 hover:-translate-x-[3px] hover:-translate-y-[3px] sm:p-7">
                <div>
                  <h2 className="font-label text-sandy text-xs font-medium tracking-widest uppercase">
                    {others[0].heading}
                  </h2>
                  <Link
                    href={feature.href}
                    className="text-paper mt-3 block text-3xl leading-[1.1] font-medium tracking-[-0.02em] after:absolute after:inset-0 after:rounded-[20px] after:content-['']"
                  >
                    {feature.label}
                  </Link>
                </div>
                <span
                  aria-hidden="true"
                  className="border-ink bg-sandy text-ink inline-flex h-10 items-center gap-2 self-start rounded-full border-[1.5px] px-5 text-[15px] font-semibold"
                >
                  Explore <span>&rarr;</span>
                </span>
              </div>
            </Reveal>
          ) : null}

          <Reveal delay={80} className={feature ? "lg:order-2" : ""}>
            <h2 className="font-label text-deep text-xs font-medium tracking-widest uppercase">
              {siblings?.heading}
            </h2>
            <ul
              className={
                feature
                  ? "mt-4 grid gap-2.5 sm:grid-cols-2"
                  : "mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {siblings?.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group border-ink bg-surface hover:bg-olive flex h-12 items-center justify-between gap-3 rounded-full border-[1.5px] px-5 text-base font-semibold transition-colors duration-200"
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
        </div>
      </div>
    </section>
  );
}
