const jwt = require("jsonwebtoken");

/**
 * Generate access token
 * @param {Object} user
 * @returns {String} access token
 */
function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
}

module.exports = {
  generateAccessToken,
};
