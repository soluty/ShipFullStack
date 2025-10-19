import { cloudflare } from "@cloudflare/vite-plugin";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  // development: .env, .env.local, .env.development, .env.development.local
  // production: .env, .env.local, .env.production, .env.production.local
  return {
    plugins: [
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        outputStructure: "message-modules",
        cookieName: "PARAGLIDE_LOCALE",
        strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
        urlPatterns: [
          {
            pattern: "/",
            localized: [
              ["en", "/"],
              ["zh", "/zh"],
            ],
          },
          {
            pattern: "/:path(.*)?",
            localized: [
              ["en", "/en/:path(.*)?"],
              ["zh", "/zh/:path(.*)?"],
            ],
          },
        ],
      }),
      cloudflare({ viteEnvironment: { name: "ssr" } }),
      devtools(),
      tsconfigPaths(),
      tailwindcss(),
      tanstackStart({}),
      viteReact({
        // https://react.dev/learn/react-compiler
        babel: {
          plugins: [
            [
              "babel-plugin-react-compiler",
              {
                target: "19",
              },
            ],
          ],
        },
      }),
    ],
  };
});
