import jwt from "jsonwebtoken";

export const authen = async (req, res, next) => {
  // Xác thực người dùng qua token hoặc email + password ...
  const token = req.headers?.authorization?.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  // Gắn user vào request
  req.user = payload; // Thay cho user
  next();
};
