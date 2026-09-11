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

export function buildMarketingOgElement(
  title: string,
  family: MarketingOgFamily,
) {
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
