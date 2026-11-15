import { useState, useEffect, useRef } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Container } from "@mui/material";

import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Blog from "./components/Blog";

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
    try {
      await blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        showNotification(
          `Added ${returnedBlog.title} by ${returnedBlog.author}, added`,
          "success",
          navigate("/"),
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...b, likes: returnedBlog.likes } : b,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogPost = async (id) => {
    if (window.confirm("Do you want to delete")) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <nav>
        <Link to="/">Blogs</Link>
        {user && <Link to="/new-blog">New blog</Link>}
        {user ? (
          <button onClick={handleLogout}>log out</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Notification
        message={notificationMessage?.message}
        type={notificationMessage?.type}
      />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              user={user}
              handleDelete={deleteBlogPost}
              handleLike={handleLike}
            />
          }
        />
        <Route
          path="/"
          element={
            <BlogList user={user} blogs={blogs} handleDelete={deleteBlogPost} />
          }
        />

        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/new-blog"
          element={<BlogForm createBlog={handleBlogCreation} />}
        />
      </Routes>
    </Container>
  );
};

export default App;
