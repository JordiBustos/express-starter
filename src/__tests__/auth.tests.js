const {
  generateHashedPassword,
  generateAccessToken,
} = require("../utils/auth.js");
const bcrypt = require("bcrypt");
const request = require("supertest");
const express = require("express");
const startCore = require("../startCore");

let app, server;

beforeAll(async () => {
  app = express();
  server = await startCore(app, 3001);
});

afterAll(async () => {
  await server.close();
});

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
});

describe("Authentication endpoints", () => {
  describe("POST /auth/login", () => {
    it("should return a 200 status code", async () => {
      const result = await request(app).post("/auth/login").send({
        username: "admin",
        password: "admin",
      });
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });
  });

  describe("POST /auth/register", () => {
    it("should return a 201 status code", async () => {
      const username = "userdemo";
      const result = await request(app).post("/auth/register").send({
        username: username,
        password: "testpassword",
        email: "unique@unique.com",
      });
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");

      const deleteResult = await request(app).delete(
        "/auth/delete-user/" + username
      );
      expect(deleteResult.status).toBe(200);
    });
  });
});
