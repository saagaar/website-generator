import { render, screen, fireEvent } from '@testing-library/react';
import SuggestionDropdown from '@/presentation/components/ui/SuggestionDropdown';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/presentation/theme/theme';
import type { Suggestion } from '@/domain/entities/Suggestion';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const SUGGESTIONS: Suggestion[] = [
  { id: '1', text: 'I run a bakery and need a website' },
  { id: '2', text: 'I own a law firm and need clients' },
  { id: '3', text: 'I have a dental clinic' },
];

describe('SuggestionDropdown', () => {
  it('renders nothing when no suggestions and not loading', () => {
    const { container } = render(
      <SuggestionDropdown suggestions={[]} isLoading={false} highlightedIndex={-1} onSelect={jest.fn()} onHighlight={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all suggestion items', () => {
    render(
      <SuggestionDropdown suggestions={SUGGESTIONS} isLoading={false} highlightedIndex={-1} onSelect={jest.fn()} onHighlight={jest.fn()} />,
      { wrapper: Wrapper }
    );
    SUGGESTIONS.forEach((s) => expect(screen.getByText(s.text)).toBeInTheDocument());
  });

  it('calls onSelect with the suggestion text when clicked', () => {
    const onSelect = jest.fn();
    render(
      <SuggestionDropdown suggestions={SUGGESTIONS} isLoading={false} highlightedIndex={-1} onSelect={onSelect} onHighlight={jest.fn()} />,
      { wrapper: Wrapper }
    );
    fireEvent.click(screen.getByText(SUGGESTIONS[1].text));
    expect(onSelect).toHaveBeenCalledWith(SUGGESTIONS[1].text);
  });

  it('shows loading indicator when isLoading is true and no suggestions', () => {
    render(
      <SuggestionDropdown suggestions={[]} isLoading={true} highlightedIndex={-1} onSelect={jest.fn()} onHighlight={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Finding suggestions…')).toBeInTheDocument();
  });

  it('shows footer hint when suggestions are present', () => {
    render(
      <SuggestionDropdown suggestions={SUGGESTIONS} isLoading={false} highlightedIndex={-1} onSelect={jest.fn()} onHighlight={jest.fn()} />,
      { wrapper: Wrapper }
    );
    expect(screen.getByText('Press Enter to start building →')).toBeInTheDocument();
  });
});
