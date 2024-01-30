import { UserModel } from "../model/user.model.js";

export const getMe = async (req, res, next) => {
  const user = await UserModel.findOne();
  res.status(200).send(user);
};
