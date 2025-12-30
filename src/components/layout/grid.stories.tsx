import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: { type: 'number', min: 1, max: 12 },
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ label }: { label: string }) => (
  <div className="rounded-lg bg-primary p-6 text-center text-primary-foreground">
    {label}
  </div>
);

export const TwoColumns: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <GridItem label="Item 1" />
        <GridItem label="Item 2" />
        <GridItem label="Item 3" />
        <GridItem label="Item 4" />
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i} label={`Item ${i}`} />
        ))}
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <GridItem key={i} label={`Item ${i}`} />
        ))}
      </>
    ),
  },
};

export const LargeGap: Story = {
  args: {
    cols: 3,
    gap: 'lg',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GridItem key={i} label={`Item ${i}`} />
        ))}
      </>
    ),
  },
};

export const SmallGap: Story = {
  args: {
    cols: 4,
    gap: 'sm',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <GridItem key={i} label={`Item ${i}`} />
        ))}
      </>
    ),
  },
};
