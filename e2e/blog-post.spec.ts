import { expect, test, type Page } from "@playwright/test";

// Opens the first post tile from the blog index (scrolled a little, so
// there is a position to come back to), then jumps through three sections
// with the contents pill.
async function openPostAndJumpThroughSections(page: Page) {
  await page.goto("/blog");
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.locator('main a[href^="/blog/"]').first().click();
  await page.waitForURL(/\/blog\/[^/#]+$/);
  await expect(page.locator("#article-body")).toBeVisible();
  const postUrl = page.url();

  await page.evaluate(() => {
    const body = document.getElementById("article-body")!;
    window.scrollTo(0, body.getBoundingClientRect().top + window.scrollY + 400);
  });
  const toc = page.getByRole("navigation", { name: "On this page" });
  for (const index of [1, 2, 3]) {
    await toc.getByRole("button", { name: /On this page/ }).click();
    await toc.getByRole("link").nth(index).click();
  }
  return { postUrl };
}

test("jumping between sections does not add history entries", async ({
  page,
}) => {
  const { postUrl } = await openPostAndJumpThroughSections(page);
  const start = page.url();
  expect(start.startsWith(postUrl.split("#")[0]!)).toBe(true);
  // The address bar follows the section, in place.
  expect(page.url()).toMatch(/#.+/);
  const entries = await page.evaluate(() => window.history.length);
  await page.goBack();
  await expect(page).toHaveURL(/\/blog$/);
  expect(entries).toBeLessThanOrEqual(3);
});

test('"Back to the blog" leaves the post after several section jumps', async ({
  page,
}) => {
  await openPostAndJumpThroughSections(page);
  await page.getByRole("link", { name: "Back to the blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
});
