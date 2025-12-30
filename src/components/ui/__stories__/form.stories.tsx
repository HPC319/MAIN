/**
 * Form Component Stories
 * 
 * Comprehensive form examples with validation.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Form } from '../form';
import { FormField } from '../form-field';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Button } from '../button';
import { contactSchema, signInSchema } from '@/lib/schemas/contact-schema';

const meta = {
  title: 'Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form component with React Hook Form and Zod validation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContactForm: Story = {
  render: () => (
    <div className="w-[500px]">
      <Form
        schema={contactSchema}
        onSubmit={async (data) => {
          console.log('Form submitted:', data);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
        defaultValues={{
          name: '',
          email: '',
          subject: '',
          message: '',
          consent: false,
        }}
        successMessage="Thank you! We'll get back to you soon."
        resetOnSuccess
      >
        {({ register, formState: { errors } }) => (
          <>
            <FormField label="Name" required error={errors.name?.message}>
              <Input {...register('name')} placeholder="John Doe" />
            </FormField>

            <FormField label="Email" required error={errors.email?.message}>
              <Input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
              />
            </FormField>

            <FormField label="Subject" required error={errors.subject?.message}>
              <Input {...register('subject')} placeholder="How can we help?" />
            </FormField>

            <FormField label="Message" required error={errors.message?.message}>
              <Textarea
                {...register('message')}
                placeholder="Tell us more..."
                rows={5}
              />
            </FormField>

            <div className="flex items-center gap-2">
              <input
                {...register('consent')}
                type="checkbox"
                id="consent"
                className="h-4 w-4"
              />
              <label htmlFor="consent" className="text-sm">
                I agree to the privacy policy
              </label>
            </div>
            {errors.consent && (
              <p className="text-sm text-red-600">{errors.consent.message}</p>
            )}

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </>
        )}
      </Form>
    </div>
  ),
};

export const SignInForm: Story = {
  render: () => (
    <div className="w-[400px]">
      <Form
        onSubmit={async (data) => {
          console.log('Sign in:', data);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
        defaultValues={{
          email: '',
          password: '',
          rememberMe: false,
        }}
      >
        {({ register, formState: { errors } }) => (
          <>
            <FormField label="Email" required error={errors.email?.message}>
              <Input
                {...register('email')}
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </FormField>

            <FormField label="Password" required error={errors.password?.message}>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </FormField>

            <div className="flex items-center gap-2">
              <input
                {...register('rememberMe')}
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </>
        )}
      </Form>
    </div>
  ),
};
