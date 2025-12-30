/**
 * CANONSTRATA CUSTOM ESLINT RULES
 * Constitutional enforcement at compile time
 */

module.exports = {
  rules: {
    'no-hardcoded-tokens': require('./no-hardcoded-tokens'),
    'motion-kernel-only': require('./motion-kernel-only'),
    'server-component-default': require('./server-component-default')
  }
};
