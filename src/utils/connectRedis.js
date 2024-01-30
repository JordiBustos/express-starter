const { createClient } = require("redis");

const createRedisClient = async () => {
  const client = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  client.on("error", (err) => {
    console.error(`Redis error: ${err}`);
  });

  const redisClient = await client.connect();
  return redisClient;
};

module.exports = createRedisClient;
