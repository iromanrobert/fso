import { useParams } from "react-router-dom";

const Blog = ({ blogs, user, handleLike, handleDelete }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return null;

  const isLoggedIn = user && blog.user?.username === user.username;

  return (
    <div className="blog-container">
      <h2>
        {blog.title} by {blog.author}
      </h2>

      <a href={blog.url}>{blog.url}</a>

      <div>
        <span className="likes-count">{blog.likes}</span> likes
        {isLoggedIn && <button onClick={() => handleLike(blog)}>like</button>}
      </div>

      <p>added by {blog.user?.username}</p>

      {isLoggedIn && (
        <button onClick={() => handleDelete(blog.id)}>delete</button>
      )}
    </div>
  );
};

export default Blog;
