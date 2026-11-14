import Blog from "../components/Blog";

const BlogList = ({ blogs, user, handleDelete }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </>
  );
};

export default BlogList;
