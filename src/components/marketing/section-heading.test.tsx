import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "@/components/marketing/section-heading";

describe("SectionHeading", () => {
  it("renders an h2 with the *word* as an italic em", () => {
    render(<SectionHeading>Built for *shipping teams*</SectionHeading>);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent("Built for shipping teams");
    expect(h2.querySelector("em")).toHaveTextContent("shipping teams");
  });

  it("leaves a heading without asterisks unchanged", () => {
    render(<SectionHeading>Plain heading</SectionHeading>);
    expect(screen.getByRole("heading")).toHaveTextContent("Plain heading");
    expect(document.querySelector("em")).toBeNull();
  });
});
