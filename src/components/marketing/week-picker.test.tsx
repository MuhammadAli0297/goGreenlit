import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WeekPicker } from "@/components/marketing/week-picker";

const days = [
  {
    label: "Mon",
    name: "Monday",
    kicker: "Plan",
    title: "Planning day",
    body: "Read tickets.",
    items: ["Risks flagged"],
  },
  {
    label: "Tue",
    name: "Tuesday",
    kicker: "Test",
    title: "Testing day",
    body: "Test as features land.",
    items: ["Bugs with repro steps"],
  },
  {
    label: "Wed",
    name: "Wednesday",
    kicker: "Automate",
    title: "Automation day",
    body: "Protect flows.",
    items: ["Flaky tests repaired"],
  },
] as const;

describe("WeekPicker", () => {
  it("opens on the first day with every day in the document", () => {
    render(<WeekPicker days={days} />);
    expect(screen.getByRole("tab", { name: "Monday" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(3);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Planning day");
  });

  it("switches day on click and hides the others from assistive tech", () => {
    const { container } = render(<WeekPicker days={days} />);
    fireEvent.click(screen.getByRole("tab", { name: "Tuesday" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Bugs with repro steps",
    );
    expect(
      container.querySelectorAll("[role='tabpanel'][aria-hidden='true']"),
    ).toHaveLength(2);
  });

  it("moves with arrow keys, Home and End", () => {
    render(<WeekPicker days={days} />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Monday" }), {
      key: "End",
    });
    expect(screen.getByRole("tab", { name: "Wednesday" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.keyDown(screen.getByRole("tab", { name: "Wednesday" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("tab", { name: "Monday" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("carries no digits (no invented numbers or times)", () => {
    const { container } = render(<WeekPicker days={days} />);
    expect(container.textContent).not.toMatch(/\d/);
  });
});
