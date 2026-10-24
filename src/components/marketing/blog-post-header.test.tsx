import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BlogPostHeader } from "@/components/marketing/blog-post-header";
import { ReadingProgress } from "@/components/marketing/reading-progress";
import { authorBios, blogPosts } from "@/lib/blog-data";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

describe("BlogPostHeader", () => {
  const post = blogPosts[0]!;

  it("has the post title as the one h1, a category link, the date and read time", () => {
    render(<BlogPostHeader post={post} />);
    expect(
      screen.getByRole("heading", { level: 1, name: post.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /^(QA Strategy|Test Automation|Outsourcing|Testing Practices|Case Studies)/,
      }),
    ).toHaveAttribute("href", expect.stringContaining("/blog?category="));
    expect(
      screen.getByText(post.readTime, { exact: false }),
    ).toBeInTheDocument();
    expect(document.querySelector("time")).toHaveAttribute(
      "datetime",
      post.date,
    );
  });

  it("links the author to their About card and shows the bio", () => {
    render(<BlogPostHeader post={post} />);
    expect(screen.getByRole("link", { name: post.author })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/about#/),
    );
    expect(screen.getByText(authorBios[post.author])).toBeInTheDocument();
  });
});

describe("ReadingProgress", () => {
  it("is decorative and starts empty", () => {
    const { container } = render(<ReadingProgress targetId="missing" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect((root.firstElementChild as HTMLElement).style.transform).toBe(
      "scaleX(0)",
    );
  });
});
