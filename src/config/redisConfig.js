import "dotenv/config";

export const redisConfig = {
  redisUrl: process.env.REDIS_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisDatabases: process.env.REDIS_DATABASES,
  redisPassword: process.env.REDIS_PASSWORD,
};
