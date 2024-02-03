import { body, param } from "express-validator";
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
    console.log(req.session);
    console.log(username, userRole);

    if (!username || !userRole) return res.status(401).send("Unauthorized");
    console.log("aaaaaaaaaaaaaaaaaaaa");
    if (typeof role === "string") {
      if (userRole !== role) return res.status(403).send("Forbidden");
    }

    if (Array.isArray(role)) {
      if (!role.includes(userRole)) return res.status(403).send("Forbidden");
    }

    return next();
  };
}
