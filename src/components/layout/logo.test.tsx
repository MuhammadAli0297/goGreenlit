import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "@/components/layout/logo";

describe("Logo", () => {
  it("renders the GoGreenlit wordmark linking to the homepage", () => {
    render(<Logo />);
    const link = screen.getByRole("link", { name: /greenlit/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
