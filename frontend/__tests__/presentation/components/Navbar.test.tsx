import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/presentation/components/layout/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/presentation/theme/theme';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Navbar', () => {
  it('renders the SiteGen logo', () => {
    render(<Navbar />, { wrapper: Wrapper });
    expect(screen.getByText('SiteGen')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Navbar />, { wrapper: Wrapper });
    expect(screen.getByText('How It Works')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders the Get Started button linking to /generate', () => {
    render(<Navbar />, { wrapper: Wrapper });
    const buttons = screen.getAllByText('Get Started →');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens the mobile drawer when hamburger is clicked', () => {
    render(<Navbar />, { wrapper: Wrapper });
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });
});
