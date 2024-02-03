import { UserModel } from "../model/user.model.js";

export const getAll = async (req, res, next) => {
  const user = await UserModel.find().populate("posts");
  res.status(200).send(user);
};

export const createUser = async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.status(201).send(user);
};
