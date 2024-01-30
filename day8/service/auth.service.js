import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    roles: ["user"],
  });

  // TODO: remove password from user

  res.status(200).send(user);
};

export const login = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({
    username: username || { $ne: null },
    email: email || { $ne: null },
  });

  const result = bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error("Username, email or password not correct!");
  }

  // Encode token
  const payload = {
    username: user.username,
    email: user.email,
    roles: user.roles,
  };
  const token = jwt.sign(payload, process.env.JWT);
  console.log("token", token);

  return res.status(200).send("OK");
};
