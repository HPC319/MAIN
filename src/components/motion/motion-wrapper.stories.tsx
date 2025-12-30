import type { Meta, StoryObj } from '@storybook/react';
import { MotionWrapper } from './motion-wrapper';

const meta: Meta<typeof MotionWrapper> = {
  title: 'Motion/MotionWrapper',
  component: MotionWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MotionWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-64 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white">
        Motion Wrapper
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <div className="w-64 h-32 bg-gray-500 rounded-lg flex items-center justify-center text-white">
        Motion Disabled
      </div>
    ),
  },
};

export const WithCustomAnimation: Story = {
  args: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    children: (
      <div className="w-64 h-32 bg-purple-500 rounded-lg flex items-center justify-center text-white">
        Custom Animation
      </div>
    ),
  },
};

export const MultipleElements: Story = {
  render: () => (
    <div className="flex gap-4">
      <MotionWrapper>
        <div className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center text-white">
          1
        </div>
      </MotionWrapper>
      <MotionWrapper>
        <div className="w-32 h-32 bg-green-500 rounded-lg flex items-center justify-center text-white">
          2
        </div>
      </MotionWrapper>
      <MotionWrapper>
        <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          3
        </div>
      </MotionWrapper>
    </div>
  ),
};
