import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "lcov"],
      thresholds: {
        lines: 60,
        functions: 60,
        statements: 60,
        branches: 50
      },
      exclude: ["src/index.ts"]
    }
  }
});
