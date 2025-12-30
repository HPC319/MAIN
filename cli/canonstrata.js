#!/usr/bin/env node

/**
 * CANONSTRATA SYSTEM INTROSPECTION CLI
 * 
 * Command-line tool for analyzing, validating, and enforcing
 * Canonstrata design system standards.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ============================================================================
// CLI COMMANDS
// ============================================================================

const commands = {
  audit: auditSystem,
  validate: validateComponents,
  tokens: analyzeTokens,
  coverage: checkCoverage,
  motion: analyzeMotion,
  a11y: auditAccessibility,
  bundle: analyzeBundleSize,
  help: showHelp,
};

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const options = parseOptions(args.slice(1));

  if (commands[command]) {
    commands[command](options);
  } else {
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
  }
}

function parseOptions(args) {
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    options[key] = value;
  }
  return options;
}

// ============================================================================
// COMMAND: AUDIT SYSTEM
// ============================================================================

function auditSystem(options) {
  console.log('🔍 CANONSTRATA SYSTEM AUDIT\n');

  const results = {
    tokens: auditTokens(),
    components: auditComponents(),
    motion: auditMotionSystem(),
    accessibility: auditA11y(),
    performance: auditPerformance(),
  };

  printAuditResults(results);

  const score = calculateScore(results);
  console.log(`\n📊 Overall Score: ${score}/100\n`);

  if (score < 90) {
    process.exit(1);
  }
}

function auditTokens() {
  const tokenPath = path.join(process.cwd(), 'design-system/tokens');
  
  if (!fs.existsSync(tokenPath)) {
    return { pass: false, message: 'Tokens directory not found' };
  }

  const tokenFiles = fs.readdirSync(tokenPath);
  const requiredTokens = ['colors', 'spacing', 'typography', 'motion', 'breakpoints'];
  const missingTokens = requiredTokens.filter(
    token => !tokenFiles.some(file => file.includes(token))
  );

  if (missingTokens.length > 0) {
    return {
      pass: false,
      message: `Missing token systems: ${missingTokens.join(', ')}`,
    };
  }

  return { pass: true, message: 'All token systems present' };
}

function auditComponents() {
  const componentsPath = path.join(process.cwd(), 'src/components');
  
  if (!fs.existsSync(componentsPath)) {
    return { pass: false, message: 'Components directory not found' };
  }

  const uiPath = path.join(componentsPath, 'ui');
  const componentFiles = fs.existsSync(uiPath) 
    ? fs.readdirSync(uiPath).filter(f => f.endsWith('.tsx') && !f.includes('.stories'))
    : [];

  const storyFiles = fs.existsSync(uiPath)
    ? fs.readdirSync(uiPath).filter(f => f.endsWith('.stories.tsx'))
    : [];

  const coverage = componentFiles.length > 0 
    ? Math.round((storyFiles.length / componentFiles.length) * 100)
    : 0;

  return {
    pass: coverage >= 70,
    message: `Storybook coverage: ${coverage}% (${storyFiles.length}/${componentFiles.length} components)`,
    coverage,
  };
}

function auditMotionSystem() {
  const motionPath = path.join(process.cwd(), 'src/lib/motion-identity');
  
  if (!fs.existsSync(motionPath)) {
    return { pass: false, message: 'Motion identity system not found' };
  }

  return { pass: true, message: 'Motion identity system present' };
}

function auditA11y() {
  const a11yPath = path.join(process.cwd(), 'src/lib/a11y');
  
  if (!fs.existsSync(a11yPath)) {
    return { pass: false, message: 'A11y utilities not found' };
  }

  return { pass: true, message: 'A11y utilities present' };
}

function auditPerformance() {
  const renderingPath = path.join(process.cwd(), 'src/lib/rendering');
  
  if (!fs.existsSync(renderingPath)) {
    return { pass: false, message: 'Rendering system not found' };
  }

  return { pass: true, message: 'Adaptive rendering system present' };
}

function calculateScore(results) {
  const scores = {
    tokens: results.tokens.pass ? 20 : 0,
    components: results.components.pass ? 20 : results.components.coverage * 0.2,
    motion: results.motion.pass ? 20 : 0,
    accessibility: results.accessibility.pass ? 20 : 0,
    performance: results.performance.pass ? 20 : 0,
  };

  return Math.round(Object.values(scores).reduce((a, b) => a + b, 0));
}

function printAuditResults(results) {
  Object.entries(results).forEach(([category, result]) => {
    const icon = result.pass ? '✅' : '❌';
    console.log(`${icon} ${category.toUpperCase()}: ${result.message}`);
  });
}

// ============================================================================
// COMMAND: VALIDATE COMPONENTS
// ============================================================================

function validateComponents(options) {
  console.log('🔍 Validating Components...\n');

  const componentsPath = path.join(process.cwd(), 'src/components/ui');
  
  if (!fs.existsSync(componentsPath)) {
    console.error('❌ Components directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(componentsPath)
    .filter(f => f.endsWith('.tsx') && !f.includes('.stories'));

  let hasErrors = false;

  files.forEach(file => {
    const filePath = path.join(componentsPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const checks = [
      {
        name: 'Has TypeScript types',
        test: content.includes('interface') || content.includes('type '),
      },
      {
        name: 'Has forwardRef',
        test: content.includes('forwardRef') || !content.includes('ref'),
      },
      {
        name: 'Has accessibility attributes',
        test: content.includes('aria-') || content.includes('role='),
      },
      {
        name: 'Uses CVA variants',
        test: content.includes('cva') || content.includes('variants'),
      },
    ];

    const failures = checks.filter(c => !c.test);
    
    if (failures.length > 0) {
      console.log(`❌ ${file}`);
      failures.forEach(f => console.log(`   - ${f.name}`));
      hasErrors = true;
    } else {
      console.log(`✅ ${file}`);
    }
  });

  if (hasErrors) {
    process.exit(1);
  }

  console.log('\n✅ All components valid\n');
}

// ============================================================================
// COMMAND: ANALYZE TOKENS
// ============================================================================

function analyzeTokens(options) {
  console.log('🎨 Analyzing Design Tokens...\n');

  const tokenPath = path.join(process.cwd(), 'design-system/tokens');
  
  if (!fs.existsSync(tokenPath)) {
    console.error('❌ Tokens directory not found');
    process.exit(1);
  }

  const tokenFiles = fs.readdirSync(tokenPath)
    .filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

  let totalTokens = 0;

  tokenFiles.forEach(file => {
    const filePath = path.join(tokenPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Count export statements
    const exports = content.match(/export (const|type|interface)/g) || [];
    totalTokens += exports.length;

    console.log(`📄 ${file}: ${exports.length} tokens`);
  });

  console.log(`\n📊 Total Tokens: ${totalTokens}\n`);
}

// ============================================================================
// COMMAND: CHECK COVERAGE
// ============================================================================

function checkCoverage(options) {
  console.log('📊 Checking Storybook Coverage...\n');

  const uiPath = path.join(process.cwd(), 'src/components/ui');
  
  if (!fs.existsSync(uiPath)) {
    console.error('❌ UI components directory not found');
    process.exit(1);
  }

  const components = fs.readdirSync(uiPath)
    .filter(f => f.endsWith('.tsx') && !f.includes('.stories'))
    .map(f => f.replace('.tsx', ''));

  const stories = fs.readdirSync(uiPath)
    .filter(f => f.endsWith('.stories.tsx'))
    .map(f => f.replace('.stories.tsx', ''));

  console.log('Components with stories:');
  components.forEach(comp => {
    const hasStory = stories.includes(comp);
    const icon = hasStory ? '✅' : '❌';
    console.log(`${icon} ${comp}`);
  });

  const coverage = Math.round((stories.length / components.length) * 100);
  console.log(`\n📊 Coverage: ${coverage}% (${stories.length}/${components.length})\n`);

  if (coverage < 70) {
    process.exit(1);
  }
}

// ============================================================================
// COMMAND: ANALYZE MOTION
// ============================================================================

function analyzeMotion(options) {
  console.log('🎬 Analyzing Motion System...\n');

  const motionPath = path.join(process.cwd(), 'src/lib/motion-identity');
  
  if (!fs.existsSync(motionPath)) {
    console.error('❌ Motion identity system not found');
    process.exit(1);
  }

  const indexPath = path.join(motionPath, 'index.ts');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ Motion index file not found');
    process.exit(1);
  }

  const content = fs.readFileSync(indexPath, 'utf-8');
  
  const patterns = [
    'canostrataReveal',
    'canostrataDrawer',
    'canostrataRipple',
    'canostrataStagger',
    'canostrataLift',
    'canostrataGlow',
  ];

  patterns.forEach(pattern => {
    const exists = content.includes(pattern);
    const icon = exists ? '✅' : '❌';
    console.log(`${icon} ${pattern}`);
  });

  console.log('\n✅ Motion system analysis complete\n');
}

// ============================================================================
// COMMAND: AUDIT ACCESSIBILITY
// ============================================================================

function auditAccessibility(options) {
  console.log('♿ Auditing Accessibility...\n');

  const componentsPath = path.join(process.cwd(), 'src/components/ui');
  
  if (!fs.existsSync(componentsPath)) {
    console.error('❌ Components directory not found');
    process.exit(1);
  }

  const files = fs.readdirSync(componentsPath)
    .filter(f => f.endsWith('.tsx') && !f.includes('.stories'));

  let hasIssues = false;

  files.forEach(file => {
    const filePath = path.join(componentsPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const hasAriaLabel = content.includes('aria-label');
    const hasAriaDescribedby = content.includes('aria-describedby');
    const hasRole = content.includes('role=');
    const hasAriaAttributes = hasAriaLabel || hasAriaDescribedby || hasRole;

    if (!hasAriaAttributes && !file.includes('label')) {
      console.log(`⚠️  ${file}: No ARIA attributes found`);
      hasIssues = true;
    } else {
      console.log(`✅ ${file}`);
    }
  });

  if (!hasIssues) {
    console.log('\n✅ All components have accessibility attributes\n');
  }
}

// ============================================================================
// COMMAND: ANALYZE BUNDLE SIZE
// ============================================================================

function analyzeBundleSize(options) {
  console.log('📦 Analyzing Bundle Size...\n');

  try {
    console.log('Building production bundle...');
    execSync('npm run build', { stdio: 'inherit' });

    const nextPath = path.join(process.cwd(), '.next');
    
    if (!fs.existsSync(nextPath)) {
      console.error('❌ Build directory not found');
      process.exit(1);
    }

    console.log('\n✅ Build complete\n');
    console.log('💡 Run "npm run build" to see detailed bundle analysis\n');
  } catch (error) {
    console.error('❌ Build failed');
    process.exit(1);
  }
}

// ============================================================================
// COMMAND: HELP
// ============================================================================

function showHelp() {
  console.log(`
🎯 CANONSTRATA SYSTEM INTROSPECTION CLI

USAGE:
  canonstrata <command> [options]

COMMANDS:
  audit           Run full system audit
  validate        Validate component standards
  tokens          Analyze design tokens
  coverage        Check Storybook coverage
  motion          Analyze motion system
  a11y            Audit accessibility
  bundle          Analyze bundle size
  help            Show this help message

EXAMPLES:
  canonstrata audit
  canonstrata validate
  canonstrata coverage

For more information, visit: https://canonstrata.dev
  `);
}

// ============================================================================
// RUN
// ============================================================================

main();
