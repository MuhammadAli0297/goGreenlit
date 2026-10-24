import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogRelatedPosts } from "@/components/marketing/blog-related-posts";
import { blogPosts, getCategoryBySlug, getRelatedPosts } from "@/lib/blog-data";

describe("BlogRelatedPosts", () => {
  const post = blogPosts[0]!;
  const category = getCategoryBySlug(post.category);

  it("keeps the H2, shows each related post and links to the whole category", () => {
    const related = getRelatedPosts(post);
    render(<BlogRelatedPosts posts={related} category={category} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "More on this topic" }),
    ).toBeInTheDocument();
    for (const r of related) {
      expect(
        screen.getByRole("heading", { name: r.title }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", {
        name: new RegExp(`All ${category!.label} articles`),
      }),
    ).toHaveAttribute("href", `/blog?category=${post.category}#blog-top`);
  });

  it("renders nothing without posts", () => {
    const { container } = render(<BlogRelatedPosts posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
