import path from "node:path";
import { defineConfig } from "tsup";

const isDev = process.env.NODE_ENV === "development";
const isAnalyze = process.env.ANALYZE === "true";
const packageVersion = process.env.npm_package_version || "1.0.0";

export default defineConfig((options) => {
    const isWatchMode = Boolean(options.watch);
    const shouldMinify = !isWatchMode && !isDev;

    return [
        // Main JavaScript/TypeScript bundle
        {
            name: "main-bundle",
            entry: [
                path.resolve("src/index.ts"),
            ],
            outDir: path.resolve("dist"),

            // Build configuration
            bundle: true,
            dts: true,
            platform: "browser",
            format: ["cjs", "esm"],
            target: ["es2022", "chrome91", "firefox90", "safari15"],

            // Code splitting and optimization
            splitting: true,
            treeshake: true,
            clean: !isWatchMode,

            // Minification and compression
            minify: shouldMinify ? "terser" : false,
            minifyWhitespace: shouldMinify,
            minifyIdentifiers: shouldMinify,
            minifySyntax: shouldMinify,

            // Source maps
            sourcemap: shouldMinify ? "inline" : isWatchMode ? true : false,

            // ESBuild options
            esbuildOptions: (options) => ({
                ...options,
                charset: "utf8",
                legalComments: shouldMinify ? "none" : "inline",
                logLevel: isWatchMode ? "info" : "warning",
                drop: shouldMinify ? ["debugger", "console.log", "console.debug"] : undefined,
                keepNames: !shouldMinify,
                treeShaking: true,
                ...(isAnalyze ? {
                    metafile: true,
                    write: false,
                } : {}),
            }),

            // TypeScript configuration
            tsconfig: path.resolve("tsconfig.json"),

            // External dependencies (peer dependencies)
            external: [
                // React ecosystem
                "react",
                "react-dom",
                "react/jsx-runtime",

                // Refine core
                "@refinedev/core",
                "@refinedev/react-hook-form",

                // Form libraries
                "react-hook-form",
                "@hookform/resolvers",

                // UI libraries
                "@radix-ui/react-slot",
                "@radix-ui/react-label",
                "class-variance-authority",
                "clsx",
                "tailwind-merge",

                // Icons
                "lucide-react",

                // Utilities
                "zod",
            ],

            // Asset loaders
            loader: {
                ".svg": "dataurl",
                ".png": "dataurl",
                ".jpg": "dataurl",
                ".jpeg": "dataurl",
                ".gif": "dataurl",
                ".webp": "dataurl",
            },

            // Development
            watch: isWatchMode,

            // Banner for production builds
            banner: shouldMinify ? {
                js: `/*! @ferdiunal/refine-shadcn v${packageVersion} | MIT License | https://github.com/ferdiunal/refine-shadcn */`,
            } : undefined,

            // Custom plugins for analysis
            esbuildPlugins: isAnalyze ? [
                {
                    name: "bundle-analyzer",
                    setup(build) {
                        build.onEnd(async (result) => {
                            if (result.metafile) {
                                const esbuild = await import("esbuild");
                                const analysis = await esbuild.analyzeMetafile(result.metafile, {
                                    verbose: true,
                                });
                                console.log("\n📊 Bundle Analysis:\n", analysis);
                            }
                        });
                    },
                },
            ] : [],
        },

        // CSS bundle
        {
            name: "css-bundle",
            entry: [
                path.resolve("src/globals.css"),
            ],
            outDir: path.resolve("dist"),

            // CSS-specific options
            sourcemap: shouldMinify ? "inline" : isWatchMode ? true : false,
            minify: shouldMinify,
            clean: false, // Don't clean when processing CSS (main bundle handles it)

            // Development
            watch: isWatchMode,

            // PostCSS integration
            esbuildOptions: (options) => ({
                ...options,
                logLevel: isWatchMode ? "info" : "warning",
            }),
        },
    ];
});
