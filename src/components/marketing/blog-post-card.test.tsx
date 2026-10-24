import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogPostCard } from "@/components/marketing/blog-post-card";
import { blogCategories, blogPosts } from "@/lib/blog-data";

describe("BlogPostCard", () => {
  const post = blogPosts[0]!;

  it("is one link to the post with the title as an h3", () => {
    render(<BlogPostCard post={post} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/blog/${post.slug}`);
    expect(
      screen.getByRole("heading", { level: 3, name: post.title }),
    ).toBeInTheDocument();
  });

  it("spells out the category, author, read time and date, not color alone", () => {
    render(<BlogPostCard post={post} />);
    const category = blogCategories.find((c) => c.slug === post.category)!;
    expect(screen.getByText(category.label)).toBeInTheDocument();
    expect(screen.getByText(post.author)).toBeInTheDocument();
    expect(screen.getByText(post.readTime)).toBeInTheDocument();
    expect(
      document.querySelector(`time[datetime="${post.date}"]`),
    ).not.toBeNull();
  });

  it("colors the cover from the category and keeps the excerpt in the markup", () => {
    const { container } = render(<BlogPostCard post={post} />);
    const category = blogCategories.find((c) => c.slug === post.category)!;
    const firstClass = category.coverClass.split(" ")[0]!;
    expect(
      container.querySelector(`.${CSS.escape(firstClass)}`),
    ).not.toBeNull();
    expect(screen.getByText(post.excerpt)).toBeInTheDocument();
  });

  it("gives every category a cover color that reads on it", () => {
    for (const category of blogCategories) {
      expect(category.coverClass).toMatch(/^bg-\w+ text-(ink|navajo)$/);
    }
  });
});
