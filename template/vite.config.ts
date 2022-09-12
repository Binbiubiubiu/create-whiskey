import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import { resolve } from "node:path";

let { name: pkgName } = require("./package.json");

const line2Camel = (s: string) => {
  if (s.length === 0) return "";
  s = s.replace(/[_-](\w)/g, (_, w) => w.toUpperCase());
  return s[0].toUpperCase() + s.slice(1);
};
if (pkgName.startsWith("@")) {
  [, pkgName] = pkgName.split("/");
}
pkgName = line2Camel(pkgName);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {},
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./components/index.ts"),
      name: pkgName,
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      exclude: ["node_modules/**", "src/**"],
    }),
  ],
});
