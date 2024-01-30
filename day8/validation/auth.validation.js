export const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) throw new Error("Username is required!");
  if (!email) throw new Error("Email is required!");
  if (!password) throw new Error("Password is required!");
  next();
};

export const validateLogin = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username && !email) throw new Error("Username or email is required!");
  if (!password) throw new Error("Password is required!");
  next();
};

export const validateRefresh = (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new Error("Refresh token is required!");
  next();
};
