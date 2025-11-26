import request from "supertest";
import { describe, expect, it } from "vitest";
import type { PrismaClient } from "@prisma/client";
import { createServer } from "./server.js";

describe("health route", () => {
  it("returns ok", async () => {
    const prisma = {} as PrismaClient;
    const app = createServer(prisma);
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  it("exposes prometheus metrics", async () => {
    const prisma = {} as PrismaClient;
    const app = createServer(prisma);
    const response = await request(app).get("/metrics");
    expect(response.status).toBe(200);
    expect(response.text).toContain("http_request_duration_seconds");
  });
});
