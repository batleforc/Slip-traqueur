import { fileURLToPath, URL } from "node:url";
import pkg from "./package.json";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import banner from "vite-plugin-banner";
//import { VitePWA } from "vite-plugin-pwa"; // https://vite-plugin-pwa.netlify.app/guide/pwa-minimal-requirements.html

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Slip-traqueur/",
  plugins: [
    vue(),
    vueJsx(),
    // VitePWA({
    //   registerType: "autoUpdate",
    // }),
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
