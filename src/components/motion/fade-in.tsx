/**
 * FadeIn Motion Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock, type MotionBlockProps } from '@/lib/motion-kernel';

export interface FadeInProps extends Omit<MotionBlockProps, 'intent'> {
  children: React.ReactNode;
  delay?: number;
}

/**
 * FadeIn - Soft entry animation
 * @deprecated Use MotionBlock with intent="ENTRY_SOFT" directly
 */
export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ children, delay = 0, ...props }, ref) => {
    return (
      <MotionBlock
        ref={ref}
        intent="ENTRY_SOFT"
        delay={delay}
        {...props}
      >
        {children}
      </MotionBlock>
    );
  }
);

FadeIn.displayName = 'FadeIn';
