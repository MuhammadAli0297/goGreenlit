import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RunTestWidget } from "@/components/marketing/run-test-widget";

const results = [
  { tag: "RUN ", tone: "pass", text: "first line" },
  { tag: "FAIL", tone: "bug", text: "second line" },
  { tag: "PASS", tone: "pass", text: "third line" },
] as const;

function renderWidget() {
  return render(
    <RunTestWidget
      file="checkout.spec.ts"
      code={["test('x', () => {", "  await go();", "});"]}
      results={results}
    />,
  );
}

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

describe("RunTestWidget", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts idle with a prompt and no results", () => {
    renderWidget();
    expect(screen.getByText(/press run test/i)).toBeInTheDocument();
    expect(screen.queryByText("first line")).toBeNull();
    expect(screen.getByRole("button", { name: "Run test" })).toBeEnabled();
  });

  it("plays the result lines one after another and then offers Run again", () => {
    setReducedMotion(false);
    renderWidget();
    fireEvent.click(screen.getByRole("button", { name: "Run test" }));
    expect(screen.getByRole("button", { name: "Running" })).toBeDisabled();
    expect(screen.queryByText("first line")).toBeNull();

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByText("first line")).toBeInTheDocument();
    expect(screen.queryByText("third line")).toBeNull();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("third line")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Run again" })).toBeEnabled();
  });

  it("shows every line at once with reduced motion", () => {
    setReducedMotion(true);
    renderWidget();
    fireEvent.click(screen.getByRole("button", { name: "Run test" }));
    expect(screen.getByText("third line")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Run again" })).toBeEnabled();
  });

  it("announces results through a polite live region", () => {
    const { container } = renderWidget();
    expect(container.querySelector("[aria-live='polite']")).not.toBeNull();
  });
});
