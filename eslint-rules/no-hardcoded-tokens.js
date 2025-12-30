/**
 * CANONSTRATA INVARIANT ENFORCEMENT
 * Prohibits hardcoded style values - enforces token-first design system
 */

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Enforce design token usage, prohibit hardcoded values',
      category: 'CanonStrata Constitutional Law'
    },
    messages: {
      noHardcodedColor: 'CANONSTRATA VIOLATION: Hardcoded color detected. Use design tokens only.',
      noHardcodedSpacing: 'CANONSTRATA VIOLATION: Hardcoded spacing detected. Use design tokens only.',
      noHardcodedSize: 'CANONSTRATA VIOLATION: Hardcoded size detected. Use design tokens only.'
    }
  },
  create(context) {
    return {
      Literal(node) {
        const value = node.value;
        if (typeof value === 'string') {
          // Detect hex colors, rgb, rgba
          if (/^#[0-9A-Fa-f]{3,8}$/.test(value) || /^rgba?\(/.test(value)) {
            context.report({ node, messageId: 'noHardcodedColor' });
          }
          // Detect hardcoded pixel/rem values in strings
          if (/^\d+(px|rem|em)$/.test(value)) {
            context.report({ node, messageId: 'noHardcodedSpacing' });
          }
        }
      }
    };
  }
};
