import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Native tsconfig `paths` resolution (the "@/*" alias) — replaces vite-tsconfig-paths.
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    // TanStack Start also picks up src/server.ts (SSR error wrapper) and
    // src/start.ts (start instance) from their conventional locations.
    tanstackStart({ customViteReactPlugin: true }),
    // React's Vite plugin must come after TanStack Start's plugin.
    viteReact(),
  ],
});
