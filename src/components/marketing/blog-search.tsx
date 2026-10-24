import { Search, X } from "lucide-react";
import Link from "next/link";

import { buildBlogHref } from "@/lib/blog-href";

/**
 * Blog search, a plain GET form with a `q` field, no client state. Submitting
 * lands on `/blog?q=...` (page 1) and keeps the active category as a hidden
 * field, so search and the category filter work together. It works with
 * scripts off and every result page is a shareable URL, the same approach as
 * the filter pills and pagination.
 */
export function BlogSearch({
  query,
  category,
}: {
  query: string;
  category?: string;
}) {
  return (
    <form
      role="search"
      action="/blog"
      method="get"
      className="mx-auto flex w-full max-w-xl items-center gap-2"
    >
      {category && <input type="hidden" name="category" value={category} />}
      <div className="border-ink bg-surface focus-within:ring-ink relative flex min-w-0 flex-1 items-center rounded-full border-[1.5px] focus-within:ring-2 focus-within:ring-offset-2">
        <Search
          aria-hidden
          className="text-ink/60 pointer-events-none absolute left-4 size-4"
        />
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          type="search"
          name="q"
          defaultValue={query}
          maxLength={80}
          placeholder="Search articles"
          autoComplete="off"
          className="text-ink placeholder:text-ink/55 h-11 w-full min-w-0 rounded-full bg-transparent pr-4 pl-10 text-base outline-none"
        />
      </div>
      <button
        type="submit"
        className="border-ink bg-ink text-paper hover:bg-deep font-label h-11 shrink-0 rounded-full border-[1.5px] px-5 text-xs tracking-wide uppercase transition-colors"
      >
        Search
      </button>
      {query && (
        <Link
          href={buildBlogHref({ category })}
          className="text-ink hover:bg-ink/10 font-label relative inline-flex h-11 shrink-0 items-center gap-1 rounded-full px-3 text-xs tracking-wide uppercase"
        >
          <X aria-hidden className="size-3.5" />
          Clear
        </Link>
      )}
    </form>
  );
}
