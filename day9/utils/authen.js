import jwt from "jsonwebtoken";

export const authen = async (req, res, next) => {
  // Xác thực người dùng qua token hoặc email + password ...
  const token = req.headers?.authorization?.split(" ")[1];
  // Token verify
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  } catch (error) {
    // Nếu token sai -> throw 401, 403
    // Nếu token hết hạn -> throw
  }
  // Gắn user vào request
  req.user = payload; // Thay cho user
  next();
};
