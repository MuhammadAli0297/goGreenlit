import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement } from "react";

import type { BlogCategorySlug, BlogPost } from "@/lib/blog-data";
import { getCategoryBySlug } from "@/lib/blog-data";
import { getFounderByName } from "@/lib/founders";

export const blogOgImageSize = { width: 1200, height: 630 };

const INK = "#1c2820";
const SURFACE = "#fffaf0";

/**
 * Each category's tile colors, the same pairing as `BlogCategory.coverClass`
 * (ink on four swatches, navajo on deep). Satori cannot read Tailwind
 * classes or CSS variables, so the hex values are repeated here, keep them
 * in step with the swatches in globals.css.
 */
const CATEGORY_COVER: Record<
  BlogCategorySlug,
  { background: string; color: string; glow: string }
> = {
  "qa-strategy": {
    background: "#ee9e58",
    color: INK,
    glow: "rgba(255,224,173,0.6)",
  },
  "test-automation": {
    background: "#b1c680",
    color: INK,
    glow: "rgba(255,224,173,0.6)",
  },
  "outsourcing-hiring": {
    background: "#8fa175",
    color: INK,
    glow: "rgba(177,198,128,0.7)",
  },
  "testing-practices": {
    background: "#ffe0ad",
    color: INK,
    glow: "rgba(238,158,88,0.3)",
  },
  "case-studies": {
    background: "#354639",
    color: "#ffe0ad",
    glow: "rgba(143,161,117,0.55)",
  },
};

/** Founder initials chip colors, as on the tiles (Muhammad navajo, Mohammad sandy). */
const AUTHOR_CHIP: Record<BlogPost["author"], string> = {
  "Muhammad Ali": "#ffe0ad",
  "Mohammad Khan": "#ee9e58",
};

type IconNode = [tag: string, attrs: Record<string, string | number>][];

/**
 * Satori renders plain elements only, and a lucide icon is a forwardRef
 * that renders another forwardRef which calls a React hook, neither of which
 * can run here. The outer one, though, only builds an element that carries
 * the icon's drawing as `props.iconNode` (a list of `[tag, attrs]` path
 * descriptions), so call that one level and draw the `<svg>` ourselves.
 * Returns null if anything about an icon is not as expected, so a future
 * lucide change drops the icon, never the whole image.
 */
function renderIcon(icon: BlogPost["icon"], size: number, color: string) {
  try {
    const outer = (
      icon as unknown as {
        render: (
          props: object,
          ref: null,
        ) => { props: { iconNode?: IconNode } };
      }
    ).render({ size, color }, null);
    const iconNode = outer.props.iconNode;
    if (!Array.isArray(iconNode) || iconNode.length === 0) return null;
    return createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: 1.3,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      iconNode.map(([tag, attrs], index) =>
        createElement(tag, { ...attrs, key: index }),
      ),
    );
  } catch {
    return null;
  }
}

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

/**
 * The per-post social card, the blog tile at 1200 by 630: the category's
 * swatch as the ground with two soft rings and radial glow, the wordmark and
 * a category pill on top, the title large, the post's own icon drawn big at
 * the bottom right, and the founder initials with name and read time. Rendered
 * for both the Open Graph and Twitter routes, nothing here is per route.
 */
export function buildBlogOgElement(post: BlogPost) {
  const category = getCategoryBySlug(post.category);
  const cover = CATEGORY_COVER[post.category];
  const author = getFounderByName(post.author);
  const icon = renderIcon(post.icon, 190, cover.color);
  const ring = `2px solid ${cover.color}`;
  // Sandy Brown accents vanish on the Sandy Brown ground, use Navajo White there.
  const onSandy = cover.background === "#ee9e58";
  const dot = onSandy ? "#ffe0ad" : "#ee9e58";
  const chip = onSandy ? SURFACE : AUTHOR_CHIP[post.author];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 70px",
        position: "relative",
        background: cover.background,
        backgroundImage: `radial-gradient(circle at 100% 0%, ${cover.glow} 0%, rgba(0,0,0,0) 45%)`,
        color: cover.color,
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -170,
          bottom: -230,
          width: 620,
          height: 620,
          borderRadius: 999,
          border: ring,
          opacity: 0.25,
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -20,
          bottom: -110,
          width: 400,
          height: 400,
          borderRadius: 999,
          border: ring,
          opacity: 0.25,
          display: "flex",
        }}
      />
      {icon ? (
        <div
          style={{
            position: "absolute",
            right: 92,
            bottom: 70,
            display: "flex",
          }}
        >
          {icon}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 999,
              background: dot,
              border: `2px solid ${INK}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Bespoke Serif",
              fontWeight: 600,
              fontSize: 32,
              color: cover.color,
              display: "flex",
            }}
          >
            GoGreenlit
          </div>
        </div>
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: INK,
            background: SURFACE,
            border: `2px solid ${INK}`,
            borderRadius: 999,
            padding: "10px 22px",
            display: "flex",
          }}
        >
          {category?.label ?? "Blog"}
        </div>
      </div>

      {/* One flex item per word, so Satori never breaks a hyphenated word
          ("AI-Generated") across two lines. */}
      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 66,
          lineHeight: 1.12,
          letterSpacing: -1,
          color: cover.color,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 18,
          maxWidth: 840,
        }}
      >
        {post.title.split(" ").map((word, index) => (
          <div key={index} style={{ display: "flex" }}>
            {word}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: chip,
            border: `2px solid ${INK}`,
            color: INK,
            fontFamily: "Bespoke Serif",
            fontWeight: 600,
            fontSize: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {author.initials}
        </div>
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 600,
            fontSize: 28,
            color: cover.color,
            display: "flex",
          }}
        >
          {post.author}
        </div>
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: cover.color,
            opacity: 0.75,
            display: "flex",
          }}
        >
          {post.readTime}
        </div>
      </div>
    </div>
  );
}
