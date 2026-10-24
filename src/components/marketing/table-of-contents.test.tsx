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
      screen.getByRole("navigation", { name: "On this page", hidden: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Second section", { selector: "a" }),
    ).toHaveAttribute("href", "#two");
  });

  it("shows a section number out of the total, never a title, when closed", () => {
    render(<TableOfContents items={items} />);
    const button = screen.getByRole("button", {
      name: /On this page/,
      hidden: true,
    });
    expect(button).toHaveTextContent("00");
    expect(button).toHaveTextContent("/ 02");
    expect(button).not.toHaveTextContent("First section");
  });

  it("numbers every section in the open list", () => {
    render(<TableOfContents items={items} />);
    expect(
      screen.getByText("First section", { selector: "a" }),
    ).toHaveTextContent("01");
    expect(
      screen.getByText("Second section", { selector: "a" }),
    ).toHaveTextContent("02");
  });

  it("is inert (unreachable) until the article is being read", () => {
    render(<TableOfContents items={items} />);
    expect(screen.getByRole("navigation", { hidden: true })).toHaveAttribute(
      "inert",
    );
  });

  it("opens and closes the list from the pill, and closes on Escape", () => {
    render(<TableOfContents items={items} />);
    const toggle = screen.getByRole("button", {
      name: /On this page/,
      hidden: true,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("renders nothing for fewer than two sections", () => {
    const { container } = render(<TableOfContents items={items.slice(0, 1)} />);
    expect(container).toBeEmptyDOMElement();
  });
});
