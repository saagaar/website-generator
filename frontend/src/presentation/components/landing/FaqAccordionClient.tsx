'use client';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Faq { q: string; a: string }

export default function FaqAccordionClient({ faqs }: { faqs: Faq[] }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {faqs.map((faq) => (
        <Accordion key={faq.q} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ py: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {faq.a}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
