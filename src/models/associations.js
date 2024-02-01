import Role, { hasMany } from "./models/Role.model.js";
import Token, { belongsTo } from "./models/Token.model.js";
import User, { hasOne, belongsTo as _belongsTo } from "./models/User.model.js";

hasOne(Token, { foreignKey: "userId", as: "token" });
belongsTo(User, { foreignKey: "userId", as: "user" });

hasMany(User, { foreignKey: "roleId", as: "users" });
_belongsTo(Role, { foreignKey: "roleId", as: "role" });
