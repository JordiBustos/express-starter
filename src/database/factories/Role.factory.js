import Role from "../../models/Role.model.js";

export default async function createMockRole() {
  const roles = [
    {
      role: "admin",
      permissions: ["create", "read", "update", "delete"],
    },
    {
      role: "user",
      permissions: ["read"],
    },
  ];

  for (const role of roles) {
    try {
      await Role.findOrCreate(role);
      console.log(`Inserted role: ${role.role}`);
    } catch (error) {
      console.error(error);
    }
  }
}
