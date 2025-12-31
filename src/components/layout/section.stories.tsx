// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Section Title</h2>
        <p className="text-gray-600">This is a section component with default padding.</p>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Small Padding Section</h2>
        <p className="text-gray-600">This section has small padding.</p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Large Padding Section</h2>
        <p className="text-gray-600">This section has large padding.</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div className="text-center bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-4">No Padding Section</h2>
        <p className="text-gray-600">This section has no padding.</p>
      </div>
    ),
  },
};

export const WithBackgroundColor: Story = {
  args: {
    className: 'bg-blue-50',
    children: (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Colored Section</h2>
        <p className="text-gray-600">This section has a background color.</p>
      </div>
    ),
  },
};

export const FullWidthContent: Story = {
  args: {
    padding: 'lg',
    children: (
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Full Width Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Feature 1</h3>
            <p className="text-gray-600">Description of feature 1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Feature 2</h3>
            <p className="text-gray-600">Description of feature 2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">Feature 3</h3>
            <p className="text-gray-600">Description of feature 3</p>
          </div>
        </div>
      </div>
    ),
  },
};
