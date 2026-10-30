import { describe, expect, it } from "vitest";

import { classifyLinkClick } from "./analytics";

const ORIGIN = "https://www.gogreenlit.com";

describe("classifyLinkClick", () => {
  it("reports Calendly links as book_call_click, without the query string", () => {
    const result = classifyLinkClick(
      "https://calendly.com/gogreenlit/30min?month=2026-11",
      "  Book a call ",
      ORIGIN,
      "/blog/qa-maturity-model",
    );
    expect(result).toEqual({
      name: "book_call_click",
      params: {
        link_url: "https://calendly.com/gogreenlit/30min",
        link_text: "Book a call",
        page_path: "/blog/qa-maturity-model",
      },
    });
  });

  it("reports mailto links as email_click and never sends the address", () => {
    const result = classifyLinkClick(
      "mailto:gogreenlit@gmail.com",
      "Email us",
      ORIGIN,
      "/about",
    );
    expect(result?.name).toBe("email_click");
    expect(JSON.stringify(result)).not.toContain("gmail");
  });

  it("reports a move between two site pages as internal_link_click", () => {
    const result = classifyLinkClick(
      `${ORIGIN}/qa-consulting/qa-audit-assessment#top`,
      "QA audit",
      ORIGIN,
      "/blog/what-a-qa-audit-usually-finds",
    );
    expect(result).toEqual({
      name: "internal_link_click",
      params: {
        link_url: "/qa-consulting/qa-audit-assessment",
        link_text: "QA audit",
        page_path: "/blog/what-a-qa-audit-usually-finds",
      },
    });
  });

  it("ignores same-page anchor jumps", () => {
    expect(
      classifyLinkClick(`${ORIGIN}/blog/x#faq`, "FAQ", ORIGIN, "/blog/x"),
    ).toBeNull();
  });

  it("ignores external links that are not Calendly", () => {
    expect(
      classifyLinkClick(
        "https://www.linkedin.com/company/gogreenlit/",
        "LinkedIn",
        ORIGIN,
        "/about",
      ),
    ).toBeNull();
  });

  it("ignores empty and malformed hrefs", () => {
    expect(classifyLinkClick("", "x", ORIGIN, "/")).toBeNull();
    expect(classifyLinkClick("not a url", "x", ORIGIN, "/")).toBeNull();
  });

  it("collapses whitespace and caps link text at 100 characters", () => {
    const result = classifyLinkClick(
      `${ORIGIN}/about`,
      `a\n\n  b ${"c".repeat(200)}`,
      ORIGIN,
      "/",
    );
    expect(result?.params.link_text.startsWith("a b ")).toBe(true);
    expect(result?.params.link_text.length).toBe(100);
  });
});
