import { describe, expect, it } from "vitest";

import {
  POSTS_PER_PAGE,
  blogCategories,
  blogPosts,
  clampPage,
  getCategoryBySlug,
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
  getTotalPages,
  paginatePosts,
} from "@/lib/blog-data";

describe("getPostBySlug", () => {
  it("finds a post by its slug", () => {
    expect(getPostBySlug("playwright-vs-selenium-2026")?.title).toBe(
      "Playwright vs Selenium in 2026: Which One Should You Choose?",
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getCategoryBySlug", () => {
  it("finds a category by its slug", () => {
    expect(getCategoryBySlug("qa-strategy")?.label).toBe("QA Strategy");
  });

  it("returns undefined for an unknown or missing slug", () => {
    expect(getCategoryBySlug("not-a-category")).toBeUndefined();
    expect(getCategoryBySlug(undefined)).toBeUndefined();
  });
});

describe("getPostsByCategory", () => {
  it("returns every post when no category is given", () => {
    expect(getPostsByCategory(undefined)).toHaveLength(blogPosts.length);
  });

  it("filters to only posts in the given category", () => {
    const posts = getPostsByCategory("case-studies");
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.category === "case-studies")).toBe(true);
  });

  it("falls back to every post for an unknown category", () => {
    expect(getPostsByCategory("not-a-category")).toHaveLength(blogPosts.length);
  });
});

describe("getRelatedPosts", () => {
  it("only returns posts from the same category, excluding itself", () => {
    const post = getPostBySlug("playwright-vs-selenium-2026")!;
    const related = getRelatedPosts(post);
    expect(related.every((p) => p.category === post.category)).toBe(true);
    expect(related.some((p) => p.slug === post.slug)).toBe(false);
  });

  it("respects the limit", () => {
    const post = getPostBySlug("playwright-vs-selenium-2026")!;
    expect(getRelatedPosts(post, 1)).toHaveLength(1);
  });
});

describe("pagination helpers", () => {
  it("every category maps onto real posts and vice versa", () => {
    for (const category of blogCategories) {
      expect(blogPosts.some((post) => post.category === category.slug)).toBe(
        true,
      );
    }
  });

  it("computes total pages from post count and POSTS_PER_PAGE", () => {
    expect(getTotalPages(blogPosts.length)).toBe(
      Math.ceil(blogPosts.length / POSTS_PER_PAGE),
    );
    expect(getTotalPages(0)).toBe(1);
  });

  it("clamps out-of-range and invalid pages into range", () => {
    expect(clampPage(0, 3)).toBe(1);
    expect(clampPage(-5, 3)).toBe(1);
    expect(clampPage(NaN, 3)).toBe(1);
    expect(clampPage(2, 3)).toBe(2);
    expect(clampPage(99, 3)).toBe(3);
  });

  it("paginates posts into POSTS_PER_PAGE-sized slices", () => {
    const firstPage = paginatePosts(blogPosts, 1);
    expect(firstPage).toHaveLength(Math.min(POSTS_PER_PAGE, blogPosts.length));
    expect(firstPage[0]).toBe(blogPosts[0]);
  });
});
