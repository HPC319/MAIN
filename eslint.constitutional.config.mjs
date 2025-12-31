/**
 * ESLint v9 Flat Configuration
 * CONSTITUTIONAL ENFORCEMENT - NO EXCEPTIONS
 * 
 * This configuration enforces:
 * - No 'any' types
 * - No @ts-ignore/@ts-expect-error
 * - Strict TypeScript rules
 * - React best practices
 * - Accessibility standards
 * - Custom canonstrata constitutional rules
 */

import eslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import canonstrata from "./eslint-rules/index.js";

export default [
  // ============================================================================
  // GLOBAL IGNORES
  // ============================================================================
  {
    ignores: [
      // Build outputs
      ".next/**",
      "dist/**",
      "build/**",
      "out/**",
      ".turbo/**",
      "coverage/**",
      "storybook-static/**",
      
      // Dependencies
      "node_modules/**",
      
      // Configuration files (except this one)
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "!eslint.constitutional.config.mjs",
      
      // Scripts (opt-in linting only)
      "scripts/**",
      
      // Storybook
      ".storybook/**",
      
      // Cache directories
      ".cache/**",
      "**/.cache/**",
      
      // Test artifacts
      "**/__snapshots__/**",
      "**/test-results/**",
      "**/playwright-report/**"
    ]
  },

  // ============================================================================
  // BASE CONFIGURATION - TypeScript & React
  // ============================================================================
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
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        // React 19+ doesn't require React in scope
        React: "readonly",
        JSX: "readonly",
        
        // Browser globals for client components
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        
        // Node globals (will be restricted in client code)
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        
        // Next.js specific
        NodeJS: "readonly"
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
      // ========================================================================
      // CONSTITUTIONAL RULES - ABSOLUTE ENFORCEMENT
      // ========================================================================
      
      // NO 'any' TYPES - EVER
      "@typescript-eslint/no-explicit-any": [
        "error",
        {
          fixToUnknown: false,
          ignoreRestArgs: false
        }
      ],
      
      // NO TypeScript Suppressions
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          "minimumDescriptionLength": 10
        }
      ],
      
      // Custom Constitutional Rules
      "canonstrata/no-hardcoded-tokens": "error",
      "canonstrata/motion-kernel-only": "error",
      "canonstrata/server-component-default": "error",
      "canonstrata/enforce-search-constitution": "error",

      // ========================================================================
      // TYPESCRIPT RULES
      // ========================================================================
      
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_"
        }
      ],
      
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      
      // Turn off rules that conflict with TypeScript
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // ========================================================================
      // REACT RULES
      // ========================================================================
      
      // React 19+ doesn't need React in scope
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      
      // TypeScript handles prop validation
      "react/prop-types": "off",
      
      // Enforce React best practices
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-unescaped-entities": "warn",
      "react/no-unknown-property": "error",
      "react/require-render-return": "error",
      "react/self-closing-comp": "warn",
      
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ========================================================================
      // ACCESSIBILITY RULES
      // ========================================================================
      
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/interactive-supports-focus": "warn",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/media-has-caption": "warn",
      "jsx-a11y/mouse-events-have-key-events": "warn",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "warn",

      // ========================================================================
      // GENERAL BEST PRACTICES
      // ========================================================================
      
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",
      "object-shorthand": "warn",
      "no-duplicate-imports": "error"
    },

    linterOptions: {
      // Report unused eslint-disable directives as errors
      reportUnusedDisableDirectives: "error"
    }
  },

  // ============================================================================
  // CLIENT-SIDE SPECIFIC RULES
  // ============================================================================
  {
    files: [
      "src/components/**/*.tsx",
      "src/components/**/*.ts",
      "src/app/**/page.tsx",
      "src/app/**/layout.tsx",
      "src/app/**/loading.tsx",
      "src/app/**/error.tsx",
      "src/app/**/not-found.tsx",
      "src/hooks/**/*.ts",
      "src/hooks/**/*.tsx",
      "src/context/**/*.tsx",
      "src/context/**/*.ts"
    ],
    
    rules: {
      // Restrict Node.js globals in client components
      "no-restricted-globals": [
        "error",
        {
          name: "process",
          message: "Do not use 'process' in client components. Use environment variables through Next.js public env vars (NEXT_PUBLIC_*) or runtime config."
        },
        {
          name: "Buffer",
          message: "Buffer is a Node.js global and should not be used in client components."
        },
        {
          name: "__dirname",
          message: "__dirname is a Node.js global and should not be used in client components."
        },
        {
          name: "__filename",
          message: "__filename is a Node.js global and should not be used in client components."
        }
      ],
      
      // Ensure 'use client' directive where needed
      "canonstrata/server-component-default": "error"
    }
  },

  // ============================================================================
  // SERVER-SIDE SPECIFIC RULES
  // ============================================================================
  {
    files: [
      "src/app/**/route.ts",
      "src/app/**/route.js",
      "src/lib/server/**/*.ts",
      "src/lib/server/**/*.js",
      "src/middleware.ts",
      "src/app/api/**/*.ts",
      "src/app/api/**/*.js",
      "prisma/**/*.ts",
      "prisma/**/*.js"
    ],
    
    languageOptions: {
      globals: {
        // Server-side can use Node.js globals
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly"
      }
    },
    
    rules: {
      // Allow console in server code
      "no-console": "off"
    }
  },

  // ============================================================================
  // TEST FILES
  // ============================================================================
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "tests/**/*.ts",
      "tests/**/*.tsx",
      "**/__tests__/**/*.ts",
      "**/__tests__/**/*.tsx"
    ],
    
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
        vitest: "readonly"
      }
    },
    
    rules: {
      // Relax some rules in tests
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off"
    }
  },

  // ============================================================================
  // STORYBOOK FILES
  // ============================================================================
  {
    files: [
      "**/*.stories.ts",
      "**/*.stories.tsx"
    ],
    
    rules: {
      // Relax some rules for Storybook
      "react-hooks/rules-of-hooks": "off"
    }
  }
];
