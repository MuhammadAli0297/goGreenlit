import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { BackToBlogLink } from "@/components/marketing/back-to-blog-link";
import { authorBios, getCategoryBySlug, type BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

/**
 * A calm, reading-width header for an individual post, deliberately not a
 * full dark BlogHero/PageHero treatment repeated on every article. PageHero
 * is the "secondary page" landing moment; an article is a page deeper, one
 * meant to be read, so a full-bleed bold hero on all 12 posts would work
 * against that instead of for it.
 */
export function BlogPostHeader({ post }: { post: BlogPost }) {
  const category = getCategoryBySlug(post.category);
  const Icon = post.icon;
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <header className="border-border/60 border-b">
      <div className="mx-auto max-w-3xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">
        <BackToBlogLink />

        <div className="mt-6 flex items-center gap-3">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-lg",
              category ? category.tintClass : "bg-accent",
            )}
          >
            <Icon className="text-foreground size-5" />
          </div>
          {category ? (
            <Badge
              variant="outline"
              className={cn("gap-1.5 border-transparent", category.tintClass)}
            >
              <span
                aria-hidden
                className={cn("size-1.5 rounded-full", category.colorClass)}
              />
              {category.label}
            </Badge>
          ) : null}
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>

        <p className="text-muted-foreground mt-4 text-sm">
          <Link href="/about" className="hover:text-foreground font-medium">
            {post.author}
          </Link>{" "}
          &middot; {formattedDate} &middot; {post.readTime}
        </p>
        <p className="text-muted-foreground/80 mt-1 text-sm">
          {authorBios[post.author]}
        </p>
      </div>
    </header>
  );
}
