var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var limiter = require("./constants/limiter");
require("dotenv").config();
const connectRedis = require("./utils/connectRedis");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth.router");
var rolesRouter = require("./routes/role.router");
var express = require("express");
const db = require("./db");
var cors = require("cors");

async function startCore(app, port) {
  app.use(limiter);
  app.use(cors());
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/roles", rolesRouter);

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

  db.authenticate();
  db.sync();
  const server = app.listen(port || process.env.PORT, async () => {
    try {
      app.locals.client = await connectRedis();
    } catch (err) {
      console.log(`Redis was not connect due to: ${err}`);
    }
  });

  return server;
}

module.exports = startCore;
