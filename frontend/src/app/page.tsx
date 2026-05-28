import Box from '@mui/material/Box';
import HeroSection from '@/presentation/components/landing/HeroSection';
import WizardShell from '@/presentation/components/wizard/WizardShell';
import TrustSection from '@/presentation/components/landing/TrustSection';
import HowItWorksSection from '@/presentation/components/landing/HowItWorksSection';
import ExamplesSection from '@/presentation/components/landing/ExamplesSection';
import TestimonialsSection from '@/presentation/components/landing/TestimonialsSection';
import FaqSection from '@/presentation/components/landing/FaqSection';
import CtaSection from '@/presentation/components/landing/CtaSection';

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Above the fold — hero + wizard */}
      <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 4 }, pb: { xs: 8, md: 12 } }}>
        <HeroSection />
        <Box sx={{ mt: 4 }}>
          <WizardShell />
        </Box>
      </Box>

      {/* Below the fold — marketing sections */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <TrustSection />
        </Box>
        <HowItWorksSection />
        <ExamplesSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </Box>
    </Box>
  );
}
