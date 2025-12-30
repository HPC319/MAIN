import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import { Label } from './label'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Type your message here...',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: 'This is a pre-filled textarea with some content.',
    rows: 4,
  },
}

export const LongText: Story = {
  args: {
    defaultValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.`,
    rows: 6,
  },
}

export const Error: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-error" className="text-destructive">
        Your message *
      </Label>
      <Textarea
        placeholder="Type your message here."
        id="message-error"
        className="border-destructive focus-visible:ring-destructive"
      />
      <p className="text-sm text-destructive">
        This field is required.
      </p>
    </div>
  ),
}
