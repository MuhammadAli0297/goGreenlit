import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const marketingOgImageSize = { width: 1200, height: 630 };

const FAMILY_STYLES = {
  "software-testing-services": {
    eyebrow: "Software Testing Services",
    background: "#8fa175",
    textColor: "#1f2a20",
    eyebrowColor: "#f4ebd8",
  },
  "qa-consulting": {
    eyebrow: "QA Consulting",
    background: "#b1c680",
    textColor: "#28331f",
    eyebrowColor: "#f4ebd8",
  },
  about: {
    eyebrow: "About GoGreenlit",
    background: "#354639",
    textColor: "#f7f5ec",
    eyebrowColor: "#e2a25c",
  },
  "blog-index": {
    eyebrow: "GoGreenlit Blog",
    background: "#354639",
    textColor: "#f7f5ec",
    eyebrowColor: "#e2a25c",
  },
} as const;

export type MarketingOgFamily = keyof typeof FAMILY_STYLES;

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

export function buildMarketingOgElement(
  title: string,
  family: MarketingOgFamily,
  accent?: string,
) {
  if (family === "software-testing-services") {
    return buildServicesOgElement(title, accent);
  }
  const style = FAMILY_STYLES[family];
  const isDark = family === "about" || family === "blog-index";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 90px",
        background: style.background,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 400,
          fontSize: 24,
          color: style.eyebrowColor,
          letterSpacing: 1,
          textTransform: "uppercase",
          display: "flex",
          marginBottom: 28,
        }}
      >
        {style.eyebrow}
      </div>
      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 52,
          lineHeight: 1.22,
          color: style.textColor,
          display: "flex",
          maxWidth: 960,
        }}
      >
        {title}
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
            background: isDark
              ? "rgba(255, 224, 173, 0.35)"
              : "rgba(53, 70, 57, 0.18)",
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
            color: isDark ? "#cdd6c4" : "#354639",
            display: "flex",
          }}
        >
          GoGreenlit
        </div>
      </div>
    </div>
  );
}
