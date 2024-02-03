import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { HasRole } from "../middlewares/role.middleware.js";

const indexRouter = Router();

// example of usage of middleware
indexRouter.get("/", verifyToken, HasRole("admin"), async (_, res) => {
  res.send("Welcome to the API");
});

export default indexRouter;
