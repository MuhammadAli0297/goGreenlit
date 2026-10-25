import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { StickerCard } from "@/components/brand/sticker-card";
import { Reveal } from "@/components/marketing/reveal";
import { getCategoryBySlug, type BlogPost } from "@/lib/blog-data";
import { getFounderByName } from "@/lib/founders";
import { cn } from "@/lib/utils";

/**
 * The featured article above the blog grid: one wide sticker card, a large
 * category-colored cover on the left (rings, the post's own icon, a "Featured"
 * label) and the title, full excerpt and byline on the right. Stacks on a
 * phone with the cover on top. The whole card is one link, the title is the
 * page's first `h2`, and the category is spelled out as well as colored.
 */
export function BlogFeaturedPost({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.category);
  const author = getFounderByName(post.author);
  const Icon = post.icon;
  const date = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Reveal>
      <Link href={`/blog/${post.slug}`} className="group/feat block">
        <StickerCard className="grid overflow-hidden lg:grid-cols-[5fr_7fr]">
          <div
            className={cn(
              "border-ink relative flex min-h-56 flex-col justify-between overflow-hidden border-b-[1.5px] p-6 lg:min-h-80 lg:border-r-[1.5px] lg:border-b-0",
              category?.coverClass ?? "bg-surface text-ink",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute -right-20 -bottom-24 size-80 rounded-full border-[1.5px] border-current opacity-25"
            />
            <span
              aria-hidden="true"
              className="absolute -right-6 -bottom-10 size-52 rounded-full border-[1.5px] border-current opacity-25"
            />
            <Icon
              aria-hidden="true"
              strokeWidth={1.2}
              className="absolute right-8 bottom-7 size-24 transition-transform duration-300 group-hover/feat:scale-110 group-hover/feat:-rotate-6 motion-reduce:transition-none"
            />
            <span className="font-label border-ink bg-sandy text-ink relative self-start rounded-full border-[1.5px] px-3 py-1 text-[11px] tracking-wide uppercase">
              Featured article
            </span>
            {category ? (
              <span className="font-label border-ink bg-surface text-ink relative self-start rounded-full border-[1.5px] px-3 py-1 text-[11px] tracking-wide uppercase">
                {category.label}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <time
              dateTime={post.date}
              className="font-label text-deep text-[11px] tracking-widest uppercase"
            >
              {date}
            </time>
            <h2 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
              {post.title}
            </h2>
            <p className="text-deep mt-4 text-base leading-relaxed sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <span
                aria-hidden="true"
                className={cn(
                  "border-ink font-label inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] text-xs",
                  author.avatarClassName,
                )}
              >
                {author.initials}
              </span>
              <span className="font-semibold">{post.author}</span>
              <span className="font-label text-deep text-[11px] tracking-widest uppercase">
                {post.readTime}
              </span>
              <span className="border-ink bg-ink text-paper font-label ml-auto inline-flex items-center gap-2 rounded-full border-[1.5px] px-4 py-2 text-xs tracking-wide uppercase">
                Read the article
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover/feat:translate-x-1.5 motion-reduce:transition-none"
                />
              </span>
            </div>
          </div>
        </StickerCard>
      </Link>
    </Reveal>
  );
}
