import type { Meta, StoryObj } from '@storybook/react';
import { StaggerContainer } from './stagger-container';
import { FadeIn } from './fade-in';

const meta = {
  title: 'Motion/StaggerContainer',
  component: StaggerContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    staggerDelay: {
      control: { type: 'number', min: 0.05, max: 0.5, step: 0.05 },
    },
  },
} satisfies Meta<typeof StaggerContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        {[1, 2, 3, 4, 5].map((item) => (
          <FadeIn key={item}>
            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              Item {item}
            </div>
          </FadeIn>
        ))}
      </>
    ),
  },
  render: (args) => (
    <div className="w-64">
      <StaggerContainer {...args} className="space-y-3" />
    </div>
  ),
};

export const FastStagger: Story = {
  args: {
    staggerDelay: 0.05,
    children: (
      <>
        {[1, 2, 3, 4].map((item) => (
          <FadeIn key={item}>
            <div className="rounded-lg bg-secondary p-4 text-secondary-foreground">
              Fast #{item}
            </div>
          </FadeIn>
        ))}
      </>
    ),
  },
  render: (args) => (
    <div className="w-64">
      <StaggerContainer {...args} className="space-y-2" />
    </div>
  ),
};

export const SlowStagger: Story = {
  args: {
    staggerDelay: 0.3,
    children: (
      <>
        {[1, 2, 3].map((item) => (
          <FadeIn key={item}>
            <div className="rounded-lg bg-accent p-6 text-accent-foreground">
              Slow #{item}
            </div>
          </FadeIn>
        ))}
      </>
    ),
  },
  render: (args) => (
    <div className="w-64">
      <StaggerContainer {...args} className="space-y-4" />
    </div>
  ),
};
