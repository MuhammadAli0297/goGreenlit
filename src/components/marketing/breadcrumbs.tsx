import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/breadcrumbs";

/**
 * Visible counterpart to buildBreadcrumbSchema()'s JSON-LD, same items
 * array feeds both so they can never drift apart. Plain "/" separator,
 * not an icon, so this stays safe to use on the About page too (gotcha
 * #7's "zero icons anywhere" rule). Sits on the page's plain background
 * above the hero, not inside any one family's bold section, so its
 * styling doesn't need to vary per family.
 */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-border/60 border-b">
      <ol className="text-muted-foreground mx-auto flex max-w-6xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm sm:px-6 lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden>/</span>}
              {isLast ? (
                <span aria-current="page" className="text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-foreground">
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
