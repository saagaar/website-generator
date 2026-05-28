import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeroSection() {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 14 },
        pb: { xs: 4, md: 6 },
        textAlign: 'center',
        px: { xs: 3, md: 4 },
        animation: 'fadeIn 0.6s ease',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '2.8rem', md: '3.4rem' },
          mb: 2,
          color: 'text.primary',
          fontWeight: 300,
        }}
      >
        Welcome to Website Generator
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 520, mx: 'auto', fontSize: { xs: '1rem', md: '1.1rem' } }}
      >
        Tell us about your business — answer a few questions and we&apos;ll build your site.
      </Typography>
    </Box>
  );
}
