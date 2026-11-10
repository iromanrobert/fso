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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("robert");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("Testing is wonderfull");
      await page.getByLabel("author").fill("Roman Robert");
      await page.getByLabel("url").fill("https://www.romanrobert.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.locator(".blog-container")).toHaveCount(1);
    });

    test("A new blog can be created", async ({ page }) => {
      await expect(
        page.getByText("Added Testing is wonderfull by Roman Robert, added"),
      ).toBeVisible();
    });

    test("Blog post can be liked", async ({ page }) => {
      const container = page
        .locator(".blog-container")
        .filter({ hasText: "Testing is wonderfull" });

      const likes = container.locator(".likes-count");

      await container.getByRole("button", { name: "show" }).click();

      const beforeLike = Number(await likes.innerText());

      await container.getByRole("button", { name: "like" }).click();

      await expect(likes).toHaveText(String(beforeLike + 1));
    });

    test("Blog post can be deleted by user", async ({ page }) => {
      const container = page
        .locator(".blog-container")
        .filter({ hasText: "Testing is wonderfull" });

      await container.getByRole("button", { name: "show" }).click();
      page.on("dialog", (dialog) => dialog.accept());
      await container.getByRole("button", { name: "delete" }).click();

      const header = await page
        .locator("h2")
        .filter({ hasText: "Testing is wonderfull" });

      await expect(header).not.toBeVisible();
    });

    test("Only the creator sees the delete button", async ({
      page,
      request,
    }) => {
      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "Other User",
          username: "other",
          password: "password",
        },
      });

      const container = page
        .locator(".blog-container")
        .filter({ hasText: "Testing is wonderfull" });

      await container.getByRole("button", { name: "show" }).click();
      await expect(
        container.getByRole("button", { name: "delete" }),
      ).toBeVisible();

      await page.getByRole("button", { name: "log out" }).click();

      await page.getByLabel("username").fill("other");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();

      await container.getByRole("button", { name: "show" }).click();
      await expect(
        container.getByRole("button", { name: "delete" }),
      ).toHaveCount(0);
    });

    test("Blogs are ordered by likes, most liked first", async ({ page }) => {
      const blogs = page.locator(".blog-container");

      const likeBlog = async (title, times) => {
        const container = blogs.filter({ hasText: title });

        for (let i = 1; i <= times; i++) {
          const showButton = container.getByRole("button", { name: "show" });
          if (await showButton.isVisible()) {
            await showButton.click();
          }

          await container
            .getByRole("button", { name: "like", exact: true })
            .click();
          await expect(container.locator(".likes-count")).toHaveText(String(i));
        }
      };

      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("Testing React Applications");
      await page.getByLabel("author").fill("Roman Robert");
      await page.getByLabel("url").fill("https://www.romanrobert.com");
      await page.getByRole("button", { name: "create", exact: true }).click();

      await expect(blogs).toHaveCount(2);

      await likeBlog("Testing React Applications", 2);
      await likeBlog("Testing is wonderfull", 1);

      await expect(blogs).toHaveText([
        /Testing React Applications/,
        /Testing is wonderfull/,
      ]);
    });
  });
});
