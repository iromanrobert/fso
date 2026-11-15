import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Blog from "./Blog";

const blog = {
  id: "123",
  title: "How to vitest",
  author: "Roman Robert",
  likes: 8,
  url: "https://jksadbnakljdasda",
  user: {
    username: "robert",
    name: "Roman Robert",
  },
};

const creator = { username: "robert", name: "Roman Robert" };
const otherUser = { username: "someoneelse", name: "Someone Else" };

const renderBlog = (user, handlers = {}) =>
  render(
    <MemoryRouter initialEntries={["/blogs/123"]}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={[blog]}
              user={user}
              handleLike={handlers.handleLike ?? vi.fn()}
              handleDelete={handlers.handleDelete ?? vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe("<Blog /> single blog view", () => {
  describe("when the user is not logged in", () => {
    test("shows blog info and likes", () => {
      renderBlog(null);

      expect(
        screen.getByText(/How to vitest by Roman Robert/),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "https://jksadbnakljdasda" }),
      ).toBeInTheDocument();
      expect(screen.getByText("8")).toBeInTheDocument();
      expect(screen.getByText(/added by robert/)).toBeInTheDocument();
    });

    test("shows no buttons", () => {
      renderBlog(null);

      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("when logged in as a user who did not create the blog", () => {
    test("shows only the like button", () => {
      renderBlog(otherUser);

      expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "delete" }),
      ).not.toBeInTheDocument();
    });

    test("clicking like calls handleLike with the blog", async () => {
      const handleLike = vi.fn();
      const user = userEvent.setup();
      renderBlog(otherUser, { handleLike });

      await user.click(screen.getByRole("button", { name: "like" }));

      expect(handleLike).toHaveBeenCalledTimes(1);
      expect(handleLike).toHaveBeenCalledWith(blog);
    });
  });

  describe("when logged in as the blog's creator", () => {
    test("shows both the like and delete buttons", () => {
      renderBlog(creator);

      expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "delete" }),
      ).toBeInTheDocument();
    });

    test("clicking delete calls handleDelete with the blog id", async () => {
      const handleDelete = vi.fn();
      const user = userEvent.setup();
      renderBlog(creator, { handleDelete });

      await user.click(screen.getByRole("button", { name: "delete" }));

      expect(handleDelete).toHaveBeenCalledWith("123");
    });
  });
});
