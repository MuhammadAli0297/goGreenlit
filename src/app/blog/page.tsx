import type { Metadata } from "next";
import Link from "next/link";

import { BlogFilterPills } from "@/components/marketing/blog-filter-pills";
import { BlogHero } from "@/components/marketing/blog-hero";
import { BlogPagination } from "@/components/marketing/blog-pagination";
import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { buttonVariants } from "@/components/ui/button";
import {
  clampPage,
  getCategoryBySlug,
  getPostsByCategory,
  getTotalPages,
  interleaveByCategory,
  paginatePosts,
} from "@/lib/blog-data";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const title = "Blog";
const description =
  "QA insights written by the engineers who do the work: manual and automated testing, QA strategy, and lessons from real embedded engagements.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const category = getCategoryBySlug(params.category);
  const posts = getPostsByCategory(category?.slug);
  const displayPosts = category ? posts : interleaveByCategory(posts);
  const totalPages = getTotalPages(displayPosts.length);
  const currentPage = clampPage(Number(params.page ?? 1), totalPages);

  // Category views deliberately keep the bare /blog canonical (avoids
  // duplicate-content flags from query-param combinations, a separate
  // decision covered by the 2026-09-01 audit's own opportunity finding).
  // Only the unfiltered pagination case self-canonicalizes here, that's
  // the one the audit flagged as an actual bug: page 2+ was pointing
  // back at page 1 instead of itself.
  const canonical =
    !category && currentPage > 1 ? `/blog?page=${currentPage}` : "/blog";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${canonical}`,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

const blogStructuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${siteConfig.name} Blog`,
  url: `${siteConfig.url}/blog`,
  description,
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: title, href: "/blog" },
]);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = getCategoryBySlug(params.category);
  const posts = getPostsByCategory(category?.slug);
  // Only the unfiltered "all categories" view mixes categories, a
  // filtered view is already single-category throughout.
  const displayPosts = category ? posts : interleaveByCategory(posts);
  const totalPages = getTotalPages(displayPosts.length);
  const currentPage = clampPage(Number(params.page ?? 1), totalPages);
  const pagePosts = paginatePosts(displayPosts, currentPage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />

      <BlogHero
        badge="QA insights written by engineers"
        description="Practical, honest writing about manual and automated testing, QA strategy, and what actually happens inside embedded QA engagements. No fluff, no theory nobody has tried."
        ctas={
          <Link
            href={siteConfig.links.calendar}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#ee9e58] text-[#354639] hover:bg-[#ee9e58]/85",
            )}
          >
            Book a call
          </Link>
        }
      >
        Straight talk on{" "}
        <span className="aurora-glow inline-block animate-[glow-pulse_3.5s_ease-in-out_infinite] rounded-md bg-[#ee9e58] px-2 py-2 leading-[1.2] text-[#354639]">
          shipping quality software
        </span>
      </BlogHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <BlogFilterPills activeCategory={category?.slug} />

        {pagePosts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-12 text-center">
            No articles in this category yet.
          </p>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={category?.slug}
        />
      </section>

      <CtaSection
        title="Have a QA problem worth writing about?"
        description="Tell us what's breaking in your release process. We'll scope a conversation, no long-term contract required."
      />
    </>
  );
}
