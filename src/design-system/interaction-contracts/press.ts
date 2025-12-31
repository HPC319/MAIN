const pressStatesObj = {
  scale: "active:scale-95 transition-transform duration-100",
  opacity: "active:opacity-80 transition-opacity duration-100",
} as const;

export const pressStates: typeof pressStatesObj = pressStatesObj;
