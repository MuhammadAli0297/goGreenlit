/**
 * Builds a blog index URL from the three query dimensions (category, search
 * query, page) in one fixed param order, so links, pagination and canonicals
 * never disagree. Page 1 and empty values are left out.
 */
export function buildBlogHref({
  category,
  q,
  page,
}: {
  category?: string;
  q?: string;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export const MAX_SEARCH_LENGTH = 80;

/** Trim, collapse whitespace and cap the length of a raw `?q=` value. */
export function normalizeSearchQuery(raw: string | undefined): string {
  if (!raw) return "";
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_SEARCH_LENGTH);
}
