import { createClient } from "redis";

const createRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    console.error(`Redis error: ${err}`);
  });

  await client.connect();

  return client;
};

export default createRedisClient;
