import Router from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const indexRouter = Router();

indexRouter.get("/", verifyToken, (req, res) => {
  res.send("Hello world");
});

export default indexRouter;
