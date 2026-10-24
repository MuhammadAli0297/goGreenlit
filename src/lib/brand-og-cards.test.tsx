import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { buildAboutOgElement, buildHomeOgElement } from "./brand-og-cards";

describe("brand OG cards", () => {
  it("home card carries the real H1 words and no digits", () => {
    const html = renderToStaticMarkup(
      buildHomeOgElement(
        "Embedded QA teams for startups that ship fast",
        "ship fast",
      ),
    );
    for (const word of ["Embedded", "startups", "ship", "fast"]) {
      expect(html).toContain(word);
    }
    expect(html.replace(/<[^>]*>/g, "")).not.toMatch(/\d/);
  });

  it("about card shows both founders and every headline word", () => {
    const title = "Two QA engineers who got tired of watching bugs ship";
    const html = renderToStaticMarkup(
      buildAboutOgElement(title, "watching bugs ship"),
    );
    for (const word of title.split(" ")) expect(html).toContain(word);
    expect(html).toContain("MA");
    expect(html).toContain("MK");
  });
});
