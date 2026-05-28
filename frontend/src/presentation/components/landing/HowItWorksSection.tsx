import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import SectionHeading from '@/presentation/components/ui/SectionHeading';

const STEPS = [
  {
    number: '01',
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Tell us about your business',
    body: 'Answer a few simple questions about what you do, who you serve, and how you want to look. No technical knowledge needed.',
  },
  {
    number: '02',
    icon: <AutoAwesomeIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Watch it come to life',
    body: 'Our AI designs and builds your full website in seconds — complete with your brand colours, content, and layout.',
  },
  {
    number: '03',
    icon: <DownloadIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Download and go live',
    body: 'Get your ready-to-publish website file. Upload it anywhere, or let us host it for you. Done.',
  },
];

export default function HowItWorksSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
      <SectionHeading
        title="How it works"
        subtitle="Three simple steps — from idea to live website."
      />
      <Grid container spacing={4}>
        {STEPS.map((step) => (
          <Grid size={{ xs: 12, md: 4 }} key={step.number}>
            <Paper
              elevation={0}
              sx={{
                p: 4, height: '100%', borderRadius: 3,
                border: '1px solid', borderColor: 'divider',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(59,158,219,0.12)' },
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 200, color: 'primary.light', mb: 2, lineHeight: 1 }}>
                {step.number}
              </Typography>
              <Box sx={{ mb: 2 }}>{step.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 1.5 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.body}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
