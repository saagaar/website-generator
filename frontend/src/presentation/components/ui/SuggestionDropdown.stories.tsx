import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Box from '@mui/material/Box';
import SuggestionDropdown from './SuggestionDropdown';

const meta: Meta<typeof SuggestionDropdown> = {
  title: 'UI/SuggestionDropdown',
  component: SuggestionDropdown,
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ position: 'relative', height: 300 }}><Story /></Box>],
};
export default meta;
type Story = StoryObj<typeof SuggestionDropdown>;

const SUGGESTIONS = [
  { id: '1', text: 'I run a small bakery and need a website' },
  { id: '2', text: 'I own a law firm and need clients to find me' },
  { id: '3', text: 'I have a dental clinic and want more bookings' },
];

export const Empty: Story = {
  args: { suggestions: [], isLoading: false, highlightedIndex: -1, onSelect: () => {}, onHighlight: () => {} },
};
export const Loading: Story = {
  args: { suggestions: [], isLoading: true, highlightedIndex: -1, onSelect: () => {}, onHighlight: () => {} },
};
export const WithSuggestions: Story = {
  args: { suggestions: SUGGESTIONS, isLoading: false, highlightedIndex: -1, onSelect: () => {}, onHighlight: () => {} },
};
export const SecondHighlighted: Story = {
  args: { suggestions: SUGGESTIONS, isLoading: false, highlightedIndex: 1, onSelect: () => {}, onHighlight: () => {} },
};
