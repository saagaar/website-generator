import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DownloadIcon from '@mui/icons-material/Download';
import SectionHeading from '@/presentation/components/ui/SectionHeading';
import PillButton from '@/presentation/components/ui/PillButton';

const STEPS = [
  {
    number: '01', icon: <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Tell us about your business',
    description: 'We ask you a series of simple questions — your business name, what you do, who your customers are, what problems you solve, and how you want your site to look and feel. No technical knowledge needed. If you have a logo or brand colours, great. If not, we\'ll suggest something that fits.',
  },
  {
    number: '02', icon: <AutoAwesomeIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Our AI builds it for you',
    description: 'Once you\'ve shared your details, our AI gets to work. It writes your copy, designs your layout, picks your colours and fonts, and assembles a complete, professional website — all in seconds. No templates, no generic filler text. Your real business, built properly.',
  },
  {
    number: '03', icon: <DownloadIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Preview, download, go live',
    description: 'You\'ll see a live preview of your site right in the browser. If you want to tweak anything, just tell us — or download the HTML file and take it to a developer. Pro and Business subscribers can publish directly from SiteGen.',
  },
];

export default function HowItWorksPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <SectionHeading
          title="How SiteGen works"
          subtitle="Three steps. No technical knowledge required."
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {STEPS.map((step, i) => (
            <Paper
              key={step.number}
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 }, borderRadius: 3,
                border: '1px solid', borderColor: 'divider',
                display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                gap: 4, alignItems: { md: 'flex-start' },
              }}
            >
              <Box sx={{ flexShrink: 0 }}>
                <Typography variant="h1" sx={{ fontSize: '5rem', fontWeight: 200, color: 'primary.light', lineHeight: 1 }}>
                  {step.number}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ mb: 2 }}>{step.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 2 }}>{step.title}</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>{step.description}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: 300, mb: 3 }}>
            Ready to try it yourself?
          </Typography>
          <PillButton variant="contained" color="primary" href="/generate" size="large">
            Build My Website →
          </PillButton>
        </Box>
      </Box>
    </Box>
  );
}
