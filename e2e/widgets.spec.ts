import { expect, test } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test("blog search filters live through the URL and clears", async ({
  page,
}) => {
  await page.goto("/blog");
  const box = page.getByRole("searchbox", { name: "Search articles" });
  await box.fill("playwright");
  await expect(page).toHaveURL(/q=playwright/);
  await expect(page.getByRole("status")).toContainText(/article/);
  await expect(box).toBeFocused();
  await page.getByRole("button", { name: /clear/i }).click();
  await expect(page).not.toHaveURL(/q=/);
  await expect(box).toHaveValue("");
});

test("quality gate demo closes the gaps and opens the release gate", async ({
  page,
}) => {
  await page.goto("/qa-consulting");
  const button = page.getByRole("button", { name: "Close the gaps" });
  await button.scrollIntoViewIfNeeded();
  await button.click();
  await expect(
    page.getByRole("button", { name: "Run the audit again" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Run the audit again" }).click();
  await expect(
    page.getByRole("button", { name: "Close the gaps" }),
  ).toBeVisible();
});

test("compare switch opens on the GoGreenlit way and flips", async ({
  page,
}) => {
  await page.goto("/qa-consulting");
  const tabs = page.getByRole("tablist", { name: "Two ways to run QA" });
  await tabs.scrollIntoViewIfNeeded();
  const [usual, ours] = await tabs.getByRole("tab").all();
  await expect(ours!).toHaveAttribute("aria-selected", "true");
  await usual!.click();
  await expect(usual!).toHaveAttribute("aria-selected", "true");
  await expect(
    page.getByRole("tabpanel").filter({ hasText: "The night before release" }),
  ).toBeVisible();
});

test("maturity check points at the first unticked statement", async ({
  page,
}) => {
  await page.goto("/qa-consulting");
  const first = page.getByLabel("We have a written test strategy");
  await first.check({ force: true });
  await page
    .getByLabel("Automated tests run on every merge")
    .check({ force: true });
  const link = page.getByRole("link", { name: /release readiness/i }).last();
  await expect(link).toHaveAttribute(
    "href",
    "/qa-consulting/release-readiness",
  );
  for (const text of [
    "Every release has a clear go or no-go",
    "Bugs are triaged by severity, not volume",
    "QA joins planning, not just testing",
  ]) {
    await page.getByLabel(text).check({ force: true });
  }
  await expect(
    page.getByText("5 of 5 true").or(page.getByText("of 5 true")),
  ).toBeVisible();
  await expect(
    page.locator('a[href="/qa-consulting/qa-audit-assessment"]').last(),
  ).toBeVisible();
});

test("service carousel links every card to its subpage", async ({ page }) => {
  await page.goto("/qa-consulting");
  const track = page.getByRole("list", { name: "QA consulting services" });
  await expect(track.getByRole("link")).toHaveCount(6);
  await expect(track.getByRole("link").first()).toHaveAttribute(
    "href",
    /\/qa-consulting\//,
  );
});

test("run test widget plays a run on the Playwright page", async ({ page }) => {
  await page.goto("/software-testing-services/playwright-automation");
  await page.getByRole("button", { name: "Run test" }).click();
  await expect(page.getByRole("button", { name: "Run again" })).toBeVisible();
});

test("framework picker swaps Playwright and Selenium", async ({ page }) => {
  await page.goto("/software-testing-services");
  const tab = page.getByRole("tab", { name: "Selenium" });
  await tab.scrollIntoViewIfNeeded();
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByLabel("Example Selenium test")).toBeVisible();
});

test("the 404 page offers a way home", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("failed");
  await page.getByRole("link", { name: /back to home/i }).click();
  await expect(page).toHaveURL("/");
});

test("the About page has founders with LinkedIn links and no icons", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(
    page.locator("#muhammad-ali, #mohammad-khan").first(),
  ).toBeAttached();
  const links = page.getByRole("link", { name: /linkedin/i });
  expect(await links.count()).toBeGreaterThanOrEqual(2);
  await expect(links.first()).toHaveAttribute("rel", /noopener/);
  expect(await page.locator("main svg").count()).toBe(0);
});
