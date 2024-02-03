import { DataTypes } from "sequelize";
import db from "../db.js";
import User from "./User.model.js";

const Token = db.define(
  "Token",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
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
  },
  {
    timestamps: true,
  },
);

Token.belongsTo(User, { foreignKey: "userId", as: "user" });

db.sync();

export default Token;
