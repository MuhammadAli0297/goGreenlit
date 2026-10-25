import type { BlogContentBlock } from "@/lib/blog-data";

export interface TocItem {
  id: string;
  text: string;
}

/** Lowercase, ASCII, hyphenated id from a heading's text. */
export function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60)
      .replace(/-+$/g, "") || "section"
  );
}

/**
 * One `{ id, text }` per section heading (`heading` blocks, the H2s) in a
 * post body, keyed by the block's index so `ArticleBody` and the table of
 * contents always agree on the anchor. Ids are made unique inside a post
 * (`-2`, `-3`) and never collide with the reserved `faq` id.
 */
export function buildToc(blocks: BlogContentBlock[]): Map<number, TocItem> {
  const used = new Set<string>(["faq", "article-body"]);
  const items = new Map<number, TocItem>();
  blocks.forEach((block, index) => {
    if (block.type !== "heading") return;
    const base = slugifyHeading(block.text);
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    items.set(index, { id, text: block.text });
  });
  return items;
}
