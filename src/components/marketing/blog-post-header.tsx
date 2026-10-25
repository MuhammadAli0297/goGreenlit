import Link from "next/link";

import { BackToBlogLink } from "@/components/marketing/back-to-blog-link";
import { authorBios, getCategoryBySlug, type BlogPost } from "@/lib/blog-data";
import { getFounderByName } from "@/lib/founders";
import { cn } from "@/lib/utils";

/**
 * A calm, reading-width header for an individual post, deliberately not a
 * full dark BlogHero/PageHero treatment repeated on every article. PageHero
 * is the "secondary page" landing moment; an article is a page deeper, one
 * meant to be read, so a full-bleed bold hero on every post would work
 * against that instead of for it. The Live Build restyle keeps it light:
 * a mono category pill in the category's swatch, the date and read time in
 * mono, a large serif title, the post's own icon in a tinted tile beside it
 * from `sm`, and a byline with the founder's initials that links to their
 * card on the About page. The reading progress bar lives beside it on the
 * post page (`ReadingProgress`).
 */
export function BlogPostHeader({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.category);
  const author = getFounderByName(post.author);
  const Icon = post.icon;
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <header className="border-ink/15 border-b">
      <div className="mx-auto max-w-3xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">
        <BackToBlogLink />

        <div className="mt-8 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {category ? (
                <Link
                  href={`/blog?category=${category.slug}`}
                  className={cn(
                    "font-label border-ink relative rounded-full border-[1.5px] px-3 py-1 text-[11px] tracking-wide uppercase after:absolute after:inset-x-0 after:-inset-y-2.5",
                    category.coverClass,
                  )}
                >
                  {category.label}
                </Link>
              ) : null}
              <span className="font-label text-deep text-[11px] tracking-widest uppercase">
                <time dateTime={post.date}>{formattedDate}</time>
                {" · "}
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">
              {post.title}
            </h1>
          </div>

          <div
            aria-hidden="true"
            className={cn(
              "border-ink hidden size-20 shrink-0 items-center justify-center rounded-[18px] border-[1.5px] sm:flex",
              category?.coverClass ?? "bg-surface text-ink",
            )}
          >
            <Icon strokeWidth={1.4} className="size-10" />
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3.5">
          <span
            aria-hidden="true"
            className={cn(
              "border-ink font-label inline-flex size-10 shrink-0 items-center justify-center rounded-full border-[1.5px] text-xs",
              author.avatarClassName,
            )}
          >
            {author.initials}
          </span>
          <div className="min-w-0">
            <Link
              href={`/about#${author.slug}`}
              className="relative font-semibold after:absolute after:inset-x-0 after:-inset-y-3 hover:underline"
            >
              {post.author}
            </Link>
            <p className="text-deep mt-0.5 text-[15px] leading-snug">
              {authorBios[post.author]}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
