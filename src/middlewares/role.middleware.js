const { body, params } = require("express-validator");

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
  return [
    params("id").exists().withMessage("Id is required").trim().notEmpty(),
  ];
}

function validateRoleName() {
  return [
    params("role").exists().withMessage("Role is required").trim().notEmpty(),
  ];
}

module.exports = {
  validateRoleCreation,
  validateRoleDelete,
  validateRoleName,
};
