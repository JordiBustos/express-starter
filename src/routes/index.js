import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const indexRouter = Router();

import User from "../models/User.model.js";

indexRouter.get("/", verifyToken, async (req, res) => {
  const user = await User.findOne({ where: { username: "admin" } });
  const roles = user.getRoles().then((roles) => {
    console.log(roles);
  });
  res.send(roles);
});

export default indexRouter;
