import { render, screen } from "@testing-library/react";
import { ShieldCheck } from "lucide-react";
import { describe, expect, it } from "vitest";

import { ServiceCard } from "@/components/marketing/service-card";

const props = {
  icon: ShieldCheck,
  title: "Regression testing",
  description: "Prove yesterday still works so today can ship.",
};

describe("ServiceCard", () => {
  it("renders the title as a real h3 for the heading outline", () => {
    render(<ServiceCard {...props} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Regression testing" }),
    ).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it("is the cream card with an olive icon tile by default (subtle)", () => {
    const { container } = render(<ServiceCard {...props} />);
    const card = container.querySelector("[data-slot='sticker-card']")!;
    expect(card.className).toContain("bg-surface");
    expect(container.querySelector("svg")!.parentElement!.className).toContain(
      "bg-olive",
    );
  });

  it("is the Palm Leaf card with a sandy icon tile when bold", () => {
    const { container } = render(<ServiceCard {...props} variant="bold" />);
    expect(
      container.querySelector("[data-slot='sticker-card']")!.className,
    ).toContain("bg-leaf");
    expect(container.querySelector("svg")!.parentElement!.className).toContain(
      "bg-sandy",
    );
  });

  it("passes id through so a card can be an anchor target", () => {
    const { container } = render(<ServiceCard {...props} id="regression" />);
    expect(container.querySelector("#regression")).not.toBeNull();
  });

  it("hides the decorative icon from assistive tech", () => {
    const { container } = render(<ServiceCard {...props} />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
