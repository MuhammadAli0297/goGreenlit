import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Locks the Live Build color pairings to WCAG, reading the real hex
 * values out of globals.css so the test cannot drift from the tokens.
 * If a swatch changes, this fails before an unreadable pairing ships.
 *
 * Ratios checked 2026-10-18 when the redesign foundation was built:
 * ink on paper 13.85, ink on sandy 7.04, ink on olive 8.20, ink on leaf
 * 5.48, navajo on deep 7.92, sandy on deep 4.63, deep on leaf 3.61.
 * Pairings that fail and so must never carry text or a focus ring:
 * sandy on paper (1.97), olive on paper (1.69), leaf on paper (2.53).
 */

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");
const rootBlock = css.slice(css.indexOf(":root {"), css.indexOf(".dark {"));

function token(name: string): string {
  const match = rootBlock.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match?.[1]) throw new Error(`token --${name} not found in globals.css`);
  return match[1];
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) =>
    channel(parseInt(n.slice(i, i + 2), 16)),
  );
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(token(a)), luminance(token(b))].sort(
    (x, y) => y - x,
  );
  return (hi! + 0.05) / (lo! + 0.05);
}

describe("Live Build color pairings", () => {
  const normalText: [string, string][] = [
    ["ink", "paper"],
    ["ink", "surface"],
    ["ink", "sandy"],
    ["ink", "olive"],
    ["ink", "leaf"],
    ["ink", "navajo"],
    ["navajo", "deep"],
    ["sandy", "deep"],
    ["olive", "deep"],
    ["deep", "paper"],
    ["deep", "surface"],
    ["deep", "olive"],
    ["deep", "navajo"],
    ["deep", "sandy"],
  ];

  it.each(normalText)("%s on %s meets 4.5:1 for body text", (fg, bg) => {
    expect(ratio(fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps keyboard focus rings at 3:1 or better on their grounds", () => {
    // Ink ring on the light grounds, Navajo White ring inside dark sections.
    expect(ratio("ink", "paper")).toBeGreaterThanOrEqual(3);
    expect(ratio("ink", "surface")).toBeGreaterThanOrEqual(3);
    expect(ratio("navajo", "deep")).toBeGreaterThanOrEqual(3);
  });

  it("allows deep on leaf for large text only", () => {
    const r = ratio("deep", "leaf");
    expect(r).toBeGreaterThanOrEqual(3);
    expect(r).toBeLessThan(4.5);
  });

  it("documents the pairings that must stay decorative", () => {
    // If one of these ever passes, the doc comment above is out of date.
    expect(ratio("sandy", "paper")).toBeLessThan(3);
    expect(ratio("olive", "paper")).toBeLessThan(3);
    expect(ratio("leaf", "paper")).toBeLessThan(3);
  });

  describe("aurora blobs on Dark Slate Grey", () => {
    // Text sits over these blurred blobs on every dark section. Each blob is
    // checked alone at its nominal alpha (blur only lowers the peak), so a
    // later bump to an alpha fails here before text over it stops passing.
    // Overlaps of two blobs are not covered, the pixel scan in gotcha #68
    // is the check for those.
    const source = readFileSync(
      join(process.cwd(), "src/components/marketing/aurora-background.tsx"),
      "utf8",
    );
    const blobs = [...source.matchAll(/bg-\[(#[0-9a-fA-F]{6})\]\/(\d+)/g)];

    function mix(base: string, over: string, alpha: number): string {
      const a = base.replace("#", "");
      const b = over.replace("#", "");
      const out = [0, 2, 4].map((i) => {
        const x = parseInt(a.slice(i, i + 2), 16);
        const y = parseInt(b.slice(i, i + 2), 16);
        return Math.round(x * (1 - alpha) + y * alpha)
          .toString(16)
          .padStart(2, "0");
      });
      return `#${out.join("")}`;
    }

    function contrast(a: string, b: string): number {
      const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (hi! + 0.05) / (lo! + 0.05);
    }

    it("finds each blob at its desktop and phone alpha", () => {
      expect(blobs).toHaveLength(8);
    });

    it("keeps Navajo White body text at 4.5:1 over any one blob, on desktop and phone", () => {
      for (const [, hex, alpha] of blobs) {
        const bg = mix(token("deep"), hex!, Number(alpha) / 100);
        expect(contrast(token("navajo"), bg)).toBeGreaterThanOrEqual(4.5);
      }
    });
  });
});
