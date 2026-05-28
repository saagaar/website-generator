'use client';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionHeading from '@/presentation/components/ui/SectionHeading';
import PillButton from '@/presentation/components/ui/PillButton';

const FAQS = [
  { q: 'Do I need to know how to code?', a: 'Not at all. SiteGen is built specifically for people who have no technical background. You just describe your business in plain language and we handle everything else.' },
  { q: 'How long does it take to generate a website?', a: 'Most websites are ready in under 3 minutes. You spend a few minutes answering questions about your business, then the AI generates your complete website in seconds.' },
  { q: 'Can I edit the website after it\'s generated?', a: 'Yes. You receive a standard HTML file that you can open in any website editor, or share with a developer to make changes. Pro and Business plans also offer an in-browser editor.' },
  { q: 'What information do I need to provide?', a: 'Basic details about your business — your name, what you do, who your customers are, and how you want your site to look and feel. The more detail you provide, the better the result.' },
  { q: 'Is my business data kept private?', a: 'Yes. Your information is only used to generate your website and is never shared with third parties. Your generated website is stored securely and only accessible to you.' },
  { q: 'What does the generated website include?', a: 'A complete, self-contained HTML file with your full design, content, navigation, contact section, and mobile-responsive layout. You can open it in any browser, upload it to any host, or hand it to a developer.' },
  { q: 'Can I generate more than one website?', a: 'Free accounts can generate 1 website. Pro and Business subscribers can generate as many as they need.' },
  { q: 'Do I need hosting to use my website?', a: 'You need hosting to make your site visible on the internet. Pro and Business plans include hosting. Free users can upload their HTML file to any hosting provider — many offer free tiers.' },
];

export default function FaqPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 760, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <SectionHeading title="Frequently asked questions" subtitle="Everything you need to know about SiteGen." />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 8 }}>
          {FAQS.map((faq) => (
            <Accordion key={faq.q} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 0.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{faq.q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>{faq.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Still have questions? We&apos;re here to help.
          </Typography>
          <PillButton variant="outlined" color="primary" href="#">
            Contact Support
          </PillButton>
        </Box>
      </Box>
    </Box>
  );
}
