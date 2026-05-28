import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';

const TRUST_ITEMS = [
  'No coding required',
  'Ready in under 3 minutes',
  'Looks professional, instantly',
];

export default function TrustSection() {
  return (
    <Box
      sx={{
        display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center',
        py: 5, borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider',
      }}
    >
      {TRUST_ITEMS.map((item) => (
        <Chip
          key={item}
          icon={<CheckCircleOutlineIcon sx={{ color: 'primary.main !important' }} />}
          label={item}
          variant="outlined"
          sx={{ borderColor: 'divider', color: 'text.secondary', px: 1, fontSize: '0.875rem' }}
        />
      ))}
    </Box>
  );
}
