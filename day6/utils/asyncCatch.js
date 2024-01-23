function asyncCatch(fnc) {
  return async function (req, res, next) {
    try {
      await fnc(req, res, next);
      return next();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  };
}

export { asyncCatch };
