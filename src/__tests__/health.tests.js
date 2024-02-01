import request from "supertest";
import express from "express";
import startCore from "../startCore.js";
import { testEnvironmentOptions } from "../jest.setup.js";


let app, server;

describe("Test /health and /redis-health", () => {
  beforeAll(async () => {
    app = express();
    server = await startCore(app, testEnvironmentOptions.APP_PORT + 1);
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
