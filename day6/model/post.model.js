import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: String,
  date: String,
});

const PostModel = mongoose.model("post", PostSchema);

export { PostModel };
