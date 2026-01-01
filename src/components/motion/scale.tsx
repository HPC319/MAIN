/**
 * Scale Motion Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock, type MotionBlockProps } from '@/lib/motion-kernel';

export interface ScaleProps extends Omit<MotionBlockProps, 'intent'> {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Scale - Grid entry animation
 * @deprecated Use MotionBlock with intent="GRID_ENTRY" directly
 */
export const Scale = React.forwardRef<HTMLDivElement, ScaleProps>(
  ({ children, delay = 0, ...props }, ref) => {
    return (
      <MotionBlock
        ref={ref}
        intent="GRID_ENTRY"
        delay={delay}
        {...props}
      >
        {children}
      </MotionBlock>
    );
  }
);

Scale.displayName = 'Scale';
