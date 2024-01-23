import { isObjectIdOrHexString } from "mongoose";

function getPostValidation(req, res, next) {
  if (!isObjectIdOrHexString(req.params.postId))
    throw new Error("postId is required!");
}

export { getPostValidation };
