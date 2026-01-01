/**
 * SlideIn Motion Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock, type MotionBlockProps } from '@/lib/motion-kernel';

export interface SlideInProps extends Omit<MotionBlockProps, 'intent'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

/**
 * SlideIn - Directional entry animation
 * @deprecated Use MotionBlock with intent="ENTRY_SOFT" or "DRAWER" directly
 */
export const SlideIn = React.forwardRef<HTMLDivElement, SlideInProps>(
  ({ children, delay = 0, direction = 'up', ...props }, ref) => {
    // Map direction to intent
    const intent = direction === 'left' || direction === 'right' ? 'DRAWER' : 'ENTRY_SOFT';
    
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

SlideIn.displayName = 'SlideIn';
