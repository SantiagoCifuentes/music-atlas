import { expect, test } from "@playwright/test";

test("a user can discover England through a Genre, Artist, and Album", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Music Atlas" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Explore England" }).click();
  await expect(page).toHaveURL("/countries/england");
  await expect(page.getByRole("heading", { name: "England" })).toBeVisible();

  await page.getByRole("link", { name: "Post-punk" }).click();
  await expect(page).toHaveURL("/genres/post-punk");
  await expect(page.getByRole("heading", { name: "Post-punk" })).toBeVisible();

  await page.getByRole("link", { name: "Joy Division" }).click();
  await expect(page).toHaveURL("/artists/joy-division");
  await expect(
    page.getByRole("heading", { name: "Joy Division" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Unknown Pleasures" }).click();
  await expect(page).toHaveURL("/albums/unknown-pleasures");
  await expect(
    page.getByRole("heading", { name: "Unknown Pleasures" }),
  ).toBeVisible();
  await expect(page.getByText("Joy Division", { exact: true })).toBeVisible();
});

test("shows loading and not-found states for catalog resources", async ({
  page,
}) => {
  let releaseCountryRequest: (() => void) | undefined;
  const countryRequestHeld = new Promise<void>((resolveHeld) => {
    releaseCountryRequest = resolveHeld;
  });

  await page.route("**/api/countries/england", async (route) => {
    await countryRequestHeld;
    await route.continue();
  });

  const countryNavigation = page.goto("/countries/england");
  await expect(page.locator('[role="status"]')).toContainText(
    "Loading Country",
  );
  releaseCountryRequest?.();
  await countryNavigation;
  await expect(page.getByRole("heading", { name: "England" })).toBeVisible();

  await page.goto("/albums/not-an-album");
  await expect(
    page.getByRole("heading", { name: "Album not found" }),
  ).toBeVisible();
});

test("shows an API error without treating it as a missing entry", async ({
  page,
}) => {
  await page.route("**/api/countries/england", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred.",
        },
      }),
    });
  });

  await page.goto("/countries/england");
  await expect(
    page.getByRole("heading", { name: "Unable to load Music Atlas" }),
  ).toBeVisible();
  await expect(page.getByText("We could not load this page.")).toBeVisible();
});
