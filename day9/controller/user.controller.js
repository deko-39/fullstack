import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { getAll, createUser } from "../service/user.service.js";

const userController = express.Router();

userController.get("/", asyncCatch(getAll));
userController.post("/", asyncCatch(createUser));

export { userController };
