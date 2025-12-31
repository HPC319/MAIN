import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './form-field';
import { Input } from './input';

const meta: Meta<typeof FormField> = {
  title: 'UI/Form/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    description: 'Enter your email address',
    children: (
      <Input
        type="email"
        placeholder="Enter your email"
        id="email"
      />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'Invalid email format',
    children: (
      <Input
        type="email"
        placeholder="Enter your email"
        id="email"
        className="border-red-500"
      />
    ),
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    description: 'This field is required',
    required: true,
    children: (
      <Input
        type="email"
        placeholder="Enter your email"
        id="email"
      />
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    children: (
      <Input
        type="email"
        placeholder="disabled@example.com"
        id="email"
        disabled
      />
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email Address',
    description: 'We will never share your email with anyone',
    children: (
      <Input
        type="email"
        placeholder="Enter your email"
        id="email"
      />
    ),
  },
};
