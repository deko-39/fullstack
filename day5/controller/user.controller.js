import express from "express";

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

userController.post("/", (req, res) => {
  try {
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
