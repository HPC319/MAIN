import type { Meta, StoryObj } from '@storybook/react'
import { FadeIn } from './fade-in'

const meta = {
  title: 'Motion/FadeIn',
  component: FadeIn,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
    },
    delay: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
  },
} satisfies Meta<typeof FadeIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="w-64 h-32 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
        Fade In Animation
      </div>
    ),
  },
}

export const Fast: Story = {
  args: {
    duration: 0.15,
    children: (
      <div className="w-64 h-32 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center">
        Fast Fade (0.15s)
      </div>
    ),
  },
}

export const Slow: Story = {
  args: {
    duration: 1,
    children: (
      <div className="w-64 h-32 bg-accent text-accent-foreground rounded-lg flex items-center justify-center">
        Slow Fade (1s)
      </div>
    ),
  },
}

export const Delayed: Story = {
  args: {
    delay: 0.5,
    children: (
      <div className="w-64 h-32 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
        Delayed Fade (0.5s delay)
      </div>
    ),
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-4">
      <FadeIn delay={0}>
        <div className="w-32 h-32 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-sm">
          First
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="w-32 h-32 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center text-sm">
          Second
        </div>
      </FadeIn>
      <FadeIn delay={0.4}>
        <div className="w-32 h-32 bg-accent text-accent-foreground rounded-lg flex items-center justify-center text-sm">
          Third
        </div>
      </FadeIn>
    </div>
  ),
}
