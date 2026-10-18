import { expect, test, type Page } from "@playwright/test";

/**
 * Header, mega menus, mobile drawer, footer and breadcrumbs.
 *
 * Menus are opened with focus plus Enter, never hover(): Base UI turns
 * pointer events off on the trigger list while a menu is open (to stop
 * hover flicker), so Playwright's hover() actionability check cannot
 * reach a second trigger. Real mouse movement works, and Enter also
 * covers the keyboard path.
 */

/** The open mega menu panel, portaled outside the banner. */
const panel = (page: Page) => page.locator("[data-slot='mega-menu']");

async function openMenu(page: Page, name: string) {
  const trigger = page.getByRole("banner").getByRole("button", { name });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  return trigger;
}

test.describe("desktop header", () => {
  test.use({ viewport: { width: 1360, height: 820 } });

  test("shows the logo, four nav items and the booking button", async ({
    page,
  }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("link", { name: "goGreenlit" }),
    ).toBeVisible();
    for (const name of ["Services", "QA Consulting", "Blog"]) {
      await expect(header.getByRole("button", { name })).toBeVisible();
    }
    await expect(header.getByRole("link", { name: "About" })).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Book a call" }),
    ).toBeVisible();
    // The mobile menu button is not rendered at this width.
    await expect(
      header.getByRole("button", { name: "Open menu" }),
    ).toBeHidden();
  });

  test("Services menu lists all six services with descriptions", async ({
    page,
  }) => {
    await page.goto("/");
    await openMenu(page, "Services");
    for (const label of [
      "Manual Testing",
      "Playwright Automation",
      "Selenium Testing",
      "API Testing",
      "Regression Testing",
      "Mobile Testing",
    ]) {
      await expect(
        panel(page).getByRole("link", { name: new RegExp(label) }),
      ).toBeVisible();
    }
    await expect(
      panel(page).getByText("Exploratory sessions that find what scripts miss"),
    ).toBeVisible();
    await expect(
      panel(page).getByRole("link", { name: "All testing services" }),
    ).toHaveAttribute("href", "/software-testing-services");
  });

  test("choosing a service navigates to its page and closes the menu", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = await openMenu(page, "Services");
    await panel(page)
      .getByRole("link", { name: /Playwright Automation/ })
      .click();
    await expect(page).toHaveURL(
      /\/software-testing-services\/playwright-automation$/,
    );
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("Escape closes a menu and returns focus to its trigger", async ({
    page,
  }) => {
    await page.goto("/");
    const trigger = await openMenu(page, "QA Consulting");
    await expect(
      panel(page).getByRole("link", { name: /Embedded QA Team/ }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("Blog menu shows category tiles and the latest post", async ({
    page,
  }) => {
    await page.goto("/");
    await openMenu(page, "Blog");
    await expect(panel(page).getByText("Browse by topic")).toBeVisible();
    await expect(panel(page).getByText(/^Latest \//)).toBeVisible();
    await panel(page)
      .getByRole("link", { name: /Test Automation/ })
      .click();
    await expect(page).toHaveURL(/\/blog\?category=test-automation$/);
  });

  test("the current section is highlighted", async ({ page }) => {
    await page.goto("/qa-consulting/embedded-qa-team");
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("button", { name: "QA Consulting" }),
    ).toHaveClass(/bg-ink/);
    await expect(
      header.getByRole("button", { name: "Services" }),
    ).not.toHaveClass(/bg-ink/);
  });

  test("the pill floats and keeps following the page while scrolling", async ({
    page,
  }) => {
    await page.goto("/about");
    const pill = page
      .getByRole("banner")
      .getByRole("link", { name: "goGreenlit" });
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect(pill).toBeInViewport();
  });
});

test.describe("homepage hero", () => {
  test("is exactly one viewport tall, with the headline clear of the pill", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const hero = page.locator("main section").first();
    const box = await hero.boundingBox();
    expect(Math.round(box!.height)).toBe(900);
    const pill = await page
      .getByRole("banner")
      .getByRole("link", { name: "goGreenlit" })
      .boundingBox();
    const h1 = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(h1!.y).toBeGreaterThan(pill!.y + pill!.height);
  });
});

test.describe("mobile drawer", () => {
  test.use({ viewport: { width: 390, height: 844 } });
  // The drawer rows animate in, and a click landing mid-transition can
  // resolve to the wrong target (see CLAUDE.md gotcha #8).
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("the desktop nav is replaced by a menu button", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(
      header.getByRole("button", { name: "Open menu" }),
    ).toBeVisible();
    await expect(header.getByRole("button", { name: "Services" })).toBeHidden();
  });

  test("opens, expands a group, navigates and closes itself", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await drawer.getByRole("button", { name: "Services" }).click();
    await drawer.getByRole("link", { name: "Playwright Automation" }).click();
    await expect(page).toHaveURL(
      /\/software-testing-services\/playwright-automation$/,
    );
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("the close button dismisses it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test("a top-level link and the booking button are in the drawer", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.getByRole("dialog");
    await expect(drawer.getByRole("link", { name: /About/ })).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: "Book a call" }),
    ).toHaveAttribute("href", /calendly\.com/);
  });
});

test.describe("breadcrumbs and footer", () => {
  test.use({ viewport: { width: 1360, height: 820 } });

  test("breadcrumbs sit below the floating header", async ({ page }) => {
    await page.goto("/software-testing-services/manual-testing");
    const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
    await expect(crumbs.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(crumbs.locator("[aria-current='page']")).toBeVisible();
    const pill = await page
      .getByRole("banner")
      .getByRole("link", { name: "goGreenlit" })
      .boundingBox();
    const first = await crumbs
      .getByRole("link", { name: "Home" })
      .boundingBox();
    expect(first!.y).toBeGreaterThan(pill!.y + pill!.height);
  });

  test("the footer mirrors both service families and the company links", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(
      footer
        .getByRole("navigation", { name: "Services" })
        .getByRole("listitem")
        .getByRole("link"),
    ).toHaveCount(6);
    await expect(
      footer
        .getByRole("navigation", { name: "QA Consulting" })
        .getByRole("listitem")
        .getByRole("link"),
    ).toHaveCount(6);
    await expect(
      footer.getByRole("navigation", { name: "Company" }).getByRole("link", {
        name: "About",
      }),
    ).toBeVisible();
  });

  test("Back to top scrolls to the top", async ({ page }) => {
    await page.goto("/about");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page
      .getByRole("contentinfo")
      .getByRole("button", { name: /back to top/i })
      .click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
});
