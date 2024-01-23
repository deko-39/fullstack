import express from "express";
import { UserModel } from "../model/user.model.js";
import { PostModel } from "../model/post.model.js";

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

export { postController };
