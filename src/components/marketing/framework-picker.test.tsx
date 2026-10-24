import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FrameworkPicker } from "@/components/marketing/framework-picker";

describe("FrameworkPicker", () => {
  it("starts on Playwright, the default for new work", () => {
    render(<FrameworkPicker />);
    expect(screen.getByRole("tab", { name: "Playwright" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Modern web apps");
  });

  it("keeps both panels in the document and shows one", () => {
    render(<FrameworkPicker />);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(2);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("switches to Selenium on click and links to its page", () => {
    render(<FrameworkPicker />);
    fireEvent.click(screen.getByRole("tab", { name: "Selenium" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "You already have a Selenium suite",
    );
    expect(
      screen.getByRole("link", { name: /see selenium testing/i }),
    ).toHaveAttribute("href", "/software-testing-services/selenium-testing");
  });

  it("moves with arrow keys and wraps", () => {
    render(<FrameworkPicker />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Playwright" }), {
      key: "ArrowLeft",
    });
    expect(screen.getByRole("tab", { name: "Selenium" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("shows no percentages or scores (no invented numbers)", () => {
    const { container } = render(<FrameworkPicker />);
    expect(container.textContent).not.toMatch(/\d+\s*%/);
  });
});
