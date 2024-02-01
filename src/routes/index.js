import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", verifyToken, (req, res) => {
  res.send("Hello world");
});

export default indexRouter;
