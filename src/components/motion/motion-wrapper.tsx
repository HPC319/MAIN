/**
 * MotionWrapper Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock, type MotionIntent } from '@/lib/motion-kernel';

export interface MotionWrapperProps {
  children: React.ReactNode;
  intent?: MotionIntent;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * MotionWrapper - Generic wrapper with configurable intent
 */
export const MotionWrapper = React.forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, intent = 'ENTRY_SOFT', delay = 0, style, className }, ref) => {
    return (
      <MotionBlock
        ref={ref}
        intent={intent}
        delay={delay}
        style={style as any}
        className={className}
      >
        {children}
      </MotionBlock>
    );
  }
);

MotionWrapper.displayName = 'MotionWrapper';
