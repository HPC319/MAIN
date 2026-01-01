/**
 * FadeIn Stories - DEPRECATED
 * 
 * MIGRATION NOTICE:
 * This component is deprecated. Use MotionBlock with intent="ENTRY_SOFT" instead.
 * 
 * @deprecated Use MotionBlock from @/lib/motion-kernel
 */

import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from './fade-in';

const meta: Meta<typeof FadeIn> = {
  title: 'Motion/FadeIn (Deprecated)',
  component: FadeIn,
  parameters: {
    docs: {
      description: {
        component: '⚠️ DEPRECATED: Use MotionBlock with intent="ENTRY_SOFT" instead',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FadeIn>;

export const Default: Story = {
  render: () => (
    <FadeIn>
      <div className="p-6 bg-blue-500 text-white rounded-lg">
        Fading In Content
      </div>
    </FadeIn>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <FadeIn delay={0.5}>
      <div className="p-6 bg-purple-500 text-white rounded-lg">
        Delayed Fade In
      </div>
    </FadeIn>
  ),
};
