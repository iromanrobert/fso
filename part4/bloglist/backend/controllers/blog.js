const blogRouter = require("express").Router();
const { request } = require("../app");
const Blog = require("../model/blog");
const User = require("../model/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({});

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

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
    likes,
  });

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

module.exports = blogRouter;
