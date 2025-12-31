// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { SlideIn } from './slide-in';

const meta = {
  title: 'Motion/SlideIn',
  component: SlideIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.1 },
    },
    delay: {
      control: { type: 'number', min: 0, max: 2, step: 0.1 },
    },
  },
} satisfies Meta<typeof SlideIn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FromBottom: Story = {
  args: {
    direction: 'up',
    children: (
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <h3 className="text-lg font-semibold">Slide Up</h3>
        <p className="mt-2">Slides from bottom to top</p>
      </div>
    ),
  },
};

export const FromTop: Story = {
  args: {
    direction: 'down',
    children: (
      <div className="rounded-lg bg-secondary p-8 text-secondary-foreground">
        <h3 className="text-lg font-semibold">Slide Down</h3>
        <p className="mt-2">Slides from top to bottom</p>
      </div>
    ),
  },
};

export const FromLeft: Story = {
  args: {
    direction: 'right',
    children: (
      <div className="rounded-lg bg-accent p-8 text-accent-foreground">
        <h3 className="text-lg font-semibold">Slide Right</h3>
        <p className="mt-2">Slides from left to right</p>
      </div>
    ),
  },
};

export const FromRight: Story = {
  args: {
    direction: 'left',
    children: (
      <div className="rounded-lg bg-muted p-8 text-muted-foreground">
        <h3 className="text-lg font-semibold">Slide Left</h3>
        <p className="mt-2">Slides from right to left</p>
      </div>
    ),
  },
};
