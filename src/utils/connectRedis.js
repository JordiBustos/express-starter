const { createClient } = require("redis");

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

module.exports = createRedisClient;
