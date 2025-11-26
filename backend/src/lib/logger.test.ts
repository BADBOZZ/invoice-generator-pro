import { beforeEach, describe, expect, it, vi } from "vitest";

describe("logger", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("creates a logger instance", async () => {
    process.env.NODE_ENV = "development";
    const { logger } = await import("./logger.js");
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
  });
});
