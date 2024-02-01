const { verifyToken } = require("../middlewares/auth.middleware");
const indexRouter = require("express").Router();

indexRouter.get("/", verifyToken, (req, res) => {
  res.send("Hello world");
});

module.exports = indexRouter;
