import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Prev/Next plus numbered page links, all plain `<Link>`s (no client
 * state), always carrying the current `category` filter along with the
 * `page` param. This is the pagination half of "filters work on every
 * page": since every link here is built from the current category, moving
 * between pages never drops the active filter.
 */
export function BlogPagination({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number;
  totalPages: number;
  category?: string;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          isFirst && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft />
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={hrefFor(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          isLast && "pointer-events-none opacity-40",
        )}
      >
        Next
        <ChevronRight />
      </Link>
    </nav>
  );
}
