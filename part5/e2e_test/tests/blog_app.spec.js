const { test, describe, beforeEach, expect } = require("@playwright/test");

describe("Blog App", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is displayed", async ({ page }) => {
    await expect(page.getByText("Log in")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
  });
});
