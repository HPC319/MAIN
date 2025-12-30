/**
 * Motion Components Stories
 * 
 * Animation component examples and documentation.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from '../../motion/fade-in';
import { SlideIn } from '../../motion/slide-in';
import { Scale } from '../../motion/scale';
import { StaggerContainer } from '../../motion/stagger-container';

const meta = {
  title: 'Motion/Animations',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animation components built with Framer Motion.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const FadeInExample: StoryObj = {
  render: () => (
    <FadeIn>
      <div className="w-64 h-32 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
        Fade In Animation
      </div>
    </FadeIn>
  ),
};

export const SlideInLeft: StoryObj = {
  render: () => (
    <SlideIn direction="left">
      <div className="w-64 h-32 bg-secondary rounded-lg flex items-center justify-center text-white font-semibold">
        Slide From Left
      </div>
    </SlideIn>
  ),
};

export const SlideInRight: StoryObj = {
  render: () => (
    <SlideIn direction="right">
      <div className="w-64 h-32 bg-tertiary rounded-lg flex items-center justify-center text-white font-semibold">
        Slide From Right
      </div>
    </SlideIn>
  ),
};

export const ScaleExample: StoryObj = {
  render: () => (
    <Scale>
      <div className="w-64 h-32 bg-success rounded-lg flex items-center justify-center text-white font-semibold">
        Scale Animation
      </div>
    </Scale>
  ),
};

export const StaggeredItems: StoryObj = {
  render: () => (
    <StaggerContainer className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="w-64 h-20 bg-primary/80 rounded-lg flex items-center justify-center text-white font-semibold"
        >
          Item {item}
        </div>
      ))}
    </StaggerContainer>
  ),
};

export const AllAnimations: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <FadeIn>
        <div className="w-48 h-32 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          Fade In
        </div>
      </FadeIn>
      
      <SlideIn direction="left">
        <div className="w-48 h-32 bg-secondary rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          Slide Left
        </div>
      </SlideIn>
      
      <SlideIn direction="right">
        <div className="w-48 h-32 bg-tertiary rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          Slide Right
        </div>
      </SlideIn>
      
      <Scale>
        <div className="w-48 h-32 bg-success rounded-lg flex items-center justify-center text-white text-sm font-semibold">
          Scale
        </div>
      </Scale>
    </div>
  ),
};
