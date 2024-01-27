const jwt = require("jsonwebtoken");
const body = require("express-validator");

/**
 * Verify token
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {Object} response
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null)
    return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token.");
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).send("Invalid token.");
  }
}

/**
 * Validate register
 * @returns {Array} array of validation rules
 */
function validateRegister() {
  return [
    body("username").trim().notEmpty().escape(),
    body("password").trim().notEmpty().espace(),
    body("email").notEmpty().isEmail().escape(),
  ];
}

/**
 * Validate login
 * @returns {Array} array of validation rules
 */
function validateLogin() {
  return [
    body("username").trim().notEmpty().escape(),
    body("password").trim().notEmpty().espace(),
  ];
}

module.exports = {
  verifyToken,
  validateRegister,
  validateLogin,
};
