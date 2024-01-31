const {
  generateHashedPassword,
  generateAccessToken,
  getUserByUsername,
} = require("../utils/auth.js");
const bcrypt = require("bcrypt");
const { User } = require("../models/User.model");

// Mock User object for testing
const mockUser = {
  id: 1,
  username: "testuser",
  password: "testpassword",
  email: "test@test.com",
  role: "user",
  lastLogin: Date.now(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isActive: false,
  displayName: "Test User",
  profileImage: "",
  isVerified: false,
};

describe("Authentication Utils Functions", () => {
  describe("generateHashedPassword", () => {
    it("should generate a hashed password", () => {
      const password = "testpassword";
      const hashedPassword = generateHashedPassword(password);
      const isSimilar = bcrypt.compareSync(password, hashedPassword);
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(password);
      expect(isSimilar).toBe(true);
    });
  });

  describe("generateAccessToken", () => {
    it("should generate an access token", () => {
      const accessToken = generateAccessToken(mockUser);
      const expirationDate = new Date((Date.now() / 1000 + 60 * 60) * 1000);
      expect(accessToken).toHaveProperty("token");
      expect(accessToken).toHaveProperty("expiresAt");
      expect(accessToken.expiresAt - expirationDate).toBeLessThanOrEqual(5); // 5ms
    });
  });

  describe("getUserByUsername", () => {
    it("should get a user by username", async () => {
      User.findOne.mockResolvedValue(mockUser);
      const user = await getUserByUsername(mockUser.username);
      expect(user.username).toEqual(mockUser.username);
      expect(user.password).toEqual(mockUser.password);
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: mockUser.username },
      });
      expect(User.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
