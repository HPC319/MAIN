import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and includes proper keyboard navigation and focus management.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that can be easily customized using Tailwind CSS classes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Radix UI's built-in animations with smooth transitions that respect prefers-reduced-motion.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It's maintained by Meta and a community of developers and companies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is Next.js?</AccordionTrigger>
        <AccordionContent>
          Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes out of the box.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing CSS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-2" collapsible className="w-[450px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Follow our comprehensive guide to get your project up and running in minutes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Installation (Default Open)</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Install the required dependencies using npm or yarn:</p>
            <pre className="rounded bg-neutral-900 p-4 text-sm text-white">
              npm install next react react-dom
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Configuration</AccordionTrigger>
        <AccordionContent>
          Configure your application by creating a next.config.js file in the root of your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div className="w-[600px]">
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            Getting started is easy! Simply sign up for an account, complete your profile, and you'll be ready to use all our features. We also provide a comprehensive onboarding guide to help you navigate the platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely using industry-standard encryption.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
          <AccordionContent>
            Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won't be charged again.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
          <AccordionContent>
            Absolutely! We offer 24/7 customer support via email, live chat, and phone. Our support team is highly trained and committed to helping you succeed with our platform.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Security is our top priority. We use bank-level encryption, regular security audits, and comply with industry standards like SOC 2 and GDPR. Your data is stored in secure data centers with redundant backups.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[500px]">
      <AccordionItem value="features">
        <AccordionTrigger>Key Features</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Server-side rendering for optimal performance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Static site generation for blazing-fast pages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>API routes built-in for backend functionality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Automatic code splitting for smaller bundles</span>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pricing">
        <AccordionTrigger>Pricing Plans</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
              <h4 className="font-semibold">Free</h4>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Perfect for getting started</p>
            </div>
            <div className="rounded-lg border border-primary-500 p-4">
              <h4 className="font-semibold">Pro</h4>
              <p className="text-2xl font-bold">$29/mo</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">For professional developers</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contact">
        <AccordionTrigger>Contact Information</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> support@example.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
            <p><strong>Hours:</strong> Monday - Friday, 9AM - 5PM PST</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
