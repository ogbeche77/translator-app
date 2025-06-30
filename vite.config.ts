import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    ...(mode === "test" ? [] : [reactRouter()]),
    tsconfigPaths(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
}));
