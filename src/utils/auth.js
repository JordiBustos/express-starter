const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

module.exports = {
  generateAccessToken,
};
