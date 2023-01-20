import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc"; 

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    build: {
      outDir: "../API/wwwroot",
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
    },
  });
};
