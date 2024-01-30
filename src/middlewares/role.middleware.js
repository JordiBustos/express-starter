const { body, param } = require("express-validator");

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

function validateRoleDelete() {
  return [param("id").exists().withMessage("Id is required").trim().notEmpty()];
}

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
