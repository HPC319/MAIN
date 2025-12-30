#!/usr/bin/env tsx
import { execSync } from "child_process";

const validators = [
  "tsx scripts/ast-validators/validate-tokens.ts",
  "tsx scripts/ast-validators/validate-motion.ts",
  "tsx scripts/ast-validators/validate-rendering.ts",
];

for (const cmd of validators) {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

process.exit(0);
