import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/breadcrumbs";

/**
 * Visible counterpart to buildBreadcrumbSchema()'s JSON-LD, same items
 * array feeds both so they can never drift apart. Plain "/" separator,
 * not an icon, so this stays safe to use on the About page too (gotcha
 * #7's "zero icons anywhere" rule). Sits on the page's plain background
 * above the hero, not inside any one family's bold section, so its
 * styling doesn't need to vary per family.
 *
 * It is the first element on every page except the homepage, which is why
 * it carries the top clearance for the floating pill header (the header
 * takes no layout space, see SiteHeader). Set in the mono label style so
 * it reads as page furniture rather than content.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-(--header-clearance)">
      <ol className="font-label text-deep mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-4 pt-4 pb-3 text-xs tracking-widest uppercase sm:px-6 lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden>/</span>}
              {isLast ? (
                <span aria-current="page" className="text-ink font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-ink underline-offset-4 transition-colors hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
