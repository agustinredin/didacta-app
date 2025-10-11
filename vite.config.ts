import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { pick } from "./src/utils/object.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  console.log(mode);

  var exposedVars = ["GOOGLE_CLIENT_ID"];

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
      },
    },
  };
});
