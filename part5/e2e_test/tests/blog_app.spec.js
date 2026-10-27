const { test, describe, beforeEach, expect } = require("@playwright/test");

describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Roman Robert",
        username: "robert",
        password: "password",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is displayed", async ({ page }) => {
    await expect(page.getByText("Log in")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
  });

  describe("Login", () => {
    test("Successfully logged in with correct credentials", async ({
      page,
    }) => {
      await page.getByLabel("username").fill("robert");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("hello robert")).toBeVisible();
    });

    test("Fails to log in with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("John");
      await page.getByLabel("password").fill("Wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });
});
