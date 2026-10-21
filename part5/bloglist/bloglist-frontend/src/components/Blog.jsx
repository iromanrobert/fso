import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const displayDetails = { display: visible ? "" : "none" };

  const handleVisibility = () => setVisible(!visible);
  const buttonText = visible ? "hide" : "show";

  return (
    <div>
      {blog.title} {blog.author}{" "}
      <button onClick={handleVisibility}>{buttonText}</button>
      <ul style={displayDetails}>
        <li>{blog.url}</li>
        <li>
          {blog.likes} <button>like</button>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
