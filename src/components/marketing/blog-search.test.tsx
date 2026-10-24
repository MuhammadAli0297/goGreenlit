import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogSearch } from "@/components/marketing/blog-search";

describe("BlogSearch", () => {
  it("is a GET form to /blog with a labelled q field", () => {
    render(<BlogSearch query="" />);
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("action", "/blog");
    expect(form).toHaveAttribute("method", "get");
    expect(screen.getByLabelText("Search articles")).toHaveAttribute(
      "name",
      "q",
    );
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
  });

  it("keeps the category and offers Clear when searching", () => {
    const { container } = render(
      <BlogSearch query="flaky" category="test-automation" />,
    );
    expect(
      container.querySelector('input[type="hidden"][name="category"]'),
    ).toHaveAttribute("value", "test-automation");
    expect(screen.getByLabelText("Search articles")).toHaveValue("flaky");
    expect(screen.getByRole("link", { name: "Clear" })).toHaveAttribute(
      "href",
      "/blog?category=test-automation",
    );
  });
});
