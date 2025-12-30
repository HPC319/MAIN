import type { Meta, StoryObj } from '@storybook/react';
import { FormSuccess } from './form-success';

const meta: Meta<typeof FormSuccess> = {
  title: 'UI/Form/FormSuccess',
  component: FormSuccess,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSuccess>;

export const Default: Story = {
  args: {
    message: 'Form submitted successfully!',
  },
};

export const EmailVerification: Story = {
  args: {
    message: 'Verification email sent! Please check your inbox.',
  },
};

export const PasswordReset: Story = {
  args: {
    message: 'Password reset link sent to your email.',
  },
};

export const ProfileUpdated: Story = {
  args: {
    message: 'Your profile has been updated successfully.',
  },
};

export const SavedDraft: Story = {
  args: {
    message: 'Draft saved automatically.',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'Your request has been processed successfully. You will receive a confirmation email within the next 24 hours.',
  },
};
