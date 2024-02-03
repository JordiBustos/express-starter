import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { createRedisClient } from "../utils/connectRedis.js";

async function createLimiter() {
  const client = await createRedisClient();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    store: new RedisStore({
      sendCommand: (...args) => client.sendCommand(args),
    }),
    message:
      "Too many requests from this IP, please try again after 15 minutes",
    skipSuccessfulRequests: true,
    statusCode: 429,
  });

  return limiter;
}

const limiter = await createLimiter();
export default limiter;
