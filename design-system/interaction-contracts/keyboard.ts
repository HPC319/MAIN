/**
 * Keyboard Navigation Contracts
 * Standardized keyboard interaction patterns
 */

export const keyboardContracts = {
  // Standard keyboard navigation
  navigable: {
    tabIndex: 0,
    role: "button",
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (e.currentTarget as HTMLElement).click();
      }
    },
  },
  
  // List navigation (arrow keys)
  listItem: {
    tabIndex: -1,
    role: "option",
  },
  
  // Menu navigation
  menuItem: {
    tabIndex: -1,
    role: "menuitem",
  },
  
  // Dialog/Modal navigation
  dialog: {
    role: "dialog",
    "aria-modal": true,
  },
} as const;

export type KeyboardContract = keyof typeof keyboardContracts;

// Helper for escape key
export const handleEscape = (callback: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Escape") {
    callback();
  }
};

// Helper for arrow navigation
export const handleArrowNavigation = (
  e: React.KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
) => {
  let newIndex = currentIndex;
  
  if (e.key === "ArrowDown") {
    e.preventDefault();
    newIndex = Math.min(currentIndex + 1, items.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    newIndex = Math.max(currentIndex - 1, 0);
  }
  
  if (newIndex !== currentIndex) {
    items[newIndex]?.focus();
  }
  
  return newIndex;
};
