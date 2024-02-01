const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const nodemailer = require("nodemailer");
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

async function sendEmail(from, to, subject, text) {
  try {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  generateHashedPassword,
  generateAccessToken,
  getUserByUsername,
};
