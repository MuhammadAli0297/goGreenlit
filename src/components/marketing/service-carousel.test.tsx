import { fireEvent, render, screen } from "@testing-library/react";
import { Radar } from "lucide-react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ServiceCarousel } from "@/components/marketing/service-carousel";

const services = [
  { icon: Radar, title: "First service", description: "One.", href: "/a" },
  { icon: Radar, title: "Second service", description: "Two.", href: "/b" },
] as const;

function defineSize(prop: string, value: number) {
  Object.defineProperty(HTMLElement.prototype, prop, {
    configurable: true,
    get: () => value,
  });
}

describe("ServiceCarousel", () => {
  beforeEach(() => {
    // jsdom has no layout, so the track would never look scrollable.
    defineSize("scrollWidth", 1000);
    defineSize("clientWidth", 400);
    HTMLElement.prototype.scrollBy = vi.fn();
  });
  afterEach(() => {
    // @ts-expect-error restore jsdom's own zero-size layout
    delete HTMLElement.prototype.scrollWidth;
    // @ts-expect-error restore jsdom's own zero-size layout
    delete HTMLElement.prototype.clientWidth;
  });

  it("renders every service as a link to its page with an h3 title", () => {
    render(<ServiceCarousel services={services} label="Services" />);
    expect(screen.getByRole("list", { name: "Services" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /first service/i }),
    ).toHaveAttribute("href", "/a");
    expect(
      screen.getByRole("heading", { level: 3, name: "Second service" }),
    ).toBeInTheDocument();
  });

  it("starts at the beginning, so Previous is disabled and Next is not", () => {
    render(<ServiceCarousel services={services} label="Services" />);
    expect(
      screen.getByRole("button", { name: "Previous service" }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next service" })).toBeEnabled();
  });

  it("scrolls the track forward when Next is pressed", () => {
    render(<ServiceCarousel services={services} label="Services" />);
    fireEvent.click(screen.getByRole("button", { name: "Next service" }));
    expect(HTMLElement.prototype.scrollBy).toHaveBeenCalledWith(
      expect.objectContaining({ left: expect.any(Number) }),
    );
  });
});
