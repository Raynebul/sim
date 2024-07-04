import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

//import mix from "vite-plugin-mix";

//const PORT = 3000;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PROJECT_MODE = env.VITE_PROJECT_MODE;
  let base_ = "/";
  if (PROJECT_MODE === `production`) {
    base_ = "/simulator/";
  }
  return {
    base: base_,
    plugins: [vue()],
    build: {
      target: "esnext", //browsers can handle the latest ES features
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
    },
    define: {
      //_global: {},
      global: {},
    },
    server: {
      port: 5173,
      //strictPort: true,
      //host: true,
      //origin: "http://0.0.0.0:5000",
    },
    preview: {
      port: 5173,
      strictPort: true,
      host: true,
      origin: "http://0.0.0.0:5173",
    },
  };
});
