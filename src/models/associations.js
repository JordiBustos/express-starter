const Role = require("./models/Role.model");
const Token = require("./models/Token.model");
const User = require("./models/User.model");

User.hasOne(Token, { foreignKey: "userId", as: "token" });
Token.belongsTo(User, { foreignKey: "userId", as: "user" });

Role.hasMany(User, { foreignKey: "roleId", as: "users" });
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
