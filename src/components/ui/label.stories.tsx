import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Input } from './input'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    htmlFor: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Your email address',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const WithRequiredIndicator: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="name" placeholder="Enter your name" />
    </div>
  ),
}

export const WithHelpText: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Enter password" />
      <p className="text-sm text-muted-foreground">
        Must be at least 8 characters long.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="opacity-50">
        Disabled Field
      </Label>
      <Input type="text" id="disabled" placeholder="Disabled" disabled />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="error" className="text-destructive">
        Email <span>*</span>
      </Label>
      <Input
        type="email"
        id="error"
        placeholder="email@example.com"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">
        Please enter a valid email address.
      </p>
    </div>
  ),
}
