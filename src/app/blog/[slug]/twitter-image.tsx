import { ImageResponse } from "next/og";

import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import {
  blogOgImageSize,
  buildBlogOgElement,
  loadBlogOgFonts,
} from "@/lib/blog-og-image";

export const size = blogOgImageSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const fonts = await loadBlogOgFonts();

  return new ImageResponse(post ? buildBlogOgElement(post) : <div />, {
    ...size,
    fonts,
  });
}
