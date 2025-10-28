// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    // React + TS files
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooks,
        },
        settings: {
            react: { version: "detect" },
        },
        rules: {
            // ---- JS / general ----
            "no-unused-vars": "off",
            "prefer-const": "off",
            "no-undef": "off",
            "no-empty": "off",
            "no-console": "off",
            "no-debugger": "off",
            "no-empty-pattern": "warn",

            // ---- React ----
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/display-name": "off",
            "react-hooks/rules-of-hooks": "warn",
            "react-hooks/exhaustive-deps": "off",

            // ---- General loosened TS ----
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-inferrable-types": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
    // Node-only .js files (scripts, config files)
    {
        files: ["**/*.{js,cjs,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-console": "off",
            "no-undef": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off"
        },
    }
);
