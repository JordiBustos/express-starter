const Router = require("express");
const { verifyToken } = require("../middlewares/auth.middleware");
const indexRouter = Router();

indexRouter.get("/", verifyToken, (req, res) => {
  res.send("Hello world");
});

module.exports = indexRouter;
