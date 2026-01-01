import type { Config } from 'tailwindcss';
import colors from './design-system/tokens/colors.tokens.json';
import spacing from './design-system/tokens/spacing.tokens.json';
import typography from './design-system/tokens/typography.tokens.json';
import breakpoints from './design-system/tokens/breakpoints.tokens.json';
import motion from './design-system/tokens/motion.tokens.json';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/governed/**/*.{js,ts,jsx,tsx,mdx}',
    './src/surface/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.colors.brand,
        neutral: colors.colors.neutral,
        semantic: colors.colors.semantic,
      },
      spacing: spacing.spacing,
      fontFamily: {
        sans: typography.typography.fontFamily.sans,
        serif: typography.typography.fontFamily.serif,
        mono: typography.typography.fontFamily.mono,
      },
      fontSize: Object.fromEntries(
        Object.entries(typography.typography.fontSize).map(([key, value]) => [
          key,
          Array.isArray(value) ? value : [value],
        ])
      ),
      fontWeight: typography.typography.fontWeight,
      letterSpacing: typography.typography.letterSpacing,
      lineHeight: typography.typography.lineHeight,
      screens: breakpoints.breakpoints,
      containers: breakpoints.containers,
      transitionDuration: motion.motion.duration,
      transitionTimingFunction: motion.motion.easing,
    },
  },
  plugins: [],
};

export default config;
