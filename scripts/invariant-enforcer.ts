#!/usr/bin/env tsx

import { execSync } from "child_process";

console.log("🔒 CANONSTRATA INVARIANT ENFORCEMENT\n");

const checks = [
  { name: "Token Validation", cmd: "npm run validate:tokens" },
  { name: "Motion Validation", cmd: "npm run validate:motion" },
  { name: "Gatekeeper AST", cmd: "npm run gatekeeper:ast" },
];

for (const check of checks) {
  try {
    console.log(`▶ ${check.name}`);
    execSync(check.cmd, { stdio: "inherit" });
    console.log(`✅ ${check.name} PASSED\n`);
  } catch {
    console.error(`❌ ${check.name} FAILED`);
    process.exit(1);
  }
}

console.log("✅ ALL CANONSTRATA INVARIANTS ENFORCED");
process.exit(0);

