const { test, describe, after, beforeEach } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");
const Blog = require("../model/blog");
const helpers = require("./test_helpers");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const blog of helpers.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("Get blog posts in correct JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Get correct ammount of blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helpers.initialBlogs.length);
});

test("Unique identifier of blog post is id", async () => {
  const response = await api.get("/api/blogs").expect(200);

  response.body.forEach((blog) => {
    const keys = Object.keys(blog);
    assert(keys.includes("id"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
