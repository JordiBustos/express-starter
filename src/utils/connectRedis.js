import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { redisConfig } from "../config/redisConfig.js";
import { appConfig } from "../config/appConfig.js";

export const createRedisClient = async () => {
  const client = createClient({
    url: redisConfig.redisUrl,
  });

  client.on("error", (err) => {
    console.error(`Redis error: ${err}`);
  });

  await client.connect();

  return client;
};

export async function createRedisSession(app) {
  const client = await createRedisClient();
  app.locals.client = client;
  let redisStore = new RedisStore({
    client: client,
    prefix: appConfig.name,
  });

  app.use(
    session({
      store: redisStore,
      secret: appConfig.sessionSecret,
      resave: false,
      saveUninitialized: true,
      name: "redisSession",
      cookie: {
        secure: false,
        // domain: appConfig.allowedDomain,
        httpOnly: false,
        maxAge: 1000 * 60 * 10,
      },
    }),
  );
}
