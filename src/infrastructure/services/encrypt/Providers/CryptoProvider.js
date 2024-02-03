import { cryptoConfig } from "../../../../config/cryptoConfig.js";
let crypto;
try {
  crypto = await import("node:crypto");
} catch (err) {
  console.error("crypto support is disabled!");
}

export default function CryptoProvider() {
  if (!crypto) {
    return {
      encrypt: (data) => data,
      decrypt: (data) => data,
    };
  }

  const algorithm = cryptoConfig.providers.crypto.algorithm;
  const secret = cryptoConfig.providers.crypto.secret;
  const from = cryptoConfig.providers.crypto.from;
  const to = cryptoConfig.providers.crypto.to;

  return {
    encrypt: (data) => {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(secret),
        Buffer.from(iv),
      );
      let encrypted = cipher.update(data, from, to);
      encrypted += cipher.final(to);

      return iv.toString(to) + "__iv__" + encrypted.toString(to);
    },

    decrypt: (data) => {
      const parts = data.split("__iv__");
      if (parts.length !== 2) return data;
      const iv = Buffer.from(parts[0], to);
      const decipher = crypto.createDecipheriv(
        algorithm,
        secret,
        Buffer.from(iv),
      );
      let decrypted = decipher.update(Buffer.from(parts[1], to));
      decrypted += decipher.final(from);
      return decrypted.toString(from);
    },
  };
}
