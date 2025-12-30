/**
 * CANONSTRATA STORYBOOK GATEKEEPER
 * 
 * CI enforcement rules and AST checks to ensure all components
 * meet Canonstrata standards before merging.
 */

const fs = require('fs');
const path = require('path');
const parser = require('@typescript-eslint/parser');

// ============================================================================
// GATEKEEPER RULES
// ============================================================================

const RULES = {
  MUST_HAVE_STORY: {
    name: 'Must have Storybook story',
    check: (component) => {
      const storyPath = component.path.replace('.tsx', '.stories.tsx');
      return fs.existsSync(storyPath);
    },
    message: (component) => `Component ${component.name} must have a .stories.tsx file`,
  },

  MUST_HAVE_TYPESCRIPT: {
    name: 'Must use TypeScript',
    check: (component) => component.path.endsWith('.tsx') || component.path.endsWith('.ts'),
    message: (component) => `Component ${component.name} must use TypeScript`,
  },

  MUST_HAVE_PROPS_INTERFACE: {
    name: 'Must have props interface',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      return content.includes('interface') && content.includes('Props');
    },
    message: (component) => `Component ${component.name} must define a Props interface`,
  },

  MUST_USE_FORWARD_REF: {
    name: 'Must use forwardRef for DOM components',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      // Skip if component doesn't use refs
      if (!content.includes('ref')) return true;
      return content.includes('forwardRef');
    },
    message: (component) => `Component ${component.name} must use React.forwardRef`,
  },

  MUST_HAVE_ARIA_ATTRIBUTES: {
    name: 'Must have accessibility attributes',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      // Skip label components
      if (component.name.toLowerCase().includes('label')) return true;
      return content.includes('aria-') || content.includes('role=');
    },
    message: (component) => `Component ${component.name} must have ARIA attributes`,
  },

  MUST_USE_DESIGN_TOKENS: {
    name: 'Must use design system tokens',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      return (
        content.includes('className') ||
        content.includes('cva') ||
        content.includes('cn(')
      );
    },
    message: (component) => `Component ${component.name} must use design system tokens`,
  },

  MUST_HAVE_DISPLAY_NAME: {
    name: 'Must have displayName',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      return content.includes('displayName');
    },
    message: (component) => `Component ${component.name} should have displayName for debugging`,
  },

  MUST_EXPORT_TYPES: {
    name: 'Must export component types',
    check: (component) => {
      const content = fs.readFileSync(component.path, 'utf-8');
      return content.includes('export type') || content.includes('export interface');
    },
    message: (component) => `Component ${component.name} must export its types`,
  },
};

// ============================================================================
// COMPONENT SCANNER
// ============================================================================

function scanComponents(componentsPath) {
  const components = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (
        item.endsWith('.tsx') &&
        !item.includes('.stories') &&
        !item.includes('.test')
      ) {
        components.push({
          name: item.replace('.tsx', ''),
          path: itemPath,
        });
      }
    });
  }
  
  scanDirectory(componentsPath);
  return components;
}

// ============================================================================
// RULE ENFORCER
// ============================================================================

function enforceRules(components) {
  const violations = [];
  
  components.forEach(component => {
    Object.values(RULES).forEach(rule => {
      if (!rule.check(component)) {
        violations.push({
          component: component.name,
          rule: rule.name,
          message: rule.message(component),
        });
      }
    });
  });
  
  return violations;
}

// ============================================================================
// REPORTER
// ============================================================================

function reportViolations(violations) {
  if (violations.length === 0) {
    console.log('✅ All components pass gatekeeper rules\n');
    return true;
  }
  
  console.log('❌ GATEKEEPER VIOLATIONS DETECTED\n');
  
  const byComponent = violations.reduce((acc, v) => {
    if (!acc[v.component]) acc[v.component] = [];
    acc[v.component].push(v);
    return acc;
  }, {});
  
  Object.entries(byComponent).forEach(([component, componentViolations]) => {
    console.log(`\n🔴 ${component}:`);
    componentViolations.forEach(v => {
      console.log(`   ❌ ${v.rule}`);
      console.log(`      ${v.message}`);
    });
  });
  
  console.log(`\n📊 Total Violations: ${violations.length}\n`);
  return false;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  console.log('🔒 CANONSTRATA STORYBOOK GATEKEEPER\n');
  
  const componentsPath = path.join(process.cwd(), 'src/components/ui');
  
  if (!fs.existsSync(componentsPath)) {
    console.error('❌ Components directory not found');
    process.exit(1);
  }
  
  const components = scanComponents(componentsPath);
  console.log(`📦 Found ${components.length} components\n`);
  
  const violations = enforceRules(components);
  const passed = reportViolations(violations);
  
  if (!passed) {
    process.exit(1);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  RULES,
  scanComponents,
  enforceRules,
  reportViolations,
};

// Run if called directly
if (require.main === module) {
  main();
}
