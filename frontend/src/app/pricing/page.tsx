import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionHeading from '@/presentation/components/ui/SectionHeading';
import PillButton from '@/presentation/components/ui/PillButton';

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    tagline: 'Get started, no strings attached.',
    recommended: false,
    features: ['1 website', 'Basic AI generation', 'Download HTML file', 'Community support'],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    tagline: 'For business owners who mean business.',
    recommended: true,
    features: ['Unlimited websites', 'Custom colours & fonts', 'Live hosting included', 'Priority AI generation', 'Email support', 'In-browser editor'],
    cta: 'Start Pro Trial',
  },
  {
    name: 'Business',
    price: '$99',
    period: 'per month',
    tagline: 'For agencies and growing teams.',
    recommended: false,
    features: ['Everything in Pro', 'Custom domain setup', 'Team access (5 seats)', 'Priority generation queue', 'Dedicated support', 'White-label exports'],
    cta: 'Contact Sales',
  },
];

export default function PricingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 8, md: 12 } }}>
      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <SectionHeading
          title="Simple, honest pricing"
          subtitle="No hidden fees. No surprises. Cancel anytime."
        />
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {PLANS.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
              <Card
                sx={{
                  height: '100%', borderRadius: 3, display: 'flex', flexDirection: 'column',
                  border: plan.recommended ? '2px solid' : '1px solid',
                  borderColor: plan.recommended ? 'primary.main' : 'divider',
                  position: 'relative',
                  boxShadow: plan.recommended ? '0 8px 32px rgba(59,158,219,0.18)' : 'none',
                }}
              >
                {plan.recommended && (
                  <Box sx={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)' }}>
                    <Chip label="Most Popular" color="primary" size="small" sx={{ fontWeight: 600 }} />
                  </Box>
                )}
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{plan.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                    {plan.tagline}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>{plan.price}</Typography>
                    <Typography variant="body2" color="text.secondary">/{plan.period}</Typography>
                  </Box>
                  <List dense sx={{ mt: 2 }}>
                    {plan.features.map((f) => (
                      <ListItem key={f} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                        </ListItemIcon>
                        <ListItemText primary={f} slotProps={{ primary: { variant: 'body2' } }} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <PillButton
                    variant={plan.recommended ? 'contained' : 'outlined'}
                    color="primary"
                    fullWidth
                    href="/generate"
                  >
                    {plan.cta}
                  </PillButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.disabled">
            All plans include a 14-day money-back guarantee. No questions asked.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
