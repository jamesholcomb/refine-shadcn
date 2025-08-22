import { defineConfig } from "tsup";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} License | ${pkg.repository.url.replace('.git', '')} */`;

export default defineConfig((options) => {
  const isDev = process.env.NODE_ENV === "development";
  const shouldAnalyze = process.env.ANALYZE === "true";

  return {
    banner: {
      js: banner,
    },
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: {
      resolve: true,
      entry: "src/index.ts",
    },
    target: "es2022",
    clean: !options.watch,
    splitting: false,
    sourcemap: isDev,
    minify: !isDev,
    treeshake: !isDev,
    keepNames: true,
    external: [
      "react",
      "react-dom",
      "@refinedev/core",
      "@refinedev/react-hook-form",
      "@ferdiunal/refine-shadcn",
      "better-auth"
    ],
    esbuildOptions: (opts) => {
      opts.conditions = ["module"];
      if (shouldAnalyze) {
        opts.metafile = true;
      }
    },
    onSuccess: shouldAnalyze
      ? async () => {
          const { analyzeMetafile } = await import("esbuild");
          const metafile = readFileSync("dist/index.js.meta.json", "utf8");
          const analysis = await analyzeMetafile(JSON.parse(metafile));
          console.log(analysis);
        }
      : undefined,
  };
});