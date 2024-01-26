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

// BTVN
/**
 * - User controller CRUD
 * - User model {username, email, password}
 * - Post controller CRUD
 * - Post model {userId, content, date}
 * - Comment controller CRUD
 * - Comment model {postId, userId, content, date}
 * - Middleware authentication cho toàn bộ app với header x-username and inject req.user = user from user collection
 * - Middleware validation check role "user" trong req.user (1):
 *    + GET /posts/:postId thì yêu cầu req.user._id == post.userId (chỉ user tạo post mới xem được post)
 *    + POST /posts thì yêu cầu đủ trường của model post
 *    + PUT /posts/:postId thì yêu cầu user là người tạo post và đủ trường của model post
 *    + DELETE /posts/:postId thì yêu cầu user là người tạo post
 *
 *    + GET /comments/:commentId thì yêu cầu req.user._id == comment.userId (chỉ user tạo comment mới xem được comment)
 *    + POST /comments thì yêu cầu đủ trường của model comment
 *    + PUT /comments/:commentId thì yêu cầu user là người tạo comment và đủ trường của model comment
 *    + DELETE /comments/:commentId thì yêu cầu user là người tạo comment
 * - Middleware authorization check role "admin" trong req.user để truy cập vào CRUD user/post/comment mà không cần validation (1)
 */
