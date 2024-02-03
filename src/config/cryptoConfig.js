import "dotenv/config";

export const cryptoConfig = {
  defaultProvider: "crypto",

  providers: {
    crypto: {
      algorithm: "aes-256-cbc",
      secret: process.env.CRYPTO_SECRET || "supersecret123456789012345678901",
      from: "utf-8",
      to: "hex",
    },
  },
};
