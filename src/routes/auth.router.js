const router = require("express").Router();
const {
  register,
  login,
  reestablishPassword,
  getAccountInformation,
  logout,
} = require("../controllers/auth.controller");
const {
  validateRegister,
  validateLogin,
  validateReestablishPassword,
  validateAccountInformation,
  validateLogout,
} = require("../middlewares/auth.middleware");

router.post("/register", validateRegister(), register);
router.post("/login", validateLogin(), login);
router.post(
  "/reestablish-password",
  validateReestablishPassword(),
  reestablishPassword
);
router.post("/logout", validateAccountInformation(), logout);
router.get("/get-user", validateAccountInformation(), getAccountInformation);

module.exports = router;
