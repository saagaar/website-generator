import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  variant = 'h2',
}: SectionHeadingProps) {
  return (
    <Box sx={{ textAlign: align, mb: 6 }}>
      <Typography variant={variant} component={variant} sx={{ mb: subtitle ? 2 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: align === 'center' ? 'auto' : 0 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
