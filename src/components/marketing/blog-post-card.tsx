import Link from "next/link";

import { Reveal } from "@/components/marketing/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCategoryBySlug, type BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export function BlogPostCard({
  post,
  index = 0,
}: {
  post: BlogPost;
  /** Position within the grid, staggers this tile's scroll-reveal. */
  index?: number;
}) {
  const category = getCategoryBySlug(post.category);
  const Icon = post.icon;
  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <Reveal className="h-full" delay={index * 80}>
      <Link
        href={`/blog/${post.slug}`}
        className="group/post-card block h-full"
      >
        <Card className="group-hover/post-card:border-primary/40 h-full transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
                <Icon className="size-5" />
              </div>
              {category ? (
                <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium">
                  <span
                    aria-hidden
                    className={cn("size-1.5 rounded-full", category.colorClass)}
                  />
                  {category.label}
                </span>
              ) : null}
            </div>
            {/* Real h3, not CardTitle's div, so post cards build a proper heading outline for SEO. */}
            <h3 className="font-heading group-hover/post-card:text-primary mt-3 text-base leading-snug font-medium">
              {post.title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{post.excerpt}</p>
            <p className="text-muted-foreground/80 mt-4 text-xs">
              {post.author} &middot; {formattedDate} &middot; {post.readTime}
            </p>
          </CardContent>
        </Card>
      </Link>
    </Reveal>
  );
}
