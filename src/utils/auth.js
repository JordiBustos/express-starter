const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

/**
 * Generate access token
 * @param {User} user
 * @returns {String} access token
 */
function generateAccessToken(user) {
  const expirationDate = new Date((Date.now() / 1000 + 60 * 60) * 1000); // 1 hour from now
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return {
    token,
    expiresAt: expirationDate,
  };
}

/**
 * Generate hashed password
 * @param {String} password
 * @returns {String} hashed password
 */
function generateHashedPassword(password) {
  const saltValue = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(String(password), saltValue);

  return hashed;
}

/**
 * Get user by username
 * @param {String} username
 * @returns {User} user
 */
async function getUserByUsername(username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  generateHashedPassword,
  generateAccessToken,
  getUserByUsername,
};
