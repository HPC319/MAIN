#!/usr/bin/env node

/**
 * CanonStrata Documentation Verification
 * Constitutional Enforcement: Docs must align with system truth
 */

const fs = require('fs');
const path = require('path');

const ERRORS = [];
const README_PATH = path.join(__dirname, '../README.md');

function validate() {
  // Verify README exists
  if (!fs.existsSync(README_PATH)) {
    ERRORS.push('CONSTITUTIONAL VIOLATION: README.md does not exist');
    return false;
  }

  const readme = fs.readFileSync(README_PATH, 'utf8');

  // Constitutional requirements
  const required = [
    'CanonStrata',
    'constitutional',
    'load-bearing',
    'architectural substrate',
    'NON-NEGOTIABLE',
    'INVARIANT',
    'refuses invalid code'
  ];

  const forbidden = [
    'template',
    'starter kit',
    'boilerplate',
    'example',
    'demo',
    'thanks to',
    'built with'
  ];

  // Check required terms
  required.forEach(term => {
    if (!readme.includes(term)) {
      ERRORS.push(`MISSING REQUIRED CONSTITUTIONAL TERM: "${term}"`);
    }
  });

  // Check forbidden contamination
  forbidden.forEach(term => {
    const regex = new RegExp(term, 'i');
    if (regex.test(readme)) {
      ERRORS.push(`CONTAMINATION DETECTED: "${term}" violates immutability`);
    }
  });

  // Verify token-first enforcement mentioned
  if (!readme.includes('token') && !readme.includes('Token')) {
    ERRORS.push('TOKEN GOVERNANCE: Documentation must reference token-first system');
  }

  // Verify motion governance mentioned
  if (!readme.includes('motion')) {
    ERRORS.push('MOTION GOVERNANCE: Documentation must reference motion constraints');
  }

  return ERRORS.length === 0;
}

function report() {
  if (ERRORS.length === 0) {
    console.log('✓ DOCUMENTATION VERIFIED: Constitution intact');
    process.exit(0);
  } else {
    console.error('✗ DOCUMENTATION VERIFICATION FAILED\n');
    ERRORS.forEach(err => console.error(`  ${err}`));
    console.error('\nCI BLOCKED: Fix documentation violations');
    process.exit(1);
  }
}

validate();
report();
