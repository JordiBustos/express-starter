import bcrypt from "bcrypt";
import { hashingConfig } from "../../../../config/hashingConfig.js";

/**
 * Bcrypt Provider for hashing and comparing data asynchronously
 */
export default function BcryptProvider() {
  const defaultSaltRounds = hashingConfig.providers.bcrypt.saltRounds;

  return {
    make: async (data, saltRounds = defaultSaltRounds) => {
      return await bcrypt.hash(data, saltRounds);
    },
    compare: async (data, hash) => {
      return await bcrypt.compare(data, hash);
    },
  };
}
