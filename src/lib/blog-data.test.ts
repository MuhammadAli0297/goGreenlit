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

  it("gives neighbours, wrapping around, so siblings do not all share the same three", () => {
    const first = blogPosts.find((p) => p.category === "qa-strategy")!;
    const same = blogPosts.filter((p) => p.category === first.category);
    expect(getRelatedPosts(first).map((p) => p.slug)).toEqual(
      same.slice(1, 4).map((p) => p.slug),
    );
    const last = same[same.length - 1]!;
    expect(getRelatedPosts(last).map((p) => p.slug)).toEqual(
      same.slice(0, 3).map((p) => p.slug),
    );
  });

  it("every post is linked from at least one other post in its category", () => {
    const linkedTo = new Set(
      blogPosts.flatMap((p) => getRelatedPosts(p).map((r) => r.slug)),
    );
    for (const post of blogPosts) expect(linkedTo.has(post.slug)).toBe(true);
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

describe("internal linking between posts", () => {
  const linkPattern = /\[[^\]]+\]\(\/blog\/([a-z0-9-]+)\)/g;
  const textOf = (block: (typeof blogPosts)[number]["body"][number]) => {
    const b = block as { text?: string; note?: string; items?: unknown[] };
    return [b.text, b.note, ...(b.items ?? []).map(String)].join(" ");
  };
  const bodyText = (slug: string) =>
    blogPosts
      .find((p) => p.slug === slug)!
      .body.map(textOf)
      .join(" ");
  const faqText = (slug: string) =>
    (blogPosts.find((p) => p.slug === slug)!.faqs ?? [])
      .map((f) => f.answer)
      .join(" ");

  it("links to a real post every time it links to a post", () => {
    const slugs = new Set(blogPosts.map((p) => p.slug));
    for (const p of blogPosts) {
      for (const m of (bodyText(p.slug) + " " + faqText(p.slug)).matchAll(
        linkPattern,
      )) {
        expect(slugs.has(m[1]!), `${p.slug} links to ${m[1]}`).toBe(true);
      }
    }
  });

  it("keeps every post at 8 or fewer body links", () => {
    for (const p of blogPosts) {
      const count = [...bodyText(p.slug).matchAll(/\]\(\//g)].length;
      expect(count, p.slug).toBeLessThanOrEqual(8);
    }
  });

  // The SDET post merges into the hiring post later (see seo/decisions-1.1.md),
  // so it is deliberately not linked to yet. Remove this exception at the merge.
  it("gives every other post at least one inbound link from another post", () => {
    const inbound = new Map<string, Set<string>>();
    for (const p of blogPosts) {
      for (const m of (bodyText(p.slug) + " " + faqText(p.slug)).matchAll(
        linkPattern,
      )) {
        if (m[1] !== p.slug) {
          (inbound.get(m[1]!) ?? inbound.set(m[1]!, new Set()).get(m[1]!)!).add(
            p.slug,
          );
        }
      }
    }
    for (const p of blogPosts) {
      if (p.slug === "the-rise-of-the-ai-testing-sdet") continue;
      expect(inbound.get(p.slug)?.size ?? 0, p.slug).toBeGreaterThan(0);
    }
  });
});
