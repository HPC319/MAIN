/**
 * CANONSTRATA RENDERING CONTRACT
 * Server Components by default - 'use client' must be justified
 */

module.exports = {
  meta: {
    type: 'warning',
    docs: {
      description: 'Enforce Server Component default, warn on client components',
      category: 'CanonStrata Constitutional Law'
    },
    messages: {
      clientComponentDetected: 'CANONSTRATA WARNING: Client component detected. Verify necessity.'
    }
  },
  create(context) {
    return {
      Program(node) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText();
        if (text.includes("'use client'") || text.includes('"use client"')) {
          context.report({ 
            node, 
            messageId: 'clientComponentDetected',
            loc: { line: 1, column: 0 }
          });
        }
      }
    };
  }
};
