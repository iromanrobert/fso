import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in</h2>
      <label htmlFor="">uername</label>
      <input
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <label htmlFor="">password</label>
      <input
        type="password"
        value={password}
        onChange={({ target }) => {
          setPassword(target.value);
        }}
      />
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      console.log(username, password);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  );
};

export default App;
