import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './flex';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-500 text-white p-4 rounded-lg">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'col',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Center: Story = {
  args: {
    justify: 'center',
    align: 'center',
    className: 'h-64 border-2 border-dashed border-gray-300',
    children: <Box>Centered Content</Box>,
  },
};

export const SpaceBetween: Story = {
  args: {
    justify: 'between',
    children: (
      <>
        <Box>Left</Box>
        <Box>Center</Box>
        <Box>Right</Box>
      </>
    ),
  },
};

export const WithGap: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Wrap: Story = {
  args: {
    wrap: true,
    gap: 2,
    className: 'max-w-md',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
      </>
    ),
  },
};

export const ResponsiveDirection: Story = {
  args: {
    direction: 'col',
    gap: 4,
    className: 'md:flex-row',
    children: (
      <>
        <Box>Stacks on mobile, row on desktop</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    align: 'end',
    className: 'h-64 border-2 border-dashed border-gray-300',
    children: (
      <>
        <Box>Aligned to end</Box>
        <Box>Item 2</Box>
      </>
    ),
  },
};
