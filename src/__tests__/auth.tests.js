const {
  generateHashedPassword,
  generateAccessToken,
  getUserByUsername,
} = require("../utils/auth.js");
const bcrypt = require("bcrypt");

describe("Authentication Functions", () => {
  // Mock User object for testing
  const mockUser = { id: 1 };

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

  /*
  describe("getUserByUsername", () => {
    it("should get a user by username", async () => {
      const mockUsername = "testuser";
      const mockFindOne = jest.fn(() => Promise.resolve(mockUser));
      const mockUserModel = { findOne: mockFindOne };

      // Mock the User model
      jest.mock("../models/User.model", () => ({
        findOne: mockFindOne,
      }));

      const user = await getUserByUsername(mockUsername);
      expect(user).toEqual(mockUser);
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { username: mockUsername },
      });
    });

    it("should handle errors when getting a user by username", async () => {
      const mockUsername = "testuser";
      const mockFindOne = jest.fn(() => Promise.reject("Error"));
      const mockUserModel = { findOne: mockFindOne };

      // Mock the User model
      jest.mock("../models/User.model", () => ({
        findOne: mockFindOne,
      }));

      const user = await getUserByUsername(mockUsername);
      expect(user).toBeNull();
      expect(mockFindOne).toHaveBeenCalledWith({
        where: { username: mockUsername },
      });
    });
  });
  */
});
