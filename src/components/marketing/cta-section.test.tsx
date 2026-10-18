import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CtaSection } from "@/components/marketing/cta-section";
import { renderWithEmphasis } from "@/components/marketing/emphasis";
import { siteConfig } from "@/lib/site-config";

describe("CtaSection", () => {
  it("links the booking button to the calendar and shows the email fallback", () => {
    render(<CtaSection />);
    expect(screen.getByRole("link", { name: /book a call/i })).toHaveAttribute(
      "href",
      siteConfig.links.calendar,
    );
    expect(
      screen.getByRole("link", { name: new RegExp(siteConfig.email) }),
    ).toHaveAttribute("href", `mailto:${siteConfig.email}`);
  });

  it("renders the default title with an italic accent word", () => {
    render(<CtaSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Ready to ship with confidence?");
    expect(heading.querySelector("em")).toHaveTextContent("confidence?");
  });

  it("uses no contractions in its default copy", () => {
    const { container } = render(<CtaSection />);
    expect(container.textContent).not.toMatch(/\b\w+['’](re|ll|t|s|ve|d)\b/);
  });

  it("takes the family band color from tone", () => {
    const { container, rerender } = render(<CtaSection tone="leaf" />);
    expect(container.querySelector("section")!.className).toContain("bg-leaf");
    rerender(<CtaSection tone="olive" />);
    expect(container.querySelector("section")!.className).toContain("bg-olive");
  });

  it("leaves a title without asterisks as plain text", () => {
    render(<CtaSection title="Plain title" />);
    expect(
      screen.getByRole("heading", { level: 2 }).querySelector("em"),
    ).toBeNull();
  });
});

describe("renderWithEmphasis", () => {
  it("returns a string with no asterisks unchanged", () => {
    expect(renderWithEmphasis("no accent here")).toBe("no accent here");
  });

  it("wraps each starred word in an em", () => {
    const { container } = render(<p>{renderWithEmphasis("a *b* c *d*")}</p>);
    expect(container.textContent).toBe("a b c d");
    expect(container.querySelectorAll("em")).toHaveLength(2);
  });
});
