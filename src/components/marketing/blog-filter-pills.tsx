import Link from "next/link";

import { blogCategories } from "@/lib/blog-data";
import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

const pillClass =
  "text-ink relative inline-flex min-h-11 items-center rounded-[10px] px-4 text-[15.5px] transition-colors hover:shadow-[inset_0_0_0_999px_rgba(28,40,32,0.07)] sm:min-h-10";
const allActiveClass = "bg-ink text-paper font-semibold hover:shadow-none";

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
        className={cn(pillClass, activeCategory ? "bg-ink/8" : allActiveClass)}
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
            className={cn(
              pillClass,
              isActive
                ? cn(category.coverClass, "font-semibold hover:shadow-none")
                : category.tintClass,
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
