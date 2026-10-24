import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("has one h1 and links home and to the blog", () => {
    const { container } = render(<NotFound />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /back to home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: /browse the blog/i }),
    ).toHaveAttribute("href", "/blog");
    expect(container.querySelector("svg")).toBeNull();
  });

  it("keeps the route check decorative and has no contractions or em dash", () => {
    const { container } = render(<NotFound />);
    expect(
      container.querySelector('[data-slot="test-run-terminal"]'),
    ).toHaveAttribute("aria-hidden", "true");
    expect(container.textContent ?? "").not.toMatch(
      /\u2014|\w'(t|s|re|ll|ve|d)\b/i,
    );
  });
});
