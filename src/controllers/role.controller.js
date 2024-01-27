const Role = require("../models/Role");

async function createRole(req, res) {
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

async function getAllRoles(req, res) {
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

async function deleteRole(req, res) {
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

async function updateRole(req, res) {
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

async function getRoleByRoleName(req, res) {
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

module.exports = {
  createRole,
  getAllRoles,
  deleteRole,
  updateRole,
  getRoleByRoleName,
};
