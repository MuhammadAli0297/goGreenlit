import { describe, expect, it } from "vitest";

import { blogPosts, blogCategories } from "@/lib/blog-data";
import { buildBlogOgElement } from "@/lib/blog-og-image";

describe("buildBlogOgElement", () => {
  it("builds a card for every post with the post's own icon drawn as an svg", () => {
    for (const post of blogPosts) {
      const json = JSON.stringify(buildBlogOgElement(post));
      expect(json, post.slug).toContain('"type":"svg"');
      expect(json, post.slug).toContain('"viewBox":"0 0 24 24"');
    }
  });

  it("carries the post title word by word and its category label", () => {
    const post = blogPosts[0]!;
    const json = JSON.stringify(buildBlogOgElement(post));
    for (const word of post.title.split(" ")) expect(json).toContain(word);
    const label = blogCategories.find((c) => c.slug === post.category)!.label;
    expect(json).toContain(label);
  });

  it("has a cover color for every category", () => {
    for (const category of blogCategories) {
      const post = blogPosts.find((p) => p.category === category.slug)!;
      expect(JSON.stringify(buildBlogOgElement(post))).toMatch(/#[0-9a-f]{6}/i);
    }
  });
});
