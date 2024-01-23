import express from "express";
import { UserModel } from "../model/user.model.js";

const userController = express.Router();

userController.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send({
      data: users,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

userController.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await UserModel.create({
      username,
      email,
      password,
      roles: ["user"],
    });
    res.status(201).send({
      data: newUser,
      status: "success",
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
});

export { userController };
