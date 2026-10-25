import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

const keyClass =
  "text-ink font-label relative inline-flex size-11 items-center justify-center rounded-[10px] bg-ink/7 text-[13px] transition-colors";
const keyLiveClass = "hover:bg-ink/14";
const keyActiveClass = "bg-ink text-paper hover:bg-ink";

/**
 * Prev/Next plus numbered page links, all plain `<Link>`s (no client
 * state), always carrying the current `category` and search `query` along
 * with the `page` param, so moving between pages never drops a filter. At
 * the ends, Previous and Next are not links at all (a disabled control that
 * is still a link is a trap for keyboards and crawlers), they render as
 * dimmed keys marked `aria-disabled`. Quiet square keys in one row that
 * wraps if the screen is too narrow for all of them.
 */
export function BlogPagination({
  currentPage,
  totalPages,
  category,
  query,
}: {
  currentPage: number;
  totalPages: number;
  category?: string;
  query?: string;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) =>
    buildBlogHref({ category, q: query, page, hash: "blog-list" });

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      {isFirst ? (
        <span aria-disabled="true" className={cn(keyClass, "opacity-35")}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">Previous page</span>
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage - 1)}
          rel="prev"
          className={cn(keyClass, keyLiveClass)}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span className="sr-only">Previous page</span>
        </Link>
      )}

      <ol className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link
              href={hrefFor(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={cn(
                keyClass,
                page === currentPage ? keyActiveClass : keyLiveClass,
              )}
            >
              {page}
            </Link>
          </li>
        ))}
      </ol>

      {isLast ? (
        <span aria-disabled="true" className={cn(keyClass, "opacity-35")}>
          <ArrowRight aria-hidden="true" className="size-4" />
          <span className="sr-only">Next page</span>
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage + 1)}
          rel="next"
          className={cn(keyClass, keyLiveClass)}
        >
          <ArrowRight aria-hidden="true" className="size-4" />
          <span className="sr-only">Next page</span>
        </Link>
      )}
    </nav>
  );
}
