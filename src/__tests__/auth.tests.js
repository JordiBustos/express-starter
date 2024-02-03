import express from "express";
import request from "supertest";
import { appConfig } from "../config/appConfig.js";
import HashService from "../infrastructure/services/hash/HashService.js";
import { jestSetup } from "../jest.setup.js";
import startCore from "../startCore.js";
import { generateAccessToken } from "../utils/auth.js";

let app, server;

beforeAll(async () => {
  app = express();
  server = await startCore(app, jestSetup.testEnvironmentOptions.APP_PORT);
});

afterAll(async () => {
  await server.close();
});

describe("Authentication Functions", () => {
  // Mock User object for testing
  const mockUser = { id: 1 };

  describe("generateHashedPassword", () => {
    it("should generate a hashed password", async () => {
      const password = "testpassword";
      const hashedPassword = await HashService.make(String(password));
      const isSimilar = await HashService.compare(password, hashedPassword);
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
  describe("GET /auth/get-user", () => {
    it("should return the user information", async () => {
      const result = await request(app).get(
        appConfig.version + "/auth/get-user/admin",
      );
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("username");
      expect(result.body).toHaveProperty("email");
      expect(result.body).toHaveProperty("role");
      expect(result.body).toHaveProperty("password");
    });
  });

  describe("POST /auth/login", () => {
    it("should return a 200 status code", async () => {
      const result = await request(app)
        .post(appConfig.version + "/auth/login")
        .send({
          username: "admin",
          password: "admin",
        });
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
      expect(result.body).toHaveProperty("expiresAt");
    });
  });

  describe("POST /auth/register and DELETE /auth/delete-user/:username", () => {
    it("should return a 201 status code", async () => {
      const username = "userdemo123";
      const result = await request(app)
        .post(appConfig.version + "/auth/register")
        .send({
          username: username,
          password: "testpassword",
          email: "very_unique@unique.com",
        });
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");

      const deleteResult = await request(app).delete(
        appConfig.version + "/auth/delete-user/" + username,
      );
      expect(deleteResult.status).toBe(200);
    });
  });
});
