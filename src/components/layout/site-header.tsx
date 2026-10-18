import { HeaderBar, type BlogMenuData } from "@/components/layout/header-bar";
import {
  blogCategories,
  blogPosts,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";

/** The one category whose chart token (Dark Slate Grey) needs light text on top. */
const DARK_TILE_SLUGS = new Set(["qa-strategy"]);

function buildBlogMenu(): BlogMenuData {
  const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!latest) throw new Error("blogPosts is empty, the header needs one post");
  const latestCategory = getCategoryBySlug(latest.category);

  return {
    total: blogPosts.length,
    categories: blogCategories.map((cat) => ({
      slug: cat.slug,
      label: cat.label,
      href: `/blog?category=${cat.slug}`,
      count: getPostsByCategory(cat.slug).length,
      colorClass: cat.colorClass,
      onDark: DARK_TILE_SLUGS.has(cat.slug),
    })),
    latest: {
      title: latest.title,
      href: `/blog/${latest.slug}`,
      categoryLabel: latestCategory?.label ?? "",
      excerpt: latest.excerpt,
    },
  };
}

/**
 * Floating pill header. It takes no layout space (h-0, sticky), the pill
 * sits over the top of whatever the page starts with, so the first
 * element on every page clears it with `pt-(--header-clearance)` (see
 * globals.css). That is also why the homepage hero is now exactly one
 * viewport tall, with no header height to subtract.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-0">
      <div className="mx-auto mt-3.5 w-[min(1180px,calc(100%-2rem))]">
        <HeaderBar
          nav={siteConfig.nav}
          blog={buildBlogMenu()}
          bookingHref={siteConfig.links.calendar}
        />
      </div>
    </header>
  );
}
