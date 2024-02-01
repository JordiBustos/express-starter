const { DataTypes } = require("sequelize");
const db = require("../db");

const Role = db.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      required: true,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Role;
