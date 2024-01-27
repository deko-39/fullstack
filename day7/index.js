import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "./user.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * process.env.PORT = 3000;
 * process.env.SECRET_KEY = "YOURSECRETKEYGOESHERE";
 */

const server = express();

server.use(express.json());

server.post("/register", async (req, res) => {
  try {
    // Validation
    const { username, password } = req.body;
    if (!username) throw new Error("Username is required!");
    if (!password) throw new Error("Password is required!");

    // Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store into database
    await UserModel.create({
      username,
      password: hashedPassword,
    });
    return res.status(200).send("Register successfully!");
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send(error.message);
  }
});

server.post("/login", async (req, res) => {
  try {
    // Validation
    const { username, password } = req.body;
    if (!username) throw new Error("Username is required!");
    if (!password) throw new Error("Password is required!");

    // Hashing + compare
    const user = await UserModel.findOne({ username });
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Username or password not correct!");
    }

    return res.status(200).send("Login successfully!");
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).send(error.message);
  }
});

mongoose.connect(process.env.MONGODB).then(() => {
  server.listen(process.env.PORT, () =>
    console.log("Server is running!", process.env.PORT)
  );
});
