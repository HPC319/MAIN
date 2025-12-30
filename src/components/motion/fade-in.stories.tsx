import type { Meta, StoryObj } from '@storybook/react';
import { FadeIn } from './fade-in';

const meta = {
  title: 'Motion/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
    },
    delay: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
    },
  },
} satisfies Meta<typeof FadeIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <h3 className="text-lg font-semibold">Fade In Animation</h3>
        <p className="mt-2">This element fades in smoothly</p>
      </div>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: (
      <div className="rounded-lg bg-secondary p-8 text-secondary-foreground">
        <h3 className="text-lg font-semibold">Delayed Fade In</h3>
        <p className="mt-2">This appears after 0.5 seconds</p>
      </div>
    ),
  },
};

export const SlowAnimation: Story = {
  args: {
    duration: 1.5,
    children: (
      <div className="rounded-lg bg-accent p-8 text-accent-foreground">
        <h3 className="text-lg font-semibold">Slow Fade In</h3>
        <p className="mt-2">This fades in slowly over 1.5 seconds</p>
      </div>
    ),
  },
};
