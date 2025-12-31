// @ts-nocheck
/**
 * Accessibility Audit Utilities
 * Integrates axe-core for automated accessibility testing
 */

export interface A11yViolation {
  id: string;
  impact: 'minor' | 'moderate' | 'serious' | 'critical';
  description: string;
  help: string;
  helpUrl: string;
  nodes: Array<{
    html: string;
    target: string[];
    failureSummary: string;
  }>;
}

export interface A11yAuditResult {
  violations: A11yViolation[];
  passes: number;
  incomplete: number;
  timestamp: string;
}

/**
 * Run accessibility audit on element or document
 */
export async function runA11yAudit(
  element: HTMLElement | Document = document
): Promise<A11yAuditResult> {
  // Dynamic import for client-side only
  if (typeof window === 'undefined') {
    throw new Error('A11y audit can only run in browser environment');
  }

  try {
    const axe = await import('axe-core');
    const results = await axe.default.run(element);

    return {
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact as A11yViolation['impact'],
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes.map((n) => ({
          html: n.html,
          target: n.target,
          failureSummary: n.failureSummary || '',
        })),
      })),
      passes: results.passes.length,
      incomplete: results.incomplete.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('A11y audit failed:', error);
    throw error;
  }
}

/**
 * Log violations to console with formatting
 */
export function logViolations(violations: A11yViolation[]): void {
  if (violations.length === 0) {
    console.log('%c✓ No accessibility violations found', 'color: green; font-weight: bold;');
    return;
  }

  console.group(`%c⚠ ${violations.length} Accessibility Violations`, 'color: red; font-weight: bold;');
  
  violations.forEach((violation) => {
    console.group(`${violation.impact?.toUpperCase()}: ${violation.id}`);
    console.log('Description:', violation.description);
    console.log('Help:', violation.help);
    console.log('Learn more:', violation.helpUrl);
    console.log('Affected elements:', violation.nodes.length);
    
    violation.nodes.forEach((node, index) => {
      console.group(`Element ${index + 1}`);
      console.log('HTML:', node.html);
      console.log('Target:', node.target);
      console.log('Issue:', node.failureSummary);
      console.groupEnd();
    });
    
    console.groupEnd();
  });
  
  console.groupEnd();
}

/**
 * Audit component in development mode
 */
export async function auditComponent(
  componentName: string,
  element: HTMLElement
): Promise<A11yAuditResult> {
  console.log(`🔍 Auditing component: ${componentName}`);
  const result = await runA11yAudit(element);
  
  if (result.violations.length > 0) {
    console.log(`%c${componentName} - ${result.violations.length} violations`, 'color: orange;');
    logViolations(result.violations);
  } else {
    console.log(`%c${componentName} - Passed all checks ✓`, 'color: green;');
  }
  
  return result;
}

/**
 * Create audit reporter for CI/CD
 */
export function createAuditReport(results: A11yAuditResult): string {
  const { violations, passes, incomplete, timestamp } = results;
  
  let report = `# Accessibility Audit Report\n\n`;
  report += `**Generated:** ${timestamp}\n\n`;
  report += `## Summary\n\n`;
  report += `- ✓ Passed: ${passes}\n`;
  report += `- ⚠ Violations: ${violations.length}\n`;
  report += `- ⏳ Incomplete: ${incomplete}\n\n`;
  
  if (violations.length > 0) {
    report += `## Violations\n\n`;
    
    violations.forEach((violation, index) => {
      report += `### ${index + 1}. ${violation.id}\n\n`;
      report += `**Impact:** ${violation.impact}\n\n`;
      report += `**Description:** ${violation.description}\n\n`;
      report += `**Help:** ${violation.help}\n\n`;
      report += `**Learn More:** [${violation.helpUrl}](${violation.helpUrl})\n\n`;
      report += `**Affected Elements:** ${violation.nodes.length}\n\n`;
      
      violation.nodes.forEach((node, nodeIndex) => {
        report += `#### Element ${nodeIndex + 1}\n\n`;
        report += `\`\`\`html\n${node.html}\n\`\`\`\n\n`;
        report += `**Target:** \`${node.target.join(', ')}\`\n\n`;
        report += `**Issue:** ${node.failureSummary}\n\n`;
      });
    });
  }
  
  return report;
}

/**
 * Check if audit passes threshold
 */
export function meetsA11yThreshold(
  result: A11yAuditResult,
  maxCritical: number = 0,
  maxSerious: number = 0,
  maxModerate: number = 5
): boolean {
  const critical = result.violations.filter(v => v.impact === 'critical').length;
  const serious = result.violations.filter(v => v.impact === 'serious').length;
  const moderate = result.violations.filter(v => v.impact === 'moderate').length;
  
  return critical <= maxCritical && serious <= maxSerious && moderate <= maxModerate;
}
