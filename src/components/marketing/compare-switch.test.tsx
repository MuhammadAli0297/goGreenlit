import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CompareSwitch } from "@/components/marketing/compare-switch";

const usual = {
  label: "The usual way",
  summary: "Usual summary.",
  status: "Defects escape",
  tone: "bug",
  rows: [{ label: "Testing happens", value: "The night before release" }],
} as const;
const ours = {
  label: "Our way",
  summary: "Our summary.",
  status: "Defects caught",
  tone: "pass",
  rows: [{ label: "Testing happens", value: "Inside every sprint" }],
} as const;

describe("CompareSwitch", () => {
  it("opens on the recommended side", () => {
    render(<CompareSwitch usual={usual} ours={ours} />);
    expect(screen.getByRole("tab", { name: "Our way" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Inside every sprint",
    );
  });

  it("keeps both panels in the document and shows one", () => {
    render(<CompareSwitch usual={usual} ours={ours} />);
    expect(screen.getAllByRole("tabpanel", { hidden: true })).toHaveLength(2);
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  it("flips to the usual way on click and shows its status", () => {
    render(<CompareSwitch usual={usual} ours={ours} />);
    fireEvent.click(screen.getByRole("tab", { name: "The usual way" }));
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveTextContent("The night before release");
    expect(panel.querySelector("[data-status='bug']")).not.toBeNull();
  });

  it("moves with arrow keys and wraps", () => {
    render(<CompareSwitch usual={usual} ours={ours} />);
    fireEvent.keyDown(screen.getByRole("tab", { name: "Our way" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("tab", { name: "The usual way" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
