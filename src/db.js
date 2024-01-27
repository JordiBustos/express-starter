const Sequelize = require("sequelize");
const User = require("./models/User.model");
const Token = require("./models/Token.model");

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
});

db.authenticate()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

User.hasOne(Token, { foreignKey: "userId", as: "token" });
Token.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = db;
