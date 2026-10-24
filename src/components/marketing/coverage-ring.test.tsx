import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CoverageRing } from "@/components/marketing/coverage-ring";

describe("CoverageRing", () => {
  it("renders filled to the value in the server markup", () => {
    const { container } = render(<CoverageRing value={95} />);
    const fill = container.querySelector("[data-slot='ring-fill']");
    const circumference = 2 * Math.PI * 54;
    expect(Number(fill?.getAttribute("stroke-dashoffset"))).toBeCloseTo(
      circumference * 0.05,
      3,
    );
  });

  it("exposes the real value to assistive tech and hides the drawing", () => {
    const { container } = render(<CoverageRing value={95} />);
    expect(
      screen.getByText("95%", { selector: ".sr-only" }),
    ).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
