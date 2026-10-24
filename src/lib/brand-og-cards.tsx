import { founders } from "@/lib/founders";

/**
 * Live Build social cards for the homepage and About (1200 by 630). Satori
 * rules apply (see CLAUDE.md gotchas #21, #44, #58): static TTF fonts only,
 * no CSS variables or Tailwind, no blur (radial gradients instead), no
 * italic instance, and words are separate flex items because Satori breaks
 * at hyphens. Hex values repeat the brand swatches for that reason.
 */
const INK = "#1c2820";
const DEEP = "#354639";
const NAVAJO = "#ffe0ad";
const SANDY = "#ee9e58";
const OLIVE = "#b1c680";
const PAPER = "#fbf3e2";

function splitAccent(title: string, accent?: string): [string, string, string] {
  const index = accent ? title.indexOf(accent) : -1;
  return accent && index >= 0
    ? [title.slice(0, index), accent, title.slice(index + accent.length)]
    : [title, "", ""];
}

function wordmark(color: string, ring: string) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          background: SANDY,
          border: `2px solid ${ring}`,
          display: "flex",
        }}
      />
      <div
        style={{
          fontFamily: "Bespoke Serif",
          fontWeight: 600,
          fontSize: 32,
          color,
          display: "flex",
        }}
      >
        GoGreenlit
      </div>
    </div>
  );
}

function words(text: string, color: string, underline?: string) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => (
      <div
        key={`${word}-${i}`}
        style={{
          display: "flex",
          color,
          ...(underline
            ? { borderBottom: `8px solid ${underline}`, paddingBottom: 2 }
            : {}),
        }}
      >
        {word}
      </div>
    ));
}

const headline = {
  fontFamily: "Bespoke Serif",
  fontWeight: 600,
  lineHeight: 1.1,
  letterSpacing: -1.5,
  display: "flex",
  flexWrap: "wrap",
  columnGap: 22,
  maxWidth: 1040,
} as const;

/** Dark Slate Grey, the hero's glows, the real H1 with "ship fast" in Sandy Brown, a GREEN pill. */
export function buildHomeOgElement(title: string, accent?: string) {
  const [before, mid, after] = splitAccent(title, accent);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 70px",
        background: DEEP,
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(143,161,117,0.6) 0%, rgba(143,161,117,0) 42%), radial-gradient(circle at 100% 40%, rgba(238,158,88,0.38) 0%, rgba(238,158,88,0) 40%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {wordmark(NAVAJO, NAVAJO)}
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: NAVAJO,
            display: "flex",
          }}
        >
          Embedded QA for startups
        </div>
      </div>

      <div style={{ ...headline, fontSize: 88 }}>
        {words(before, NAVAJO)}
        {words(mid, SANDY)}
        {words(after, NAVAJO)}
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
            fontSize: 22,
            color: NAVAJO,
            opacity: 0.85,
            display: "flex",
          }}
        >
          gogreenlit.com
        </div>
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontSize: 20,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: INK,
            background: OLIVE,
            border: `2px solid ${INK}`,
            borderRadius: 999,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: INK,
              display: "flex",
            }}
          />
          Green
        </div>
      </div>
    </div>
  );
}

/** Paper ground like the page's own hero, ink type with a Sandy Brown underline on the accent, both founders' initials. */
export function buildAboutOgElement(title: string, accent?: string) {
  const [before, mid, after] = splitAccent(title, accent);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 70px",
        background: PAPER,
        backgroundImage:
          "radial-gradient(circle at 100% 100%, rgba(177,198,128,0.55) 0%, rgba(177,198,128,0) 42%), radial-gradient(circle at 0% 0%, rgba(255,224,173,0.7) 0%, rgba(255,224,173,0) 40%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {wordmark(INK, INK)}
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: NAVAJO,
            background: DEEP,
            borderRadius: 999,
            padding: "10px 22px",
            display: "flex",
          }}
        >
          About
        </div>
      </div>

      <div style={{ ...headline, fontSize: 80 }}>
        {words(before, INK)}
        {words(mid, INK, SANDY)}
        {words(after, INK)}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {founders.map((founder, i) => (
          <div
            key={founder.slug}
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: i === 0 ? NAVAJO : OLIVE,
              border: `2px solid ${INK}`,
              boxShadow: `4px 4px 0 ${INK}`,
              fontFamily: "Bespoke Serif",
              fontWeight: 600,
              fontSize: 26,
              color: INK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {founder.initials}
          </div>
        ))}
        <div
          style={{
            fontFamily: "Bespoke Serif",
            fontSize: 24,
            color: DEEP,
            marginLeft: 8,
            display: "flex",
          }}
        >
          Chicago-based, remote-first, founder-led
        </div>
      </div>
    </div>
  );
}
