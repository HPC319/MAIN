import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    plugins: {
      "@typescript-eslint": eslintPlugin
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": ["error", {
        "ts-expect-error": false,
        "ts-ignore": false,
        "ts-nocheck": false,
        "ts-check": false
      }],
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
];
