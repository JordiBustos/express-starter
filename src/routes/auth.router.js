const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/pepe", (req, res) => {
  res.send("pepe");
});

module.exports = router;
