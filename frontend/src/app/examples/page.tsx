import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SectionHeading from '@/presentation/components/ui/SectionHeading';

const EXAMPLES = [
  { slug: 'bakery', type: 'Bakery', tagline: 'Fresh bakes, warm welcome.', seed: 'bakery' },
  { slug: 'lawfirm', type: 'Law Firm', tagline: 'Trusted legal expertise.', seed: 'law' },
  { slug: 'dentist', type: 'Dental Clinic', tagline: 'Bright smiles, gentle care.', seed: 'dental' },
  { slug: 'plumber', type: 'Plumber', tagline: 'Reliable pipes, on time.', seed: 'plumber' },
  { slug: 'gym', type: 'Gym & Fitness', tagline: 'Train smart, live well.', seed: 'fitness' },
  { slug: 'cafe', type: 'Café', tagline: 'Good coffee. Better vibes.', seed: 'coffee' },
];

export default function ExamplesPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <SectionHeading
          title="Examples"
          subtitle="Every website is unique — generated from real business details, not templates."
        />
        <Grid container spacing={3}>
          {EXAMPLES.map((ex) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ex.slug}>
              <Card sx={{ borderRadius: 3, overflow: 'hidden', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Box
                  sx={{
                    aspectRatio: '16/9',
                    backgroundImage: `url(https://picsum.photos/seed/${ex.seed}/800/450)`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    bgcolor: 'background.paper',
                  }}
                />
                <CardContent sx={{ pb: 1 }}>
                  <Chip label={ex.type} size="small" color="primary" variant="outlined" sx={{ mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">{ex.tagline}</Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button size="small" variant="outlined" sx={{ borderRadius: '50px' }} disabled>
                    View Site
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
