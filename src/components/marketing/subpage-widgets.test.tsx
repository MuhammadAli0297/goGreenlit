import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AuditReportPreview } from "@/components/marketing/audit-report-preview";
import { KnownIssuesDemo } from "@/components/marketing/known-issues-demo";
import { MergeGateDemo } from "@/components/marketing/merge-gate-demo";
import { RiskMap } from "@/components/marketing/risk-map";
import { TriageSorter } from "@/components/marketing/triage-sorter";

function setReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    onchange: null,
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

describe("RiskMap", () => {
  it("cycles an area from low to medium to high and back", () => {
    render(<RiskMap />);
    const profile = () => screen.getByRole("button", { name: /^Profile,/ });
    expect(profile()).toHaveAccessibleName(/Low risk/);
    fireEvent.click(profile());
    expect(profile()).toHaveAccessibleName(/Medium risk/);
    fireEvent.click(profile());
    expect(profile()).toHaveAccessibleName(/High risk/);
    expect(
      screen.getByText(/test deeply, every release/i, { selector: "p" }),
    ).toBeInTheDocument();
    fireEvent.click(profile());
    expect(profile()).toHaveAccessibleName(/Low risk/);
  });
});

describe("TriageSorter", () => {
  it("opens on Blocker and moves the bug to the chosen lane", () => {
    render(<TriageSorter />);
    expect(screen.getByRole("button", { name: "Blocker" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Minor" }));
    expect(screen.getByRole("button", { name: "Minor" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(/reviewed monthly/i)).toBeInTheDocument();
    expect(screen.getAllByText("The bug lands here.")).toHaveLength(1);
  });
});

describe("MergeGateDemo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts blocked with a failed check", () => {
    render(<MergeGateDemo />);
    expect(screen.getByText("Failed")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Merge blocked" }),
    ).toBeDisabled();
  });

  it("re-runs the checks, then unlocks Merge", () => {
    setReducedMotion(false);
    render(<MergeGateDemo />);
    fireEvent.click(
      screen.getByRole("button", { name: "Fix the failing test" }),
    );
    expect(screen.getAllByText("Running").length).toBeGreaterThan(0);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Failed")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Merge pull request" }),
    ).toBeEnabled();
  });

  it("skips the re-run with reduced motion", () => {
    setReducedMotion(true);
    render(<MergeGateDemo />);
    fireEvent.click(
      screen.getByRole("button", { name: "Fix the failing test" }),
    );
    expect(
      screen.getByRole("button", { name: "Merge pull request" }),
    ).toBeEnabled();
  });
});

describe("AuditReportPreview", () => {
  it("cycles through findings and wraps", () => {
    render(<AuditReportPreview />);
    expect(screen.getByText("Coverage")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next finding" }));
    expect(screen.getByText("Process")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next finding" }));
    expect(screen.getByText("Strength")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next finding" }));
    expect(screen.getByText("Coverage")).toBeInTheDocument();
  });
});

describe("KnownIssuesDemo", () => {
  it("opens on Hold with one blocking issue, and flips to Go when accepted", () => {
    render(<KnownIssuesDemo />);
    expect(screen.getByText("Hold")).toBeInTheDocument();
    const group = screen.getByRole("group", {
      name: /export fails for very large files/i,
    });
    fireEvent.click(group.querySelector("button")!); // Accept
    expect(screen.getByText("Go")).toBeInTheDocument();
  });
});

describe("subpage widgets", () => {
  it("carry no digits (no invented numbers)", () => {
    for (const widget of [
      <RiskMap key="a" />,
      <TriageSorter key="b" />,
      <MergeGateDemo key="c" />,
      <AuditReportPreview key="d" />,
      <KnownIssuesDemo key="e" />,
    ]) {
      const { container, unmount } = render(widget);
      expect(container.textContent).not.toMatch(/\d/);
      unmount();
    }
  });
});
