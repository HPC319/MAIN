import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-bold">Small Container</h2>
        <p className="mt-4">This is a small container with max-width constraints.</p>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: (
      <div className="rounded-lg bg-secondary p-8 text-secondary-foreground">
        <h2 className="text-2xl font-bold">Medium Container</h2>
        <p className="mt-4">This is a medium container (default size).</p>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <div className="rounded-lg bg-accent p-8 text-accent-foreground">
        <h2 className="text-2xl font-bold">Large Container</h2>
        <p className="mt-4">This is a large container for wide content.</p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: (
      <div className="rounded-lg bg-muted p-8 text-muted-foreground">
        <h2 className="text-2xl font-bold">Extra Large Container</h2>
        <p className="mt-4">This is an extra large container for maximum width content.</p>
      </div>
    ),
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    children: (
      <div className="rounded-lg bg-primary p-8 text-primary-foreground">
        <h2 className="text-2xl font-bold">Full Width Container</h2>
        <p className="mt-4">This container spans the full width with padding.</p>
      </div>
    ),
  },
};
