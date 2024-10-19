import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import Icons from "unplugin-icons/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte"
    }),
    visualizer({
      emitFile: true,
      filename: "stats.html"
    })
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"]
  }
});
