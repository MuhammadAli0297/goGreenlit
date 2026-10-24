import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogFeaturedPost } from "@/components/marketing/blog-featured-post";
import { getFeaturedPost } from "@/lib/blog-data";

describe("BlogFeaturedPost", () => {
  const post = getFeaturedPost()!;

  it("is one link to the post with the title as an h2", () => {
    render(<BlogFeaturedPost post={post} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/blog/${post.slug}`,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: post.title }),
    ).toBeInTheDocument();
  });

  it("spells out that it is featured, with the category and byline", () => {
    render(<BlogFeaturedPost post={post} />);
    expect(screen.getByText("Featured article")).toBeInTheDocument();
    expect(screen.getByText(post.author)).toBeInTheDocument();
    expect(screen.getByText("Read the article")).toBeInTheDocument();
  });
});
