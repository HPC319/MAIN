/**
 * MotionWrapper Stories - DEPRECATED
 * 
 * MIGRATION NOTICE:
 * This component is deprecated. Use MotionBlock with specific intents instead.
 * 
 * @deprecated Use MotionBlock from @/lib/motion-kernel
 */

import type { Meta, StoryObj } from '@storybook/react';
import { MotionWrapper } from './motion-wrapper';

const meta: Meta<typeof MotionWrapper> = {
  title: 'Motion/MotionWrapper (Deprecated)',
  component: MotionWrapper,
  parameters: {
    docs: {
      description: {
        component: '⚠️ DEPRECATED: Use MotionBlock with specific intent props instead',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MotionWrapper>;

export const EntrySoft: Story = {
  render: () => (
    <MotionWrapper intent="ENTRY_SOFT">
      <div className="p-6 bg-blue-500 text-white rounded-lg">
        Entry Soft Animation
      </div>
    </MotionWrapper>
  ),
};

export const GridEntry: Story = {
  render: () => (
    <MotionWrapper intent="GRID_ENTRY">
      <div className="p-6 bg-green-500 text-white rounded-lg">
        Grid Entry Animation
      </div>
    </MotionWrapper>
  ),
};

export const Drawer: Story = {
  render: () => (
    <MotionWrapper intent="DRAWER">
      <div className="p-6 bg-purple-500 text-white rounded-lg">
        Drawer Animation
      </div>
    </MotionWrapper>
  ),
};
