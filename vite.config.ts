import { defineConfig, type PluginOption } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async ({ command }) => {
  const plugins: PluginOption[] = [
    tailwindcss(),
    // TanStack Start also picks up src/server.ts (SSR error wrapper) and
    // src/start.ts (start instance) from their conventional locations.
    tanstackStart(),
  ];

  // Nitro is build-only. It produces the deployable server output (on Vercel it
  // auto-selects the Vercel preset → .vercel/output). Its Vite plugin — even just
  // importing "nitro/vite" — hangs `vite dev`, so we load it lazily for `build`.
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro());
  }

  // React's Vite plugin must come after TanStack Start's plugin.
  plugins.push(viteReact());

  return {
    // Native tsconfig `paths` resolution (the "@/*" alias) — replaces vite-tsconfig-paths.
    resolve: { tsconfigPaths: true },
    plugins,
  };
});
