import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { QualityGateDemo } from "@/components/marketing/quality-gate-demo";

const areas = [
  { name: "Test strategy" },
  { name: "Release sign-off", gap: true },
  { name: "Coverage visibility", gap: true },
] as const;

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

describe("QualityGateDemo", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("is complete at rest: audit finished, gaps shown, gate holding", () => {
    render(<QualityGateDemo areas={areas} />);
    expect(screen.getAllByText("Gap found")).toHaveLength(2);
    expect(screen.getByText("Passed")).toBeInTheDocument();
    expect(screen.getByText("HOLD")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close the gaps" }),
    ).toBeEnabled();
  });

  it("closes the gaps one by one and then opens the gate", () => {
    setReducedMotion(false);
    render(<QualityGateDemo areas={areas} />);
    fireEvent.click(screen.getByRole("button", { name: "Close the gaps" }));
    expect(
      screen.getByRole("button", { name: "Close the gaps" }),
    ).toBeDisabled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getAllByText("Gap found")).toHaveLength(1);
    expect(screen.getByText("HOLD")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryByText("Gap found")).toBeNull();
    expect(screen.getByText("GO")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Run the audit again" }),
    ).toBeEnabled();
  });

  it("jumps straight to an open gate with reduced motion", () => {
    setReducedMotion(true);
    render(<QualityGateDemo areas={areas} />);
    fireEvent.click(screen.getByRole("button", { name: "Close the gaps" }));
    expect(screen.getByText("GO")).toBeInTheDocument();
    expect(screen.queryByText("Gap found")).toBeNull();
  });

  it("replays the scan from the open state", () => {
    setReducedMotion(false);
    render(<QualityGateDemo areas={areas} />);
    fireEvent.click(screen.getByRole("button", { name: "Close the gaps" }));
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Run the audit again" }),
    );
    expect(screen.getAllByText("Waiting").length).toBeGreaterThan(0);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getAllByText("Gap found")).toHaveLength(2);
  });

  it("announces through a polite live region and carries no digits", () => {
    const { container } = render(<QualityGateDemo areas={areas} />);
    expect(container.querySelector("[aria-live='polite']")).not.toBeNull();
    expect(container.textContent ?? "").not.toMatch(/\d/);
  });
});
