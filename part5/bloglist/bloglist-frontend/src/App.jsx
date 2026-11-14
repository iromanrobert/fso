import { useState, useEffect, useRef } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();

  const blogRef = useRef();

  const showNotification = (message, type = "info") => {
    setNotificationMessage({ message, type });
    setTimeout(() => setNotificationMessage(null), 3000);
  };

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
      navigate("/");
    } catch (error) {
      showNotification("wrong username or password");
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/");
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

  const deleteBlogPost = async (id) => {
    if (window.confirm("Do you want to delete")) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <nav>
        <Link to="/">Blogs</Link>
        {user ? (
          <button onClick={handleLogout}>log out</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList user={user} blogs={blogs} handleDelete={deleteBlogPost} />
          }
        />

        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      </Routes>
    </>
    // <div>
    //   {!user && }
    //   {user && (
    //     <div>
    //       <p>hello {user.username}</p>
    //

    //       <Togglable buttonLabel="create new blog" ref={blogRef}>
    //         <BlogForm createBlog={handleBlogCreation} />
    //       </Togglable>

    //     </div>
    //   )}
    //   <Notification
    //     message={notificationMessage?.message ?? null}
    //     type={notificationMessage?.type}
    //   />
    // </div>
  );
};

export default App;
