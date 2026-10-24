import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MaturityCheck } from "@/components/marketing/maturity-check";

const questions = [
  {
    text: "First statement",
    advice: { title: "Do first", body: "b1", cta: "Go first", href: "/a" },
  },
  {
    text: "Second statement",
    advice: { title: "Do second", body: "b2", cta: "Go second", href: "/b" },
  },
] as const;
const allGood = { title: "All good", body: "bg", cta: "Audit", href: "/audit" };

function renderCheck() {
  return render(<MaturityCheck questions={questions} allGood={allGood} />);
}

describe("MaturityCheck", () => {
  it("starts with nothing ticked and points at the first gap", () => {
    renderCheck();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    for (const box of screen.getAllByRole("checkbox")) {
      expect(box).not.toBeChecked();
    }
    expect(screen.getByText("Do first")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go first/i })).toHaveAttribute(
      "href",
      "/a",
    );
  });

  it("moves the advice to the first statement that is still untrue", () => {
    renderCheck();
    fireEvent.click(screen.getByLabelText("First statement"));
    expect(screen.getByText("Do second")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go second/i })).toHaveAttribute(
      "href",
      "/b",
    );
    // Unticking the first sends the advice back to it.
    fireEvent.click(screen.getByLabelText("First statement"));
    expect(screen.getByText("Do first")).toBeInTheDocument();
  });

  it("points at the audit once every statement is true", () => {
    renderCheck();
    fireEvent.click(screen.getByLabelText("First statement"));
    fireEvent.click(screen.getByLabelText("Second statement"));
    expect(screen.getByText("All good")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /audit/i })).toHaveAttribute(
      "href",
      "/audit",
    );
  });

  it("shows the tally in a polite live region", () => {
    const { container } = renderCheck();
    const live = container.querySelector("[aria-live='polite']");
    expect(live).toHaveTextContent("0of 2 true");
    fireEvent.click(screen.getByLabelText("Second statement"));
    expect(live).toHaveTextContent("1of 2 true");
  });
});
