import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogPagination } from "@/components/marketing/blog-pagination";

describe("BlogPagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(
      <BlogPagination currentPage={1} totalPages={1} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("marks the current page and links the neighbours with category and query", () => {
    render(
      <BlogPagination
        currentPage={2}
        totalPages={4}
        category="test-automation"
        query="flaky"
      />,
    );
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Page 1" })).toHaveAttribute(
      "href",
      "/blog?category=test-automation&q=flaky#blog-list",
    );
    expect(screen.getByRole("link", { name: /Next page/ })).toHaveAttribute(
      "href",
      "/blog?category=test-automation&q=flaky&page=3#blog-list",
    );
    expect(screen.getByRole("link", { name: /Previous page/ })).toHaveAttribute(
      "rel",
      "prev",
    );
  });

  it("turns Previous into dimmed text on the first page and Next on the last", () => {
    const { rerender } = render(
      <BlogPagination currentPage={1} totalPages={3} />,
    );
    expect(
      screen.queryByRole("link", { name: /Previous page/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Previous page").closest("span.inline-flex"),
    ).toHaveAttribute("aria-disabled", "true");
    rerender(<BlogPagination currentPage={3} totalPages={3} />);
    expect(
      screen.queryByRole("link", { name: /Next page/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Previous page/ })).toHaveAttribute(
      "href",
      "/blog?page=2#blog-list",
    );
  });
});
