import path from "node:path";
import { defineConfig } from "tsup";

const isDev = process.env.NODE_ENV === "development";
const isAnalyze = process.env.ANALYZE === "true";
const packageVersion = process.env.npm_package_version || "1.0.0";

export default defineConfig((options) => {
    const isWatchMode = Boolean(options.watch);
    const shouldMinify = !isWatchMode && !isDev;

    const commonConfig = {
        // Build configuration
        bundle: true,
        dts: true,
        platform: "browser" as const,
        format: ["cjs", "esm"] as const,
        target: ["es2022", "chrome91", "firefox90", "safari15"] as const,

        // Code splitting and optimization
        splitting: true,
        treeshake: true,
        clean: !isWatchMode,

        // Minification and compression
        minify: shouldMinify ? "terser" as const : false,
        minifyWhitespace: shouldMinify,
        minifyIdentifiers: shouldMinify,
        minifySyntax: shouldMinify,

        // Source maps
        sourcemap: shouldMinify ? "inline" as const : isWatchMode ? true : false,

        // TypeScript configuration
        tsconfig: path.resolve("tsconfig.json"),

        // External dependencies (peer dependencies)
        external: [
            // React ecosystem
            "react",
            "react-dom",
            "react/jsx-runtime",

            // Refine core & extensions
            "@refinedev/core",
            "@refinedev/react-hook-form",
            "@refinedev/react-table",
            "@refinedev/ui-types",

            // Form libraries
            "react-hook-form",
            "@hookform/resolvers",

            // Table libraries
            "@tanstack/react-table",

            // UI libraries - Radix UI
            "@radix-ui/react-slot",
            "@radix-ui/react-label",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-icons",

            // UI utilities
            "class-variance-authority",
            "clsx",
            "tailwind-merge",

            // Icons
            "lucide-react",

            // Utilities
            "zod",
            "react-use",
            "next-themes",
            "cmdk",
            "date-fns",
            "react-day-picker",
            "react-resizable-panels",
            "sonner",
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

        // Banner for production builds - always include for proper attribution
        banner: {
            js: `/*! @ferdiunal/refine-shadcn v${packageVersion} | MIT License | https://github.com/ferdiunal/refine-shadcn */`,
        },

        // ESBuild options
        esbuildOptions: (options: any) => ({
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

        // Custom plugins for analysis
        esbuildPlugins: isAnalyze ? [
            {
                name: "bundle-analyzer",
                setup(build: any) {
                    build.onEnd(async (result: any) => {
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
    };

    return [
        // Main bundle - exports everything
        {
            name: "main-bundle",
            entry: {
                index: path.resolve("src/index.ts"),
            },
            outDir: path.resolve("dist"),
            ...commonConfig,
        },

        // UI components bundle
        {
            name: "ui-bundle", 
            entry: {
                ui: path.resolve("src/ui/index.ts"),
            },
            outDir: path.resolve("dist"),
            ...commonConfig,
            clean: false, // Don't clean, main bundle handles it
        },

        // Utils bundle
        {
            name: "utils-bundle",
            entry: {
                "lib/utils": path.resolve("src/lib/utils.ts"),
            },
            outDir: path.resolve("dist"),
            ...commonConfig,
            clean: false, // Don't clean, main bundle handles it
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
