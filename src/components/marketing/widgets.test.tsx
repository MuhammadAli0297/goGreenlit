import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RunMatrix } from "@/components/marketing/run-matrix";
import {
  TestRunTerminal,
  type TermLine,
} from "@/components/marketing/test-run-terminal";

const lines: TermLine[] = [
  { tag: "PASS", tone: "pass", text: "signup flow, three browsers" },
  { tag: "BUG", tone: "bug", text: "coupon stacks twice on mobile" },
  { tag: "NOTE", tone: "note", text: "ticket filed with repro" },
  { tag: "GO", tone: "pass", text: "release is green" },
];

describe("TestRunTerminal", () => {
  it("is decorative, hidden from assistive tech", () => {
    const { container } = render(
      <TestRunTerminal title="checkout.spec.ts" lines={lines} />,
    );
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the window title and every line with its tag", () => {
    const { container } = render(
      <TestRunTerminal title="checkout.spec.ts" lines={lines} />,
    );
    expect(container.textContent).toContain("checkout.spec.ts");
    for (const line of lines) {
      expect(container.textContent).toContain(line.tag);
      expect(container.textContent).toContain(line.text);
    }
    expect(container.querySelectorAll(".lb-term-line")).toHaveLength(4);
  });

  it("colors tags by tone: olive for pass, sandy for a bug, navajo for notes", () => {
    const { container } = render(<TestRunTerminal title="t" lines={lines} />);
    const tags = [
      ...container.querySelectorAll(".lb-term-line > span:first-child"),
    ];
    expect(tags.map((t) => t.className)).toEqual([
      expect.stringContaining("text-olive"),
      expect.stringContaining("text-sandy"),
      expect.stringContaining("text-navajo"),
      expect.stringContaining("text-olive"),
    ]);
  });

  it("puts the blinking caret on the last line only", () => {
    const { container } = render(<TestRunTerminal title="t" lines={lines} />);
    const carets = container.querySelectorAll(".lb-caret");
    expect(carets).toHaveLength(1);
    expect(carets[0]!.closest(".lb-term-line")).toBe(
      container.querySelectorAll(".lb-term-line")[3],
    );
  });

  it("caps the log at ten lines, the most the keyframes cover", () => {
    const many = Array.from({ length: 14 }, (_, i) => ({
      tag: "PASS",
      tone: "pass" as const,
      text: `check ${i}`,
    }));
    const { container } = render(<TestRunTerminal title="t" lines={many} />);
    expect(container.querySelectorAll(".lb-term-line")).toHaveLength(10);
  });
});

describe("RunMatrix", () => {
  const rows = ["Chrome", "Firefox", "Safari", "Android", "iOS"];

  it("is a single labelled image, since the grid is an illustration", () => {
    render(<RunMatrix rows={rows} />);
    expect(
      screen.getByRole("img", { name: /example test run/i }),
    ).toBeInTheDocument();
  });

  it("draws one sweeping cell per row and column", () => {
    const { container } = render(<RunMatrix rows={rows} columns={6} />);
    expect(container.querySelectorAll(".lb-sweep")).toHaveLength(5 * 6);
  });

  it("staggers cells diagonally so the sweep travels across the grid", () => {
    const { container } = render(<RunMatrix rows={["A", "B"]} columns={3} />);
    const delays = [
      ...container.querySelectorAll<HTMLElement>(".lb-sweep"),
    ].map((c) => c.style.getPropertyValue("--lb-i"));
    expect(delays).toEqual(["0", "1", "2", "3", "4", "5"]);
  });

  it("shows each row label and the status legend", () => {
    const { container } = render(<RunMatrix rows={rows} />);
    for (const row of rows) expect(container.textContent).toContain(row);
    for (const status of ["passed", "bug found", "queued"]) {
      expect(container.textContent).toContain(status);
    }
  });

  it("takes a custom title and accessible label", () => {
    render(
      <RunMatrix rows={rows} title="Device run" label="Devices under test" />,
    );
    expect(
      screen.getByRole("img", { name: "Devices under test" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Device run")).toBeInTheDocument();
  });
});
