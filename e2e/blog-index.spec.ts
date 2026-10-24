import { expect, test, type Page } from "@playwright/test";

const top = (page: Page, selector: string) =>
  page.evaluate(
    (s) => Math.round(document.querySelector(s)!.getBoundingClientRect().top),
    selector,
  );

test("clicking a category filter lands the category header near the top, not the hero", async ({
  page,
}) => {
  await page.goto("/blog");
  const pills = page.getByRole("navigation", {
    name: "Filter articles by category",
  });
  await pills.scrollIntoViewIfNeeded();
  await pills.getByRole("link", { name: "Test Automation" }).click();
  await expect(page).toHaveURL(/category=test-automation#blog-top$/);
  await expect
    .poll(() => top(page, "#blog-top"), { timeout: 5000 })
    .toBeLessThan(140);
  await expect(
    page.getByRole("heading", { name: "Test Automation articles" }),
  ).toBeInViewport();
});

test("clicking a page number lands the featured article (page 1) or the first row (later pages) near the top", async ({
  page,
}) => {
  await page.goto("/blog");
  const pagination = page.getByRole("navigation", { name: "Blog pagination" });
  await pagination.scrollIntoViewIfNeeded();
  await pagination.getByRole("link", { name: "Page 2" }).click();
  await expect(page).toHaveURL(/page=2#blog-list$/);
  await expect
    .poll(() => top(page, "#blog-list"), { timeout: 5000 })
    .toBeLessThan(140);
  // No featured article after page 1.
  await expect(page.locator("#blog-list h2")).toHaveCount(0);

  await pagination.scrollIntoViewIfNeeded();
  await pagination.getByRole("link", { name: "Page 1" }).click();
  await expect
    .poll(() => top(page, "#blog-list"), { timeout: 5000 })
    .toBeLessThan(140);
  await expect(page.locator("#blog-list h2")).toHaveCount(1);
});
