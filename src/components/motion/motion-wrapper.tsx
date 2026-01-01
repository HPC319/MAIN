/**
 * MotionWrapper Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock, type MotionIntent } from '@/lib/motion-kernel';

export interface MotionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intent?: MotionIntent;
  delay?: number;
}

/**
 * MotionWrapper - Generic wrapper with configurable intent
 */
export const MotionWrapper = React.forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, intent = 'ENTRY_SOFT', delay = 0, ...props }, ref) => {
    return (
      <MotionBlock
        ref={ref}
        intent={intent}
        delay={delay}
        {...props}
      >
        {children}
      </MotionBlock>
    );
  }
);

MotionWrapper.displayName = 'MotionWrapper';
