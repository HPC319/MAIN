'use client'

import { motion, type HTMLMotionProps as FramerHTMLMotionProps, type Variants as FramerVariants, type Easing as FramerEasing } from 'framer-motion';

export { motion };
export type HTMLMotionProps<T extends keyof HTMLMotionComponents> = FramerHTMLMotionProps<T>;
export type Variants = FramerVariants;
export type Easing = FramerEasing;

type HTMLMotionComponents = typeof motion & {
  div: typeof motion.div;
  span: typeof motion.span;
  section: typeof motion.section;
  article: typeof motion.article;
  button: typeof motion.button;
};
