import { isObjectIdOrHexString } from "mongoose";

function getPostValidation(req, res, next) {
  if (!isObjectIdOrHexString(req.params.postId))
    throw new Error("postId is required!");
}

function createPostValidation(req, res, next) {
  if (!req.isAdmin) {
    if (!content) throw new Error("No content found");
    if (!date) throw new Error("No date found");
    if (!req.user._id) throw new Error("No user found");
  }
  next();
}

export { getPostValidation, createPostValidation };
