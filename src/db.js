import Sequelize from "sequelize";
import { dbConfig } from "./config/dbConfig.js";

const defaultProvider = dbConfig.defaultProvider;

const db = new Sequelize({
  database: dbConfig.providers[defaultProvider].database,
  username: dbConfig.providers[defaultProvider].username,
  password: dbConfig.providers[defaultProvider].password,
  host: dbConfig.providers[defaultProvider].host,
  dialect: dbConfig.defaultProvider,
});

export default db;
