import express from "express";
import { PostModel } from "../model/post.model.js";
import { faker } from "@faker-js/faker";
import { UserModel } from "../model/user.model.js";

const postController = express.Router();

// GET ALL
postController.get("/", async (req, res) => {
  try {
    // const { $limit, $skip } = req.query; // Query phân trang
    // limit = 10, skip = 0 pages -> lấy 10 resource đầu tiên trong csdl
    // limit = 10, skip = 1 pages -> lấy 10 resource sau khi skip 10

    // req.query = {isPublic: true, $skip: 0, $limit: 10}
    // findQuery = {isPublic: true}

    // if (findQuery.$gt) {
    //   findQuery = { ...findQuery, createAt: { $gt: "2024-02-24" } };
    // }

    // if (findQuery.$lt) {
    //   findQuery = { ...findQuery, createAt: { $lt: "2024-02-24" } };
    // }

    // delete req.query.$limit;
    // delete req.query.$skip;

    // localhost:3000/posts?$skip=0&$limit=10&$sort=DESC&creator=mindx
    let { $skip, $limit, $sort, creator, ...findQuery } = req.query; // Spread operator

    const total = await PostModel.countDocuments(); // Lấy total

    const posts = await PostModel.find(findQuery) // {name: "barba-cresco-carmen"}
      .populate("userId", { match: { userName: { $eq: creator } } }) // Tìm kiếm
      .skip(Number($limit) * Number($skip)) // Phân trang
      .limit(Number($limit)) // Phân trang
      .sort({ createdAt: $sort === "ASC" ? 1 : -1 }); // Sắp xếp tăng/giảm

    // const posts = await PostModel.aggregate([
    //   {$lookup},// populate
    //   {$match}, // userName = req.query.creator
    //   {$skip},
    //   {$limit}
    //   {$facet} || {$setWindowFields}
    // ]) --> Research

    /// Tối ưu sử dụng 1 query vào cơ sở dữ liệu để lấy cả data và tổng số resources - BTVN research

    console.log("posts :>> ", posts);
    // const result = posts.filter(
    //   (post) => post.userId.userName === findQuery.creator
    // );

    res.status(200).send({
      total,
      skip: Number($skip),
      limit: Number($limit),
      pages: Math.ceil(total / Number($limit)), // Math.floor()
      data: posts, // length = 10
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    res.status(200).send(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const createdAt = new Date().toISOString();
    // Validate input
    if (!userId) throw new Error("userId is required");
    // Lưu vào cơ sở dữ liệu
    const newPost = await PostModel.create({
      userId,
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      name: faker.lorem.slug(),
      isPublic: faker.datatype.boolean(),
      createdAt,
    });
    // Return status 201 + post document vừa được tạo trong mongodb
    res.status(201).send({
      data: newPost,
      message: "Post created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.put("/:postId", async (req, res) => {
  try {
    // Lấy data từ body
    const { userId, content, isPublic } = req.body;
    const updatedAt = new Date().toISOString();
    const postId = req.params.postId;
    // Validate data
    if (!userId) throw new Error("userId is required");
    if (!content) throw new Error("content is required");
    if (!isPublic) throw new Error("isPublic is required");
    // Update post bằng postId
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        userId,
        content,
        isPublic,
        updatedAt,
      },
      { new: true }
    );

    res.status(200).send({
      data: updatedPost,
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

postController.delete("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    await PostModel.findByIdAndDelete(postId);
    // res.status(204).send('')
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export { postController };
