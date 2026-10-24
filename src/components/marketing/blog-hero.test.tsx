import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogHero } from "@/components/marketing/blog-hero";
import { blogCategories } from "@/lib/blog-data";

describe("BlogHero", () => {
  function renderHero() {
    return render(
      <BlogHero badge="A badge" description="A description.">
        Straight talk on <em>shipping quality software</em>
      </BlogHero>,
    );
  }

  it("keeps the one h1 with its italic accent phrase", () => {
    renderHero();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Straight talk on shipping quality software");
    expect(h1.querySelector("em")).toHaveTextContent(
      "shipping quality software",
    );
  });

  it("floats one decorative chip per category, hidden from assistive tech", () => {
    const { container } = renderHero();
    const chips = container.querySelectorAll(".lb-float");
    expect(chips).toHaveLength(blogCategories.length);
    const layer = chips[0]!.parentElement!.parentElement!;
    expect(layer).toHaveAttribute("aria-hidden", "true");
    for (const category of blogCategories) {
      expect(layer).toHaveTextContent(category.label);
    }
  });

  it("never lets the Case Studies chip vanish into the dark hero", () => {
    const { container } = renderHero();
    const chip = [...container.querySelectorAll(".lb-float")].find(
      (el) => el.textContent === "Case Studies",
    )!;
    expect(chip.className).toContain("bg-surface");
    expect(chip.className).not.toContain("bg-deep");
  });
});
