import { BlogPostCard } from "@/components/marketing/blog-post-card";
import type { BlogPost } from "@/lib/blog-data";

export function BlogRelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-border/60 border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          More on this topic
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
