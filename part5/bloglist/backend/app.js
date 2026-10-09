const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

const app = express();

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);

mongoose.connect(config.mongoUrl, { family: 4 });

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
module.exports = app;
