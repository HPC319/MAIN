/**
 * Motion Kernel - CanonStrata Foundation
 * All motion flows through this kernel
 * Preset-only API - no raw configurations allowed
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motionTokens, type MotionAnimation } from '@/design-system/tokens/motion.tokens';

type MotionPreset = MotionAnimation;

interface MotionConfig {
  preset: MotionPreset;
  delay?: number;
  onComplete?: () => void;
}

interface MotionBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  motion?: MotionConfig;
  children: React.ReactNode;
}

interface MotionTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  motion?: MotionConfig;
  children: React.ReactNode;
}

interface MotionImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  motion?: MotionConfig;
}

export function MotionBlock({ motion, children, style, ...props }: MotionBlockProps) {
  const [isVisible, setIsVisible] = useState(!motion);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motion) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      motion.onComplete?.();
    }, motion.delay || 0);

    return () => clearTimeout(timer);
  }, [motion]);

  if (!motion) {
    return (
      <div ref={ref} style={style} {...props}>
        {children}
      </div>
    );
  }

  const config = motionTokens.animation[motion.preset];
  const animationStyle = isVisible
    ? {
        ...style,
        animation: `${motion.preset} ${config.duration}ms ${config.easing}`,
      }
    : {
        ...style,
        opacity: 0,
      };

  return (
    <div ref={ref} style={animationStyle} {...props}>
      {children}
    </div>
  );
}

export function MotionText({ motion, children, style, ...props }: MotionTextProps) {
  const [isVisible, setIsVisible] = useState(!motion);

  useEffect(() => {
    if (!motion) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      motion.onComplete?.();
    }, motion.delay || 0);

    return () => clearTimeout(timer);
  }, [motion]);

  if (!motion) {
    return (
      <span style={style} {...props}>
        {children}
      </span>
    );
  }

  const config = motionTokens.animation[motion.preset];
  const animationStyle = isVisible
    ? {
        ...style,
        animation: `${motion.preset} ${config.duration}ms ${config.easing}`,
      }
    : {
        ...style,
        opacity: 0,
      };

  return (
    <span style={animationStyle} {...props}>
      {children}
    </span>
  );
}

export function MotionImage({ motion, style, ...props }: MotionImageProps) {
  const [isVisible, setIsVisible] = useState(!motion);

  useEffect(() => {
    if (!motion) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      motion.onComplete?.();
    }, motion.delay || 0);

    return () => clearTimeout(timer);
  }, [motion]);

  if (!motion) {
    return <img style={style} {...props} />;
  }

  const config = motionTokens.animation[motion.preset];
  const animationStyle = isVisible
    ? {
        ...style,
        animation: `${motion.preset} ${config.duration}ms ${config.easing}`,
      }
    : {
        ...style,
        opacity: 0,
      };

  return <img style={animationStyle} {...props} />;
}

export function useMotion(preset: MotionPreset, delay = 0) {
  const [isActive, setIsActive] = useState(false);
  const config = motionTokens.animation[preset];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    isActive,
    config,
    style: isActive
      ? {
          animation: `${preset} ${config.duration}ms ${config.easing}`,
        }
      : {
          opacity: 0,
        },
  };
}

export { motionTokens } from '@/design-system/tokens/motion.tokens';
export type { MotionAnimation, MotionDuration, MotionEasing, MotionTransition } from '@/design-system/tokens/motion.tokens';
