import "dotenv/config";

export const dbConfig = {
  defaultProvider: "postgres",

  providers: {
    postgres: {
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      dialect: "postgres",
    },
  },
};
