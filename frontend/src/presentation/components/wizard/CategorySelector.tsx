'use client';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { BUSINESS_CATEGORIES } from './categories';

interface Props {
  selected: string;
  onSelect: (label: string) => void;
}

export default function CategorySelector({ selected, onSelect }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.08em', mb: 1.5, display: 'block' }}>
        What type of business is it?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {BUSINESS_CATEGORIES.map(cat => (
          <Chip
            key={cat.label}
            label={`${cat.icon} ${cat.label}`}
            onClick={() => onSelect(cat.label)}
            variant={selected === cat.label ? 'filled' : 'outlined'}
            color={selected === cat.label ? 'primary' : 'default'}
            sx={{
              borderRadius: '50px',
              fontWeight: selected === cat.label ? 600 : 400,
              cursor: 'pointer',
              borderColor: selected === cat.label ? 'primary.main' : 'divider',
              bgcolor: selected === cat.label ? 'primary.main' : 'transparent',
              color: selected === cat.label ? '#fff' : 'text.secondary',
              '&:hover': {
                bgcolor: selected === cat.label ? 'primary.dark' : 'action.hover',
              },
              transition: 'all 0.15s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
