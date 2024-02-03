import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { createPost, deletePost } from "../service/post.service.js";

const postController = express.Router();

postController.post("/", asyncCatch(createPost));
postController.delete("/:postId", asyncCatch(deletePost));

export { postController };
