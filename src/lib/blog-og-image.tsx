import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { BlogCategorySlug, BlogPost } from "@/lib/blog-data";
import { getCategoryBySlug } from "@/lib/blog-data";

export const blogOgImageSize = { width: 1200, height: 630 };

/**
 * Dark-mode values of the site's --chart-1..5 tokens (globals.css), not the
 * light-mode ones blogCategories.colorClass references. The image background
 * is always the dark brand green, and chart-1 in light mode is that same
 * green, so it would be invisible as an accent here.
 */
const CATEGORY_ACCENT: Record<BlogCategorySlug, string> = {
  "qa-strategy": "#acbf92",
  "test-automation": "#8fa175",
  "outsourcing-hiring": "#ee9e58",
  "testing-practices": "#b1c680",
  "case-studies": "#f0c375",
};

export async function loadBlogOgFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/BespokeSerif-OG-Regular.ttf")),
    readFile(join(process.cwd(), "src/app/fonts/BespokeSerif-OG-SemiBold.ttf")),
  ]);
  return [
    {
      name: "Bespoke Serif",
      data: regular,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "Bespoke Serif",
      data: semibold,
      style: "normal" as const,
      weight: 600 as const,
    },
  ];
}

export function buildBlogOgElement(post: BlogPost) {
  const category = getCategoryBySlug(post.category);
  const accent = CATEGORY_ACCENT[post.category];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 90px",
        background: "#354639",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: accent,
            display: "flex",
          }}
        />
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 24,
            color: accent,
            letterSpacing: 1,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          {category?.label ?? "GoGreenlit Blog"}
        </div>
      </div>
      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 62,
          lineHeight: 1.18,
          color: "#f7f5ec",
          display: "flex",
          maxWidth: 920,
        }}
      >
        {post.title}
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          bottom: 70,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            background: "rgba(255, 224, 173, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#ee9e58",
              display: "flex",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 22,
            color: "#cdd6c4",
            display: "flex",
          }}
        >
          GoGreenlit
        </div>
      </div>
    </div>
  );
}
