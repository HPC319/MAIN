const focusStatesObj = {
  ring: "focus:ring-2 focus:ring-blue-500 focus:outline-none",
  underline: "focus:border-b-2 focus:border-blue-500",
  highlight: "focus:bg-blue-50 dark:focus:bg-blue-900/20",
  visible: "focus:ring-2 focus:ring-blue-500 focus:outline-none",
  accent: "focus:bg-blue-50 dark:focus:bg-blue-900/20",
} as const;

export const focusStates: typeof focusStatesObj = focusStatesObj;
