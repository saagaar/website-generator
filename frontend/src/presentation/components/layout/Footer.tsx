'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Examples', href: '/examples' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Twitter / X', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', mt: 8 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 }, py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>SiteGen</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Professional websites for every business — no code required.
            </Typography>
          </Grid>

          {COLUMNS.map((col) => (
            <Grid size={{ xs: 6, md: 3 }} key={col.title}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {col.links.map((link) => (
                  <Box
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      textDecoration: 'none', color: 'text.secondary', fontSize: '0.875rem',
                      '&:hover': { color: 'primary.main' }, transition: 'color 0.15s ease',
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="caption" color="text.disabled">
            © 2025 SiteGen · Built with AI
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
