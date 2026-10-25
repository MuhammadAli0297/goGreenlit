import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ServiceExplorer } from "@/components/marketing/service-explorer";

describe("ServiceExplorer", () => {
  it("renders four tabs with the first selected and its panel shown", () => {
    render(<ServiceExplorer />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(4);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByRole("tabpanel", { name: "Manual testing" }),
    ).toBeVisible();
  });

  it("keeps every panel in the document, only the active one visible", () => {
    render(<ServiceExplorer />);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(4);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("switches panel on click and links to the real subpage", () => {
    render(<ServiceExplorer />);
    fireEvent.click(screen.getByRole("tab", { name: "Regression" }));
    expect(screen.getByRole("tab", { name: "Regression" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(
      screen.getByRole("link", { name: /see regression/i }),
    ).toHaveAttribute("href", "/software-testing-services/regression-testing");
  });

  it("moves with the arrow keys and wraps around", () => {
    render(<ServiceExplorer />);
    const first = screen.getByRole("tab", { name: "Manual testing" });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Regression" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    fireEvent.keyDown(screen.getByRole("tab", { name: "Regression" }), {
      key: "Home",
    });
    expect(first).toHaveAttribute("aria-selected", "true");
  });

  it("only the selected tab is in the tab order", () => {
    render(<ServiceExplorer />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.tabIndex)).toEqual([0, -1, -1, -1]);
  });

  it("puts no digits in the example logs (no invented numbers)", () => {
    const { container } = render(<ServiceExplorer />);
    const logs = container.querySelectorAll("[aria-hidden='true'].font-label");
    expect(logs.length).toBe(4);
    // HTTP status codes and spec file names are the only numerals allowed.
    for (const log of logs) {
      const text = (log.textContent ?? "").replace(/\b(200|201)\b/g, "");
      expect(text).not.toMatch(/\d/);
    }
  });
});
