import { body, param } from "express-validator";
import { appConfig } from "../config/appConfig.js";
import Role from "../models/Role.model.js";

/**
 * Validate role creation POST request
 * @returns {Array} array of validation rules
 */
export function validateRoleCreation() {
  return [
    body("role").exists().withMessage("Role is required").trim().notEmpty(),
    body("permissions")
      .exists()
      .withMessage("Permissions is required")
      .isArray()
      .notEmpty(),
  ];
}

/**
 * Validate role delete DELETE request
 * @returns {Array} array of validation rules
 */
export function validateRoleDelete() {
  return [param("id").exists().withMessage("Id is required").trim().notEmpty()];
}

/**
 * Validate role name GET request
 * @returns {Array} array of validation rules
 */
export function validateRoleName() {
  return [
    param("role").exists().withMessage("Role is required").trim().notEmpty(),
  ];
}

/**
 * Validate that user has the required permissions based on the role
 *
 * @param {String || String[]} role - role to validate
 * @returns {Function} middleware function
 */
export function HasRole(role) {
  return function validatePermissions(req, res, next) {
    const username = req.session.username;
    const userRole = req.session.role;

    if (!username || !userRole) return res.status(401).send("Unauthorized");
    if (typeof role === "string") {
      if (userRole !== role) return res.status(403).send("Forbidden");
    }

    if (Array.isArray(role)) {
      if (!role.includes(userRole)) return res.status(403).send("Forbidden");
    }

    return next();
  };
}

/**
 * Validate that user has the required permissions based on the role
 * @param {String || String[]} permissions - permission to validate
 * @returns {Function} middleware function
 */
export function UserRoleHasPermission(permissions) {
  return async function validatePermissions(req, res, next) {
    if (!req.session.username || !req.session.role)
      return res.status(401).send("Unauthorized");
    if (!permissions || permissions.length === 0) return next();
    if (
      typeof permissions == "string" &&
      !appConfig.permissions.includes(permissions)
    )
      return res.status(400).send("Invalid permission");
    if (Array.isArray(permissions)) {
      const areAllValidsPermissions = permissions.every((permission) => {
        appConfig.permissions.includes(permission);
      });
      if (!areAllValidsPermissions)
        return res.status(400).send("Invalid permission");
    }

    const userRole = req.session.role;
    try {
      const role = await Role.findOne({ role: userRole });
      if (!role) return res.status(403).send("Forbidden");
      const hasPermissions = permissions.every((permission) => {
        return role.permissions.includes(permission);
      });
      if (!hasPermissions) return res.status(403).send("Forbidden");
      return next();
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send("Internal Server Error while validating permissions");
    }
  };
}
