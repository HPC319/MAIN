import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './form-field';
import { useForm } from 'react-hook-form';

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

const FormFieldWrapper = (args: any) => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form>
      <FormField
        {...args}
        control={form.control}
        name="email"
        render={({ field }) => (
          <input
            {...field}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
    </form>
  );
};

export const Default: Story = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: 'Email Address',
    description: 'Enter your email address',
  },
};

export const WithError: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { email: 'invalid' },
      mode: 'onChange',
    });

    // Manually set error
    form.setError('email', {
      type: 'manual',
      message: 'Invalid email format',
    });

    return (
      <form>
        <FormField
          control={form.control}
          name="email"
          label="Email Address"
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className="w-full px-4 py-2 border border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
        />
      </form>
    );
  },
};

export const Required: Story = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: 'Email Address',
    description: 'This field is required',
    required: true,
  },
};

export const Disabled: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { email: 'disabled@example.com' },
    });

    return (
      <form>
        <FormField
          control={form.control}
          name="email"
          label="Email Address"
          render={({ field }) => (
            <input
              {...field}
              type="email"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
          )}
        />
      </form>
    );
  },
};

export const WithHelperText: Story = {
  render: (args) => <FormFieldWrapper {...args} />,
  args: {
    label: 'Email Address',
    description: 'We will never share your email with anyone',
  },
};
