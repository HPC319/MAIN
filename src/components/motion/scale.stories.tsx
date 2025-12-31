// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Scale } from './scale';

const meta: Meta<typeof Scale> = {
  title: 'Motion/Scale',
  component: Scale,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Scale>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-64 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white">
        Scale Animation
      </div>
    ),
  },
};

export const ScaleUp: Story = {
  args: {
    from: 0.5,
    to: 1,
    children: (
      <div className="w-64 h-32 bg-green-500 rounded-lg flex items-center justify-center text-white">
        Scale Up
      </div>
    ),
  },
};

export const ScaleDown: Story = {
  args: {
    from: 1.5,
    to: 1,
    children: (
      <div className="w-64 h-32 bg-red-500 rounded-lg flex items-center justify-center text-white">
        Scale Down
      </div>
    ),
  },
};

export const SlowScale: Story = {
  args: {
    duration: 1,
    children: (
      <div className="w-64 h-32 bg-purple-500 rounded-lg flex items-center justify-center text-white">
        Slow Scale
      </div>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: (
      <div className="w-64 h-32 bg-orange-500 rounded-lg flex items-center justify-center text-white">
        Scale with Delay
      </div>
    ),
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <Scale delay={0}>
        <div className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center text-white">
          1
        </div>
      </Scale>
      <Scale delay={0.2}>
        <div className="w-32 h-32 bg-green-500 rounded-lg flex items-center justify-center text-white">
          2
        </div>
      </Scale>
      <Scale delay={0.4}>
        <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white">
          3
        </div>
      </Scale>
    </div>
  ),
};
