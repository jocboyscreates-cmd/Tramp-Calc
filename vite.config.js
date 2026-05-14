import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({

  plugins: [

    react(),

    sitemap({

  hostname:
    "https://tramp-calc.vercel.app",

  dynamicRoutes: [
    "/",
    "/trampoline",
    "/double-mini",
    "/tumbling",
    "/games",
    "/random-routine-game",
    "/connections-game",
  ],

  exclude: [
    "/google36853433b248140f",
  ],

}),

  ],

});