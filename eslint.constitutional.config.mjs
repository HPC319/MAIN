import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**",
      ".storybook/**",
      "node_modules/**",
      "scripts/**",
      "dist/**",
      "build/**"
    ]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
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
      "@typescript-eslint/no-explicit-any": "error"
    }
  }
];
