/**
 * Accessibility (A11y) Utilities
 * Centralized exports for all accessibility tools
 */

// Audit utilities
export {
  runA11yAudit,
  logViolations,
  auditComponent,
  createAuditReport,
  meetsA11yThreshold,
  type A11yViolation,
  type A11yAuditResult,
} from './audit';

// ARIA helpers
export {
  getAriaAttributes,
  createAriaLabel,
  getButtonAria,
  getDialogAria,
  getMenuAria,
  getMenuItemAria,
  getTabAria,
  getTabPanelAria,
  getComboboxAria,
  getFormFieldAria,
  getLiveRegionAria,
  validateAriaAttributes,
  generateAriaId,
  announceToScreenReader,
  type AriaRole,
  type AriaAttributes,
} from './aria-helpers';

// Focus management
export {
  useFocusTrap,
  getFocusableElements,
  useFocusVisible,
  useKeyboardNavigation,
  useRovingTabIndex,
  focusFirstError,
  createSkipLink,
  useRestoreFocus,
  useScrollLock,
  manageFocusOrder,
  isFocusable,
  type KeyboardNavigationOptions,
} from './focus-management';
