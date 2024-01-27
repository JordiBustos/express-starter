const User = require("../models/User.model");
const {
  generateAccessToken,
  generateHashedPassword,
} = require("../utils/auth");
const bcrypt = require("bcrypt");

/**
 * Register user controller with username, password and email
 * @param {Request} req
 * @param {Response} res
 * @returns {String} json web token or error message
 */
async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ where: { username } });
    if (userExists) return res.status(400).send("User already exists");

    const user = await User.create({
      username,
      password: generateHashedPassword(password),
      email: email.toLowerCase(),
      role: "user",
    });

    const token = generateAccessToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
}

/**
 * login user controller with username and password
 * @param {Request} req
 * @param {Response} res
 * @returns {String} json web token or error message
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send("User not found");
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid password");

    const token = generateAccessToken(user);
    const expirationDate = new Date((Date.now() / 1000 + 60 * 60) * 1000); // 1 hour from now
    res.status(200).json({ token, expiresAt: expirationDate });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  register,
  login,
};
