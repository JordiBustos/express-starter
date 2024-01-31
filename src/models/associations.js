import Role, { hasMany } from "./models/Role.model.js";
import Token, { belongsTo as _belongsTo } from "./models/Token.model.js";
import User, { hasOne, belongsTo } from "./models/User.model.js";

hasOne(Token, { foreignKey: "userId", as: "token" });
_belongsTo(User, { foreignKey: "userId", as: "user" });

hasMany(User, { foreignKey: "roleId", as: "users" });
belongsTo(Role, { foreignKey: "roleId", as: "role" });
