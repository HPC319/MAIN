import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      ".next/**",
      ".storybook/**",
      "node_modules/**",
      "scripts/setup-monitoring.js",
      "dist/**",
      "build/**"
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": eslintPlugin
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": false,
        "ts-nocheck": false,
        "ts-check": false,
        minimumDescriptionLength: 10
      }],
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
];
