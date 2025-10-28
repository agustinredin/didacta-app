import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { pick } from "./src/utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  console.log(mode);

  let exposedVars = ["GOOGLE_CLIENT_ID", "API_URL", "APP_URL"];

  //vite prefix a todas las vars
  const envPicked = pick(loadEnv(mode, process.cwd(), ""), exposedVars);

  const envPickedObj = Object.fromEntries(
    exposedVars.map((key) => [`VITE_${key}`, envPicked[key]])
  );

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
    },
    envPrefix: "VITE_",
    define: {
      env: envPickedObj,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src/core"),
        "@domain": path.resolve(__dirname, "src/domain"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@ui": path.resolve(__dirname, "src/ui"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  };
});
