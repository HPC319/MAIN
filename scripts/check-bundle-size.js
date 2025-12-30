#!/usr/bin/env node

/**
 * Bundle Size Monitoring Script
 * Tracks and enforces bundle size constraints for Canonstrata
 */

const fs = require('fs');
const path = require('path');

const BUNDLE_SIZE_LIMITS = {
  // Main bundle limits (in bytes)
  mainBundle: 500 * 1024, // 500KB
  firstLoadJS: 300 * 1024, // 300KB
  
  // Route-specific limits
  pages: {
    index: 250 * 1024, // 250KB
    '*': 200 * 1024, // 200KB default
  },
  
  // Asset limits
  css: 100 * 1024, // 100KB
  images: 500 * 1024, // 500KB per image
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function checkBundleSize() {
  console.log('🔍 Analyzing bundle size...\n');

  const nextDir = path.join(process.cwd(), '.next');
  const buildManifest = path.join(nextDir, 'build-manifest.json');
  
  if (!fs.existsSync(buildManifest)) {
    console.error('❌ Build manifest not found. Run `npm run build` first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
  const violations = [];
  let totalSize = 0;

  // Analyze pages
  console.log('📦 Page Bundles:');
  console.log('─'.repeat(60));
  
  for (const [page, files] of Object.entries(manifest.pages)) {
    let pageSize = 0;
    
    files.forEach(file => {
      const filePath = path.join(nextDir, file);
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        pageSize += stat.size;
        totalSize += stat.size;
      }
    });

    const limit = BUNDLE_SIZE_LIMITS.pages[page] || BUNDLE_SIZE_LIMITS.pages['*'];
    const status = pageSize <= limit ? '✅' : '❌';
    const percentage = Math.round((pageSize / limit) * 100);
    
    console.log(`${status} ${page.padEnd(30)} ${formatBytes(pageSize).padStart(12)} (${percentage}% of limit)`);
    
    if (pageSize > limit) {
      violations.push({
        type: 'page',
        name: page,
        size: pageSize,
        limit: limit,
        exceeded: pageSize - limit,
      });
    }
  }

  console.log('─'.repeat(60));
  console.log(`📊 Total Bundle Size: ${formatBytes(totalSize)}\n`);

  // Check first load JS
  if (manifest.pages['/_app']) {
    let firstLoadSize = 0;
    manifest.pages['/_app'].forEach(file => {
      const filePath = path.join(nextDir, file);
      if (fs.existsSync(filePath)) {
        firstLoadSize += fs.statSync(filePath).size;
      }
    });

    console.log('⚡ First Load JS:');
    console.log('─'.repeat(60));
    const status = firstLoadSize <= BUNDLE_SIZE_LIMITS.firstLoadJS ? '✅' : '❌';
    const percentage = Math.round((firstLoadSize / BUNDLE_SIZE_LIMITS.firstLoadJS) * 100);
    console.log(`${status} First Load JS: ${formatBytes(firstLoadSize)} (${percentage}% of limit)\n`);
    
    if (firstLoadSize > BUNDLE_SIZE_LIMITS.firstLoadJS) {
      violations.push({
        type: 'first-load',
        name: 'First Load JS',
        size: firstLoadSize,
        limit: BUNDLE_SIZE_LIMITS.firstLoadJS,
        exceeded: firstLoadSize - BUNDLE_SIZE_LIMITS.firstLoadJS,
      });
    }
  }

  // Report violations
  if (violations.length > 0) {
    console.log('\n⚠️  BUNDLE SIZE VIOLATIONS:\n');
    violations.forEach(v => {
      console.log(`❌ ${v.name}`);
      console.log(`   Size: ${formatBytes(v.size)}`);
      console.log(`   Limit: ${formatBytes(v.limit)}`);
      console.log(`   Exceeded by: ${formatBytes(v.exceeded)}\n`);
    });
    
    console.log('💡 Suggestions:');
    console.log('   - Use dynamic imports for heavy components');
    console.log('   - Check for duplicate dependencies');
    console.log('   - Review and tree-shake unused code');
    console.log('   - Consider code splitting strategies\n');
    
    if (process.env.CI) {
      process.exit(1);
    }
  } else {
    console.log('✅ All bundle size checks passed!\n');
  }

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    totalSize,
    violations,
    pages: Object.keys(manifest.pages).length,
    status: violations.length === 0 ? 'PASS' : 'FAIL',
  };

  const reportsDir = path.join(process.cwd(), '.next', 'bundle-reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(reportsDir, `bundle-report-${Date.now()}.json`),
    JSON.stringify(report, null, 2)
  );

  console.log(`📄 Report saved to: .next/bundle-reports/\n`);
}

// Run if called directly
if (require.main === module) {
  checkBundleSize();
}

module.exports = { checkBundleSize, BUNDLE_SIZE_LIMITS };
