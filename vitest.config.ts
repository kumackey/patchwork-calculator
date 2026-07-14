import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    mockReset: true,
    include: ["src/**/__tests__/**/*.{js,jsx,ts,tsx}", "src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  },
});
