/**
 * CANONSTRATA MOTION GOVERNANCE
 * Only kernel-authorized motion allowed
 */

module.exports = {
  meta: {
    type: 'error',
    docs: {
      description: 'Restrict motion imports to CanonStrata kernel only',
      category: 'CanonStrata Constitutional Law'
    },
    messages: {
      unauthorizedMotion: 'CANONSTRATA VIOLATION: Unauthorized motion library. Only kernel motion allowed.'
    }
  },
  create(context) {
    const prohibitedLibraries = ['framer-motion', 'react-spring', 'gsap', 'anime.js'];
    
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (prohibitedLibraries.includes(source)) {
          context.report({ node, messageId: 'unauthorizedMotion' });
        }
      }
    };
  }
};
