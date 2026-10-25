import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CompareColumns } from "@/components/marketing/compare-columns";

const props = {
  leftTitle: "The usual way",
  leftItems: ["Testing happens at the end", "Reports, then silence"],
  rightTitle: "The GoGreenlit way",
  rightItems: ["Testers join your sprint", "A go or no-go every release"],
};

describe("CompareColumns", () => {
  it("renders both titles as h3 with all of their items", () => {
    render(<CompareColumns {...props} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "The usual way" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "The GoGreenlit way" }),
    ).toBeInTheDocument();
    for (const item of [...props.leftItems, ...props.rightItems]) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("gives every item an icon so the contrast is not color alone", () => {
    render(<CompareColumns {...props} />);
    const lists = screen.getAllByRole("list");
    for (const list of lists) {
      for (const li of within(list).getAllByRole("listitem")) {
        expect(li.querySelector("svg")).not.toBeNull();
      }
    }
  });

  it("accents only the right column with a Sandy Brown border", () => {
    const { container } = render(<CompareColumns {...props} />);
    const cards = container.querySelectorAll("[data-slot='sticker-card']");
    expect(cards).toHaveLength(2);
    expect(cards[0]!.className).not.toContain("border-sandy");
    expect(cards[1]!.className).toContain("border-sandy");
  });
});
