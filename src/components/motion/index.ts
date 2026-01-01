/**
 * Motion Components - MIGRATED
 * All components now use Motion Kernel exclusively
 * 
 * RECOMMENDATION: Import MotionBlock directly from Motion Kernel
 * These wrapper components are maintained for backward compatibility
 */

export { FadeIn } from './fade-in';
export { SlideIn } from './slide-in';
export { Scale } from './scale';
export { StaggerContainer } from './stagger-container';
export { MotionWrapper } from './motion-wrapper';

// Re-export Motion Kernel for convenience
export { MotionBlock, MotionText, MotionImage, type MotionIntent } from '@/lib/motion-kernel';
