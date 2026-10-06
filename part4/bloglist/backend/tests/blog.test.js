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

test("New blog post created succesfully", async () => {
  const newPost = {
    id: "5a422aa71b54a676234d121f1",
    title: "Learn how to create Super Tests",
    author: "Roman Robert",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 4,
  };

  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, helpers.initialBlogs.length + 1);
  assert(contents.includes("Learn how to create Super Tests"));
});

test("Default likes to 0 if likes property is missing", async () => {
  const newPost = {
    id: "5a422aa71b54a676234d121f1",
    title: "Learn how to create Super Tests",
    author: "Roman Robert",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body[response.body.length - 1].likes, 0);
});

describe("Creating a new blog with missing properties", () => {
  test("Fails with status 400 if title is missing", async () => {
    const newPost = {
      author: "Roman Robert",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    };

    await api.post("/api/blogs").send(newPost).expect(400);
  });

  test("Fails with status 400 if url is missing", async () => {
    const newPost = {
      title: "Learn how to create Super Tests",
      author: "Roman Robert",
    };

    await api.post("/api/blogs").send(newPost).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
