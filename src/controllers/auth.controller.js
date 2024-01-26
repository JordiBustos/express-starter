const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const generateAccessToken = require("../utils/auth");

async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ where: { username } });
    console.log(userExists);
    if (userExists) return res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hash,
      email,
      role: "user",
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).send("Error creating user");
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid password");

    const token = generateAccessToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  register,
  login,
};
