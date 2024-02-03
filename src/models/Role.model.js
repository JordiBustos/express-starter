import { DataTypes } from "sequelize";
import db from "../db.js";

const Role = db.define(
  "role",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      field: "uuid",
      comment: "Role UUID",
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
      field: "id",
      comment: "Role ID",
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

export default Role;
