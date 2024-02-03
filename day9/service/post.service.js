import { PostModel } from "../model/post.model.js";
import { UserModel } from "../model/user.model.js";

export const createPost = async (req, res, next) => {
  const { content, createdAt, isPublic, userId } = req.body;
  const post = await PostModel.create({ content, createdAt, isPublic });
  await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });
  res.status(201).send(post);
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const existingPost = await PostModel.findById(postId);
  if (!existingPost) {
    res.status(400).send("No post found");
  }
  await UserModel.findByIdAndUpdate("65be3f6bd2b9fe91830aebcc", {
    $pull: { posts: postId },
  }); // Xoá quan hệ
  await PostModel.findByIdAndDelete(postId); // Xoá collection chính
  res.sendStatus(204);
};
