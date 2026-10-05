const { test, describe, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const assert = require("node:assert");
const listHelper = require("../utils/list_helpers");
const app = require("../app");

const api = supertest(app);

test("Get blog posts in correct JSON format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("Get correct ammount of blog posts", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 0);
});

after(async () => {
  await mongoose.connection.close();
});
