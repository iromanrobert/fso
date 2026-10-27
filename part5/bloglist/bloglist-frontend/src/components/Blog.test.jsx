import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { describe, expect } from "vitest";

describe("<Blog />", () => {
  test(" component renders title and author, does not render url or number of likes by defaul", () => {
    const content = {
      title: "How to vitest",
      author: "Roman Robert",
      likes: 8,
      url: "https://jksadbnakljdasda",
      user: {
        username: "robert",
      },
    };

    render(<Blog blog={content} />);

    const title = screen.getByText("How to vitest");
    const author = screen.getByText("Roman Robert");

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(screen.getByText("8")).not.toBeVisible();
    expect(screen.getByText("https://jksadbnakljdasda")).not.toBeVisible();
    expect(screen.getByText("robert")).not.toBeVisible();
  });

  test("Component renders URL and number of likes when show details button is clicked", async () => {
    const content = {
      title: "How to vitest",
      author: "Roman Robert",
      likes: 8,
      url: "https://jksadbnakljdasda",
      user: {
        username: "robert",
      },
    };

    render(<Blog blog={content} />);

    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    expect(screen.getByText("https://jksadbnakljdasda")).toBeVisible();
    expect(screen.getByText("robert")).toBeVisible();
  });

  test("Creating a new blog form calls the evend handler with the right details when a new blog", async () => {
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    const titleInput = screen.getByLabelText("title");
    const authorInput = screen.getByLabelText("author");
    const urlInput = screen.getByLabelText("url");
    const createButton = screen.getByText("create");

    await user.type(titleInput, "Vitests are hard");
    await user.type(authorInput, "Roman Robert");
    await user.type(urlInput, "https://romanrobert.com");
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Vitests are hard");
    expect(createBlog.mock.calls[0][0].author).toBe("Roman Robert");
    expect(createBlog.mock.calls[0][0].url).toBe("https://romanrobert.com");
  });
});
