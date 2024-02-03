import jwt from "jsonwebtoken";
import { authConfig } from "../../../../config/authConfig.js";

export default function JWTProvider() {
  const secret = authConfig.providers.jwt.token.secret;
  const expiresIn = authConfig.providers.jwt.token.expiresIn;

  return {
    sign: (payload) =>
      jwt.sign(
        {
          id: payload.id,
        },
        secret,
        { expiresIn, algorithm: "HS256" },
      ),
    verify: (token, callback) =>
      jwt.verify(token, secret, { algorithm: "HS256" }, callback),
  };
}
