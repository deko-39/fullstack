import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";

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

  // TODO: _.omit(user, ["password"]
  res.status(200).send(user);
};

export const login = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await UserModel.findOne({
    username: username || { $ne: null }, // $ne = not equals
    email: email || { $ne: null }, // $ne = not equals
  });

  // TH0: body = {}
  /**
   * const user = await UserModel.findOne({});
   */
  // TH1: body = {username: "aaaa"}
  /**
   * const user = await UserModel.findOne({
      username: 'aaaa', // $ne = not equals
    });
  */
  // TH2: body = {email: "aaaa@gmail.com"}
  /**
   * const user = await UserModel.findOne({
      email: 'aaa@gmail.com', // $ne = not equals
    });
  */
  // TH3: body = {email: "aaaa@gmail.com", username: 'aaa'}
  /**
   * const user = await UserModel.findOne({
   *  username: 'aaa',
      email: 'aaa@gmail.com', // $ne = not equals
    });
  */

  const result = bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error("Username, email or password not correct!");
  }

  // Encode token (Access token + Refresh token)
  const payload = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    roles: user.roles,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "30s",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  return res.status(200).send({ accessToken, refreshToken });
};

export const refresh = (req, res, next) => {
  const { refreshToken } = req.body;
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

  // Phải bỏ 2 trường này
  const newPayload = _.omit(payload, ["exp", "iat"]); // expireAt vs issuedAt

  // Check lại user trong db -> newPayload = user như dòng 60
  const accessToken = jwt.sign(newPayload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "30s",
  });

  const newRefreshToken = jwt.sign(newPayload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  return res.status(200).send({ accessToken, refreshToken: newRefreshToken });
};
