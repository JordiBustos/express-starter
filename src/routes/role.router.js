import { Router } from "express";
const roleRouter = Router();
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

roleRouter.post(
  "/create-role",
  verifyToken,
  validateRoleCreation(),
  createRole,
);
roleRouter.get("/get-all-roles", verifyToken, getAllRoles);
roleRouter.get(
  "/get-role/:role",
  verifyToken,
  validateRoleName(),
  getRoleByRoleName,
);
roleRouter.delete(
  "/delete-role/:id",
  verifyToken,
  validateRoleDelete(),
  deleteRole,
);
roleRouter.put(
  "/update-role/:id",
  verifyToken,
  validateRoleCreation(),
  updateRole,
);

export default roleRouter;
