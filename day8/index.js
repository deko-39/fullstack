import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

import { userController } from "./controller/user.controller.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(morgan("combined"));

server.use("/users", userController);

server.use("/index", (req, res) => res.status(200).send("Hello mindx!"));

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );
