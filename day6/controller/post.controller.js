import express from "express";
import { PostModel } from "../model/post.model.js";
import { asyncCatch } from "..//utils/asyncCatch.js";
import { getPostValidation } from "../middleware/post/getpost.validation.js";

const postController = express.Router();

postController.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).send({
      data: posts,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

// Service - Handler
async function getOnePost(req, res, next) {
  try {
    const posts = await PostModel.findById(req.params.postId);
    res.status(200).send({
      data: posts,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

postController.get(
  "/:postId",
  asyncCatch(getPostValidation),
  asyncCatch(getOnePost)
);

postController.post("/", async (req, res) => {
  try {
    const { content, date } = req.body;
    const newPost = await PostModel.create({
      content,
      date,
    });
    res.status(201).send({
      data: newPost,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

postController.put("/:postId", async (req, res) => {
  try {
    const { content, date } = req.body;
    const newPost = await PostModel.create({
      content,
      date,
    });
    res.status(201).send({
      data: newPost,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

postController.delete("/:postId", async (req, res) => {
  try {
    const { content, date } = req.body;
    const newPost = await PostModel.create({
      content,
      date,
    });
    res.status(201).send({
      data: newPost,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

export { postController };
