import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogPostCard } from "@/components/marketing/blog-post-card";
import type { BlogCategory, BlogPost } from "@/lib/blog-data";
import { buildBlogHref } from "@/lib/blog-href";
import { cn } from "@/lib/utils";

/**
 * The "more on this topic" block at the end of a post: the post's category
 * tint as the band's ground (so it ties to the cover colors on the tiles
 * below), a mono "Keep reading" label, the same H2 as before, a link to the
 * whole category and the post tiles. It sits between the FAQ and the closing
 * call to action. The H2 text is unchanged, an in-page anchor or a heading
 * outline check can still rely on it.
 */
export function BlogRelatedPosts({
  posts,
  category,
}: {
  posts: BlogPost[];
  category?: BlogCategory;
}) {
  if (posts.length === 0) return null;

  return (
    <section
      className={cn(
        "border-ink/15 border-y",
        category?.tintClass ?? "bg-surface",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-label text-deep text-xs tracking-widest uppercase">
              Keep reading
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              More on this topic
            </h2>
          </div>
          {category ? (
            <Link
              href={buildBlogHref({
                category: category.slug,
                hash: "blog-top",
              })}
              className="font-label border-ink text-ink hover:bg-ink/10 relative inline-flex min-h-11 items-center gap-2 self-start rounded-full border-[1.5px] px-4 text-xs tracking-wide uppercase transition-colors sm:self-auto"
            >
              All {category.label} articles
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
