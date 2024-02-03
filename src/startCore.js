import compression from "compression";
import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import session from "express-session";
import logger from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { appConfig } from "./config/appConfig.js";
import limiter from "./constants/limiter.js";
import db from "./db.js";
import authRouter from "./routes/auth.router.js";
import indexRouter from "./routes/index.js";
import rolesRouter from "./routes/role.router.js";
import createRedisClient from "./utils/connectRedis.js";

function getDirname() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname;
}

async function startCore(app, port) {
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

  if (appConfig.runsBehindProxy) app.set("trust proxy", 1);

  if (appConfig.useLimiter) app.use(limiter);
  app.use(cors());
  app.use(logger("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  if (appConfig.useCompression) app.use(compression());

  app.use(express.static(join(getDirname(), "public")));

  app.use(appConfig.version + "/", indexRouter);
  app.use(appConfig.version + "/auth", authRouter);
  app.use(appConfig.version + "/roles", rolesRouter);

  app.get("/health", (_, res) => {
    res.send("Server is running...");
  });

  app.get("/redis-health", async (req, res) => {
    try {
      const client = req.app.locals.client;
      await client.set("key", "value");
      const value = await client.get("key");
      if (value === "value") {
        await client.del("key");
        return res.status(200).send(`Redis is running (${value})`);
      }
    } catch (err) {
      res.status(500).send(`Redis is not running: ${err}`);
    }
  });

  app.use((_, res) => {
    res.status(404).send("Not found");
  });

  app.use((err, _, res) => {
    console.eror(err.stack);
    res.status(500).send("Internal server error");
  });

  db.authenticate();
  db.sync();

  const server = app.listen(port || appConfig.port, async () => {
    try {
      console.log("Server is running on port:", server.address().port);
    } catch (err) {
      console.log(`Redis was not connect due to: ${err}`);
    }
  });

  return server;
}

export default startCore;
