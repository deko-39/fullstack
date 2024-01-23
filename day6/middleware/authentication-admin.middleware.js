// Header: x-admin
// Value: admin

// Check header "x-admin" trong request có bằng value "admin" không, nếu có thì pass sang route handler,
// nếu không có hoặc không đúng value thì trả 401
function authenticationAdmin(req, res, next) {
  try {
    const user = req.headers?.["x-admin"];
    if (!user || user !== "admin") {
      res.status(403).send({
        data: null,
        message: "Not admin",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
}

export { authenticationAdmin };
