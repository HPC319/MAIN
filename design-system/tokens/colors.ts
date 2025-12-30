/**
 * Design System - Color Tokens
 * 
 * Comprehensive color palette with semantic naming and HSL format
 * for easy theme manipulation and dark mode support.
 */

export const colors = {
  // Base Colors - Grayscale
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  
  // Gray Scale (50-950)
  gray: {
    50: 'hsl(210, 40%, 98%)',
    100: 'hsl(210, 40%, 96%)',
    200: 'hsl(214, 32%, 91%)',
    300: 'hsl(213, 27%, 84%)',
    400: 'hsl(215, 20%, 65%)',
    500: 'hsl(215, 16%, 47%)',
    600: 'hsl(215, 19%, 35%)',
    700: 'hsl(215, 25%, 27%)',
    800: 'hsl(217, 33%, 17%)',
    900: 'hsl(222, 47%, 11%)',
    950: 'hsl(222, 84%, 5%)',
  },

  // Primary Brand Colors
  primary: {
    50: 'hsl(214, 100%, 97%)',
    100: 'hsl(214, 95%, 93%)',
    200: 'hsl(213, 97%, 87%)',
    300: 'hsl(212, 96%, 78%)',
    400: 'hsl(213, 94%, 68%)',
    500: 'hsl(217, 91%, 60%)',
    600: 'hsl(221, 83%, 53%)',
    700: 'hsl(224, 76%, 48%)',
    800: 'hsl(226, 71%, 40%)',
    900: 'hsl(224, 64%, 33%)',
    950: 'hsl(226, 55%, 21%)',
  },

  // Secondary/Accent Colors
  secondary: {
    50: 'hsl(210, 40%, 98%)',
    100: 'hsl(210, 40%, 96%)',
    200: 'hsl(214, 32%, 91%)',
    300: 'hsl(213, 27%, 84%)',
    400: 'hsl(215, 20%, 65%)',
    500: 'hsl(215, 16%, 47%)',
    600: 'hsl(215, 19%, 35%)',
    700: 'hsl(215, 25%, 27%)',
    800: 'hsl(217, 33%, 17%)',
    900: 'hsl(222, 47%, 11%)',
    950: 'hsl(222, 84%, 5%)',
  },

  // Semantic Colors - Success
  success: {
    50: 'hsl(138, 76%, 97%)',
    100: 'hsl(141, 84%, 93%)',
    200: 'hsl(141, 79%, 85%)',
    300: 'hsl(142, 77%, 73%)',
    400: 'hsl(142, 69%, 58%)',
    500: 'hsl(142, 71%, 45%)',
    600: 'hsl(142, 76%, 36%)',
    700: 'hsl(142, 72%, 29%)',
    800: 'hsl(143, 64%, 24%)',
    900: 'hsl(144, 61%, 20%)',
    950: 'hsl(145, 80%, 10%)',
  },

  // Semantic Colors - Warning
  warning: {
    50: 'hsl(48, 100%, 96%)',
    100: 'hsl(48, 96%, 89%)',
    200: 'hsl(48, 97%, 77%)',
    300: 'hsl(46, 97%, 65%)',
    400: 'hsl(43, 96%, 56%)',
    500: 'hsl(38, 92%, 50%)',
    600: 'hsl(32, 95%, 44%)',
    700: 'hsl(26, 90%, 37%)',
    800: 'hsl(23, 83%, 31%)',
    900: 'hsl(22, 78%, 26%)',
    950: 'hsl(21, 92%, 14%)',
  },

  // Semantic Colors - Error/Destructive
  error: {
    50: 'hsl(0, 86%, 97%)',
    100: 'hsl(0, 93%, 94%)',
    200: 'hsl(0, 96%, 89%)',
    300: 'hsl(0, 94%, 82%)',
    400: 'hsl(0, 91%, 71%)',
    500: 'hsl(0, 84%, 60%)',
    600: 'hsl(0, 72%, 51%)',
    700: 'hsl(0, 74%, 42%)',
    800: 'hsl(0, 70%, 35%)',
    900: 'hsl(0, 63%, 31%)',
    950: 'hsl(0, 75%, 16%)',
  },

  // Semantic Colors - Info
  info: {
    50: 'hsl(204, 100%, 97%)',
    100: 'hsl(204, 94%, 94%)',
    200: 'hsl(201, 94%, 86%)',
    300: 'hsl(199, 95%, 74%)',
    400: 'hsl(198, 93%, 60%)',
    500: 'hsl(199, 89%, 48%)',
    600: 'hsl(200, 98%, 39%)',
    700: 'hsl(201, 96%, 32%)',
    800: 'hsl(201, 90%, 27%)',
    900: 'hsl(202, 80%, 24%)',
    950: 'hsl(204, 80%, 16%)',
  },

  // Additional Accent Colors
  purple: {
    50: 'hsl(270, 100%, 98%)',
    100: 'hsl(269, 100%, 95%)',
    200: 'hsl(269, 100%, 92%)',
    300: 'hsl(269, 97%, 85%)',
    400: 'hsl(270, 95%, 75%)',
    500: 'hsl(271, 91%, 65%)',
    600: 'hsl(272, 82%, 57%)',
    700: 'hsl(273, 73%, 50%)',
    800: 'hsl(273, 67%, 42%)',
    900: 'hsl(274, 66%, 35%)',
    950: 'hsl(275, 88%, 23%)',
  },

  pink: {
    50: 'hsl(327, 73%, 97%)',
    100: 'hsl(326, 78%, 95%)',
    200: 'hsl(326, 85%, 90%)',
    300: 'hsl(327, 87%, 82%)',
    400: 'hsl(329, 86%, 70%)',
    500: 'hsl(330, 81%, 60%)',
    600: 'hsl(333, 71%, 51%)',
    700: 'hsl(335, 78%, 42%)',
    800: 'hsl(336, 74%, 35%)',
    900: 'hsl(336, 69%, 30%)',
    950: 'hsl(336, 84%, 17%)',
  },

  // Theme Semantic Tokens (CSS Variable References)
  semantic: {
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
  },
} as const

export type ColorToken = keyof typeof colors
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

/**
 * Helper function to get color value
 */
export function getColor(token: ColorToken, shade?: ColorShade): string {
  const color = colors[token]
  if (typeof color === 'string') {
    return color
  }
  if (shade && typeof color === 'object') {
    return color[shade as keyof typeof color] as string
  }
  return ''
}
