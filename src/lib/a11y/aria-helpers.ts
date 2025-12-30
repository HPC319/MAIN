/**
 * ARIA Attribute Helpers and Validators
 * Provides utilities for managing ARIA attributes correctly
 */

export type AriaRole =
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'menu'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'
  | 'radio'
  | 'slider'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'tooltip'
  | 'tree'
  | 'treeitem'
  | 'grid'
  | 'gridcell'
  | 'listbox'
  | 'combobox'
  | 'navigation'
  | 'main'
  | 'region'
  | 'article'
  | 'banner'
  | 'complementary'
  | 'contentinfo'
  | 'form'
  | 'search';

export interface AriaAttributes {
  role?: AriaRole;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-selected'?: boolean;
  'aria-pressed'?: boolean | 'mixed';
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  'aria-modal'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-required'?: boolean;
  'aria-readonly'?: boolean;
}

/**
 * Generate ARIA attributes for interactive elements
 */
export function getAriaAttributes(attrs: AriaAttributes): Record<string, string | boolean> {
  const ariaAttrs: Record<string, string | boolean> = {};

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      ariaAttrs[key] = value;
    }
  });

  return ariaAttrs;
}

/**
 * Create accessible label
 */
export function createAriaLabel(label: string, description?: string): AriaAttributes {
  return {
    'aria-label': label,
    ...(description && { 'aria-describedby': description }),
  };
}

/**
 * Create button ARIA attributes
 */
export function getButtonAria(
  pressed?: boolean,
  expanded?: boolean,
  controls?: string
): AriaAttributes {
  return {
    role: 'button',
    ...(pressed !== undefined && { 'aria-pressed': pressed }),
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
    ...(controls && { 'aria-controls': controls }),
  };
}

/**
 * Create dialog ARIA attributes
 */
export function getDialogAria(
  labelledby: string,
  describedby?: string,
  modal: boolean = true
): AriaAttributes {
  return {
    role: 'dialog',
    'aria-labelledby': labelledby,
    'aria-modal': modal,
    ...(describedby && { 'aria-describedby': describedby }),
  };
}

/**
 * Create menu ARIA attributes
 */
export function getMenuAria(labelledby?: string): AriaAttributes {
  return {
    role: 'menu',
    ...(labelledby && { 'aria-labelledby': labelledby }),
  };
}

/**
 * Create menu item ARIA attributes
 */
export function getMenuItemAria(
  type: 'menuitem' | 'menuitemcheckbox' | 'menuitemradio' = 'menuitem',
  checked?: boolean
): AriaAttributes {
  return {
    role: type,
    ...(checked !== undefined && { 'aria-checked': checked }),
  };
}

/**
 * Create tab ARIA attributes
 */
export function getTabAria(
  selected: boolean,
  controls: string,
  labelledby?: string
): AriaAttributes {
  return {
    role: 'tab',
    'aria-selected': selected,
    'aria-controls': controls,
    ...(labelledby && { 'aria-labelledby': labelledby }),
  };
}

/**
 * Create tabpanel ARIA attributes
 */
export function getTabPanelAria(labelledby: string, hidden?: boolean): AriaAttributes {
  return {
    role: 'tabpanel',
    'aria-labelledby': labelledby,
    ...(hidden !== undefined && { 'aria-hidden': hidden }),
  };
}

/**
 * Create combobox ARIA attributes
 */
export function getComboboxAria(
  expanded: boolean,
  controls: string,
  activedescendant?: string
): AriaAttributes {
  return {
    role: 'combobox',
    'aria-expanded': expanded,
    'aria-controls': controls,
    'aria-haspopup': 'listbox',
    ...(activedescendant && { 'aria-activedescendant': activedescendant }),
  };
}

/**
 * Create form field ARIA attributes
 */
export function getFormFieldAria(
  invalid?: boolean,
  required?: boolean,
  describedby?: string
): AriaAttributes {
  return {
    ...(invalid !== undefined && { 'aria-invalid': invalid }),
    ...(required !== undefined && { 'aria-required': required }),
    ...(describedby && { 'aria-describedby': describedby }),
  };
}

/**
 * Create live region ARIA attributes
 */
export function getLiveRegionAria(
  live: 'polite' | 'assertive' = 'polite',
  atomic: boolean = true,
  relevant: 'additions' | 'removals' | 'text' | 'all' = 'additions'
): AriaAttributes {
  return {
    'aria-live': live,
    'aria-atomic': atomic,
    'aria-relevant': relevant,
  };
}

/**
 * Validate ARIA attribute usage
 */
export function validateAriaAttributes(
  element: HTMLElement,
  expectedRole?: AriaRole
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const role = element.getAttribute('role');

  // Check if role matches expected
  if (expectedRole && role !== expectedRole) {
    errors.push(`Expected role="${expectedRole}" but found role="${role}"`);
  }

  // Check for aria-label or aria-labelledby
  const hasLabel =
    element.hasAttribute('aria-label') ||
    element.hasAttribute('aria-labelledby') ||
    element.textContent?.trim();

  if (!hasLabel && role && ['button', 'link', 'menuitem'].includes(role)) {
    errors.push(`Element with role="${role}" requires accessible label`);
  }

  // Check aria-expanded is boolean
  const expanded = element.getAttribute('aria-expanded');
  if (expanded && expanded !== 'true' && expanded !== 'false') {
    errors.push(`aria-expanded must be "true" or "false", got "${expanded}"`);
  }

  // Check aria-controls references valid ID
  const controls = element.getAttribute('aria-controls');
  if (controls && !document.getElementById(controls)) {
    errors.push(`aria-controls="${controls}" references non-existent element`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate unique ID for ARIA references
 */
let idCounter = 0;
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Date.now()}-${++idCounter}`;
}

/**
 * Announce to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
