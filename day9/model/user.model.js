import mongoose, { mongo } from "mongoose";
import { PostModel } from "./post.model.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    roles: [String],
    posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
  }
  // {
  //   collection: "user",
  // }
);

const UserModel = mongoose.model("user", UserSchema);

export { UserModel };
