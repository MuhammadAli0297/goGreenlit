import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/marketing/article-body";
import { BlogPostHeader } from "@/components/marketing/blog-post-header";
import { BlogRelatedPosts } from "@/components/marketing/blog-related-posts";
import { CtaSection } from "@/components/marketing/cta-section";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
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
      images: [{ url: siteConfig.ogImage }],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
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
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postStructuredData) }}
      />

      <BlogPostHeader post={post} />
      <ArticleBody blocks={post.body} />
      <BlogRelatedPosts posts={relatedPosts} />

      <CtaSection
        title="Ready to put this into practice?"
        description="Tell us what you're building and where testing is falling through the cracks. We'll scope an engagement in one call."
      />
    </>
  );
}
