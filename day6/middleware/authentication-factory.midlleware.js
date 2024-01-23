import { UserModel } from "../model/user.model.js";

const middlewareFactory = function (headerName) {
  return async function (req, res, next) {
    if (headerName === "x-username") {
      try {
        const username = req.headers?.["x-username"];
        // Dùng hàm của UserModel để kiểm tra username trong header có trong tệp user hay không
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(403).send({
            data: null,
            status: "failed",
            error: "Xác thực không thành công",
          });
        }

        req.user = user;

        return next();
      } catch (error) {
        console.log(error);
        return res.status(500).send("Server error!");
      }
    }

    if (headerName === "x-admin") {
      try {
        const user = req.headers?.["x-admin"];
        if (!user || user !== "admin") {
          return res.status(403).send({
            data: null,
            message: "Not admin",
            success: false,
          });
        }

        req.user = user;

        return next();
      } catch (error) {
        console.log(error);
        res.status(500).send("Server error!");
      }
    }

    next();
  };
};

export { middlewareFactory };
