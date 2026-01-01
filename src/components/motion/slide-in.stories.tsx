/**
 * SlideIn Stories - DEPRECATED
 * 
 * MIGRATION NOTICE:
 * This component is deprecated. Use MotionBlock with intent="ENTRY_SOFT" or "DRAWER" instead.
 * 
 * @deprecated Use MotionBlock from @/lib/motion-kernel
 */

import type { Meta, StoryObj } from '@storybook/react';
import { SlideIn } from './slide-in';

const meta: Meta<typeof SlideIn> = {
  title: 'Motion/SlideIn (Deprecated)',
  component: SlideIn,
  parameters: {
    docs: {
      description: {
        component: '⚠️ DEPRECATED: Use MotionBlock with intent="ENTRY_SOFT" or "DRAWER" instead',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SlideIn>;

export const FromLeft: Story = {
  render: () => (
    <SlideIn direction="left">
      <div className="p-6 bg-blue-500 text-white rounded-lg">
        Sliding from Left
      </div>
    </SlideIn>
  ),
};

export const FromRight: Story = {
  render: () => (
    <SlideIn direction="right">
      <div className="p-6 bg-green-500 text-white rounded-lg">
        Sliding from Right
      </div>
    </SlideIn>
  ),
};

export const FromUp: Story = {
  render: () => (
    <SlideIn direction="up">
      <div className="p-6 bg-purple-500 text-white rounded-lg">
        Sliding from Up
      </div>
    </SlideIn>
  ),
};

export const FromDown: Story = {
  render: () => (
    <SlideIn direction="down">
      <div className="p-6 bg-orange-500 text-white rounded-lg">
        Sliding from Down
      </div>
    </SlideIn>
  ),
};
