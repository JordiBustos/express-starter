const express = require("express");
const router = express.Router();
const {
  register,
  login,
  reestablishPassword,
  getAccountInformation,
} = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
  validateReestablishPassword,
  validateAccountInformation,
} = require("../middlewares/auth.middleware");

router.post("/register", validateRegister(), register);
router.post("/login", validateLogin(), login);
router.post(
  "/reestablish-password",
  validateReestablishPassword(),
  reestablishPassword
);
router.get("/get-user", validateAccountInformation(), getAccountInformation);

module.exports = router;
