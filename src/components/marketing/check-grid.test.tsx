import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CheckGrid } from "@/components/marketing/check-grid";

describe("CheckGrid", () => {
  it("renders every item as a list item", () => {
    render(<CheckGrid items={["First", "Second", "Third"]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("uses an olive mark for passes and a sandy one for problems", () => {
    const { container, rerender } = render(<CheckGrid items={["A"]} />);
    expect(
      container.querySelector("li span[aria-hidden]")?.className,
    ).toContain("bg-olive");
    rerender(<CheckGrid items={["A"]} tone="bug" />);
    expect(
      container.querySelector("li span[aria-hidden]")?.className,
    ).toContain("bg-sandy");
  });
});
