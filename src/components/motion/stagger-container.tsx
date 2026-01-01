/**
 * StaggerContainer Motion Component - MIGRATED
 * Uses Motion Kernel exclusively - NO inline motion
 */

'use client';

import * as React from 'react';
import { MotionBlock } from '@/lib/motion-kernel';

export interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
}

/**
 * StaggerContainer - Orchestrated staggered animations
 * Each child receives incremental delay
 */
export const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, staggerDelay = 0.1, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    
    return (
      <div ref={ref} {...props}>
        {childArray.map((child, index) => (
          <MotionBlock
            key={index}
            intent="GRID_ENTRY"
            delay={index * staggerDelay}
          >
            {child}
          </MotionBlock>
        ))}
      </div>
    );
  }
);

StaggerContainer.displayName = 'StaggerContainer';
