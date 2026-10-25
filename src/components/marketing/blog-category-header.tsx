import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { StickerCard } from "@/components/brand/sticker-card";
import type { BlogCategory } from "@/lib/blog-data";
import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

/**
 * The intro block of a category view (`/blog?category=slug`): a banner in the
 * category's own swatch with a mono "Category" label, the heading, the
 * category's real description (the same copy as its meta description, see
 * `BlogCategory.description`), how many articles it holds and a way back to
 * every article. It is what makes the view read as its own page, not the
 * index with a filter on, which is also what its self-canonical relies on
 * (CLAUDE.md gotcha #29). Pills inside use the light surface so they read on
 * every swatch, including the dark Case Studies one.
 */
export function BlogCategoryHeader({
  category,
  postCount,
}: {
  category: BlogCategory;
  postCount: number;
}) {
  return (
    <StickerCard
      interactive={false}
      className={cn(
        "relative mx-auto mb-10 overflow-hidden p-6 sm:p-10",
        category.coverClass,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -top-24 -right-16 size-80 rounded-full border-[1.5px] border-current opacity-25"
      />
      <span
        aria-hidden="true"
        className="absolute -top-10 -right-2 size-52 rounded-full border-[1.5px] border-current opacity-25"
      />
      <div className="relative max-w-2xl">
        <span className="font-label border-ink bg-surface text-ink inline-block rounded-full border-[1.5px] px-3 py-1 text-[11px] tracking-wide uppercase">
          Category
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {category.label} articles
        </h2>
        <p className="mt-3 text-base leading-relaxed sm:text-lg">
          {category.description}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-label text-[11px] tracking-widest uppercase">
            {postCount} {postCount === 1 ? "article" : "articles"}
          </span>
          <Link
            href={buildBlogHref({ hash: "blog-top" })}
            className="font-label border-ink bg-surface text-ink hover:bg-paper relative inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-xs tracking-wide uppercase transition-colors after:absolute after:inset-x-0 after:-inset-y-1.5"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            All articles
          </Link>
        </div>
      </div>
    </StickerCard>
  );
}
