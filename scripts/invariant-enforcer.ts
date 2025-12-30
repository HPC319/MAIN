#!/usr/bin/env tsx
import { execSync } from "child_process";

console.log("🔒 Running invariant enforcement checks...");

try {
  // Run ESLint with strict settings
  execSync("eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 0", { 
    stdio: "inherit",
    cwd: process.cwd()
  });
  
  console.log("✅ All invariants enforced successfully");
  process.exit(0);
} catch (error) {
  console.error("❌ Invariant enforcement failed");
  process.exit(1);
}
