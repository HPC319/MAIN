/**
 * Focus Management Utilities
 * Handles focus trapping, visible focus indicators, and keyboard navigation
 */

import { useEffect, useRef, useCallback } from 'react';

/**
 * Focus trap for modal dialogs and overlays
 */
export function useFocusTrap(enabled: boolean = true) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstElement.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      // Restore focus
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    };
  }, [enabled]);

  return containerRef;
}

/**
 * Get all focusable elements within container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (element) => {
      return (
        element.offsetWidth > 0 &&
        element.offsetHeight > 0 &&
        !element.hasAttribute('hidden') &&
        !element.getAttribute('aria-hidden')
      );
    }
  );
}

/**
 * Focus visible indicator management
 */
export function useFocusVisible() {
  const hadKeyboardEvent = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        hadKeyboardEvent.current = true;
      }
    };

    const handleMouseDown = () => {
      hadKeyboardEvent.current = false;
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (hadKeyboardEvent.current) {
        target.setAttribute('data-focus-visible', 'true');
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      target.removeAttribute('data-focus-visible');
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('focus', handleFocus, true);
    window.addEventListener('blur', handleBlur, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('focus', handleFocus, true);
      window.removeEventListener('blur', handleBlur, true);
    };
  }, []);
}

/**
 * Keyboard navigation handler
 */
export interface KeyboardNavigationOptions {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
}

export function useKeyboardNavigation(
  options: KeyboardNavigationOptions,
  enabled: boolean = true
) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled) return;

      const handlers: Record<string, (() => void) | undefined> = {
        ArrowUp: options.onArrowUp,
        ArrowDown: options.onArrowDown,
        ArrowLeft: options.onArrowLeft,
        ArrowRight: options.onArrowRight,
        Home: options.onHome,
        End: options.onEnd,
        Enter: options.onEnter,
        Escape: options.onEscape,
        ' ': options.onSpace,
      };

      const handler = handlers[e.key];
      if (handler) {
        e.preventDefault();
        handler();
      }
    },
    [options, enabled]
  );

  return { onKeyDown: handleKeyDown };
}

/**
 * Roving tabindex for keyboard navigation in lists
 */
export function useRovingTabIndex(items: HTMLElement[], activeIndex: number) {
  useEffect(() => {
    items.forEach((item, index) => {
      if (index === activeIndex) {
        item.setAttribute('tabindex', '0');
        item.focus();
      } else {
        item.setAttribute('tabindex', '-1');
      }
    });
  }, [items, activeIndex]);
}

/**
 * Focus first error in form
 */
export function focusFirstError(formElement: HTMLFormElement): boolean {
  const invalidElement = formElement.querySelector<HTMLElement>(
    '[aria-invalid="true"], .error, [data-error]'
  );

  if (invalidElement) {
    invalidElement.focus();
    
    // Scroll into view with smooth behavior
    invalidElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    return true;
  }

  return false;
}

/**
 * Skip to content link
 */
export function createSkipLink(targetId: string, label: string = 'Skip to main content') {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = label;
  skipLink.className = 'skip-link';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  });

  return skipLink;
}

/**
 * Restore focus after action
 */
export function useRestoreFocus() {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current && previousFocusRef.current.focus) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  return { saveFocus, restoreFocus };
}

/**
 * Lock body scroll when modal is open
 */
export function useScrollLock(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPadding = window.getComputedStyle(document.body).paddingRight;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPadding;
    };
  }, [enabled]);
}

/**
 * Manage focus order with data-focus-order attribute
 */
export function manageFocusOrder(container: HTMLElement): void {
  const orderedElements = Array.from(
    container.querySelectorAll<HTMLElement>('[data-focus-order]')
  ).sort((a, b) => {
    const orderA = parseInt(a.getAttribute('data-focus-order') || '0', 10);
    const orderB = parseInt(b.getAttribute('data-focus-order') || '0', 10);
    return orderA - orderB;
  });

  orderedElements.forEach((element, index) => {
    element.setAttribute('tabindex', index === 0 ? '0' : '-1');
  });
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (
    element.hasAttribute('disabled') ||
    element.getAttribute('aria-disabled') === 'true' ||
    element.getAttribute('tabindex') === '-1' ||
    element.hasAttribute('hidden') ||
    element.getAttribute('aria-hidden') === 'true'
  ) {
    return false;
  }

  const focusableElements = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
  const isNativelyFocusable = focusableElements.includes(element.tagName);
  const hasTabindex = element.hasAttribute('tabindex');

  return isNativelyFocusable || hasTabindex;
}
