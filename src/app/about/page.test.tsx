import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import { founders } from "@/lib/founders";

describe("About page", () => {
  it("has one h1 with the page's headline words", () => {
    render(<AboutPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(
      "Two QA engineers who got tired of watching bugs ship",
    );
  });

  it("is icon-free: no svg anywhere in the page content", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelectorAll("svg")).toHaveLength(0);
  });

  it("has no contractions and no em dashes in its copy", () => {
    const { container } = render(<AboutPage />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\b\w+(n't|'re|'ll|'ve|'m|'d)\b/);
    expect(text).not.toMatch(/\w+’(t|re|ll|ve|m|d)\b/);
    expect(text).not.toContain("—");
  });

  it("shows each founder with their real LinkedIn profile and an anchor id", () => {
    const { container } = render(<AboutPage />);
    for (const founder of founders) {
      const card = container.querySelector(`#${founder.slug}`) as HTMLElement;
      expect(card).not.toBeNull();
      expect(
        within(card).getByRole("heading", { level: 3, name: founder.name }),
      ).toBeInTheDocument();
      expect(
        within(card).getByRole("link", { name: new RegExp(founder.name) }),
      ).toHaveAttribute("href", founder.linkedin);
    }
  });

  it("keeps the 18+ years stat as the only track-record number and the four manifesto lines", () => {
    const { container } = render(<AboutPage />);
    expect(screen.getAllByText(/18\+/).length).toBeGreaterThan(0);
    expect(container.querySelectorAll("ul li")).toHaveLength(4);
  });
});
