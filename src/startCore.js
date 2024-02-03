import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import { createServer } from "node:http";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { appConfig } from "./config/appConfig.js";
import limiter from "./constants/limiter.js";
import db from "./db.js";
import authRouter from "./routes/auth.router.js";
import indexRouter from "./routes/index.js";
import rolesRouter from "./routes/role.router.js";
import { createRedisSession } from "./utils/connectRedis.js";

function getDirname() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}

async function startCore(app, port) {
  const server = createServer(app);
  const io = new Server(server);

  await createRedisSession(app);
  if (appConfig.runsBehindProxy) app.set("trust proxy", 1);

  if (appConfig.useLimiter) app.use(limiter);
  app.use(cors());
  app.use(logger("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  if (appConfig.useCompression) app.use(compression());

  const __dirname = getDirname();

  app.use(express.static(join(__dirname, "public")));
  app.use((_, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "script-src 'self' https://cdn.socket.io;",
    );
    next();
  });
  app.use(appConfig.version + "/", indexRouter);
  app.use(appConfig.version + "/auth", authRouter);
  app.use(appConfig.version + "/roles", rolesRouter);

  app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/views/chat/index.html");
  });

  io.on("connection", (socket) => {
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });

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

  server.listen(port || appConfig.port);

  return server;
}

export default startCore;
