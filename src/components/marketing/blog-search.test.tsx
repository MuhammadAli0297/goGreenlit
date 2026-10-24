import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BlogSearch } from "@/components/marketing/blog-search";

const replace = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

describe("BlogSearch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    replace.mockClear();
  });
  afterEach(() => vi.useRealTimers());

  it("is a labelled search form with a q field and no submit button", () => {
    render(<BlogSearch query="" />);
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByLabelText("Search articles")).toHaveAttribute(
      "name",
      "q",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("updates the URL after a pause while typing, keeping the category", () => {
    render(<BlogSearch query="" category="test-automation" />);
    const input = screen.getByLabelText("Search articles");
    fireEvent.change(input, { target: { value: "fl" } });
    fireEvent.change(input, { target: { value: "flaky  tests" } });
    expect(replace).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(replace).toHaveBeenCalledTimes(1);
    expect(replace).toHaveBeenCalledWith(
      "/blog?category=test-automation&q=flaky+tests",
      { scroll: false },
    );
  });

  it("Enter searches at once and Clear empties the search", () => {
    render(<BlogSearch query="flaky" />);
    const input = screen.getByLabelText("Search articles");
    fireEvent.change(input, { target: { value: "api" } });
    fireEvent.submit(screen.getByRole("search"));
    expect(replace).toHaveBeenCalledWith("/blog?q=api", { scroll: false });
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(replace).toHaveBeenLastCalledWith("/blog", { scroll: false });
    expect(input).toHaveValue("");
  });
});
