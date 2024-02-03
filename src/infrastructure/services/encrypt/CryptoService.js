import { cryptoConfig } from "../../../config/cryptoConfig.js";
import CryptoProvider from "./Providers/CryptoProvider.js";

function CryptoFactory() {
  let provider;

  switch (cryptoConfig.defaultProvider) {
    case "crypto":
      provider = CryptoProvider();
      break;
    default:
      provider = cryptoConfig.providers.crypto;
      break;
  }

  return {
    encrypt: (data) => provider.encrypt(data),
    decrypt: (data) => provider.decrypt(data),
  };
}

const CryptoService = CryptoFactory();
export default CryptoService;
