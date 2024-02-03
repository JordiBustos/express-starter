import HashService from "../infrastructure/services/hash/HashService.js";
import Token from "../models/Token.model.js";
import User from "../models/User.model.js";
import { generateAccessToken, getUserByUsername } from "../utils/auth.js";
import CryptoService from "../infrastructure/services/encrypt/CryptoService.js";
/**
 * Register user controller with username, password and email
 * @param {Request} req
 * @param {Response} res
 * @returns {String} json web token or error message
 */
export async function register(req, res) {
  const { username, password, email } = req.body;

  try {
    const userExists = await getUserByUsername(username);
    if (userExists) return res.status(400).send("User already exists");
    req.session.role = "user";
    req.session.username = username;

    const hashedPassword = await HashService.make(String(password));
    const encryptedEmail = CryptoService.encrypt(String(email).toLowerCase());

    const user = await User.create({
      username,
      password: hashedPassword,
      email: encryptedEmail,
      roleId: 2, // default role
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
export async function login(req, res) {
  const { username, password } = req.body;
  req.session.username = username;
  try {
    const user = await getUserByUsername(username);
    if (user === null) return res.status(404).send("User not found");
    const isValidPassword = await HashService.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid password");

    await User.update(
      { lastLogin: new Date(), isActive: true },
      { where: { username } },
    );

    req.session.role = user.role.role;

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
export async function logout(req, res) {
  try {
    const { username } = req.user;
    await User.update({ isActive: false }, { where: { username } });
    await Token.destroy({ where: { userId: req.user.id } });
    req.session.destroy();
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
export async function reestablishPassword(req, res) {
  const { email, password } = req.body;
  const encryptedEmail = CryptoService.encrypt(String(email).toLowerCase());

  try {
    const user = await User.findOne({ where: { email: encryptedEmail } });
    if (!user) return res.status(404).send("User not found");

    const hashedPassword = await HashService.make(String(password));
    await User.update(
      { password: hashedPassword },
      { where: { email: encryptedEmail } },
    );

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
export async function getAccountInformation(req, res) {
  const username = req.params.username;

  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}

export async function deleteUserByUsername(req, res) {
  const username = req.params.username;
  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(404).send("User not found");
    await User.destroy({ where: { username } });
    return res.status(200).send("User deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
}
