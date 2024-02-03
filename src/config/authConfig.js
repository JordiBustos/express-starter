import "dotenv/config";

export const authConfig = {
  defaultProvider: "jwt",

  providers: {
    jwt: {
      token: {
        secret: process.env.JWT_SECRET || "supersecret123",
        expiresIn: "1h",
      },
    },
  },
};
