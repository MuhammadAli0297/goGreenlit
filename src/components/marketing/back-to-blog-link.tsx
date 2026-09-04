"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Plain link to /blog for no-JS and crawlers, but with JS available it
 * goes back in browser history instead whenever there is a previous
 * entry to return to. That restores the exact category/page the reader
 * was on (a plain href="/blog" always lands on the unfiltered page 1)
 * and lets the browser's native scroll restoration put them back where
 * they were scrolled, since a fresh push navigation always scrolls to
 * top. `document.referrer` cannot tell us this: it only updates on a
 * real document load, never on a client-side route transition, so a
 * reader who arrived via a normal in-app Link click still shows an
 * empty or stale referrer. `window.history.length` does not have that
 * problem, Next's router still calls the History API under the hood
 * for client-side navigation, so length grows with every in-app page
 * visited in this tab, same as a plain multi-page site.
 */
export function BackToBlogLink() {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const hasPreviousPageInThisTab =
      typeof window !== "undefined" && window.history.length > 1;

    if (hasPreviousPageInThisTab) {
      event.preventDefault();
      router.back();
    }
  }

  return (
    <Link
      href="/blog"
      onClick={handleClick}
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium"
    >
      <ArrowLeft className="size-4" />
      Back to the blog
    </Link>
  );
}
