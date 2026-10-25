import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageHero } from "@/components/marketing/page-hero";

describe("PageHero", () => {
  it("renders the h1, description, badge and CTAs", () => {
    render(
      <PageHero
        badge="No long-term contracts"
        description="A short description."
        ctas={<a href="/x">Book a call</a>}
      >
        Software testing that plugs into <em>your sprint</em>
      </PageHero>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: /plugs into your sprint/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("A short description.")).toBeInTheDocument();
    expect(screen.getByText("No long-term contracts")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Book a call" }),
    ).toBeInTheDocument();
  });

  it("is centered and dark by default", () => {
    const { container } = render(<PageHero description="d">Title</PageHero>);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("bg-deep");
    expect(section.className).toContain("on-dark");
    expect(section.firstElementChild?.nextElementSibling?.className).toContain(
      "text-center",
    );
  });

  it("switches to ink text on the leaf and olive family bands", () => {
    const { container, rerender } = render(
      <PageHero tone="leaf" description="d">
        Title
      </PageHero>,
    );
    expect(container.querySelector("section")!.className).toContain("bg-leaf");
    expect(container.querySelector("section")!.className).toContain("text-ink");
    expect(container.querySelector("section")!.className).not.toContain(
      "on-dark",
    );
    rerender(
      <PageHero tone="olive" description="d">
        Title
      </PageHero>,
    );
    expect(container.querySelector("section")!.className).toContain("bg-olive");
  });

  it("becomes two columns and left-aligned when given an aside widget", () => {
    const { container } = render(
      <PageHero description="d" aside={<div>widget</div>}>
        Title
      </PageHero>,
    );
    expect(screen.getByText("widget")).toBeInTheDocument();
    expect(
      container.querySelector("section > div:nth-child(2)")?.className,
    ).toContain("lg:grid-cols");
  });

  it("keeps exactly one h1", () => {
    render(<PageHero description="d">Only one</PageHero>);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
