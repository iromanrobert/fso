import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const blogRef = useRef();

  const showNotification = (message, type = "info") => {
    setNotificationMessage({ message, type });
    setTimeout(() => setNotificationMessage(null), 3000);
  };

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      showNotification("wrong username or password");
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleBlogCreation = async (blogObject) => {
    blogRef.current.handleVisibility();

    try {
      await blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showNotification(
          `Added ${returnedBlog.title} by ${returnedBlog.author}, added`,
          "success",
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <div>
          <p>hello {user.username}</p>
          <button onClick={handleLogout}>log out</button>

          <Togglable buttonLabel="create new blog" ref={blogRef}>
            <BlogForm createBlog={handleBlogCreation} />
          </Togglable>

          {blogList()}
        </div>
      )}
      <Notification
        message={notificationMessage?.message ?? null}
        type={notificationMessage?.type}
      />
    </div>
  );
};

export default App;
