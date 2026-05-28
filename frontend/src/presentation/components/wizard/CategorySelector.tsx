'use client';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import { BUSINESS_CATEGORIES } from './categories';

interface Props {
  selected: string;
  onSelect: (label: string) => void;
  showError?: boolean;
}

export default function CategorySelector({ selected, onSelect, showError }: Props) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="caption"
        color={showError ? 'error' : 'text.secondary'}
        sx={{ fontWeight: 600, letterSpacing: '0.08em', mb: 1.5, display: 'block' }}
      >
        What type of business is it?{showError ? ' *' : ''}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          ...(showError && {
            outline: '2px solid',
            outlineColor: 'error.main',
            borderRadius: '12px',
            p: 1,
            animation: 'shake 0.3s ease',
            '@keyframes shake': {
              '0%, 100%': { transform: 'translateX(0)' },
              '25%': { transform: 'translateX(-5px)' },
              '75%': { transform: 'translateX(5px)' },
            },
          }),
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
              borderColor: selected === cat.label ? 'primary.main' : showError ? 'error.light' : 'divider',
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
      {showError && (
        <FormHelperText error sx={{ ml: 0.5, mt: 0.75 }}>
          Please select a business type to continue
        </FormHelperText>
      )}
    </Box>
  );
}
