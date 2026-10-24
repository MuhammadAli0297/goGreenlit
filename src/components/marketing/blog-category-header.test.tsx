import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogCategoryHeader } from "@/components/marketing/blog-category-header";
import { blogCategories } from "@/lib/blog-data";

describe("BlogCategoryHeader", () => {
  it.each(blogCategories)(
    "shows $label with its own description and a way back",
    (category) => {
      render(<BlogCategoryHeader category={category} postCount={9} />);
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: `${category.label} articles`,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();
      expect(screen.getByText("9 articles")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "All articles" }),
      ).toHaveAttribute("href", "/blog");
    },
  );

  it("uses the singular for one article", () => {
    render(<BlogCategoryHeader category={blogCategories[0]!} postCount={1} />);
    expect(screen.getByText("1 article")).toBeInTheDocument();
  });
});
