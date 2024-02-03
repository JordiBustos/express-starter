import bcrypt from "bcrypt";
import { hashingConfig } from "../../../../config/hashingConfig.js";

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
