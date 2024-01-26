const Router = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

indexRouter.get("/protected", verifyToken, (req, res) => {
  res.send("Protected route");
});

module.exports = indexRouter;
