import { describe, expect, it } from "vitest";

import { blogPosts } from "@/lib/blog-data";
import { buildToc, slugifyHeading } from "@/lib/blog-toc";

describe("slugifyHeading", () => {
  it("makes a short ascii id", () => {
    expect(
      slugifyHeading("What does outsourcing QA testing actually mean?"),
    ).toBe("what-does-outsourcing-qa-testing-actually-mean");
    expect(slugifyHeading("???")).toBe("section");
  });
});

describe("buildToc", () => {
  it("only lists H2 headings, keyed by block index, with unique ids", () => {
    const toc = buildToc([
      { type: "paragraph", text: "x" },
      { type: "heading", text: "Same" },
      { type: "subheading", text: "Not listed" },
      { type: "heading", text: "Same" },
      { type: "heading", text: "FAQ" },
    ]);
    expect([...toc.keys()]).toEqual([1, 3, 4]);
    expect([...toc.values()].map((i) => i.id)).toEqual([
      "same",
      "same-2",
      "faq-2",
    ]);
  });

  it("gives every real post two or more unique ids", () => {
    for (const post of blogPosts) {
      const ids = [...buildToc(post.body).values()].map((i) => i.id);
      expect(ids.length, post.slug).toBeGreaterThanOrEqual(2);
      expect(new Set(ids).size, post.slug).toBe(ids.length);
    }
  });
});
