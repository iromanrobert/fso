import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

test("<Blog /> component renders title and author, does not render url or number of likes by defaul", () => {
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
