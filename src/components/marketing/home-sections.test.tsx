import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/marketing/hero";
import { WhatWeTestMarquee } from "@/components/marketing/what-we-test-marquee";
import { WhyEmbeddedBento } from "@/components/marketing/why-embedded-bento";

describe("WhatWeTestMarquee", () => {
  it("announces the list once and hides the looped copy", () => {
    const { container } = render(<WhatWeTestMarquee />);
    expect(screen.getAllByRole("list")).toHaveLength(1);
    expect(container.querySelectorAll("ul[aria-hidden='true']")).toHaveLength(
      1,
    );
    // Once in the real list, once in the aria-hidden loop copy.
    expect(screen.getAllByText("Playwright")).toHaveLength(2);
  });
});

describe("WhyEmbeddedBento", () => {
  it("keeps the five claims the homepage already made", () => {
    render(<WhyEmbeddedBento />);
    for (const kicker of [
      "Founder-led engagements",
      "Transparent reporting",
      "No long-term contracts",
      "Embedded in your sprint",
      "Manual plus automated",
    ]) {
      expect(screen.getByText(kicker)).toBeInTheDocument();
    }
  });
});

describe("Hero", () => {
  it("has one h1 that keeps the keyword headline with an italic accent", () => {
    render(<Hero />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent(
      "Embedded QA teams for startups that ship fast",
    );
    expect(h1.querySelector("em")).toHaveTextContent("ship fast");
  });

  it("links the booking call and the services anchor", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /book a call/i })).toHaveAttribute(
      "href",
      expect.stringContaining("calendly"),
    );
    expect(
      screen.getByRole("link", { name: "Explore services" }),
    ).toHaveAttribute("href", "#services");
  });
});
