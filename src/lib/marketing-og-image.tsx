import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { buildAboutOgElement } from "@/lib/brand-og-cards";

export const marketingOgImageSize = { width: 1200, height: 630 };

export type MarketingOgFamily =
  "software-testing-services" | "qa-consulting" | "about" | "blog-index";

export async function loadMarketingOgFonts() {
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

/** Decorative result strip on the Services card: mostly passes, one bug. */
const STRIP = [
  "#b1c680",
  "#b1c680",
  "#ee9e58",
  "#b1c680",
  "#b1c680",
  "#b1c680",
];

/**
 * The Live Build card for the Software Testing Services family: Palm Leaf
 * ground with soft olive and navajo glows (radial gradients, Satori cannot
 * blur), the wordmark and a family pill on top, the page's real H1 large
 * with its accent phrase in Dark Slate Grey (Satori has no italic instance
 * of the font, and Sandy Brown fails contrast on Palm Leaf), and a strip of
 * test-result cells with one bug at the bottom.
 */
function buildServicesOgElement(title: string, accent?: string) {
  const index = accent ? title.indexOf(accent) : -1;
  const parts =
    accent && index >= 0
      ? [title.slice(0, index), accent, title.slice(index + accent.length)]
      : [title, "", ""];
  const ink = "#1c2820";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        position: "relative",
        background: "#8fa175",
        backgroundImage:
          "radial-gradient(circle at 92% 108%, rgba(177,198,128,0.95) 0%, rgba(177,198,128,0) 46%), radial-gradient(circle at 0% 0%, rgba(255,224,173,0.55) 0%, rgba(255,224,173,0) 38%)",
      }}
    >
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
              background: "#ee9e58",
              border: `2px solid ${ink}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Bespoke Serif",
              fontWeight: 600,
              fontSize: 32,
              color: ink,
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
            color: ink,
            background: "#fffaf0",
            border: `2px solid ${ink}`,
            borderRadius: 999,
            padding: "10px 22px",
            display: "flex",
          }}
        >
          Software testing services
        </div>
      </div>

      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 74,
          lineHeight: 1.08,
          letterSpacing: -2,
          color: ink,
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 1000,
        }}
      >
        <span>{parts[0]}</span>
        {parts[1] ? <span style={{ color: "#354639" }}>{parts[1]}</span> : null}
        {parts[2] ? <span>{parts[2]}</span> : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 24,
            color: ink,
            display: "flex",
          }}
        >
          gogreenlit.com
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {STRIP.map((color, i) => (
            <div
              key={i}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: color,
                border: `2px solid ${ink}`,
                display: "flex",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The Live Build card for the QA Consulting family: Muted Olive ground with
 * soft navajo and palm leaf glows, the wordmark and a family pill on top, the
 * page's real H1 large with its accent phrase set on a navajo "sticker" chip
 * (Satori has no italic instance of the font, and a chip keeps the accent
 * clearly different from the Services card, which colors it), and a small
 * release pipeline at the bottom with one Sandy Brown gate, the family's
 * signature idea.
 */
function buildConsultingOgElement(title: string, accent?: string) {
  const index = accent ? title.indexOf(accent) : -1;
  const parts =
    accent && index >= 0
      ? [title.slice(0, index), accent, title.slice(index + accent.length)]
      : [title, "", ""];
  const ink = "#1c2820";
  const line = {
    width: 26,
    height: 4,
    background: ink,
    display: "flex",
  } as const;
  const cell = (background: string, size = 34, border = 2) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background,
        border: `${border}px solid ${ink}`,
        display: "flex",
      }}
    />
  );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        position: "relative",
        background: "#b1c680",
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(255,224,173,0.7) 0%, rgba(255,224,173,0) 42%), radial-gradient(circle at 0% 108%, rgba(143,161,117,0.9) 0%, rgba(143,161,117,0) 46%)",
      }}
    >
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
              background: "#ee9e58",
              border: `2px solid ${ink}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Bespoke Serif",
              fontWeight: 600,
              fontSize: 32,
              color: ink,
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
            color: ink,
            background: "#fffaf0",
            border: `2px solid ${ink}`,
            borderRadius: 999,
            padding: "10px 22px",
            display: "flex",
          }}
        >
          QA consulting
        </div>
      </div>

      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 70,
          lineHeight: 1.12,
          letterSpacing: -2,
          color: ink,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: 16,
          maxWidth: 1040,
        }}
      >
        <span>{parts[0]}</span>
        {parts[1] ? (
          <span
            style={{
              background: "#ffe0ad",
              border: `3px solid ${ink}`,
              borderRadius: 18,
              padding: "0 18px 4px",
              boxShadow: `6px 6px 0 ${ink}`,
              display: "flex",
            }}
          >
            {parts[1]}
          </span>
        ) : null}
        {parts[2] ? <span>{parts[2]}</span> : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontWeight: 400,
            fontSize: 24,
            color: ink,
            display: "flex",
          }}
        >
          gogreenlit.com
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {cell("#fffaf0")}
          <div style={line} />
          {cell("#fffaf0")}
          <div style={line} />
          {cell("#fffaf0")}
          <div style={line} />
          {cell("#ee9e58", 44, 3)}
          <div style={line} />
          {cell("#fffaf0")}
        </div>
      </div>
    </div>
  );
}

/** The five category chips on the blog index card, same swatches and order as the blog hero. */
const BLOG_INDEX_CHIPS = [
  { label: "QA Strategy", background: "#ee9e58", color: "#1c2820", rotate: -4 },
  {
    label: "Test Automation",
    background: "#b1c680",
    color: "#1c2820",
    rotate: 3,
  },
  {
    label: "Outsourcing & Hiring",
    background: "#8fa175",
    color: "#1c2820",
    rotate: -2,
  },
  {
    label: "Testing Practices",
    background: "#ffe0ad",
    color: "#1c2820",
    rotate: 4,
  },
  {
    label: "Case Studies",
    background: "#fffaf0",
    color: "#1c2820",
    rotate: -3,
  },
];

/**
 * The Live Build card for the blog index: Dark Slate Grey ground with soft
 * glows (as the blog hero), the wordmark and a "Blog" pill, the page's real H1
 * with its accent phrase in Sandy Brown (4.6:1 on this ground, and Satori has
 * no italic instance of the font), and the five category chips along the
 * bottom, each in its own swatch and tilted like the hero's floating chips.
 * Case Studies is the light chip here, a Dark Slate Grey chip would vanish
 * into the ground (same reason as the hero).
 */
function buildBlogIndexOgElement(title: string, accent?: string) {
  const index = accent ? title.indexOf(accent) : -1;
  const [before = "", mid = "", after = ""] =
    accent && index >= 0
      ? [title.slice(0, index), accent, title.slice(index + accent.length)]
      : [title, "", ""];
  const ink = "#1c2820";
  const word = (text: string, color: string, key: string) =>
    text
      .split(" ")
      .filter(Boolean)
      .map((w, i) => (
        <div key={`${key}-${i}`} style={{ display: "flex", color }}>
          {w}
        </div>
      ));
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
        background: "#354639",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(238,158,88,0.35) 0%, rgba(238,158,88,0) 38%), radial-gradient(circle at 100% 100%, rgba(143,161,117,0.55) 0%, rgba(143,161,117,0) 46%)",
      }}
    >
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
              background: "#ee9e58",
              border: "2px solid #ffe0ad",
              display: "flex",
            }}
          />
          <div
            style={{
              fontFamily: "Bespoke Serif",
              fontWeight: 600,
              fontSize: 32,
              color: "#ffe0ad",
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
            color: ink,
            background: "#fffaf0",
            border: `2px solid ${ink}`,
            borderRadius: 999,
            padding: "10px 22px",
            display: "flex",
          }}
        >
          Blog
        </div>
      </div>

      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 78,
          lineHeight: 1.1,
          letterSpacing: -1.5,
          display: "flex",
          flexWrap: "wrap",
          columnGap: 20,
          maxWidth: 1000,
        }}
      >
        {word(before, "#ffe0ad", "a")}
        {word(mid, "#ee9e58", "b")}
        {word(after, "#ffe0ad", "c")}
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {BLOG_INDEX_CHIPS.map((chip) => (
          <div
            key={chip.label}
            style={{
              fontFamily: "Bespoke Serif",
              fontWeight: 400,
              fontSize: 16,
              letterSpacing: 1.5,
              whiteSpace: "nowrap",
              textTransform: "uppercase",
              color: chip.color,
              background: chip.background,
              border: `2px solid ${ink}`,
              borderRadius: 999,
              padding: "9px 15px",
              transform: `rotate(${chip.rotate}deg)`,
              display: "flex",
            }}
          >
            {chip.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function buildMarketingOgElement(
  title: string,
  family: MarketingOgFamily,
  accent?: string,
) {
  if (family === "software-testing-services") {
    return buildServicesOgElement(title, accent);
  }
  if (family === "qa-consulting") {
    return buildConsultingOgElement(title, accent);
  }
  if (family === "blog-index") {
    return buildBlogIndexOgElement(title, accent);
  }
  return buildAboutOgElement(title, accent);
}
