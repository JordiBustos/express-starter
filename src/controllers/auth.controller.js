const User = require("../models/User.model");
const { generateAccessToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

async function register(req, res) {
  try {
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ where: { username } });
    if (userExists) return res.status(400).send("User already exists");

    const saltValue = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(String(password), saltValue);

    const user = await User.create({
      username,
      password: hashed,
      email,
      role: "user",
    });

    const token = generateAccessToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).send("User not found");
    const isValidPassword = bcrypt.compareSync(password, user.password);
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
