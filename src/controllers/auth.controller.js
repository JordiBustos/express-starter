import { User } from "../models/User.model.js";
import Token from "../models/Token.model.js";
import {
  generateAccessToken,
  generateHashedPassword,
  getUserByUsername,
} from "../utils/auth.js";
import { compareSync } from "bcrypt";

/**
 * Register user controller with username, password and email
 * @param {Request} req
 * @param {Response} res
 * @returns {String} json web token or error message
 */
async function register(req, res) {
  try {
    const { username, password, email } = req.body;

    const userExists = await getUserByUsername(username);
    if (userExists) return res.status(400).send("User already exists");

    const user = await User.create({
      username,
      password: generateHashedPassword(password),
      email: email.toLowerCase(),
      role: "user",
      isActive: true,
      isVerified: false,
      profileImage: "",
      displayName: "",
      lastLogin: new Date(),
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    const response = generateAccessToken(user);
    await Token.create({
      token: response.token,
      userId: user.id,
    });
    res.status(201).json(response);
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
    const user = await getUserByUsername(username);
    if (!user) return res.status(404).send("User not found");
    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid password");

    await User.update(
      { lastLogin: new Date(), isActive: true },
      { where: { username } },
    );

    const response = generateAccessToken(user);
    await Token.create({
      token: response.token,
      userId: user.id,
    });
    res.cookie("token", response.token, {
      httpOnly: true,
      expires: response.expirationDate,
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

/**
 * Logout user controller. Remove all tokens in the user Tokens, clear token cookie, and set isActive to false.
 * @param {Request} req
 * @param {Response} res
 * retrun {Response} 200 if logout is successful else 500
 */
async function logout(req, res) {
  try {
    const { username } = req.user;
    await User.update({ isActive: false }, { where: { username } });
    await Token.destroy({ where: { userId: req.user.id } });
    res.clearCookie("token");
    res.status(200).send("Logout successful");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

/**
 * TODO add email service to validate code and continue
 * Allows user to reestablish password with email
 * @param {Request} req
 * @param {Response} res
 */
async function reestablishPassword(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send("User not found");

    const hashedPassword = generateHashedPassword(password);
    await User.update({ password: hashedPassword }, { where: { email } });

    const response = generateAccessToken(user);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

/**
 * Get user account information based on username query param
 * @param {Request} req
 * @param {Response} res
 */
async function getAccountInformation(req, res) {
  const { username } = req.query;

  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

export { register, login, reestablishPassword, getAccountInformation, logout };
