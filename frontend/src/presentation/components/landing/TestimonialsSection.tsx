import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SectionHeading from '@/presentation/components/ui/SectionHeading';

const TESTIMONIALS = [
  { quote: "I had my café website live in 4 minutes. I still can't believe it.", name: 'Sarah M.', role: 'Café Owner', initials: 'SM' },
  { quote: "Finally a tool that doesn't require me to learn anything. Just answered questions and it was done.", name: 'James T.', role: 'Plumber', initials: 'JT' },
  { quote: "The design looked better than what I paid a designer $2,000 for. No joke.", name: 'Priya K.', role: 'Business Consultant', initials: 'PK' },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
      <SectionHeading
        title="What business owners say"
        subtitle="Real people, real results."
      />
      <Grid container spacing={3}>
        {TESTIMONIALS.map((t) => (
          <Grid size={{ xs: 12, md: 4 }} key={t.name}>
            <Paper
              elevation={0}
              sx={{
                p: 4, height: '100%', borderRadius: 3,
                border: '1px solid', borderColor: 'divider',
                display: 'flex', flexDirection: 'column', gap: 3,
              }}
            >
              <FormatQuoteIcon sx={{ color: 'primary.light', fontSize: 36 }} />
              <Typography variant="body1" color="text.primary" sx={{ flexGrow: 1, fontStyle: 'italic', lineHeight: 1.8 }}>
                &ldquo;{t.quote}&rdquo;
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontSize: '0.875rem' }}>
                  {t.initials}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{t.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{t.role}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
