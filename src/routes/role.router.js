import { Router } from "express";
import {
  createRole,
  getRoleByRoleName,
  getAllRoles,
  updateRole,
  deleteRole,
} from "../controllers/role.controller.js";
import {
  validateRoleCreation,
  validateRoleName,
  validateRoleDelete,
} from "../middlewares/role.middleware.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const roleRouter = Router();
// roleRouter.use(verifyToken);

roleRouter.post("/create-role", validateRoleCreation(), createRole);
roleRouter.get("/get-all-roles", verifyToken, getAllRoles);
roleRouter.get("/get-role/:role", validateRoleName(), getRoleByRoleName);
roleRouter.delete("/delete-role/:id", validateRoleDelete(), deleteRole);
roleRouter.put("/update-role/:id", validateRoleCreation(), updateRole);

export default roleRouter;
