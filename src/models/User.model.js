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
    username: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

db.sync()
  .then(() => console.log("Synced User model with database"))
  .catch((err) => console.log(err));

module.exports = User;
