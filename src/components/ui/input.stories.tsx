import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="email-error">Email</Label>
      <Input
        id="email-error"
        type="email"
        placeholder="email@example.com"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">Please enter a valid email address</p>
    </div>
  ),
}

export const AllTypes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div className="space-y-2">
        <Label>Text</Label>
        <Input type="text" placeholder="Text input" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
      </div>
      <div className="space-y-2">
        <Label>Number</Label>
        <Input type="number" placeholder="123" />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input disabled placeholder="Disabled" />
      </div>
    </div>
  ),
}
