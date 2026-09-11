import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/marketing/article-body";
import { BlogPostHeader } from "@/components/marketing/blog-post-header";
import { BlogRelatedPosts } from "@/components/marketing/blog-related-posts";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { stripInlineLinks } from "@/components/marketing/inline-links";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { buildBreadcrumbSchema } from "@/lib/breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, excerpt: description } = post;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);

  const postStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
    datePublished: post.date,
    // No separate "last edited" field exists in the data model, `date`
    // is already bumped whenever a post's content meaningfully changes
    // (see CLAUDE.md gotcha #15), so it is the real, honest value for
    // both fields, not a fabricated freshness signal.
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/apple-icon`,
        width: 180,
        height: 180,
      },
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  const faqStructuredData = post.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: stripInlineLinks(answer),
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      )}

      <BlogPostHeader post={post} />
      <ArticleBody blocks={post.body} />

      {post.faqs && post.faqs.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={post.faqs} />
          </div>
        </section>
      )}

      <BlogRelatedPosts posts={relatedPosts} />

      <CtaSection
        title="Ready to put this into practice?"
        description="Tell us what you're building and where testing is falling through the cracks. We'll scope an engagement in one call."
      />
    </>
  );
}
