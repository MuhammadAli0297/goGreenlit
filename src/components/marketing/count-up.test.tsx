import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CountUp } from "@/components/marketing/count-up";

/** A controllable IntersectionObserver, so a test can say when the number scrolls in or out. */
let fire: (isIntersecting: boolean) => void = () => {};

class ControlledObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    fire = (isIntersecting) =>
      this.callback(
        [{ isIntersecting, target } as IntersectionObserverEntry],
        this,
      );
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const visible = (c: HTMLElement) =>
  c.querySelector("[aria-hidden='true']")!.textContent;

describe("CountUp", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", ControlledObserver);
    // The shared test setup reports reduced motion as on, these tests are
    // about the animated path, so turn it off here.
    window.matchMedia = (q: string) =>
      ({ matches: false, media: q }) as MediaQueryList;
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    window.matchMedia = originalMatchMedia;
  });

  it("renders the final value first, so the server HTML and no-JS show the real number", () => {
    const { container } = render(<CountUp value={45} suffix="%" />);
    expect(visible(container)).toBe("45%");
  });

  it("resets to 0 while off screen, then counts up to the value when it enters", () => {
    const { container } = render(
      <CountUp value={45} suffix="%" duration={1000} />,
    );
    act(() => fire(false));
    expect(visible(container)).toBe("0%");

    act(() => fire(true));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    const midway = parseInt(visible(container)!, 10);
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(45);

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(visible(container)).toBe("45%");
  });

  it("waits for its delay before it starts counting", () => {
    const { container } = render(
      <CountUp value={95} suffix="%" duration={1000} delay={400} />,
    );
    act(() => fire(true));
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(visible(container)).toBe("0%");
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(visible(container)).toBe("95%");
  });

  it("replays: leaving resets it, entering again counts again", () => {
    const { container } = render(
      <CountUp value={18} suffix="+" duration={500} />,
    );
    act(() => fire(true));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(visible(container)).toBe("18+");
    act(() => fire(false));
    expect(visible(container)).toBe("0+");
    act(() => fire(true));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(visible(container)).toBe("18+");
  });

  it("keeps the real value for screen readers and hides the counting digits", () => {
    const { container } = render(<CountUp value={1} prefix="$" suffix="B+" />);
    act(() => fire(false));
    expect(container.querySelector(".sr-only")!.textContent).toBe("$1B+");
    expect(container.querySelector("[aria-hidden='true']")).not.toBeNull();
  });

  it("stays at the final value with reduced motion", () => {
    window.matchMedia = (q: string) =>
      ({ matches: q.includes("reduce"), media: q }) as MediaQueryList;
    const { container } = render(<CountUp value={45} suffix="%" />);
    act(() => fire(false));
    expect(visible(container)).toBe("45%");
  });
});
