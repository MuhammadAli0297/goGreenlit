import type { Metadata } from "next";
import Link from "next/link";

import { ctaVariants } from "@/components/brand/cta-variants";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { BlogCategoryHeader } from "@/components/marketing/blog-category-header";
import { BlogFeaturedPost } from "@/components/marketing/blog-featured-post";
import { BlogFilterPills } from "@/components/marketing/blog-filter-pills";
import { BlogHero } from "@/components/marketing/blog-hero";
import { BlogPagination } from "@/components/marketing/blog-pagination";
import { BlogSearch } from "@/components/marketing/blog-search";
import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { getBlogIndexView, getPostsByCategory } from "@/lib/blog-data";
import { buildBlogHref } from "@/lib/blog-href";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

const title = "Blog";
const description =
  "QA insights written by the engineers who do the work: manual and automated testing, QA strategy, and lessons from real embedded engagements.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}): Promise<Metadata> {
  const { category, query, currentPage } = getBlogIndexView(await searchParams);

  // Search results are thin, endless URL variants, so they stay out of the
  // index and point their canonical at the page they narrow (the category
  // view, or the bare blog). Links on them are still followed.
  if (query) {
    const base = category
      ? buildBlogHref({ category: category.slug })
      : "/blog";
    return {
      title: `Search results for "${query}"`,
      description,
      robots: { index: false, follow: true },
      alternates: { canonical: base },
    };
  }

  // Each category now carries its own real 150-160 char description (see
  // BlogCategory in blog-data.ts), so a filtered view earns a genuinely
  // unique title/description instead of sharing the unfiltered index's,
  // and self-canonicalizes to its own URL rather than the bare /blog
  // pointer it used before. Pagination within a category still folds
  // into that same category canonical (`?category=slug&page=N`), the
  // same one-dimension-self-canonicalizes-at-a-time approach the
  // unfiltered view already established.
  const pageTitle = category ? `${category.label} Articles` : title;
  const pageDescription = category ? category.description : description;
  const canonicalParams = new URLSearchParams();
  if (category) canonicalParams.set("category", category.slug);
  if (currentPage > 1) canonicalParams.set("page", String(currentPage));
  const canonical = canonicalParams.size
    ? `/blog?${canonicalParams.toString()}`
    : "/blog";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${canonical}`,
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
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

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: title, href: "/blog" },
];
const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const {
    category,
    query,
    featured,
    displayPosts,
    totalPages,
    currentPage,
    pagePosts,
  } = getBlogIndexView(await searchParams);

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

      <Breadcrumbs items={breadcrumbItems} />

      <BlogHero
        badge="QA insights written by engineers"
        description="Practical, honest writing about manual and automated testing, QA strategy, and what actually happens inside embedded QA engagements. No fluff, no theory nobody has tried."
        ctas={
          <Link
            href={siteConfig.links.calendar}
            className={ctaVariants({ variant: "cta", size: "xl" })}
          >
            Book a call <span aria-hidden="true">&rarr;</span>
          </Link>
        }
      >
        Straight talk on <em>shipping quality software</em>
      </BlogHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {category && (
          <BlogCategoryHeader
            category={category}
            postCount={getPostsByCategory(category.slug).length}
          />
        )}

        <BlogSearch query={query} category={category?.slug} />
        <div className="mt-6">
          <BlogFilterPills activeCategory={category?.slug} query={query} />
        </div>

        <p
          role="status"
          className={
            query
              ? "text-muted-foreground font-label mt-8 text-center text-xs tracking-wide uppercase"
              : "sr-only"
          }
        >
          {query
            ? `${displayPosts.length} ${displayPosts.length === 1 ? "article" : "articles"} for "${query}"`
            : ""}
        </p>

        {featured && (
          <div className="mt-12">
            <BlogFeaturedPost post={featured} />
          </div>
        )}

        {pagePosts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-12 text-center">
            {query
              ? "No articles match that search. Try a shorter phrase, or clear the search and pick a category."
              : "No articles in this category yet."}
          </p>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          category={category?.slug}
          query={query}
        />
      </section>

      <CtaSection
        title="Have a QA problem worth writing about?"
        description="Tell us what's breaking in your release process. We'll scope a conversation, no long-term contract required."
      />
    </>
  );
}
