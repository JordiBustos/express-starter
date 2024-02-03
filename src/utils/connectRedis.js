import { createClient } from "redis";
import { redisConfig } from "../config/redisConfig.js";

const createRedisClient = async () => {
  const client = createClient({
    url: redisConfig.redisUrl,
  });

  client.on("error", (err) => {
    console.error(`Redis error: ${err}`);
  });

  await client.connect();

  return client;
};

export default createRedisClient;
