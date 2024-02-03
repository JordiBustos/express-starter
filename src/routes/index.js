import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", verifyToken, async (req, res) => {
  res.send("Welcome to the API");
});

export default indexRouter;
