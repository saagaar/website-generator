import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PillButton from './PillButton';

const meta: Meta<typeof PillButton> = {
  title: 'UI/PillButton',
  component: PillButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof PillButton>;

export const Primary: Story = {
  args: { variant: 'contained', color: 'primary', children: 'Get Started Free' },
};
export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary', children: 'See Examples' },
};
export const Ghost: Story = {
  args: { variant: 'text', color: 'primary', children: 'Learn More' },
};
export const Disabled: Story = {
  args: { variant: 'contained', disabled: true, children: 'Disabled' },
};
export const WithIcon: Story = {
  args: { variant: 'contained', children: 'Build My Website', endIcon: <ArrowForwardIcon /> },
};
export const AsLink: Story = {
  args: { variant: 'contained', href: '/generate', children: 'Go to Generate' },
};
