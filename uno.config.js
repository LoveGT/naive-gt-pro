import { defineConfig } from "@unocss/vite";
import { presetUno, presetAttributify, presetIcons } from "unocss";
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        "node_modules",
        "dist",
        ".git",
        ".husky",
        ".vscode",
        "public",
        "build",
        "mock",
        "./stats.html",
      ],
    }
  },
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno({ dark: "class" }),
    presetIcons()
  ],
  transformers: [transformerDirectives()],
});
