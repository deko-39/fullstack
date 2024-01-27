import { UserModel } from "../model/user.model.js";

async function authorizationMiddleware(req, res, next) {
  try {
    // Dùng hàm của UserModel để kiểm tra username trong header có trong tệp user hay không
    if (!req.user.roles || !req.user.roles.includes("admin")) {
      return res.status(401).send({
        data: null,
        status: "failed",
        error: "Không có quyền admin",
      });
    }

    req.isAdmin = true;
    next();
  } catch (error) {
    res.status(500).send("Server error!");
  }
}

export { authorizationMiddleware };
