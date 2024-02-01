import express from "express";
import request from "supertest";
import { jestSetup } from "../jest.setup.js";
import startCore from "../startCore.js";

let app, server;

describe("Test /health and /redis-health", () => {
  beforeAll(async () => {
    app = express();
    server = await startCore(
      app,
      jestSetup.testEnvironmentOptions.APP_PORT + 1,
    );
  });

  afterAll(async () => {
    await server.close();
  });

  describe("Health check on /health", () => {
    it("health should be okay", async () => {
      const response = await request(app).get("/health");
      expect(response.status).toBe(200);
    });
  });

  describe("Health check on /redis-health", () => {
    it("redis-health should be okay", async () => {
      const response = await request(app).get("/redis-health");
      expect(response.status).toBe(200);
    });
  });
});
