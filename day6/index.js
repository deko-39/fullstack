import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import { userController } from "./controller/user.controller.js";
import { postController } from "./controller/post.controller.js";
import { middlewareFactory } from "./middleware/authentication-factory.midlleware.js";
import { authorizationMiddleware } from "./middleware/authorization.middleware.js";

const server = express();

server.use(express.json());
server.use(morgan("combined"));

// Private route
// https://www.freecodecamp.org/news/higher-order-functions-in-javascript/ === fucntion factory
server.use(
  "/users",
  middlewareFactory("x-username"),
  authorizationMiddleware,
  userController
);
server.use(
  "/posts",
  middlewareFactory("x-username"),
  middlewareFactory("x-admin"),
  postController
);

// Public route
server.use("/index", (req, res) =>
  res.status(200).send("Hello to Express server!")
);

mongoose
  .connect("mongodb://localhost:27017/fullstack")
  .then(() => server.listen(3000, () => console.log("Server is running!")));
