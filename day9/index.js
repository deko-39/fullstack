import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import { userController } from "./controller/user.controller.js";
import { postController } from "./controller/post.controller.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(morgan("combined")); // Logger

server.use("/users", userController);
server.use("/posts", postController);

server.use("/index", (req, res) => res.status(200).send("Hello mindx!"));

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );

// https://mongoosejs.com/docs/populate.html
// CRUD - https://mongoosejs.com/docs/models.html
