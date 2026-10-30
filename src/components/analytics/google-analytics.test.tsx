import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ id, src }: { id?: string; src?: string }) => (
    <span data-testid="script" data-id={id} data-src={src} />
  ),
}));

import { GoogleAnalytics } from "./google-analytics";

function Page() {
  return (
    <>
      <GoogleAnalytics />
      <a href="https://calendly.com/gogreenlit/30min">Book a call</a>
      <a href="/about">About</a>
    </>
  );
}

describe("GoogleAnalytics", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.gtag;
  });

  it("renders nothing and tracks nothing when no measurement ID is set", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    vi.stubEnv("NODE_ENV", "production");
    render(<Page />);
    expect(screen.queryByTestId("script")).toBeNull();
    fireEvent.click(screen.getByText("Book a call"));
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("renders nothing outside a production build, even with an ID", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("NODE_ENV", "test");
    render(<Page />);
    expect(screen.queryByTestId("script")).toBeNull();
    fireEvent.click(screen.getByText("Book a call"));
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("loads gtag.js with the ID in production", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("NODE_ENV", "production");
    render(<Page />);
    const sources = screen
      .getAllByTestId("script")
      .map((node) => node.getAttribute("data-src"));
    expect(sources).toContain(
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123",
    );
  });

  it("sends book_call_click and internal_link_click from real clicks", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("NODE_ENV", "production");
    render(<Page />);

    fireEvent.click(screen.getByText("Book a call"));
    expect(window.gtag).toHaveBeenLastCalledWith(
      "event",
      "book_call_click",
      expect.objectContaining({ link_text: "Book a call" }),
    );

    fireEvent.click(screen.getByText("About"));
    expect(window.gtag).toHaveBeenLastCalledWith(
      "event",
      "internal_link_click",
      expect.objectContaining({ link_url: "/about" }),
    );
  });

  it("does not throw when gtag is missing (ad blocker)", () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("NODE_ENV", "production");
    delete window.gtag;
    render(<Page />);
    expect(() =>
      fireEvent.click(screen.getByText("Book a call")),
    ).not.toThrow();
  });
});
