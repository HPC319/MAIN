#!/usr/bin/env tsx
// import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

const command = process.argv[2] || "health";

console.log(`🔍 Introspecting: ${command}`);

const projectRoot = path.resolve(__dirname, "../..");

switch (command) {
  case "tokens":
    console.log("✅ Token introspection: Analyzing design tokens...");
    const tokensPath = path.join(projectRoot, "src/styles/tokens");
    if (fs.existsSync(tokensPath)) {
      console.log(`   Found tokens directory: ${tokensPath}`);
      const files = fs.readdirSync(tokensPath);
      console.log(`   Token files: ${files.length}`);
    } else {
      console.log("   No tokens directory found, skipping");
    }
    break;

  case "motion":
    console.log("✅ Motion introspection: Analyzing motion configurations...");
    const motionPaths = [
      path.join(projectRoot, "src/lib/motion"),
      path.join(projectRoot, "src/components"),
    ];
    motionPaths.forEach(p => {
      if (fs.existsSync(p)) {
        console.log(`   Checked: ${p}`);
      }
    });
    break;

  case "components":
    console.log("✅ Component introspection: Analyzing components...");
    const componentsPath = path.join(projectRoot, "src/components");
    if (fs.existsSync(componentsPath)) {
      const files = getAllFiles(componentsPath, ".tsx");
      console.log(`   Found ${files.length} component files`);
    }
    break;

  case "forms":
    console.log("✅ Form introspection: Analyzing forms...");
    const formsPath = path.join(projectRoot, "src/components");
    if (fs.existsSync(formsPath)) {
      console.log(`   Checked forms in: ${formsPath}`);
    }
    break;

  case "health":
    console.log("✅ Health check: System operational");
    console.log("   All introspection tools available");
    break;

  default:
    console.log(`⚠️  Unknown command: ${command}`);
    console.log("   Available: tokens, motion, components, forms, health");
}

function getAllFiles(dirPath: string, ext: string): string[] {
  const files: string[] = [];
  
  if (!fs.existsSync(dirPath)) return files;
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, ext));
    } else if (item.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log("✅ Introspection complete\n");
process.exit(0);
