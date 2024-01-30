import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { getMe } from "../service/user.service.js";

const userController = express.Router();

userController.get("/me", asyncCatch(getMe));

export { userController };
