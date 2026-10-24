import { describe, expect, it } from "vitest";

import {
  POSTS_PER_PAGE,
  blogCategories,
  blogPosts,
  FEATURED_POST_SLUG,
  clampPage,
  getBlogIndexView,
  getCategoryBySlug,
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
  getTotalPages,
  interleaveByCategory,
  normalizeSearchQuery,
  paginatePosts,
  searchPosts,
} from "@/lib/blog-data";

describe("getPostBySlug", () => {
  it("finds a post by its slug", () => {
    expect(getPostBySlug("playwright-vs-selenium-2026")?.title).toBe(
      "Playwright vs Selenium: Choosing in 2026",
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

describe("interleaveByCategory", () => {
  it("never places two posts from the same category next to each other", () => {
    const interleaved = interleaveByCategory(blogPosts);
    for (let i = 1; i < interleaved.length; i++) {
      const current = interleaved[i];
      const previous = interleaved[i - 1];
      expect(current?.category).not.toBe(previous?.category);
    }
  });

  it("preserves every post with none dropped or duplicated", () => {
    const interleaved = interleaveByCategory(blogPosts);
    expect(interleaved).toHaveLength(blogPosts.length);
    expect(new Set(interleaved.map((post) => post.slug)).size).toBe(
      blogPosts.length,
    );
  });

  it("handles a single-category input without dropping posts", () => {
    const singleCategory = getPostsByCategory("case-studies");
    const interleaved = interleaveByCategory(singleCategory);
    expect(interleaved).toHaveLength(singleCategory.length);
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

describe("search", () => {
  it("normalizes whitespace and caps the length", () => {
    expect(normalizeSearchQuery("  playwright   vs  ")).toBe("playwright vs");
    expect(normalizeSearchQuery(undefined)).toBe("");
    expect(normalizeSearchQuery("a".repeat(200))).toHaveLength(80);
  });

  it("returns every post for an empty query", () => {
    expect(searchPosts(blogPosts, "   ")).toHaveLength(blogPosts.length);
  });

  it("matches title words case-insensitively", () => {
    const hits = searchPosts(blogPosts, "PLAYWRIGHT selenium");
    expect(hits.map((p) => p.slug)).toContain("playwright-vs-selenium-2026");
  });

  it("requires every word to match", () => {
    expect(searchPosts(blogPosts, "playwright zzzznotaword")).toHaveLength(0);
  });
});

describe("getBlogIndexView", () => {
  it("features one post on the plain index and does not repeat it in the grid", () => {
    const view = getBlogIndexView({});
    expect(view.featured?.slug).toBe(FEATURED_POST_SLUG);
    expect(view.displayPosts.some((p) => p.slug === FEATURED_POST_SLUG)).toBe(
      false,
    );
    expect(view.displayPosts).toHaveLength(blogPosts.length - 1);
  });

  it("features only on page 1", () => {
    expect(getBlogIndexView({ page: "2" }).featured).toBeUndefined();
  });

  it("has no featured post in a category or search view, and keeps it in the list", () => {
    const featured = blogPosts.find((p) => p.slug === FEATURED_POST_SLUG)!;
    const cat = getBlogIndexView({ category: featured.category });
    expect(cat.featured).toBeUndefined();
    expect(cat.displayPosts.some((p) => p.slug === FEATURED_POST_SLUG)).toBe(
      true,
    );
    expect(getBlogIndexView({ q: "outsource" }).featured).toBeUndefined();
  });

  it("clamps an out of range page", () => {
    const view = getBlogIndexView({ page: "999" });
    expect(view.currentPage).toBe(view.totalPages);
  });
});
