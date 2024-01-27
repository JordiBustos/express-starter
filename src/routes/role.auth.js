const router = require("express").Router();
const {
  createRole,
  getRoleByRoleName,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");
const {
  verifyToken,
  validateRoleCreation,
} = require("../middlewares/auth.middleware");

router.post("/create-role", verifyToken(), validateRoleCreation(), createRole);
router.get("/get-all-roles", verifyToken(), getAllRoles);
router.get(
  "/get-role/:role",
  verifyToken(),
  validateRoleName(),
  getRoleByRoleName
);
router.delete(
  "/delete-role/:id",
  verifyToken(),
  validateRoleDelete(),
  deleteRole
);
router.put(
  "/update-role/:id",
  verifyToken(),
  validateRoleCreation(),
  updateRole
);
