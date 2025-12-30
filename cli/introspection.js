#!/usr/bin/env node

/**
 * CANONSTRATA CLI INTROSPECTION
 * Explains why code is invalid and cites violated invariants
 */

const fs = require('fs');
const path = require('path');

const INVARIANTS = {
  TOKEN_GATES: {
    description: 'Design tokens are mandatory. Hardcoded values cause build failure.',
    violations: [
      'Hardcoded colors (#hex, rgb, rgba)',
      'Hardcoded spacing (px, rem, em)',
      'Inline style attributes'
    ],
    correction: 'Use design tokens from the token system. Reference tokens by semantic name.'
  },
  MOTION_GOVERNANCE: {
    description: 'Only kernel-authorized motion is allowed.',
    violations: [
      'Importing framer-motion',
      'Importing react-spring',
      'Importing gsap or other animation libraries'
    ],
    correction: 'Remove unauthorized motion imports. Use kernel motion system only.'
  },
  SERVER_COMPONENT_DEFAULT: {
    description: 'Server Components are the default. Client components require justification.',
    violations: [
      "Unnecessary 'use client' directive"
    ],
    correction: "Remove 'use client' unless component requires browser APIs or interactivity."
  },
  SYSTEM_PROHIBITIONS: {
    description: 'Compile-time prohibitions enforced by AST and lint rules.',
    violations: [
      'Inline styles',
      'Non-token CSS',
      'SaaS coupling',
      'Unauthorized motion',
      'Client component misuse'
    ],
    correction: 'Remove prohibited patterns. Follow CanonStrata constitutional law.'
  }
};

function explainViolation(violationType) {
  const invariant = INVARIANTS[violationType];
  
  if (!invariant) {
    console.error(`Unknown violation type: ${violationType}`);
    console.log('\nAvailable invariants:');
    Object.keys(INVARIANTS).forEach(key => {
      console.log(`  - ${key}`);
    });
    process.exit(1);
  }
  
  console.log('\n=== CANONSTRATA VIOLATION EXPLANATION ===\n');
  console.log(`INVARIANT: ${violationType}\n`);
  console.log(`DESCRIPTION:\n  ${invariant.description}\n`);
  console.log('VIOLATIONS:');
  invariant.violations.forEach(v => console.log(`  - ${v}`));
  console.log(`\nCORRECTION PATH:\n  ${invariant.correction}\n`);
}

function listInvariants() {
  console.log('\n=== CANONSTRATA CONSTITUTIONAL INVARIANTS ===\n');
  Object.entries(INVARIANTS).forEach(([key, value]) => {
    console.log(`${key}:`);
    console.log(`  ${value.description}\n`);
  });
}

// CLI Interface
const command = process.argv[2];

if (!command || command === 'help') {
  console.log('CANONSTRATA CLI INTROSPECTION\n');
  console.log('Usage:');
  console.log('  node cli/introspection.js explain <INVARIANT>  - Explain violation');
  console.log('  node cli/introspection.js list                 - List all invariants');
  console.log('  node cli/introspection.js help                 - Show this help');
  process.exit(0);
}

if (command === 'list') {
  listInvariants();
} else if (command === 'explain') {
  const violationType = process.argv[3];
  if (!violationType) {
    console.error('Error: Please specify an invariant to explain');
    console.log('Usage: node cli/introspection.js explain <INVARIANT>');
    process.exit(1);
  }
  explainViolation(violationType);
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run with "help" to see available commands');
  process.exit(1);
}
