import { expect, test } from "@playwright/test";

test.describe("keyboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("the skip link is the first stop and moves focus into main", async ({
    page,
  }) => {
    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("main")),
    ).toBe(true);
  });

  test("the mobile drawer keeps focus inside while open", async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 800 });
    await page.goto("/about");
    const open = page.getByRole("button", { name: "Open menu" });
    await open.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const outside = await page.evaluate(() => {
        const el = document.activeElement;
        // Base UI's own focus guards and the body are not page content.
        if (!el || el === document.body) return false;
        if (el.getAttribute("data-base-ui-focus-guard") !== null) return false;
        if (el.tagName === "SPAN" && !el.textContent) return false;
        return !el.closest('[role="dialog"]');
      });
      expect(outside).toBe(false);
    }
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(open).toBeFocused();
    expect(await page.locator("[inert]").count()).toBe(0);
  });

  test("the contents pill opens onto the current section and Escape returns to it", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/blog/how-to-outsource-qa-testing");
    await page.evaluate(() => window.scrollTo(0, 1800));
    const pill = page.locator('button[aria-controls="toc-list"]');
    await expect(pill).toBeVisible();
    await pill.focus();
    await page.keyboard.press("Enter");
    expect(
      await page.evaluate(
        () => document.activeElement?.closest("#toc-list") !== null,
      ),
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(pill).toBeFocused();
    await expect(pill).toHaveAttribute("aria-expanded", "false");
  });
});
