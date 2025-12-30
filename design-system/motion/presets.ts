/**
 * Motion Presets
 * Reusable animation variants for Framer Motion
 */

import { Variants } from "framer-motion";
import { duration, easing, intensity } from "./config";

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal / 1000,
      ease: easing.easeOut,
    },
  },
};

export const slideIn: Variants = {
  hidden: {
    opacity: 0,
    y: intensity.moderate.y,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal / 1000,
      ease: easing.easeOut,
    },
  },
};

export const slideInFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -intensity.moderate.y,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal / 1000,
      ease: easing.easeOut,
    },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: intensity.moderate.y,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal / 1000,
      ease: easing.easeOut,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: intensity.moderate.scale,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal / 1000,
      ease: easing.easeOut,
    },
  },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerFast = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerSlow = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
