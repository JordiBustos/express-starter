const { DataTypes } = require("sequelize");
const db = require("../db");

const Token = db.define(
  "Token",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      required: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      required: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      references: {
        model: "Users",
        key: "id",
      },
    },
    expirationAt: {
      type: DataTypes.DATE,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Token;
