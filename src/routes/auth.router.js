import { Router } from "express";
import {
  deleteUserByUsername,
  getAccountInformation,
  login,
  logout,
  reestablishPassword,
  register,
} from "../controllers/auth.controller.js";
import {
  validateAccountInformation,
  validateLogin,
  validateLogout,
  validateReestablishPassword,
  validateRegister,
} from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/register", validateRegister(), register);
router.post("/login", validateLogin(), login);
router.post(
  "/reestablish-password",
  validateReestablishPassword(),
  reestablishPassword,
);
router.post("/logout", validateAccountInformation(), logout);
router.get(
  "/get-user/:username",
  validateAccountInformation(),
  getAccountInformation,
);
router.delete("/delete-user/:username", deleteUserByUsername);

export default router;
