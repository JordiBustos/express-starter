import User from "../../models/User.model.js";

async function insertMockUser() {
  const mockUser = {
    username: "testuser",
    password: "testpassword",
    email: "test@test.com",
    role: "user",
    lastLogin: new Date(),
    isActive: false,
    displayName: "Test User",
    profileImage: "",
    isVerified: false,
  };

  try {
    await db.authenticate();
    await db.sync();
    const result = await User.findOrCreate(mockUser);
    console.log(`Inserted user with id: ${result.id}`);
  } catch (error) {
    console.error(error);
  }
}

export default insertMockUser;
