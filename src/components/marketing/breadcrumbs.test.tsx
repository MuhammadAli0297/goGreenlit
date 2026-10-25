import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Breadcrumbs } from "@/components/marketing/breadcrumbs";

const items = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/software-testing-services" },
  {
    name: "Playwright Automation",
    href: "/software-testing-services/playwright-automation",
  },
];

describe("Breadcrumbs", () => {
  it("links every ancestor and marks the last item as the current page", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/software-testing-services",
    );
    const current = screen.getByText("Playwright Automation");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(
      screen.queryByRole("link", { name: "Playwright Automation" }),
    ).toBeNull();
  });

  it("is a labelled navigation landmark with an ordered list", () => {
    render(<Breadcrumbs items={items} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.querySelector("ol")?.children).toHaveLength(3);
  });

  it("clears the floating header, which takes no layout space", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("navigation").className).toContain(
      "pt-(--header-clearance)",
    );
  });

  it("uses a plain text separator, not an icon, so About stays icon-free", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    expect(container.querySelector("svg")).toBeNull();
  });
});
