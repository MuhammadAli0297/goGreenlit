import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

const stepClass =
  "border-ink font-label text-ink relative inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 text-xs tracking-wide uppercase transition-colors";
const pageClass =
  "border-ink font-label text-ink hover:bg-ink/10 relative inline-flex size-11 items-center justify-center rounded-full border-[1.5px] text-sm transition-colors";
const pageActiveClass =
  "bg-ink text-paper hover:bg-ink shadow-[3px_3px_0_0_var(--sandy)]";

/**
 * Prev/Next plus numbered page links, all plain `<Link>`s (no client
 * state), always carrying the current `category` and search `query` along
 * with the `page` param, so moving between pages never drops a filter. At
 * the ends, Previous and Next are not links at all (a disabled control that
 * is still a link is a trap for keyboards and crawlers), they render as
 * dimmed text marked `aria-disabled`. The numbered links drop below the
 * Previous/Next row on a phone so nothing overflows.
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

  const hrefFor = (page: number) => buildBlogHref({ category, q: query, page });

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-4"
    >
      {isFirst ? (
        <span aria-disabled="true" className={cn(stepClass, "opacity-40")}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          Previous
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage - 1)}
          rel="prev"
          className={cn(stepClass, "hover:bg-ink/10")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Previous
        </Link>
      )}

      <ol className="order-last flex w-full items-center justify-center gap-2 sm:order-none sm:w-auto">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <Link
              href={hrefFor(page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Page ${page}`}
              className={cn(pageClass, page === currentPage && pageActiveClass)}
            >
              {page}
            </Link>
          </li>
        ))}
      </ol>

      {isLast ? (
        <span aria-disabled="true" className={cn(stepClass, "opacity-40")}>
          Next
          <ArrowRight aria-hidden="true" className="size-4" />
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage + 1)}
          rel="next"
          className={cn(stepClass, "hover:bg-ink/10")}
        >
          Next
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </nav>
  );
}
