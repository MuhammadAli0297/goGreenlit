"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import {
  MAX_SEARCH_LENGTH,
  buildBlogHref,
  normalizeSearchQuery,
} from "@/lib/blog-href";

const DEBOUNCE_MS = 250;

/**
 * Live blog search. The URL stays the source of truth: typing waits a beat,
 * then replaces `/blog?q=...` (keeping the active category, back on page 1)
 * and the server re-renders the matching posts, so results are shareable and
 * there is no client copy of the post data. It is still a real GET form, so
 * pressing Enter works with scripts off. `replace`, not `push`, so a typed
 * word does not fill the history with one entry per letter.
 */
export function BlogSearch({
  query,
  category,
}: {
  query: string;
  category?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [pending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastSent = useRef(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Follow the URL when it changes from outside (back button, a category
  // pill that dropped the search), but never overwrite what is being typed.
  useEffect(() => {
    if (query !== lastSent.current) {
      lastSent.current = query;
      setValue(query);
    }
  }, [query]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const go = (next: string) => {
    const q = normalizeSearchQuery(next);
    if (q === lastSent.current) return;
    lastSent.current = q;
    startTransition(() => {
      router.replace(buildBlogHref({ category, q }), { scroll: false });
    });
  };

  const onChange = (next: string) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => go(next), DEBOUNCE_MS);
  };

  const clear = () => {
    clearTimeout(timer.current);
    setValue("");
    go("");
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      action="/blog"
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        go(value);
      }}
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
          ref={inputRef}
          id="blog-search"
          type="search"
          name="q"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={MAX_SEARCH_LENGTH}
          placeholder="Search articles"
          autoComplete="off"
          aria-busy={pending}
          className="text-ink placeholder:text-ink/55 h-11 w-full min-w-0 rounded-full bg-transparent pr-4 pl-10 text-base outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
      {value && (
        <button
          type="button"
          onClick={clear}
          className="text-ink hover:bg-ink/10 font-label inline-flex h-11 shrink-0 items-center gap-1 rounded-full px-3 text-xs tracking-wide uppercase"
        >
          <X aria-hidden className="size-3.5" />
          Clear
        </button>
      )}
    </form>
  );
}
