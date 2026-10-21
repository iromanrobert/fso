import { useState } from "react";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const displayDetails = { display: visible ? "" : "none" };

  const handleVisibility = () => setVisible(!visible);
  const buttonText = visible ? "hide" : "show";

  const handleLike = async (id) => {
    const previousLikes = likes;
    setLikes(previousLikes + 1);

    const changedBlog = { ...blog, likes: previousLikes + 1 };

    try {
      const returnedBlog = await blogService.update(id, changedBlog);
      setLikes(returnedBlog.likes);
    } catch (error) {
      setLikes(previousLikes);
      console.log(error);
    }
  };

  return (
    <div>
      {blog.title} {blog.author}{" "}
      <button onClick={handleVisibility}>{buttonText}</button>
      <ul style={displayDetails}>
        <li>{blog.url}</li>
        <li>
          {likes} <button onClick={() => handleLike(blog.id)}>like</button>
        </li>
        <li>{blog.user.username}</li>
      </ul>
    </div>
  );
};

export default Blog;
