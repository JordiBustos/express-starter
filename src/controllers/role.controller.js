import Role from "../models/Role.model.js";

/**
 * Create role controller with role and permissions
 * @param {Request} req
 * @param {Response} res
 * @returns {String} 200 role created or error message
 */
export async function createRole(req, res) {
  const { role, permissions } = req.body;
  try {
    const newRole = await Role.create({
      role,
      permissions,
    });

    if (!newRole) {
      return res.status(500).json({ message: "Error creating role" });
    }

    res.status(201).json({ message: "Role created", newRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get all roles controller
 * @param {Request} req
 * @param {Response} res
 * @returns {String} 200 roles found or error message
 */
export async function getAllRoles(res) {
  try {
    const roles = await Role.findAll();

    if (!roles) {
      return res.status(404).json({ message: "No roles found" });
    }

    res.status(200).json({ message: "Roles found", roles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Delete role controller
 * @param {Request} req
 * @param {Response} res
 * @returns {String} 200 role deleted or error message
 */
export async function deleteRole(req, res) {
  const { id } = req.params;
  try {
    const role = await Role.destroy({ where: { id } });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted", role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Update role controller
 * @param {Request} req
 * @param {Response} res
 * @returns {String} 200 role updated or error message
 */
export async function updateRole(req, res) {
  const { id } = req.params;
  const { role, permissions } = req.body;
  try {
    const updatedRole = await Role.update(
      { role, permissions },
      { where: { id } }
    );

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role updated", updatedRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get role by role name controller
 * @param {Request} req
 * @param {Response} res
 * @returns {String} 200 role found or error message
 */
export async function getRoleByRoleName(req, res) {
  const { role } = req.params;
  try {
    const roleFound = await Role.findOne({ where: { role } });

    if (!roleFound) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role found", roleFound });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
