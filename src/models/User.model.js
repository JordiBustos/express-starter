const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

db.sync()
  .then(() => console.log("Synced User model with database"))
  .catch((err) => console.log(err));

module.exports = User;
