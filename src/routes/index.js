import { verifyToken } from "../middlewares/auth.middleware.js";
import { HasRole } from "../middlewares/role.middleware.js";
import { Router } from "express";

const indexRouter = Router();

// example of usage of middleware
indexRouter.get("/", verifyToken, HasRole("admin"), async (_, res) => {
  res.send("Welcome to the API");
});

export default indexRouter;
