import Link from "next/link";

import { blogCategories } from "@/lib/blog-data";
import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

const pillClass =
  "border-ink font-label text-ink hover:bg-ink/10 relative inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-xs tracking-wide uppercase transition-colors sm:min-h-10";
const pillActiveClass =
  "bg-ink text-paper hover:bg-ink shadow-[3px_3px_0_0_var(--sandy)]";

/**
 * Category filter pills for the blog index, plain `<Link>`s with a
 * `?category=` query param, no client state. Works identically on every
 * paginated page since it's just a URL, and selecting a category always
 * lands on page 1 (no `page` param on these links). An active search query
 * is carried along, so a category can narrow a search.
 */
export function BlogFilterPills({
  activeCategory,
  query,
}: {
  activeCategory?: string;
  query?: string;
}) {
  return (
    <nav
      aria-label="Filter articles by category"
      className="flex flex-wrap items-center justify-center gap-2.5"
    >
      <Link
        href={buildBlogHref({ q: query })}
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(pillClass, !activeCategory && pillActiveClass)}
      >
        All articles
      </Link>
      {blogCategories.map((category) => {
        const isActive = activeCategory === category.slug;
        return (
          <Link
            key={category.slug}
            href={buildBlogHref({ category: category.slug, q: query })}
            aria-current={isActive ? "page" : undefined}
            className={cn(pillClass, isActive && pillActiveClass)}
          >
            <span
              aria-hidden
              className={cn(
                "border-ink size-2.5 rounded-full border",
                category.colorClass,
              )}
            />
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
