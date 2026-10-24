import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TableOfContents } from "@/components/marketing/table-of-contents";

const items = [
  { id: "one", text: "First section" },
  { id: "two", text: "Second section" },
];

describe("TableOfContents", () => {
  it("is a labelled nav with a plain hash link per section", () => {
    render(<TableOfContents items={items} />);
    expect(
      screen.getByRole("navigation", { name: "On this page" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Second section", { selector: "a" }),
    ).toHaveAttribute("href", "#two");
  });

  it("toggles the list on small screens", () => {
    render(<TableOfContents items={items} />);
    const toggle = screen.getByRole("button", { name: /On this page/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("renders nothing for fewer than two sections", () => {
    const { container } = render(<TableOfContents items={items.slice(0, 1)} />);
    expect(container).toBeEmptyDOMElement();
  });
});
