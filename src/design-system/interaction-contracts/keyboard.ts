export const keyboardHelpers = {
  escapeKey: (handler: () => void) => (e: KeyboardEvent) => {
    if (e.key === "Escape") handler();
  },
  enterKey: (handler: () => void) => (e: KeyboardEvent) => {
    if (e.key === "Enter") handler();
  },
};
