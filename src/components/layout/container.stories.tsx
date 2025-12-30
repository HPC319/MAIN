import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './container'

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
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'prose'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Container Content</h2>
        <p className="text-muted-foreground">
          This content is constrained within a container with responsive max-width and padding.
        </p>
      </div>
    ),
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Small Container (640px)</h2>
        <p className="text-muted-foreground">Perfect for focused content and forms.</p>
      </div>
    ),
  },
}

export const Large: Story = {
  args: {
    size: '2xl',
    children: (
      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Large Container (1536px)</h2>
        <p className="text-muted-foreground">Great for wide layouts and dashboards.</p>
      </div>
    ),
  },
}

export const Prose: Story = {
  args: {
    size: 'prose',
    children: (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Article Title</h1>
        <p className="text-lg text-muted-foreground">
          The prose container is optimized for reading, with a comfortable line length
          of approximately 65 characters.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris.
        </p>
      </div>
    ),
  },
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">No Padding</h2>
        <p className="text-muted-foreground">
          Container without horizontal padding, useful when child elements need full width.
        </p>
      </div>
    ),
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <Container size="sm">
        <div className="bg-primary text-primary-foreground p-4 rounded">Small (sm)</div>
      </Container>
      <Container size="md">
        <div className="bg-secondary text-secondary-foreground p-4 rounded">Medium (md)</div>
      </Container>
      <Container size="lg">
        <div className="bg-accent text-accent-foreground p-4 rounded">Large (lg)</div>
      </Container>
      <Container size="xl">
        <div className="bg-primary text-primary-foreground p-4 rounded">Extra Large (xl)</div>
      </Container>
      <Container size="2xl">
        <div className="bg-secondary text-secondary-foreground p-4 rounded">2X Large (2xl)</div>
      </Container>
    </div>
  ),
}
