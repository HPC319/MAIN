import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridItem } from './grid'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 12],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const GridBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-primary text-primary-foreground p-4 rounded-lg text-center ${className}`}>
    {children}
  </div>
)

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        <GridBox>Item 1</GridBox>
        <GridBox>Item 2</GridBox>
        <GridBox>Item 3</GridBox>
        <GridBox>Item 4</GridBox>
        <GridBox>Item 5</GridBox>
        <GridBox>Item 6</GridBox>
      </>
    ),
  },
}

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: 'lg',
    children: (
      <>
        <GridBox>Column 1</GridBox>
        <GridBox>Column 2</GridBox>
        <GridBox>Column 3</GridBox>
        <GridBox>Column 4</GridBox>
      </>
    ),
  },
}

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 'md',
    children: (
      <>
        <GridBox>1</GridBox>
        <GridBox>2</GridBox>
        <GridBox>3</GridBox>
        <GridBox>4</GridBox>
        <GridBox>5</GridBox>
        <GridBox>6</GridBox>
        <GridBox>7</GridBox>
        <GridBox>8</GridBox>
      </>
    ),
  },
}

export const WithSpan: Story = {
  render: () => (
    <Grid cols={12} gap="md">
      <GridItem colSpan={12}>
        <GridBox>Full Width (12 columns)</GridBox>
      </GridItem>
      <GridItem colSpan={6}>
        <GridBox>Half Width (6 columns)</GridBox>
      </GridItem>
      <GridItem colSpan={6}>
        <GridBox>Half Width (6 columns)</GridBox>
      </GridItem>
      <GridItem colSpan={4}>
        <GridBox>4 columns</GridBox>
      </GridItem>
      <GridItem colSpan={4}>
        <GridBox>4 columns</GridBox>
      </GridItem>
      <GridItem colSpan={4}>
        <GridBox>4 columns</GridBox>
      </GridItem>
      <GridItem colSpan={3}>
        <GridBox>3</GridBox>
      </GridItem>
      <GridItem colSpan={3}>
        <GridBox>3</GridBox>
      </GridItem>
      <GridItem colSpan={3}>
        <GridBox>3</GridBox>
      </GridItem>
      <GridItem colSpan={3}>
        <GridBox>3</GridBox>
      </GridItem>
    </Grid>
  ),
}

export const Dashboard: Story = {
  render: () => (
    <Grid cols={12} gap="lg">
      <GridItem colSpan={12}>
        <GridBox className="bg-primary">Header - Full Width</GridBox>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 3 } as any}>
        <GridBox className="bg-secondary text-secondary-foreground">Sidebar</GridBox>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 9 } as any}>
        <Grid cols={2} gap="md">
          <GridBox className="bg-accent text-accent-foreground">Card 1</GridBox>
          <GridBox className="bg-accent text-accent-foreground">Card 2</GridBox>
          <GridBox className="bg-accent text-accent-foreground">Card 3</GridBox>
          <GridBox className="bg-accent text-accent-foreground">Card 4</GridBox>
        </Grid>
      </GridItem>
    </Grid>
  ),
}

export const ProductGrid: Story = {
  render: () => (
    <Grid cols={4} gap="lg">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="space-y-2">
          <div className="aspect-square bg-muted rounded-lg" />
          <h3 className="font-semibold">Product {i}</h3>
          <p className="text-sm text-muted-foreground">$99.99</p>
        </div>
      ))}
    </Grid>
  ),
}
