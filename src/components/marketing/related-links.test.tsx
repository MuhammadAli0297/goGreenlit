import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RelatedLinks } from "@/components/marketing/related-links";

const groups = [
  {
    heading: "More testing services",
    links: [
      {
        label: "Manual Testing",
        href: "/software-testing-services/manual-testing",
      },
      {
        label: "Selenium Testing",
        href: "/software-testing-services/selenium-testing",
      },
    ],
  },
  {
    heading: "Related QA consulting",
    links: [
      { label: "Release Readiness", href: "/qa-consulting/release-readiness" },
    ],
  },
];

describe("RelatedLinks", () => {
  it("renders every group as an h2 with its links", () => {
    render(<RelatedLinks groups={groups} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "More testing services" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Related QA consulting" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Manual Testing" }),
    ).toHaveAttribute("href", "/software-testing-services/manual-testing");
    expect(
      screen.getByRole("link", { name: "Release Readiness" }),
    ).toHaveAttribute("href", "/qa-consulting/release-readiness");
  });

  it("renders nothing when there are no groups", () => {
    const { container } = render(<RelatedLinks groups={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the cross-family pairing as a feature and the siblings as pills", () => {
    render(<RelatedLinks groups={groups} />);
    const feature = screen.getByRole("link", { name: "Release Readiness" });
    expect(feature.className).toContain("after:absolute");
    expect(feature.closest("[class*='bg-ink']")).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Manual Testing" }).className,
    ).toContain("hover:bg-olive");
  });

  it("lets the siblings take the full width when there is no pairing", () => {
    render(<RelatedLinks groups={[groups[0]!]} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
