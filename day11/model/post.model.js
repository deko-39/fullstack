import mongoose, { Mongoose } from "mongoose";
import { UserModel, UserSchema } from "./user.model.js";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  // _id: ObjectId,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: UserModel, // Model ref
  },
  content: String,
  createdAt: String,
  updatedAt: String,
  isPublic: Boolean,
  name: String,
});

const PostModel = mongoose.model("post", PostSchema);

export { PostModel };
