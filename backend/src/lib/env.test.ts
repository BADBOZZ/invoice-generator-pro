import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const originalEnv = process.env;

describe("env schema", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      DATABASE_URL: "https://example.com",
      PORT: "5050",
      NODE_ENV: "test"
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("parses and coercers environment variables", async () => {
    const { env } = await import("./env.js");
    expect(env.PORT).toBe(5050);
    expect(env.DATABASE_URL).toBe("https://example.com");
    expect(env.NODE_ENV).toBe("test");
  });
});
