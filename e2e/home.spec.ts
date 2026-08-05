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
