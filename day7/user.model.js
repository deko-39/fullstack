import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);

export { UserModel };
