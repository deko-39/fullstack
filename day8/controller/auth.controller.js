import express from "express";
import { asyncCatch } from "../utils/trycatch.js";
import { login, register } from "../service/auth.service.js";
import {
  validateLogin,
  validateRegister,
} from "../validation/auth.validation.js";

const authController = express.Router();

// Path -> Validation middleware -> Logic -> Model (Controller structure)
authController.post(
  "/register",
  asyncCatch(validateRegister),
  asyncCatch(register)
);
authController.post("/login", asyncCatch(validateLogin), asyncCatch(login));

export { authController };
