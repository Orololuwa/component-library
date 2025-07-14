import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "tsconfig.build.json"),
      exclude: ["**/*.stories.*", "**/*.test.*", "**/*.spec.*"],
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "lib/main.ts"),
        modal: resolve(__dirname, "lib/modules/modal/index.tsx"),
        drawer: resolve(__dirname, "lib/modules/drawer/index.tsx"),
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
