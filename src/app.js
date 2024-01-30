var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const connectRedis = require("./utils/connectRedis");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth.router");
var rolesRouter = require("./routes/role.router");

const db = require("./db");

var app = express();

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
