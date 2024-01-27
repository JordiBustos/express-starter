const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * Generate access token
 * @param {User} user
 * @returns {String} access token
 */
function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
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

module.exports = {
  generateHashedPassword,
  generateAccessToken,
};
