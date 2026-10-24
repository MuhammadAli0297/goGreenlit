import { expect, test } from "@playwright/test";

test("home page renders the hero and header", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /ship fast/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "goGreenlit" }),
  ).toBeVisible();
  await expect(
    page.getByRole("banner").getByRole("link", { name: "Book a call" }),
  ).toBeVisible();
});

test('"Explore services" scrolls to the services section on the same page', async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore services" }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(
    page.getByRole("heading", {
      name: "Software testing services built for shipping teams",
    }),
  ).toBeInViewport();
});

test("footer shows the contact email", async ({ page }) => {
  await page.goto("/");
  await expect(
    page
      .getByRole("contentinfo")
      .getByRole("link", { name: /gogreenlit@gmail\.com/ }),
  ).toHaveAttribute("href", "mailto:gogreenlit@gmail.com");
});

test("service explorer switches tabs and shows that service's example run", async ({
  page,
}) => {
  await page.goto("/");
  const tab = page.getByRole("tab", { name: "Playwright automation" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  const panel = page.getByRole("tabpanel");
  await expect(
    panel.getByRole("heading", { name: "Playwright test automation" }),
  ).toBeVisible();
  await expect(
    panel.getByRole("link", { name: /see playwright automation/i }),
  ).toHaveAttribute("href", "/software-testing-services/playwright-automation");
  await tab.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "API and data" })).toBeFocused();
});

test("the what-we-test strip is moving", async ({ page }) => {
  await page.goto("/");
  const track = page.locator(".lb-marquee-track");
  const a = await track.evaluate((e) => getComputedStyle(e).transform);
  await page.waitForTimeout(800);
  const b = await track.evaluate((e) => getComputedStyle(e).transform);
  expect(a).not.toBe(b);
});

test("services overview opens with the Palm Leaf hero and keeps its FAQ closed", async ({
  page,
}) => {
  await page.goto("/software-testing-services");
  await expect(
    page.getByRole("heading", { level: 1, name: /plug into your sprint/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "See what we test" }),
  ).toHaveAttribute("href", "#offerings");
  await expect(
    page.getByRole("button", { name: /what is included in outsourced/i }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("services picker swaps Playwright for Selenium", async ({ page }) => {
  await page.goto("/software-testing-services");
  const tab = page.getByRole("tab", { name: "Selenium" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("WebDriver driver");
});
