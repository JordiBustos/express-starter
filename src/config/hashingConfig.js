import "dotenv/config";

export const hashingConfig = {
  defaultProvider: "bcrypt",
  providers: {
    bcrypt: {
      saltRounds: 10,
    },
  },
};
