const roleRouter = require("express").Router();
const {
  createRole,
  getRoleByRoleName,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");
const {
  validateRoleCreation,
  validateRoleName,
  validateRoleDelete,
} = require("../middlewares/role.middleware");

const { verifyToken } = require("../middlewares/auth.middleware");

roleRouter.post(
  "/create-role",
  verifyToken,
  validateRoleCreation(),
  createRole
);
roleRouter.get("/get-all-roles", verifyToken, getAllRoles);
roleRouter.get(
  "/get-role/:role",
  verifyToken,
  validateRoleName(),
  getRoleByRoleName
);
roleRouter.delete(
  "/delete-role/:id",
  verifyToken,
  validateRoleDelete(),
  deleteRole
);
roleRouter.put(
  "/update-role/:id",
  verifyToken,
  validateRoleCreation(),
  updateRole
);

module.exports = roleRouter;
