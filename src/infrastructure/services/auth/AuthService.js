import { authConfig } from "../../../config/authConfig.js";
import JWTProvider from "./Providers/JWTProvider.js";

function AuthServiceFactory() {
  let provider;

  switch (authConfig.defaultProvider) {
    case "jwt":
      provider = JWTProvider();
      break;
    default:
      break;
  }

  return {
    sign: (payload) => {
      return provider.sign(payload);
    },
    verify: (token, callback = () => {}) => {
      return provider.verify(token, callback);
    },
  };
}

const AuthService = AuthServiceFactory();
export default AuthService;
