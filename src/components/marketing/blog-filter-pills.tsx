import Link from "next/link";

import { blogCategories } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const pillClass =
  "border-border/60 text-foreground/80 hover:border-primary/40 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors";
const pillActiveClass =
  "bg-primary text-primary-foreground border-primary hover:text-primary-foreground";

/**
 * Category filter pills for the blog index, plain `<Link>`s with a
 * `?category=` query param, no client state. Works identically on every
 * paginated page since it's just a URL, and selecting a category always
 * lands on page 1 (no `page` param on these links).
 */
export function BlogFilterPills({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  return (
    <nav
      aria-label="Filter articles by category"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href="/blog"
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
            href={`/blog?category=${category.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(pillClass, isActive && pillActiveClass)}
          >
            <span
              aria-hidden
              className={cn(
                "size-1.5 rounded-full",
                isActive ? "bg-primary-foreground" : category.colorClass,
              )}
            />
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
