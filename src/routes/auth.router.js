import { Router } from "express";

const router = Router();

import {
  register,
  login,
  reestablishPassword,
  getAccountInformation,
  deleteUserByUsername,
  logout,
} from "../controllers/auth.controller.js";

import {
  validateRegister,
  validateLogin,
  validateReestablishPassword,
  validateAccountInformation,
  validateLogout,
} from "../middlewares/auth.middleware.js";

router.post("/register", validateRegister(), register);
router.post("/login", validateLogin(), login);
router.post(
  "/reestablish-password",
  validateReestablishPassword(),
  reestablishPassword
);
router.post("/logout", validateAccountInformation(), logout);
router.get(
  "/get-user/:username",
  validateAccountInformation(),
  getAccountInformation,
);
router.delete("/delete-user/:username", deleteUserByUsername);

export default router;
