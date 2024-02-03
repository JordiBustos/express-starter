import { hashingConfig } from "../../../config/hashingConfig.js";
import BcryptProvider from "./Providers/BcryptProvider.js";

function HashServiceConstructor() {
  let provider;

  switch (hashingConfig.defaultProvider) {
    case "bcrypt":
      provider = BcryptProvider();
      break;

    default:
      break;
  }
  return {
    make: async (data, saltRounds) => {
      return await provider.make(data, saltRounds);
    },

    compare: async (data, hash) => {
      return await provider.compare(data, hash);
    },
  };
}

const HashService = HashServiceConstructor();
export default HashService;
