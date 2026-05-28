import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PillButton from '@/presentation/components/ui/PillButton';

export default function CtaSection() {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 },
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, mb: 2 }}
      >
        Your website is 3 minutes away.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
        No credit card. No setup. No code.
      </Typography>
      <PillButton variant="contained" color="primary" href="/generate" size="large">
        Build My Website →
      </PillButton>
    </Box>
  );
}
