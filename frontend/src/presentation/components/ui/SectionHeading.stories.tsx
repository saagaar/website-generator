import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SectionHeading from './SectionHeading';

const meta: Meta<typeof SectionHeading> = {
  title: 'UI/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'radio', options: ['center', 'left'] },
    variant: { control: 'radio', options: ['h1', 'h2', 'h3'] },
  },
};
export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const H2Centered: Story = {
  args: { title: 'How it works', subtitle: 'Three simple steps.', align: 'center', variant: 'h2' },
};
export const H1Hero: Story = {
  args: { title: 'Hi, what are you after?', variant: 'h1', align: 'center' },
};
export const H3Left: Story = {
  args: { title: 'Our services', subtitle: 'Everything you need.', align: 'left', variant: 'h3' },
};
export const NoSubtitle: Story = {
  args: { title: 'Frequently asked questions', align: 'center' },
};
