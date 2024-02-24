import express from "express";
import { UserModel } from "../model/user.model.js";

const userController = express.Router();

// GET -> localhost:3000/users
userController.get("/", (req, res) => {
  try {
    res.status(200).send("User controller");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.get("/:userId", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.post("/", async (req, res) => {
  try {
    const { userName, email, age, avatar } = req.body;
    const user = await UserModel.create({ userName, email, age, avatar });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.put("/:userId", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

userController.delete("/:userId", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export { userController };
