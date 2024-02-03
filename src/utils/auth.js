import nodemailer from "nodemailer";
import AuthService from "../infrastructure/services/auth/AuthService.js";
import Role from "../models/Role.model.js";
import User from "../models/User.model.js";

/**
 * Generate access token
 * @param {User} user
 * @returns {String} access token
 */
export function generateAccessToken(user) {
  const expirationDate = new Date((Date.now() / 1000 + 60 * 60) * 1000); // 1 hour from now
  if (!user || !user.id) return null;
  const token = AuthService.sign(user);

  return {
    token,
    expiresAt: expirationDate,
  };
}

/**
 * Get user by username
 * @param {String} username
 * @returns {User} user
 */
export async function getUserByUsername(username) {
  if (!username || typeof username === "string") return null;
  try {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Role,
          as: "role",
        },
      ],
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendEmail(from, to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
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
