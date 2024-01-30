var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

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

app.get("/health", (req, res, next) => {
  res.send("Server is running...");
});

db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

db.sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
