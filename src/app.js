import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { limiter } from "./constants/limiter.js";
import "dotenv/config";
import connectRedis from "./utils/connectRedis.js";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.router.js";
import rolesRouter from "./routes/role.router.js";
import { db } from "./db.js";

var app = express();

app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
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

db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, async () => {
  try {
    app.locals.client = await connectRedis();
  } catch (err) {
    console.log(`Redis was not connect due to: ${err}`);
  }
  console.log(`Server is running at ${process.env.PORT}`);
});
