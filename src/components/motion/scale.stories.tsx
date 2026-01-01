/**
 * Scale Stories - DEPRECATED
 * 
 * MIGRATION NOTICE:
 * This component is deprecated. Use MotionBlock with intent="GRID_ENTRY" instead.
 * 
 * @deprecated Use MotionBlock from @/lib/motion-kernel
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Scale } from './scale';

const meta: Meta<typeof Scale> = {
  title: 'Motion/Scale (Deprecated)',
  component: Scale,
  parameters: {
    docs: {
      description: {
        component: '⚠️ DEPRECATED: Use MotionBlock with intent="GRID_ENTRY" instead',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Scale>;

export const Default: Story = {
  render: () => (
    <Scale>
      <div className="p-6 bg-blue-500 text-white rounded-lg">
        Scaling Content
      </div>
    </Scale>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <Scale delay={0.3}>
      <div className="p-6 bg-purple-500 text-white rounded-lg">
        Delayed Scale
      </div>
    </Scale>
  ),
};
