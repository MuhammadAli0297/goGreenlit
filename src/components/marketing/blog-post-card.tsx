import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";
import { getCategoryBySlug, type BlogPost } from "@/lib/blog-data";
import { getFounderByName } from "@/lib/founders";
import { cn } from "@/lib/utils";

/**
 * A post tile for the blog index and the "more on this topic" block: a
 * sticker card with a colored cover panel on top (the category's swatch, a
 * category pill, the post's own icon drawn large over two soft rings, and
 * the date in mono) and the title, excerpt and byline below. The whole tile
 * is one link and lifts on hover like every other sticker card.
 *
 * Replaces the old thin-strip card everywhere it appeared. The cover's color
 * comes from `BlogCategory.coverClass`, and the category is always spelled
 * out in the pill as well as colored, so it never rests on color alone. The
 * icon and rings are decorative (`aria-hidden`).
 */
export function BlogPostCard({
  post,
  index = 0,
}: {
  post: BlogPost;
  /** Position within the grid, staggers this tile's scroll-reveal. */
  index?: number;
}) {
  const category = getCategoryBySlug(post.category);
  const author = getFounderByName(post.author);
  const Icon = post.icon;
  const published = new Date(`${post.date}T00:00:00`);
  const shortDate = published.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <Reveal className="h-full" delay={index * 80}>
      <Link href={`/blog/${post.slug}`} className="group/post block h-full">
        <StickerCard className="flex h-full flex-col overflow-hidden">
          <div
            className={cn(
              "border-ink relative flex h-44 flex-col justify-between overflow-hidden border-b-[1.5px] p-4",
              category?.coverClass ?? "bg-surface text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute -right-12 -bottom-14 size-52 rounded-full border-[1.5px] border-current opacity-25"
            />
            <span
              aria-hidden="true"
              className="absolute -right-4 -bottom-6 size-32 rounded-full border-[1.5px] border-current opacity-25"
            />
            <Icon
              aria-hidden="true"
              strokeWidth={1.4}
              className="absolute right-5 bottom-4 size-16 transition-transform duration-300 group-hover/post:scale-110 group-hover/post:-rotate-6 motion-reduce:transition-none"
            />
            {category ? (
              <span className="font-label border-ink bg-surface text-ink relative self-start rounded-full border-[1.5px] px-3 py-1 text-[11px] tracking-wide uppercase">
                {category.label}
              </span>
            ) : null}
            <time
              dateTime={post.date}
              className="font-label relative text-[11px] tracking-widest uppercase"
            >
              {shortDate}
            </time>
          </div>

          <div className="flex flex-1 flex-col p-6">
            {/* Real h3, not a styled div, so post tiles build a proper heading outline for SEO. */}
            <h3 className="line-clamp-3 text-xl leading-snug font-semibold tracking-tight">
              {post.title}
            </h3>
            <p className="text-deep mt-3 line-clamp-3 text-[15.5px] leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-auto flex items-center gap-3 pt-6">
              <span
                aria-hidden="true"
                className={cn(
                  "border-ink font-label inline-flex size-8 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[11px]",
                  author.avatarClassName,
                )}
              >
                {author.initials}
              </span>
              <span className="text-[14.5px] leading-tight font-semibold">
                {post.author}
              </span>
              <span className="font-label text-deep text-[11px] tracking-widest uppercase">
                {post.readTime}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="ml-auto size-5 shrink-0 transition-transform duration-300 group-hover/post:translate-x-1.5 motion-reduce:transition-none"
              />
            </div>
          </div>
        </StickerCard>
      </Link>
    </Reveal>
  );
}
