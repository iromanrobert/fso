const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../model/blog");
const User = require("../model/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  console.log(user);

  if (!body.title) {
    response.status(400).end();
  }

  if (!body.url) {
    response.status(400).end();
  }

  if (!user) {
    return response
      .status(400)
      .json({ error: "userId is missing or not valid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const likes = request.body.likes;
  const blog = await Blog.findById(request.params.id);

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!blog) {
    return response.status(404).end();
  }

  if (!user) {
    return response
      .status(400)
      .json({ error: "userId is missing or not valid" });
  }

  if (blog.user.toString() !== user.id) {
    return response.status(403).json({ error: "Not the owner of the blog" });
  }

  blog.likes = likes;
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

module.exports = blogRouter;
