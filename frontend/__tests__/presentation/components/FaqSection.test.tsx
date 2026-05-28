import { render, screen, fireEvent } from '@testing-library/react';
import FaqSection from '@/presentation/components/landing/FaqSection';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/presentation/theme/theme';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('FaqSection', () => {
  it('renders all 5 FAQ questions', () => {
    render(<FaqSection />, { wrapper: Wrapper });
    expect(screen.getByText('Do I need to know how to code?')).toBeInTheDocument();
    expect(screen.getByText('How long does it take to generate a website?')).toBeInTheDocument();
    expect(screen.getByText(/Can I edit the website/)).toBeInTheDocument();
    expect(screen.getByText('What information do I need to provide?')).toBeInTheDocument();
    expect(screen.getByText('Is my business data kept private?')).toBeInTheDocument();
  });

  it('expands an accordion item when clicked', () => {
    render(<FaqSection />, { wrapper: Wrapper });
    const question = screen.getByText('Do I need to know how to code?');
    fireEvent.click(question);
    expect(screen.getByText(/SiteGen is built specifically/)).toBeVisible();
  });

  it('collapses an expanded accordion item when clicked again', () => {
    render(<FaqSection />, { wrapper: Wrapper });
    const question = screen.getByText('Do I need to know how to code?');
    fireEvent.click(question);
    const button = question.closest('button') ?? screen.getAllByRole('button')[0];
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(question);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
