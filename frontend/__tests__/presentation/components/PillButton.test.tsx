import { render, screen } from '@testing-library/react';
import PillButton from '@/presentation/components/ui/PillButton';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/presentation/theme/theme';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('PillButton', () => {
  it('renders label text', () => {
    render(<PillButton variant="contained">Click me</PillButton>, { wrapper: Wrapper });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(<PillButton variant="contained" href="/generate">Get Started</PillButton>, { wrapper: Wrapper });
    const link = screen.getByRole('link', { name: 'Get Started' });
    expect(link).toHaveAttribute('href', '/generate');
  });

  it('is disabled when disabled prop is set', () => {
    render(<PillButton variant="contained" disabled>Disabled</PillButton>, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders as a button (not link) without href', () => {
    render(<PillButton variant="outlined">Button</PillButton>, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
