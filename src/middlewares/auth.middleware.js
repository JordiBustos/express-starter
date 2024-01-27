const jwt = require("jsonwebtoken");
const { body, param } = require("express-validator");
const Token = require("../models/Token.model");
const User = require("../models/User.model");

/**
 * Verify token continue to next route or return error response
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns {null || Object} null or error response
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null)
    return res.status(401).send("Access denied. No token provided.");

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token.");
      req.user = user;

      const isTokenValid = Token.findOne({
        where: { token, userId: user.id },
      });
      if (!isTokenValid || isTokenValid.expirationAt.before(new Date.now())) {
        User.update(
          { isActive: false },
          { where: { username: user.username } }
        );
        return res.status(403).send("Invalid token.");
      }

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
    body("password")
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/\d/)
      .withMessage("Password must contain a number.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase letter.")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase letter.")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character."),
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
    body("password").trim().notEmpty().escape(),
  ];
}

/**
 * Validate reestablish password
 * @returns {Array} array of validation rules
 */
function validateReestablishPassword() {
  return [
    body("email").notEmpty().isEmail().escape(),
    body("password").trim().notEmpty().escape(),
  ];
}

/**
 * Validate account information
 * @returns {Array} array of validation rules
 */
function validateAccountInformation() {
  return [param("username").trim().notEmpty().escape()];
}

function validateLogout() {
  return [body("username").trim().notEmpty().escape()];
}

module.exports = {
  verifyToken,
  validateRegister,
  validateLogin,
  validateReestablishPassword,
  validateAccountInformation,
  validateLogout,
};
