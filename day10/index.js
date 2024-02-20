import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

dotenv.config();

// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./upload");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
//   },
// });
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

const server = express();

server.use(express.json());
server.use(morgan("combined")); // Logger

server.use("/index", (req, res) => res.status(200).send("Hello mindx!"));

server.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.status(201).send(req.file);
  } catch (error) {
    res.status(500).send("Error!");
  }
});

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );
