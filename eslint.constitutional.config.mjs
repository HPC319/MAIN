import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import canonstrata from "./eslint-rules/index.js";

export default [
  // Global ignores
  {
    ignores: [
      ".next/**",
      ".storybook/**",
      "node_modules/**",
      "scripts/**",
      "dist/**",
      "build/**",
      "out/**",
      ".turbo/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts"
    ]
  },
  // TypeScript and React files configuration
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        },
        project: "./tsconfig.json"
      },
      globals: {
        React: "readonly",
        JSX: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": eslintPlugin,
      "react": react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "canonstrata": canonstrata
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // CONSTITUTIONAL RULES - NO EXCEPTIONS
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          fixToUnknown: false,
          ignoreRestArgs: false
        }
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": true,
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          "minimumDescriptionLength": 0
        }
      ],
      
      // Custom Constitutional Rules
      "canonstrata/no-hardcoded-tokens": "error",
      "canonstrata/motion-kernel-only": "error",
      "canonstrata/server-component-default": "error",
      "canonstrata/enforce-search-constitution": "error",
      
      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      
      // React Rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Accessibility Rules
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error"
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error"
    }
  },
  // Client-side specific rules
  {
    files: ["src/components/**/*.tsx", "src/app/**/page.tsx", "src/hooks/**/*.ts"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "process",
          message: "Use environment variables through Next.js runtime config instead"
        }
      ]
    }
  },
  // Server-side specific rules
  {
    files: ["src/app/**/route.ts", "src/lib/server/**/*.ts", "src/middleware.ts"],
    languageOptions: {
      globals: {
        process: "readonly",
        Buffer: "readonly"
      }
    }
  }
];
