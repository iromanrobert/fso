const { test, describe, beforeEach, expect } = require("@playwright/test");

const login = async (page, username, password) => {
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("link", { name: "New blog", exact: true }).click();
  await page.getByLabel("title").fill(title);
  await page.getByLabel("author").fill(author);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "create", exact: true }).click();
};

const openBlog = async (page, title) => {
  await page.getByRole("link", { name: title }).click();
  await expect(page.locator(".blog-container")).toBeVisible();
};

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
    await page.getByRole("link", { name: "Login" }).click();
    await expect(page.getByText("Log in")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
  });

  describe("Login", () => {
    test("Successfully logged in with correct credentials", async ({
      page,
    }) => {
      await login(page, "robert", "password");

      await expect(page.getByRole("button", { name: "log out" })).toBeVisible();
    });

    test("Fails to log in with wrong credentials", async ({ page }) => {
      await login(page, "John", "Wrong");

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await login(page, "robert", "password");

      await createBlog(
        page,
        "Testing is wonderfull",
        "Roman Robert",
        "https://www.romanrobert.com",
      );
      await expect(
        page.getByRole("link", { name: "Testing is wonderfull" }),
      ).toBeVisible();
    });

    test("A new blog can be created", async ({ page }) => {
      await expect(
        page.getByText("Added Testing is wonderfull by Roman Robert, added"),
      ).toBeVisible();
    });

    test("Blog post can be liked", async ({ page }) => {
      await openBlog(page, "Testing is wonderfull");

      const likes = page.locator(".likes-count");

      const beforeLike = Number(await likes.innerText());

      await page.getByRole("button", { name: "like" }).click();

      await expect(likes).toHaveText(String(beforeLike + 1));
    });

    test("Blog post can be deleted by user", async ({ page }) => {
      await openBlog(page, "Testing is wonderfull");

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "delete" }).click();

      await expect(
        page.getByRole("link", { name: "Testing is wonderfull" }),
      ).not.toBeVisible();
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

      await openBlog(page, "Testing is wonderfull");
      await expect(page.getByRole("button", { name: "delete" })).toBeVisible();

      await page.getByRole("button", { name: "log out" }).click();

      await login(page, "other", "password");

      await openBlog(page, "Testing is wonderfull");
      await expect(page.getByRole("button", { name: "like" })).toBeVisible();
      await expect(page.getByRole("button", { name: "delete" })).toHaveCount(0);
    });

    test("Blogs are ordered by likes, most liked first", async ({ page }) => {
      const blogs = page.getByRole("link", { name: /Testing/ });

      const likeBlog = async (title, times) => {
        await openBlog(page, title);

        for (let i = 1; i <= times; i++) {
          await page.getByRole("button", { name: "like", exact: true }).click();
          await expect(page.locator(".likes-count")).toHaveText(String(i));
        }

        await page.goBack();
      };

      await createBlog(
        page,
        "Testing React Applications",
        "Roman Robert",
        "https://www.romanrobert.com",
      );

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
