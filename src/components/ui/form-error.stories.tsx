import type { Meta, StoryObj } from '@storybook/react';
import { FormError } from './form-error';

const meta: Meta<typeof FormError> = {
  title: 'UI/Form/FormError',
  component: FormError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {
    message: 'This field is required',
  },
};

export const EmailValidation: Story = {
  args: {
    message: 'Please enter a valid email address',
  },
};

export const PasswordStrength: Story = {
  args: {
    message: 'Password must be at least 8 characters long',
  },
};

export const ServerError: Story = {
  args: {
    message: 'An error occurred while processing your request. Please try again.',
  },
};

export const NetworkError: Story = {
  args: {
    message: 'Network error. Please check your connection and try again.',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'Your password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.',
  },
};
