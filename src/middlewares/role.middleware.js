const { body, param } = require("express-validator");

/**
 * Validate role creation POST request
 * @returns {Array} array of validation rules
 */
function validateRoleCreation() {
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
function validateRoleDelete() {
  return [param("id").exists().withMessage("Id is required").trim().notEmpty()];
}

/**
 * Validate role name GET request
 * @returns {Array} array of validation rules
 */
function validateRoleName() {
  return [
    param("role").exists().withMessage("Role is required").trim().notEmpty(),
  ];
}

module.exports = {
  validateRoleCreation,
  validateRoleDelete,
  validateRoleName,
};
